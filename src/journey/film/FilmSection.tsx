import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
  type Ref,
  type RefObject,
} from "react";
import { isWideLayout, prefersReducedMotion } from "../device";
import { easeOutCubic, range, smoothstep } from "../math";
import { readViewport } from "../scrollTimeline";
import { useScene } from "../useScene";
import type { FilmId } from "./films";
import {
  removeFilmSection,
  updateFilmSection,
  type Cue as TimelineCue,
} from "./filmTimeline";
import { holdProgress } from "./holdProgress";
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

/** How long a block stays on screen by default (viewport heights of scroll). */
const DEFAULT_HOLD = 90;

type CueProps = {
  /**
   * Film time (s) in the middle of the block's time on screen. Without it
   * the block follows the film without steering it.
   */
  at?: number;
  children: ReactNode;
  className?: string;
  /** The block's anchor, for links (placed so a link lands mid-hold). */
  id?: string;
  /** Where the block sits across the screen. */
  align?: "start" | "center" | "end";
  /**
   * How long the block stays in place, in viewport heights of scroll, on
   * wide screens and on narrow ones.
   */
  hold?: number;
  holdNarrow?: number;
  /** The block's place in the page (its hold), for the navigation. */
  ref?: Ref<HTMLDivElement>;
};

/**
 * A block of real content tied to a moment in the film. It does not scroll
 * past like a credit roll: it waits out of sight, comes in where it stands
 * on the screen the way the question in the pupil does, stays there for
 * `hold` of scrolling while the film goes on behind it, and passes the
 * camera. Its place in the page (the hold) keeps the document order, the
 * anchor and the scroll distance.
 */
