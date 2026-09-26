import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
  type Ref,
  type RefObject,
} from "react";
import { prefersReducedMotion } from "../device";
import { smoothstep } from "../math";
import { useScene } from "../useScene";
import type { FilmId } from "./films";
import {
  removeFilmSection,
  updateFilmSection,
  type Cue as TimelineCue,
} from "./filmTimeline";
import "./film.css";

type Spacing = {
  /** Height in viewport heights on wide screens … */
  vh: number;
  /** … and on narrow ones (defaults to the wide value). */
  narrow?: number;
};

const spacingStyle = ({ vh, narrow }: Spacing) =>
  ({
    "--space": `${vh}vh`,
    "--space-narrow": `${narrow ?? vh}vh`,
  }) as CSSProperties;

/** Empty scroll distance: room for the film on its own. */
export const Space = (spacing: Spacing) => (
  <div
    className="film-space"
    style={spacingStyle(spacing)}
    aria-hidden="true"
  />
);

/** A moment in the film pinned to this point of the scroll, with no content. */
export const Mark = ({ at }: { at: number }) => (
  <div className="film-mark" data-cue={at} aria-hidden="true" />
);

type CueProps = {
  /**
   * Film time (s) at which this block's centre crosses mid-screen. Without
   * it the block follows the film without steering it.
   */
  at?: number;
  children: ReactNode;
  className?: string;
  id?: string;
  /** Where the block sits across the screen. */
  align?: "start" | "center" | "end";
  ref?: Ref<HTMLDivElement>;
};

/** A block of real content tied to a moment in the film. */
export const Cue = ({
  at,
  children,
  className,
  id,
  align = "start",
  ref,
}: CueProps) => (
  <div
    ref={ref}
    id={id}
    className={`film-cue film-cue--${align} reveal-item${className ? ` ${className}` : ""}`}
    data-cue={at}
  >
    {children}
  </div>
);

type FilmSectionProps = {
  film: FilmId;
  children: ReactNode;
  className?: string;
  id?: string;
  /**
   * The section's name. Without one the stage is a plain wrapper, for
   * content that brings its own sections.
   */
  labelledBy?: string;
  label?: string;
  /** Empty distance before the first block and after the last one. */
  lead: Spacing;
  tail: Spacing;
};

/**
 * One stage of the journey: a tall section whose scroll distance drives a
 * film, with its content blocks in normal document flow (readable, focusable
 * and searchable at any pace). Blocks fade in as they enter and out as they
 * leave; with reduced motion they simply stay visible.
 */
const FilmSection = ({
  film,
  children,
  className,
  id,
  labelledBy,
  label,
  lead,
  tail,
}: FilmSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const blocksRef = useRef<
    Array<{
      element: HTMLElement;
      mark: boolean;
      /** Its parts arrive one after another (see `film.css`). */
      parts: boolean;
      top: number;
      height: number;
    }>
  >([]);
  const nearRef = useRef(true);

  // Measure the blocks relative to the section whenever layout changes, so
  // the scroll scene never has to read layout.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const measure = () => {
      // Blocks that move on their own (data-motion) are left alone.
      const blocks = Array.from(
        section.querySelectorAll<HTMLElement>(
          ".film-cue:not([data-motion]), .film-mark",
        ),
      );
      blocksRef.current = blocks.map((element) => ({
        mark: element.classList.contains("film-mark"),
        parts: element.querySelector(".film-copy") !== null,
        element,
        top: element.offsetTop,
        height: element.offsetHeight,
      }));
      const cues: TimelineCue[] = blocksRef.current
        .filter(({ element }) => element.dataset.cue !== undefined)
        .map(({ element, top, height }) => ({
          offset: top + height / 2,
          time: Number(element.dataset.cue),
        }));
      updateFilmSection(film, { cues, height: section.offsetHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    section
      .querySelectorAll<HTMLElement>(".film-cue:not([data-motion])")
      .forEach((block) => observer.observe(block));
    return () => {
      observer.disconnect();
      removeFilmSection(film);
    };
  }, [film]);

  useScene(sectionRef, (frame) => {
    updateFilmSection(film, { top: frame.top, height: frame.height });
    // Far from the screen every block is simply hidden: settle them once,
    // then skip the section until it comes near again.
    if (!frame.near && !nearRef.current) return;
    nearRef.current = frame.near;
    const reduced = prefersReducedMotion();
    // Where the block is, as the eased scroll position sees it, so wheels
    // that scroll in steps still fade it smoothly.
    const { smoothY: y, vh } = frame.viewport;
    blocksRef.current.forEach(({ element, mark, parts, top, height }) => {
      if (mark) return;
      if (reduced) {
        element.style.opacity = "";
        element.style.transform = "";
        element.style.removeProperty("--reveal");
        return;
      }
      // Viewport position of the block's top and bottom edges: it arrives
      // over the lower half of the screen and leaves softly at the top.
      const blockTop = frame.top + top - y;
      const blockBottom = blockTop + height;
      const enter = smoothstep(vh * 1.0, vh * 0.5, blockTop);
      const leave = smoothstep(vh * 0.0, vh * 0.34, blockBottom);
      const visible = parts ? leave : Math.min(enter, leave);
      element.style.opacity = visible >= 0.999 ? "" : visible.toFixed(3);
      element.style.setProperty(
        "--reveal",
        enter >= 0.999 ? "1" : enter.toFixed(3),
      );
      element.style.transform =
        enter >= 0.999
          ? ""
          : `translate3d(0, ${((1 - enter) * 40).toFixed(1)}px, 0)`;
    });
  });

  const classes = `film-section film-section--${film} reveal-guard${className ? ` ${className}` : ""}`;
  if (!labelledBy && !label) {
    return (
      <div
        ref={sectionRef as RefObject<HTMLDivElement | null>}
        id={id}
        className={classes}
      >
        <Space {...lead} />
        {children}
        <Space {...tail} />
      </div>
    );
  }
  return (
    <section
      ref={sectionRef}
      id={id}
      className={classes}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
    >
      <Space {...lead} />
      {children}
      <Space {...tail} />
    </section>
  );
};

export default FilmSection;
