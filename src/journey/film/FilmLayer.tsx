import { useEffect, useRef } from "react";
import { onDirectorFrame } from "../director/director";
import { filmRect, focusAt, windowGeometry } from "../director/frameMapping";
import { hasFinePointer } from "../device";
import { isModestConnection, wantsLightVideo } from "../../utils/connection";
import { smoothstep } from "../math";
import { requestSceneFrame } from "../scrollTimeline";
import { registerFilmVideo } from "./filmElements";
import { createFilmDebug } from "./filmDebug";
import { FILMS, PORTRAIT_ASPECT } from "./films";
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
 * time), so the overlays drawn after it line up with the picture rather than
 * with where the scroll will take it.
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
    const layers = filmRefs.current.map((film) => {
      if (!film) return null;
      const [video, spare] = Array.from(film.querySelectorAll("video"));
      return {
        film,
        still: film.querySelector<HTMLElement>(".film-still")!,
        video,
        spare,
      };
    });
    layers.forEach((layer, index) =>
      registerFilmVideo(index, layer?.video ?? null),
    );
    // A film that becomes ready re-evaluates the frame even when the page
    // is not scrolling.
    // On phones a film plays while the scroll goes forward (see ScrubVideo):
    // their decoders play smoothly but seek slowly.
    const playForward = !hasFinePointer();
    const controllers = layers.map((layer) =>
      layer
        ? new ScrubVideo(layer.video, requestSceneFrame, { playForward })
        : null,
    );
    const spareControllers = layers.map((layer) =>
      layer ? new ScrubVideo(layer.spare, requestSceneFrame) : null,
    );
    const loadedAt: Array<number | null> = FILMS.map(() => null);
    const farSince: Array<number | null> = FILMS.map(() => null);
    // The still a film shows while its video is not ready: the poster
    // nearest before the time the scroll asks for (see `posters`).
    const stills: Array<"none" | "loading" | "ready"> = FILMS.map(() => "none");
    const stillUrls: Array<string | null> = FILMS.map(() => null);
    const waiting = FILMS.map(() => false);
    const filmFade = FILMS.map(() => 0);
    const videoShown = FILMS.map(() => false);
    const videoFade = FILMS.map(() => 0);
    const opacities = FILMS.map(() => 0);
    const masks = FILMS.map(() => "");
    const blends = FILMS.map(() => "");
    const filters = FILMS.map(() => "");
    const unloadFar = !hasFinePointer();
    // A phone held upright gets the portrait encodes: the window of the
    // frame it shows, as sharp as full HD and a third of the pixels to
    // decode, so it scrubs smoothly (see films.ts). Other screens get full
    // HD — on a connection known to be modest the lighter encode first,
    // which arrives fast, full HD taking over after the visitor scrolls
    // and the background download finishes (see `upgrade`). Saved data,
    // slow connections and very small memories stay with the lighter encodes.
    const light = wantsLightVideo();
    const wideRendition = light || isModestConnection() ? "sd" : "hd";
    const upgradeTo = !light && wideRendition === "sd" ? "hd" : null;
    type Rendition = "sd" | "hd" | "portrait";
    const renditions: Rendition[] = FILMS.map(() => wideRendition);
    // Whether the screen is that narrow (known from the first frame on).
    let portrait: boolean | null = null;
    // `?debug=film`: how the film on screen is doing, on the device itself.
    const debug =
      new URLSearchParams(window.location.search).get("debug") === "film"
        ? createFilmDebug()
        : null;
    const upgrades: Array<{
      abort: AbortController;
      url: string | null;
    } | null> = FILMS.map(() => null);
    // A move to full HD that failed is not tried again for that film.
    const upgradeFailed = FILMS.map(() => false);
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

    const posterAt = (index: number, time: number, reduced: boolean) => {
      const film = FILMS[index];
      if (reduced || !film.posters) return film.poster;
      let url = film.poster;
      film.posters.forEach(([from, poster]) => {
        if (time >= from) url = poster;
      });
      return url;
    };

    const loadStill = (index: number, url: string) => {
      const still = layers[index]?.still;
      if (!still || stillUrls[index] === url) return;
      stillUrls[index] = url;
      stills[index] = "loading";
      const image = new Image();
      image.onload = () => {
        if (stillUrls[index] !== url) return;
        still.style.backgroundImage = `url("${url}")`;
        stills[index] = "ready";
        requestSceneFrame();
      };
      image.onerror = () => {
        if (stillUrls[index] !== url) return;
        stillUrls[index] = null;
        stills[index] = "none";
      };
      image.src = url;
    };

    // Each film is downloaded whole before the video element gets it (as a
    // blob URL), so every seek lands on frames already in memory. Streamed
    // with range requests instead, a phone browser fetches the bytes of a
    // seek only when it is asked for them, and the picture stalls while the
    // visitor scrolls.
    const downloads = FILMS.map(() => ({
      url: null as string | null,
      abort: null as AbortController | null,
    }));

    /**
     * The whole film as a blob, telling how much of it has arrived (the
     * page's loader shows it for the first film, see index.html).
     */
    const readFilm = async (response: Response, index: number) => {
      const total = Number(response.headers.get("content-length")) || 0;
      if (!response.body || !total) return response.blob();
      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let loaded = 0;
      let told = -1;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        const progress = Math.min(1, loaded / total);
        if (progress - told >= 0.01 || progress === 1) {
          told = progress;
          window.dispatchEvent(
            new CustomEvent("filmprogress", { detail: { index, progress } }),
          );
        }
      }
      return new Blob(chunks as BlobPart[], {
        type: response.headers.get("content-type") ?? "video/mp4",
      });
    };

    const load = (index: number) => {
      const video = layers[index]?.video;
      if (!video || loadedAt[index] !== null) return;
      loadedAt[index] = performance.now();
      renditions[index] = portrait ? "portrait" : wideRendition;
      const source = FILMS[index].src[renditions[index]];
      const controller = new AbortController();
      downloads[index].abort = controller;
      const attach = (src: string) => {
        video.preload = "auto";
        video.src = src;
        video.load();
        requestSceneFrame();
      };
      fetch(source, { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error(`${response.status}`);
          return readFilm(response, index);
        })
        .then((blob) => {
          if (loadedAt[index] === null || controller.signal.aborted) return;
          const url = URL.createObjectURL(blob);
          downloads[index].url = url;
          attach(url);
        })
        .catch(() => {
          // Without the whole file, stream it after all.
          if (loadedAt[index] === null || controller.signal.aborted) return;
          attach(source);
        });
      window.setTimeout(requestSceneFrame, NEIGHBOUR_DELAY + 50);
    };

    const release = (index: number) => {
      const download = downloads[index];
      download.abort?.abort();
      if (download.url) URL.revokeObjectURL(download.url);
      downloads[index] = { url: null, abort: null };
    };

    const empty = (video: HTMLVideoElement) => {
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.style.visibility = "hidden";
    };

    const cancelUpgrade = (index: number) => {
      const upgrade = upgrades[index];
      if (!upgrade) return;
      upgrade.abort.abort();
      if (upgrade.url) URL.revokeObjectURL(upgrade.url);
      upgrades[index] = null;
      const spare = layers[index]?.spare;
      if (spare) empty(spare);
    };

    const unload = (index: number) => {
      const video = layers[index]?.video;
      if (!video || loadedAt[index] === null) return;
      loadedAt[index] = null;
      empty(video);
      release(index);
      cancelUpgrade(index);
      renditions[index] = wideRendition;
    };

    /**
     * The move to full HD, for the film being watched, one at a time: the
     * full-HD file is downloaded whole into the spare video, which is then
     * driven with the film; once it shows the same frame, it fades in over
     * the lighter one, which is let go.
     */
    const upgrade = (index: number) => {
      const layer = layers[index];
      if (!layer || !upgradeTo || upgrades[index]) return;
      if (upgrades.some(Boolean)) return;
      const source = FILMS[index].src[upgradeTo];
      const abort = new AbortController();
      const record: { abort: AbortController; url: string | null } = {
        abort,
        url: null,
      };
      upgrades[index] = record;
      fetch(source, { signal: abort.signal })
        .then((response) => {
          if (!response.ok) throw new Error(`${response.status}`);
          return response.blob();
        })
        .then((blob) => {
          if (upgrades[index] !== record || abort.signal.aborted) return;
          record.url = URL.createObjectURL(blob);
          layer.spare.preload = "auto";
          layer.spare.src = record.url;
          layer.spare.load();
          requestSceneFrame();
        })
        .catch(() => {
          // It stays with the lighter encode.
          if (upgrades[index] !== record) return;
          upgrades[index] = null;
          upgradeFailed[index] = !abort.signal.aborted;
        });
    };

    /** The spare shows the film's frame: it takes over. */
    const takeOver = (index: number, now: number) => {
      const layer = layers[index]!;
      const record = upgrades[index]!;
      const old = layer.video;
      const oldDownload = downloads[index];
      layer.video = layer.spare;
      layer.spare = old;
      [controllers[index], spareControllers[index]] = [
        spareControllers[index],
        controllers[index],
      ];
      layer.video.style.zIndex = "1";
      old.style.zIndex = "";
      downloads[index] = { url: record.url, abort: record.abort };
      upgrades[index] = null;
      renditions[index] = upgradeTo!;
      registerFilmVideo(index, layer.video);
      // The new one fades in over the old one, which then goes.
      videoFade[index] = now;
      window.setTimeout(() => {
        if (layers[index]?.spare !== old) return;
        empty(old);
        if (oldDownload.url) URL.revokeObjectURL(oldDownload.url);
      }, READY_FADE + 80);
    };

    const isReady = (index: number) => controllers[index]?.ready ?? false;

    const unsubscribe = onDirectorFrame((frame) => {
      const { viewport, timeline, reduced, now } = frame;
      // Turned between upright and wide: a film loaded for the other shape
      // loads again for this one.
      const upright =
        viewport.vw / Math.max(1, viewport.vh) <= PORTRAIT_ASPECT + 0.001;
      if (upright !== portrait) {
        const turned = portrait !== null;
        portrait = upright;
        if (turned) {
          renditions.forEach((rendition, index) => {
            if (
              loadedAt[index] !== null &&
              (rendition === "portrait") !== upright
            ) {
              unload(index);
            }
          });
        }
      }
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
          loadStill(index, posterAt(index, films[index]?.time ?? 0, reduced));
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

      // Let the first picture finish without competing with a full-HD copy.
      // Once the visitor scrolls, the usual upgrade can run.
      if (upgradeTo && !reduced && !inTransit && viewport.y > 0) {
        const settled = films.every(
          (_, index) =>
            Math.abs(index - focus) > 1 ||
            loadedAt[index] === null ||
            isReady(index),
        );
        if (
          settled &&
          !upgradeFailed[focus] &&
          renditions[focus] === "sd" &&
          loadedAt[focus] !== null &&
          isReady(focus)
        ) {
          upgrade(focus);
        }
      }
      // A download for a film the visitor has left gives way to the films
      // they are heading for.
      upgrades.forEach((record, index) => {
        if (record && !record.url && index !== focus) cancelUpgrade(index);
      });
      upgrades.forEach((record, index) => {
        const entry = films[index];
        const spare = spareControllers[index];
        if (!record?.url || !entry || !spare) return;
        spare.setTarget(entry.time);
        const primary = controllers[index]?.presentedTime;
        const next = spare.presentedTime;
        if (
          spare.ready &&
          next !== null &&
          (primary == null || Math.abs(next - primary) < 0.06)
        ) {
          takeOver(index, now);
        } else {
          requestSceneFrame();
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
          // Seen through a window: only once it has the right frame, fading
          // in as the window opens.
          value = isReady(index) ? entry.opacity : 0;
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
        // The shift is in fractions of the film's frame as displayed, so a
        // seam lines up on any screen shape.
        const { scale, x, y } = entry.transform;
        const frameRect = filmRect(
          entry.film,
          entry.time,
          viewport.vw,
          viewport.vh,
        );
        film.style.transform =
          scale === 1 && x === 0 && y === 0
            ? ""
            : `translate3d(${format(x * frameRect.width)}px, ${format(y * frameRect.height)}px, 0) scale(${format(scale)})`;
        // Out of focus across a softened seam. The blur is drawn before the
        // film is scaled, so it is divided by the scale to be as soft on
        // screen as the seam asks.
        const radius = reduced ? 0 : (entry.blur * frameRect.height) / scale;
        const filter = radius >= 0.3 ? `blur(${radius.toFixed(1)}px)` : "";
        if (filters[index] !== filter) {
          filters[index] = filter;
          film.style.filter = filter;
        }
        let mask = "";
        const portal = entry.film.seam.portal;
        if (entry.window && portal && opacity > 0) {
          const { vw, vh } = viewport;
          // The film seen through the pupil follows the scroll's own time
          // and the pupil's path with its wobble averaged out, so it glides;
          // the cut follows the frame the outer film is actually showing, so
          // it stays on the pupil's rim.
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
        }
        // Seen through the pupil, the neural film adds its light to the
        // chase instead of covering it: its black void leaves the pupil's
        // own dark reflections as they are, so there is no edge between
        // the two films, only the spark and the nebula glowing inside the
        // eye. The chase ends on black, where this is the same as covering.
        const blend = mask ? "screen" : "";
        if (blends[index] !== blend) {
          blends[index] = blend;
          film.style.mixBlendMode = blend;
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
      // The page's loader (index.html) goes once the film at the scroll's
      // place plays.
      if (
        root.dataset.filmReady !== "true" &&
        !reduced &&
        isReady(current) &&
        shown[current] >= 1
      ) {
        root.dataset.filmReady = "true";
      }
      if (debug) {
        const index = Math.max(0, current);
        const layer = layers[index];
        const controller = controllers[index];
        if (layer && controller) {
          debug.frame(now, {
            film: FILMS[index].id,
            rendition: renditions[index],
            video: layer.video,
            stats: controller.stats,
          });
        }
      }
    }, 0);

    return () => {
      unsubscribe();
      debug?.dispose();
      window.clearTimeout(settleTimer);
      window.clearTimeout(releaseTimer);
      window.clearTimeout(navigationTimer);
      document.removeEventListener("click", onNavigate, true);
      controllers.forEach((controller) => controller?.dispose());
      spareControllers.forEach((controller) => controller?.dispose());
      upgrades.forEach((_, index) => cancelUpgrade(index));
      layers.forEach((_, index) => registerFilmVideo(index, null));
      downloads.forEach((_, index) => release(index));
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
          {/* The film, and a spare for its move to full HD. */}
          {[0, 1].map((slot) => (
            <video
              key={slot}
              className="film-video"
              style={{ visibility: "hidden" }}
              muted
              playsInline
              preload="none"
              disablePictureInPicture
              disableRemotePlayback
              tabIndex={-1}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilmLayer;
