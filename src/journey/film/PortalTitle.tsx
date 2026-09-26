import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
  type Ref,
} from "react";
import { onDirectorFrame } from "../director/director";
import { pupilCoverTime } from "../director/frameMapping";
import { easeOutCubic, range, smoothstep } from "../math";
import { FILMS, type FilmId } from "./films";
import { getFilmSection } from "./filmTimeline";

/**
 * The fade-in: this share of it happens over the outer film's last moments,
 * once the pupil already covers the screen; the rest over this many seconds
 * of the title's own film.
 */
const REVEAL_SHARE = 0.3;
const REVEAL_SECONDS = 0.4;

type PortalTitleProps = {
  children: ReactNode;
  /** Id and ref of the title's anchor (for links and the scroll spy). */
  id?: string;
  ref?: Ref<HTMLDivElement>;
  className?: string;
  /** The film it belongs to, seen through a window before its section. */
  film: FilmId;
  /** Film times: how long it holds at full size, and when it has passed. */
  hold: readonly [number, number];
  /**
   * How far below the centre of the screen it sits (viewport heights),
   * leaving the film's first spark in view above it.
   */
  below?: number;
};

/**
 * A title that waits in the dark behind a window into its film: while the
 * window opens (the pupil, as the camera moves into the eye) it is not there
 * at all; once the pupil's black covers the whole screen it fades in out of
 * it, coming forward a little, holds for a moment, and then passes the
 * camera as the film goes on.
 *
 * It stays in the document where it belongs (reading order, search), but is
 * drawn fixed to the screen, like the films: it never has to follow the
 * page's scrolling and undo it, so it cannot lag behind or shake. Its place
 * in the flow keeps its height, and its id sits on an anchor above it so
 * links and the scroll spy see where it really is. With reduced motion it is
 * an ordinary block.
 */
const PortalTitle = ({
  film,
  hold,
  below = 0,
  children,
  id,
  className,
  ref,
}: PortalTitleProps) => {
  const placeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef(0);

  // The place in the flow is as tall as the title.
  useLayoutEffect(() => {
    const place = placeRef.current;
    const title = titleRef.current;
    if (!place || !title) return;
    const measure = () => {
      heightRef.current = title.offsetHeight;
      place.style.height = `${heightRef.current}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(title);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    let shown = true;
    const hide = () => {
      if (!shown) return;
      shown = false;
      title.style.visibility = "hidden";
    };
    // When the pupil first covers the screen, for the current screen size.
    let coverSize = "";
    let cover = 0;
    return onDirectorFrame(({ viewport, timeline, reduced }) => {
      const index = timeline.films.findIndex(
        (entry) => entry?.film.id === film,
      );
      const frame = timeline.films[index];
      const section = getFilmSection(film);
      if (reduced) {
        title.style.visibility = "";
        title.style.opacity = "";
        title.style.transform = "";
        shown = true;
        return;
      }
      if (!frame || !section) {
        hide();
        return;
      }
      const { smoothY: y, vw, vh } = viewport;
      const portal = frame.film.seam.portal;
      const outer = FILMS[index - 1];
      const from = frame.film.from ?? 0;
      let reveal = 0;
      if (frame.window && portal && outer) {
        const size = `${vw}x${vh}`;
        if (size !== coverSize) {
          coverSize = size;
          cover = pupilCoverTime(outer, portal, vw, vh);
        }
        reveal =
          REVEAL_SHARE * range(frame.window.outerTime, cover, outer.duration);
      } else if (y >= section.top) {
        reveal =
          REVEAL_SHARE +
          (1 - REVEAL_SHARE) * range(frame.time, from, from + REVEAL_SECONDS);
      }
      const [holdEnd, gone] = hold;
      const pass = smoothstep(holdEnd, gone, frame.time);
      // Gone before the next block comes up under it.
      const opacity =
        smoothstep(0, 1, reveal) * (1 - smoothstep(0.05, 0.6, pass));
      if (opacity <= 0.001) {
        hide();
        return;
      }
      const scale =
        (0.94 + 0.06 * easeOutCubic(reveal)) *
          (1 + 0.05 * smoothstep(from, holdEnd, frame.time)) +
        1.8 * pass * pass;
      // The title is fixed at the top of the screen, full width: move its
      // centre to just below the middle of the screen.
      const dy = vh / 2 + below * vh * scale - heightRef.current / 2;
      if (!shown) {
        shown = true;
        title.style.visibility = "";
      }
      title.style.opacity = opacity >= 0.999 ? "" : opacity.toFixed(3);
      title.style.transform = `translate3d(0, ${dy.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
    });
  }, [film, hold, below]);

  return (
    <>
      <div ref={ref} id={id} className="film-anchor" aria-hidden="true" />
      <div ref={placeRef} className="film-portal" data-motion="own">
        <div
          ref={titleRef}
          className={`film-portal-title${className ? ` ${className}` : ""}`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default PortalTitle;