export const Cue = ({
  at,
  children,
  className,
  id,
  align = "start",
  hold = DEFAULT_HOLD,
  holdNarrow,
  ref,
}: CueProps) => (
  <div
    ref={ref}
    className="film-hold"
    data-cue={at}
    data-hold={hold}
    data-hold-narrow={holdNarrow ?? hold}
    style={
      {
        "--hold": `${hold}vh`,
        "--hold-narrow": `${holdNarrow ?? hold}vh`,
      } as CSSProperties
    }
  >
    {id ? <span id={id} className="film-anchor" aria-hidden="true" /> : null}
    <div
      className={`film-cue film-cue--${align} reveal-item${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
    <div className="film-hold-space" aria-hidden="true" />
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
 * The parts of a block, whose opacity carries its fading (the block itself
 * must not, see film.css): headings, lines, list items, buttons, anything
 * marked `film-part`. A container marked `film-parts` is not a part itself;
 * its `film-part` children are. In a block that scrolls with the page, each
 * part fades in and out on its own, where it is on the screen.
 */
const PART_SELECTOR = [
  ".film-part",
  ".film-copy > :not(.film-parts, .film-list, .stage-work-list, .stage-skills, .film-actions)",
  ".film-list > li",
  ".stage-work-list > li",
  ".stage-skills > *",
  ".film-actions > *",
  ".about-card > *",
].join(", ");

/** Room kept clear above a held block for the navigation (px). */
const NAV_ROOM = 80;
/** A held block must leave this much of the screen free (px): room for
 * the navigation and a phone's toolbars. Taller blocks scroll instead. */
const SCREEN_MARGIN = 100;
/**
 * A held block comes and goes like the question in the pupil (see
 * PortalTitle): over the first `ARRIVE` of its hold it fades in, settling
 * down into place from a little above as it grows to its size; it stays;
 * and over the last `PASS` it passes the camera, growing as it fades — less
 * than the question does: a large block that grows much makes the GPU draw
 * it again at the new size in the middle of the scroll.
 */
const ARRIVE = 0.2;
const PASS = 0.2;

type Part = {
  element: HTMLElement;
  /** Its top in the section (px) and its height, for blocks that scroll. */
  top: number;
  height: number;
  /** Last opacity written (0–1); -1 = none yet. */
  opacity: number;
};

type Block = {
  element: HTMLElement;
  hold: HTMLElement | null;
  mark: boolean;
  parts: Part[];
  /** Top of its hold in the section (px), and the block's height. */
  top: number;
  height: number;
  /** Scroll it stays in place (px); 0 when it scrolls with the page. */
  holdPx: number;
  /** Where it stands on the screen while held (px from the top). */
  pin: number;
  /** Last veil and transform written; -1 / "" = none yet. */
  veil: number;
  transform: string;
  /** Whether it takes clicks: not while it is out of sight. */
  touchable: boolean;
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
 * film, with its content blocks in document order (readable, focusable and
 * searchable at any pace). Each block holds still on the screen for its
 * stretch of the scroll while the film plays behind it: it fades in as one,
 * settling into place, stays, and passes the camera, and its veil (see
 * film.css) softens the film behind it. A block too tall for the screen
 * scrolls with the page instead, fading in and out at the edges. With
 * reduced motion everything simply stays visible, in the page's flow.
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

  // Measure and place the blocks whenever layout changes, so the scroll
  // scene never has to read layout.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const measure = () => {
      const { vh } = readViewport();
      const narrow = !isWideLayout();
      const reduced = prefersReducedMotion();
      const elements = Array.from(
        section.querySelectorAll<HTMLElement>(".film-cue, .film-mark"),
      );
      // Sizes first: holding a block does not change its size.
      const blocks: Block[] = elements.map((element) => {
        const mark = element.classList.contains("film-mark");
        const hold = mark
          ? null
          : (element.parentElement as HTMLElement | null);
        const height = element.offsetHeight;
        const held =
          !!hold && !reduced && height <= vh - SCREEN_MARGIN && vh > 0;
        const holdVh = hold
          ? Number(narrow ? hold.dataset.holdNarrow : hold.dataset.hold)
          : 0;
        return {
          element,
          hold,
          mark,
          parts: [],
          top: 0,
          height,
          holdPx: held ? (holdVh * vh) / 100 : 0,
          // Centred in the room below the navigation, a little high.
          pin: held
            ? Math.max(NAV_ROOM, Math.round((vh - height) / 2 - 10))
            : 0,
          veil: -1,
          transform: "",
          touchable: true,
        };
      });
      // Then place them: a held block is sticky at its pin, and its hold
      // takes only the scroll it is held for (the block's own height is
      // given back below it, where the next one is still out of sight).
      blocks.forEach(({ element, hold, holdPx, pin, height }) => {
        if (!hold) return;
        const held = holdPx > 0;
        element.classList.toggle("film-cue--held", held);
        element.style.top = held ? `${pin}px` : "";
        hold.classList.toggle("film-hold--flow", !held);
        hold.style.marginBottom = held ? `${-height}px` : "";
      });
      // Positions last, once the page has taken its new shape.
      blocks.forEach((block) => {
        const { element, hold, mark } = block;
        block.top = offsetWithin(mark ? element : hold!, section);
        block.parts = mark
          ? []
          : Array.from(
              element.querySelectorAll<HTMLElement>(PART_SELECTOR),
            ).map((part) => ({
              element: part,
              top: offsetWithin(part, section),
              height: part.offsetHeight,
              opacity: -1,
            }));
        // A link lands in the middle of the hold (anchors scroll to 28vh
        // above themselves, see film.css).
        const anchor = hold?.querySelector<HTMLElement>(
          ":scope > .film-anchor",
        );
        if (anchor) {
          anchor.style.top = block.holdPx
            ? `${Math.round(vh * 0.28 - block.pin + block.holdPx / 2)}px`
            : "0px";
        }
      });
      blocksRef.current = blocks;
      // The film is at a block's time in the middle of its hold (for a block
      // that scrolls: as its centre crosses the middle of the screen).
      const cues: TimelineCue[] = blocks
        .map((block) => {
          const source = block.mark ? block.element : block.hold!;
          const time = source.dataset.cue;
          if (time === undefined) return null;
          // The timeline puts a cue where `offset` crosses mid-screen.
          const offset = block.holdPx
            ? block.top - block.pin + block.holdPx / 2 + vh / 2
            : block.top + block.height / 2;
          return { offset, time: Number(time) };
        })
        .filter((cue): cue is TimelineCue => cue !== null);
      updateFilmSection(film, { cues, height: section.offsetHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    section
      .querySelectorAll<HTMLElement>(".film-cue")
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
    // As the eased scroll position sees it, so wheels that scroll in steps
    // still fade smoothly.
    const { smoothY: y, vh } = frame.viewport;
    blocksRef.current.forEach((block) => {
      const { element, mark, parts, top, height, holdPx, pin } = block;
      if (mark) return;
      if (reduced) {
        element.style.removeProperty("--veil");
        block.veil = -1;
        element.style.transform = "";
        element.style.pointerEvents = "";
        block.transform = "";
        block.touchable = true;
        holdProgress.set(element, 1);
        parts.forEach((part) => {
          if (part.opacity === 1) return;
          part.opacity = 1;
          part.element.style.opacity = "";
        });
        return;
      }
      const held = holdPx > 0;
      // Held: how far through its time in place it is. Scrolling with the
      // page: where it is on the screen.
      const progress = (y - (frame.top + top - pin)) / (holdPx || 1);
      const blockTop = frame.top + top - y;
      holdProgress.set(
        element,
        held ? progress : (vh - blockTop) / (vh + height),
      );
      // Held: the whole block comes, stays and goes as one (the veil and
      // every part share its opacity; the block itself carries the motion,
      // never the opacity, which would cut the veil off from the films).
      const reveal = range(progress, 0, ARRIVE);
      const pass = range(progress, 1 - PASS, 1);
      const settled = easeOutCubic(reveal);
      const heldOpacity =
        smoothstep(0, 1, reveal) * (1 - smoothstep(0.05, 0.6, pass));
      const veil = held
        ? heldOpacity
        : Math.min(
            smoothstep(vh, vh * 0.5, blockTop),
            smoothstep(0, vh * 0.34, blockTop + height),
          );
      // In steps of 2 %: every change restyles the whole block.
      const steppedVeil = Math.round(veil * 50) / 50;
      if (steppedVeil !== block.veil) {
        block.veil = steppedVeil;
        element.style.setProperty("--veil", String(steppedVeil));
      }
      const transform =
        held && heldOpacity > 0
          ? `translate3d(0, ${(-(1 - settled) * vh * 0.05).toFixed(1)}px, 0) scale(${(0.94 + 0.06 * settled + 0.25 * pass * pass).toFixed(4)})`
          : "";
      if (transform !== block.transform) {
        block.transform = transform;
        element.style.transform = transform;
      }
      // Out of sight, it must not catch the clicks meant for the block on
      // screen (it may lie over it while it slides in or away).
      const touchable = veil > 0.05;
      if (touchable !== block.touchable) {
        block.touchable = touchable;
        element.style.pointerEvents = touchable ? "" : "none";
      }
      parts.forEach((part) => {
        let shown: number;
        if (held) {
          shown = heldOpacity;
        } else {
          // In over the lower part of the screen, out under the navigation.
          const partTop = frame.top + part.top - y;
          shown = Math.min(
            smoothstep(vh * 0.98, vh * 0.74, partTop),
            smoothstep(vh * 0.04, vh * 0.22, partTop + part.height),
          );
        }
        const opacity = Math.round(shown * 100) / 100;
        if (opacity === part.opacity) return;
        part.opacity = opacity;
        part.element.style.opacity = opacity >= 1 ? "" : String(opacity);
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
