import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
  type Ref,
} from "react";
import { onDirectorFrame } from "../director/director";
import { smoothstep } from "../math";
import type { FilmId } from "./films";
import { getFilmSection } from "./filmTimeline";

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
   * How far below the centre of the window it sits at full size (viewport
   * heights), leaving the film's first spark in view above it.
   */
  below?: number;
};

/**
 * A title that lives inside a window into its film: while the window opens
 * (the pupil, as the camera moves into the eye) it sits just below the
 * centre of the film and grows with it; when the window fills the screen it
 * is at full size, holds for a moment, and then passes the camera as the
 * film goes on. Its distance from the centre scales with it, as it would in
 * depth.
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

  // The place in the flow is as tall as the title.
  useLayoutEffect(() => {
    const place = placeRef.current;
    const title = titleRef.current;
    if (!place || !title) return;
    const measure = () => {
      place.style.height = `${title.offsetHeight}px`;
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
    return onDirectorFrame(({ viewport, timeline, reduced, stage }) => {
      const frame = timeline.films.find((entry) => entry?.film.id === film);
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
      const open = stage.window?.content ?? null;
      const { smoothY: y, vw, vh } = viewport;
      let scale = 1;
      let opacity = 0;
      let x = vw / 2;
      let centre = vh / 2;
      if (frame.window && open) {
        scale = open.scale;
        x = open.x;
        centre = open.y;
        opacity = smoothstep(0.05, 0.2, scale);
      } else if (y >= section.top) {
        const [holdEnd, gone] = hold;
        const from = frame.film.from ?? 0;
        const pass = smoothstep(holdEnd, gone, frame.time);
        scale =
          1 + 0.05 * smoothstep(from, holdEnd, frame.time) + 1.8 * pass * pass;
        // Gone before the next block comes up under it.
        opacity = 1 - smoothstep(0.05, 0.6, pass);
      }
      if (opacity <= 0.001) {
        hide();
        return;
      }
      // The title is fixed at the top of the screen, full width: move its
      // centre to where it belongs.
      const dx = x - vw / 2;
      const dy = centre + below * vh * scale - title.offsetHeight / 2;
      if (!shown) {
        shown = true;
        title.style.visibility = "";
      }
      title.style.opacity = opacity >= 0.999 ? "" : opacity.toFixed(3);
      title.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
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
