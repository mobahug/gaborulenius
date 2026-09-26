import { useEffect, useRef } from "react";
import { onDirectorFrame } from "../director/director";
import { focusAt, windowGeometry } from "../director/frameMapping";
import { hasFinePointer } from "../device";
import { smoothstep } from "../math";
import { requestSceneFrame } from "../scrollTimeline";
import { registerFilmVideo } from "./filmElements";
import { FILMS } from "./films";
import { ScrubVideo } from "./scrubVideo";

/** Scrolling faster than this (viewport heights per frame) is a jump, such
 * as a navigation link or a dragged scrollbar: films passed on the way are
 * not loaded. */
const TRANSIT_SPEED = 0.12;
/** How long a film that is loading may hold the previous film's last frame
 * before its still stands in (film seconds into it). */
const HOLD_SECONDS = 1.2;
/** The neighbours of the current film start loading once it can show a
 * frame, or after this long (ms) if the browser is slow to report it. */
const NEIGHBOUR_DELAY = 2500;
/** On phones a film two stages away is released once it has stayed that
 * far for this long (ms), so going back and forth over a seam never
 * reloads anything. */
const RELEASE_DELAY = 6000;
/** Whatever appears because it has finished loading, rather than because
 * of scrolling, fades in over this long (ms). */
const READY_FADE = 220;

const format = (value: number) => value.toFixed(4);

/** 0 → 1 over READY_FADE from `from` (a timestamp; 0 = no fade). */
const fadeAt = (from: number, now: number) =>
  from ? smoothstep(0, 1, (now - from) / READY_FADE) : 1;

/**
 * The films, stacked in story order inside the fixed stage. Each one is a
 * <video> driven to the time the director asks for, over a still frame of
 * itself; a film fades in over the one below it only across the seam
 * between them, and films that are covered or far away are hidden and not
 * decoded.
 *
 * It is the director's first subscriber: it puts the films on screen and
 * records in the frame what it has actually shown (each film's presented
 * time and the open portal), so the overlays drawn after it line up with the
 * picture rather than with where the scroll will take it.
 *
 * Loading: the current film first (the first film as soon as the page has
 * painted), then its neighbours, and nothing that is only passed on the way
 * during a jump. A film that is not ready yet lets the previous film hold
 * its last frame (the seams are shared frames, so the hold looks like the
 * seam); deeper into it, or when there is nothing to hold, its still stands
 * in once that has loaded, and until then the stage stays dark. The video
 * only shows once it has the right frame, and whatever appears late fades
 * in briefly. With reduced motion only the stills are shown and no video is
 * loaded at all.
 */
