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
 * The parts of a block that arrive one after another: headings, lines,
 * list items, buttons, anything marked `film-part`. A container marked
 * `film-parts` is not a part itself; its `film-part` children are.
 */
const PART_SELECTOR = [
  ".film-part",
  ".film-copy > :not(.film-parts, .film-list, .stage-capabilities, .stage-work-list, .stage-skills, .film-actions)",
  ".film-list > li",
  ".stage-capabilities > li",
  ".stage-work-list > li",
  ".stage-skills > *",
  ".film-actions > *",
].join(", ");

/** How far a part rises as it arrives (px). */
const PART_RISE = 22;

type Part = {
  element: HTMLElement;
  /** Its top in the section (px), ignoring transforms. */
  top: number;
  /** Arrives this much later (viewport heights), e.g. the words of a line. */
  delay: number;
  /** Last value written (0–1). */
  shown: number;
};

type Block = {
  element: HTMLElement;
  mark: boolean;
  parts: Part[];
  top: number;
  height: number;
};

/** An element's top inside `ancestor`, through the offset parents. */
const offsetWithin = (element: HTMLElement, ancestor: HTMLElement) => {
  let top = 0;
  let node: HTMLElement | null = element;
  while (node && node !== ancestor) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
};

/**
 * One stage of the journey: a tall section whose scroll distance drives a
 * film, with its content blocks in normal document flow (readable, focusable
 * and searchable at any pace). Each part of a block arrives as it rises into
 * the lower part of the screen — word by word, line by line, item by item,
 * as the film goes on behind it — and the block fades as it leaves at the
 * top. With reduced motion everything simply stays visible.
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
  const blocksRef = useRef<Block[]>([]);
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
        parts: Array.from(
          element.querySelectorAll<HTMLElement>(PART_SELECTOR),
        ).map((part) => ({
          element: part,
          top: offsetWithin(part, section),
          delay: Number(part.dataset.delay ?? 0),
          shown: -1,
        })),
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
        parts.forEach((part) => {
          if (part.shown === 1) return;
          part.shown = 1;
          part.element.style.opacity = "";
          part.element.style.transform = "";
        });
        return;
      }
      // Viewport position of the block's top and bottom edges: it arrives
      // over the lower half of the screen and leaves softly at the top.
      const blockTop = frame.top + top - y;
      const blockBottom = blockTop + height;
      const enter = smoothstep(vh * 1.0, vh * 0.5, blockTop);
      const leave = smoothstep(vh * 0.0, vh * 0.34, blockBottom);
      element.style.setProperty(
        "--reveal",
        enter >= 0.999 ? "1" : enter.toFixed(3),
      );
      if (!parts.length) {
        const visible = Math.min(enter, leave);
        element.style.opacity = visible >= 0.999 ? "" : visible.toFixed(3);
        element.style.transform =
          enter >= 0.999
            ? ""
            : `translate3d(0, ${((1 - enter) * 40).toFixed(1)}px, 0)`;
        return;
      }
      element.style.opacity = leave >= 0.999 ? "" : leave.toFixed(3);
      // Each part arrives as it rises from the bottom edge of the screen to
      // about a quarter of the way up.
      parts.forEach((part) => {
        const partTop = frame.top + part.top - y + part.delay * vh;
        const shown =
          Math.round(smoothstep(vh * 0.98, vh * 0.74, partTop) * 100) / 100;
        if (shown === part.shown) return;
        part.shown = shown;
        const style = part.element.style;
        style.opacity = shown >= 1 ? "" : String(shown);
        style.transform =
          shown >= 1
            ? ""
            : `translate3d(0, ${((1 - shown) * PART_RISE).toFixed(1)}px, 0)`;
      });
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