const FilmLayer = () => {
  const filmRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const layers = filmRefs.current.map((film) =>
      film
        ? {
            film,
            still: film.querySelector<HTMLElement>(".film-still")!,
            video: film.querySelector<HTMLVideoElement>("video")!,
          }
        : null,
    );
    layers.forEach((layer, index) =>
      registerFilmVideo(index, layer?.video ?? null),
    );
    // A film that becomes ready re-evaluates the frame even when the page
    // is not scrolling.
    const controllers = layers.map((layer) =>
      layer ? new ScrubVideo(layer.video, requestSceneFrame) : null,
    );
    const loadedAt: Array<number | null> = FILMS.map(() => null);
    const farSince: Array<number | null> = FILMS.map(() => null);
    const stills: Array<"none" | "loading" | "ready"> = FILMS.map(() => "none");
    const waiting = FILMS.map(() => false);
    const filmFade = FILMS.map(() => 0);
    const videoShown = FILMS.map(() => false);
    const videoFade = FILMS.map(() => 0);
    const opacities = FILMS.map(() => 0);
    const masks = FILMS.map(() => "");
    const unloadFar = !hasFinePointer();
    const root = document.documentElement;
    let lastY: number | null = null;
    let settleTimer = 0;
    let releaseTimer = 0;
    // A link inside the page scrolls smoothly through everything between
    // here and there: treat the whole scroll as a jump, and load where it
    // lands.
    let navigating = false;
    let navigationTimer = 0;
    const endNavigation = () => {
      navigating = false;
      requestSceneFrame();
    };
    const onNavigate = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest?.('a[href^="#"]')) return;
      navigating = true;
      window.clearTimeout(navigationTimer);
      navigationTimer = window.setTimeout(endNavigation, 1200);
    };
    document.addEventListener("click", onNavigate, true);

    const loadStill = (index: number) => {
      const still = layers[index]?.still;
      if (!still || stills[index] !== "none") return;
      stills[index] = "loading";
      const image = new Image();
      image.onload = () => {
        still.style.backgroundImage = `url("${FILMS[index].poster}")`;
        stills[index] = "ready";
        requestSceneFrame();
      };
      image.onerror = () => {
        stills[index] = "none";
      };
      image.src = FILMS[index].poster;
    };

    const load = (index: number) => {
      const video = layers[index]?.video;
      if (!video || loadedAt[index] !== null) return;
      loadedAt[index] = performance.now();
      video.preload = "auto";
      video.src = FILMS[index].src;
      video.load();
      window.setTimeout(requestSceneFrame, NEIGHBOUR_DELAY + 50);
    };

    const unload = (index: number) => {
      const video = layers[index]?.video;
      if (!video || loadedAt[index] === null) return;
      loadedAt[index] = null;
      video.pause();
      video.removeAttribute("src");
      video.load();
    };

    const isReady = (index: number) => controllers[index]?.ready ?? false;

    const unsubscribe = onDirectorFrame((frame) => {
      const { viewport, timeline, reduced, now } = frame;
      const { current, films } = timeline;
      const aspect = viewport.vw / Math.max(1, viewport.vh);

      const speed =
        lastY === null ? 0 : Math.abs(viewport.y - lastY) / viewport.vh;
      lastY = viewport.y;
      if (navigating && speed > 0) {
        window.clearTimeout(navigationTimer);
        navigationTimer = window.setTimeout(endNavigation, 180);
      }
      const inTransit = speed > TRANSIT_SPEED || navigating;
      if (inTransit) {
        // Load where the jump lands, once it has landed.
        window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(requestSceneFrame, 160);
      }

      // What to have ready: the current film, then its neighbours — but
      // at the very top of the page only the first film, until the visitor
      // starts on the journey.
      const focus = Math.max(0, current);
      const focusStarted = loadedAt[focus];
      const neighboursToo =
        reduced ||
        ((focus > 0 || viewport.y > viewport.vh * 0.5) &&
          (isReady(focus) ||
            (focusStarted !== null && now - focusStarted > NEIGHBOUR_DELAY)));
      films.forEach((_, index) => {
        const distance = Math.abs(index - focus);
        if (distance <= 1) farSince[index] = null;
        if (distance === 0 || (distance === 1 && neighboursToo)) {
          if (inTransit) return;
          loadStill(index);
          if (!reduced) load(index);
        } else if (distance > 1 && unloadFar) {
          farSince[index] ??= now;
          if (distance > 2 || now - farSince[index]! > RELEASE_DELAY) {
            unload(index);
          } else if (!releaseTimer) {
            releaseTimer = window.setTimeout(() => {
              releaseTimer = 0;
              requestSceneFrame();
            }, RELEASE_DELAY + 50);
          }
        }
      });

      // How opaque each film really is: a film that is not ready yet holds
      // the previous frame through its seam; once it covers the screen and
      // the hold is over (or there is nothing to hold), its still stands in.
      let fading = false;
      const shown = films.map((entry, index) => {
        if (!entry || entry.opacity <= 0) {
          waiting[index] = false;
          return 0;
        }
        let value = 0;
        if (entry.window) {
          // Seen through a window: only once it has the right frame.
          value = isReady(index) ? 1 : 0;
        } else if (!reduced && isReady(index)) {
          value = entry.opacity;
        } else if (entry.opacity >= 1 && stills[index] === "ready") {
          const canHold = index > 0 && !reduced && isReady(index - 1);
          value = reduced || !canHold || entry.time > HOLD_SECONDS ? 1 : 0;
        }
        // Appearing late, when it should already have been on screen.
        if (value > 0 && waiting[index] && !reduced) filmFade[index] = now;
        waiting[index] = value === 0 && entry.opacity >= 1;
        const fade = fadeAt(filmFade[index], now);
        if (fade < 1) fading = true;
        else filmFade[index] = 0;
        return value * fade;
      });

      // A film fully covered by a later one is not drawn at all (a window
      // covers nothing).
      let coveredFrom = 0;
      for (let index = films.length - 1; index >= 0; index -= 1) {
        if (shown[index] >= 1 && !films[index]?.window) {
          coveredFrom = index;
          break;
        }
      }

      films.forEach((entry, index) => {
        const layer = layers[index];
        const controller = controllers[index];
        if (!layer || !controller || !entry) return;
        const { film, still, video } = layer;
        const opacity = index >= coveredFrom ? shown[index] : 0;
        // Drive every loaded film around the viewer, so the next one waits
        // on its first frame and the previous one on its last.
        if (
          !reduced &&
          loadedAt[index] !== null &&
          Math.abs(index - current) <= 1
        ) {
          controller.setTarget(entry.time);
        }
        frame.stage.presented[index] =
          !reduced && opacity > 0 ? controller.presentedTime : null;

        // The video covers its still once it has the right frame; over a
        // still that is already on screen it fades in.
        const ready = !reduced && isReady(index);
        if (ready && !videoShown[index] && opacities[index] > 0) {
          videoFade[index] = now;
        }
        videoShown[index] = ready;
        const videoOpacity = ready ? fadeAt(videoFade[index], now) : 0;
        if (videoOpacity < 1 && ready) fading = true;
        else videoFade[index] = 0;
        opacities[index] = opacity;

        film.style.visibility = opacity > 0 ? "visible" : "hidden";
        film.style.opacity = opacity >= 1 ? "" : format(opacity);
        const { scale, x, y } = entry.transform;
        film.style.transform =
          scale === 1 && x === 0 && y === 0
            ? ""
            : `translate3d(${format(x * 100)}%, ${format(y * 100)}%, 0) scale(${format(scale)})`;
        let mask = "";
        const portal = entry.film.seam.portal;
        if (entry.window && portal && opacity > 0) {
          const { vw, vh } = viewport;
          // What moves inside the pupil (this film, the title) follows the
          // scroll's own time and the pupil's path with its wobble averaged
          // out, so it glides; the cut follows the frame the outer film is
          // actually showing, so it stays on the pupil's rim.
          const motion = windowGeometry(
            entry.window.outer,
            portal,
            entry.window.outerTime,
            vw,
            vh,
            true,
          );
          const pupil = windowGeometry(
            entry.window.outer,
            portal,
            controllers[index - 1]?.presentedTime ?? entry.window.outerTime,
            vw,
            vh,
          );
          film.style.transform = `translate3d(${format(motion.x - vw / 2)}px, ${format(motion.y - vh / 2)}px, 0) scale(${format(motion.scale)})`;
          // In the film's own coordinates: a soft disc around its centre,
          // inside the element on any screen shape (so the film's edges
          // never show), that opens up as it arrives, cut to the pupil,
          // whose rim it melts into.
          const disc =
            Math.min(vw, vh) * 0.46 +
            Math.hypot(vw, vh) * 1.2 * smoothstep(0.86, 1, motion.near);
          const radius = pupil.radius / motion.scale;
          const cx = (pupil.cx - motion.x) / motion.scale + vw / 2;
          const cy = (pupil.cy - motion.y) / motion.scale + vh / 2;
          mask =
            `radial-gradient(circle ${disc.toFixed(1)}px at 50% 50%, #000 ${(disc * 0.5).toFixed(1)}px, transparent ${disc.toFixed(1)}px), ` +
            `radial-gradient(circle ${radius.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px, #000 ${(radius * 0.9).toFixed(1)}px, transparent ${radius.toFixed(1)}px)`;
          frame.stage.window = motion;
        }
        if (masks[index] !== mask) {
          masks[index] = mask;
          film.style.maskImage = mask;
          film.style.setProperty("-webkit-mask-image", mask);
          // Both layers must hold: the disc and the pupil.
          film.style.maskComposite = mask ? "intersect" : "";
          film.style.setProperty(
            "-webkit-mask-composite",
            mask ? "source-in" : "",
          );
        }
        video.style.visibility = videoOpacity > 0 ? "visible" : "hidden";
        video.style.opacity = videoOpacity >= 1 ? "" : format(videoOpacity);
        const focusTime = controller.presentedTime ?? entry.time;
        const position = `${(focusAt(entry.film, focusTime, aspect) * 100).toFixed(2)}% 50%`;
        video.style.objectPosition = position;
        still.style.backgroundPosition = position;
      });
      if (fading) requestSceneFrame();

      // The cover's blurred placeholder gives way once the first film is
      // on screen.
      if (shown[0] >= 1 && root.dataset.videoReady !== "true") {
        root.dataset.videoReady = "true";
      }
    }, 0);

    return () => {
      unsubscribe();
      window.clearTimeout(settleTimer);
      window.clearTimeout(releaseTimer);
      window.clearTimeout(navigationTimer);
      document.removeEventListener("click", onNavigate, true);
      controllers.forEach((controller) => controller?.dispose());
      layers.forEach((_, index) => registerFilmVideo(index, null));
    };
  }, []);

  return (
    <div className="film-layer">
      {FILMS.map((film, index) => (
        <div
          key={film.id}
          ref={(element) => {
            filmRefs.current[index] = element;
          }}
          className="film"
          style={{ visibility: "hidden" }}
        >
          <div className="film-still" />
          <video
            className="film-video"
            style={{ visibility: "hidden" }}
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            tabIndex={-1}
          />
        </div>
      ))}
    </div>
  );
};

export default FilmLayer;
