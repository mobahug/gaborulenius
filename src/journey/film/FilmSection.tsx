import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
  type Ref,
  type RefObject,
} from "react";
import { hasFinePointer, isWideLayout, prefersReducedMotion } from "../device";
import { clamp, easeOutCubic, smoothstep } from "../math";
import { readViewport, requestSceneFrame } from "../scrollTimeline";
import { useScene } from "../useScene";
import type { FilmId } from "./films";
import {
  removeFilmSection,
  updateFilmSection,
  type Cue as TimelineCue,
} from "./filmTimeline";
import { blockState, holdProgress } from "./holdProgress";
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
    data-section={id}
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
].join(", ");

/** Room kept clear above a held block for the navigation (px). */
const NAV_ROOM = 80;
/** A held block must leave this much of the screen free (px): room for
 * the navigation and a phone's toolbars. Taller blocks scroll instead. */
const SCREEN_MARGIN = 100;
/**
 * A held block comes and goes like the question in the pupil (see
 * PortalTitle): it fades in, settling down into place from a little above
 * as it grows to its size; it stays; and it passes the camera, growing a
 * little as it fades. Both take the same time however fast the page is
 * scrolled: the block is shown while the scroll is inside its hold (between
 * `SHOW_FROM` and `SHOW_UNTIL` of it) and fades in or out over `FADE`
 * seconds; past its hold it goes with the page as it fades. It grows less
 * than the question does:
 * a large block that grows much makes the GPU draw it again mid-scroll.
 */
const SHOW_FROM = 0.03;
const SHOW_UNTIL = 0.9;
/** Seconds to fade in or out: a little quicker on touch screens, where a
 * fling passes a block fast. */
const FADE = 1.2;
const FADE_TOUCH = 0.8;
/** Every hold is this much longer than asked (see `.film-hold-space`). */
const HOLD_SCALE = 1.2;
const HOLD_SCALE_NARROW = 1.3;
/**
 * A block may come in beats (elements marked `film-beat`, e.g. a capability's
 * words and then its screens): each beat comes this long (s) after the one
 * before it, and leaves as long before it — the first to come is the last to
 * go.
 */
const BEAT_STAGGER = 0.32;
/** A block waits to come in while another one on its way out has come
 * further in than this (its beat's level): by then even its heading, the
 * last of its parts to go (see CASCADE), is all but gone, so two blocks'
 * words never cross. */
const MAKE_WAY = 0.15;

/**
 * Within a beat its parts come in one after another, top to bottom — the
 * heading, then each line or item, then the buttons — and go bottom to top:
 * each starts this share of the fade after the one before, the whole
 * cascade taking at most CASCADE_SPREAD of it.
 */
const CASCADE = 0.14;
const CASCADE_SPREAD = 0.5;

/** How far a part has come in (0–1) at its beat's `level`: the `order`th of
 * `of` parts in the beat. */
const cascade = (level: number, order: number, of: number) => {
  if (of < 2) return smoothstep(0, 1, level);
  const step = Math.min(CASCADE, CASCADE_SPREAD / (of - 1));
  return smoothstep(0, 1, clamp(level * (1 + step * (of - 1)) - step * order));
};

type Part = {
  element: HTMLElement;
  /** The beat it belongs to (see BEAT_DELAY). */
  beat: number;
  /** Its place among its beat's parts, and how many there are. */
  order: number;
  of: number;
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
  /** What moves: its beats, or the block as a whole; each with how far it
   * has come in (0–1), whether it is coming or going, and the transform last
   * written to it. */
  beats: Array<{
    element: HTMLElement;
    level: number;
    rising: boolean;
    transform: string;
  }>;
  /** Whether it is to be shown, and since when (ms). */
  shown: boolean;
  since: number;
  /** Last veil written; -1 = none yet. */
  veil: number;
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
 * stretch of the scroll while the film plays behind it: it fades in part
 * after part, top to bottom (see CASCADE), settling into place, stays, and
 * passes the camera, and its veil (see film.css) softens the film behind it. A block too tall for the screen
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
  const lastFrameRef = useRef(0);

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
      // A block measured again (its content changed, e.g. a tab) keeps how
      // far it has come in, so it does not fade out and in again.
      const previous = new Map(
        blocksRef.current.map((block) => [block.element, block]),
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
          holdPx: held
            ? (holdVh * (narrow ? HOLD_SCALE_NARROW : HOLD_SCALE) * vh) / 100
            : 0,
          // Centred in the room below the navigation, a little high.
          pin: held
            ? Math.max(NAV_ROOM, Math.round((vh - height) / 2 - 10))
            : 0,
          beats: [],
          shown: previous.get(element)?.shown ?? false,
          since: previous.get(element)?.since ?? 0,
          veil: -1,
          touchable: true,
        };
      });
      // Then place them: a held block is sticky at its pin, and its hold
      // takes only the scroll it is held for — its own height is given back
      // below it, where the next block, held too, stays out of sight until
      // its turn. A next block that scrolls with the page (too tall for the
      // screen: About on a phone) is seen as it comes, so it follows this
      // one instead of passing over it, and this one goes up ahead of it.
      blocks.forEach(({ element, hold, holdPx, pin, height }, index) => {
        if (!hold) return;
        const held = holdPx > 0;
        const next = blocks.slice(index + 1).find((other) => !other.mark);
        const giveBack = held && (!next || next.holdPx > 0);
        element.classList.toggle("film-cue--held", held);
        element.style.top = held ? `${pin}px` : "";
        hold.classList.toggle("film-hold--flow", !held);
        hold.style.marginBottom = giveBack ? `${-height}px` : "";
      });
      // Positions last, once the page has taken its new shape.
      blocks.forEach((block) => {
        const { element, hold, mark } = block;
        block.top = offsetWithin(mark ? element : hold!, section);
        const beats = mark
          ? []
          : Array.from(element.querySelectorAll<HTMLElement>(".film-beat"));
        if (!mark && !beats.length) beats.push(element);
        const before = previous.get(element)?.beats;
        block.beats = beats.map((beat) => {
          const was = before?.find((other) => other.element === beat);
          return {
            element: beat,
            level: was?.level ?? 0,
            rising: was?.rising ?? true,
            transform: "",
          };
        });
        block.parts = mark
          ? []
          : Array.from(
              element.querySelectorAll<HTMLElement>(PART_SELECTOR),
            ).map((part) => ({
              element: part,
              beat: Math.max(
                0,
                beats.findIndex((beat) => beat.contains(part)),
              ),
              order: 0,
              of: 1,
              top: offsetWithin(part, section),
              height: part.offsetHeight,
              opacity: -1,
            }));
        // Their order within their beats, top to bottom (document order).
        block.parts.forEach((part) => {
          const inBeat = block.parts.filter(
            (other) => other.beat === part.beat,
          );
          part.order = inBeat.indexOf(part);
          part.of = inBeat.length;
        });
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
    const now = performance.now();
    const dt = Math.min(0.1, (now - (lastFrameRef.current || now)) / 1000);
    lastFrameRef.current = now;
    let moving = false;
    const finePointer = hasFinePointer();
    // Which held blocks the scroll is inside now — decided for all of them
    // before any comes in, so a block that starts to leave in this very
    // frame already counts as leaving.
    const insideNow = new Map(
      blocksRef.current.map((block) => {
        const progress =
          (y - (frame.top + block.top - block.pin)) / (block.holdPx || 1);
        return [
          block,
          block.holdPx > 0 && progress >= SHOW_FROM && progress <= SHOW_UNTIL,
        ] as const;
      }),
    );
    // A block on its way out that is still there (see MAKE_WAY).
    const leavingBlocks = blocksRef.current.filter(
      (block) =>
        !block.mark &&
        !insideNow.get(block) &&
        block.beats.some((beat) => beat.level > MAKE_WAY),
    );
    blocksRef.current.forEach((block) => {
      const { element, mark, parts, top, height, holdPx, pin } = block;
      if (mark) return;
      if (reduced) {
        element.style.removeProperty("--veil");
        block.veil = -1;
        block.beats.forEach((beat) => {
          beat.element.style.transform = "";
          beat.transform = "";
          beat.level = 1;
        });
        element.style.pointerEvents = "";
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
      // Held: shown while the scroll is inside its hold, each beat of it (or
      // the block as a whole) fading in or out over FADE seconds, one after
      // another. The beats carry the motion, their parts and the veil the
      // opacity — never the block itself, which would cut the veil off from
      // the films.
      if (held) {
        const inside = insideNow.get(block) ?? false;
        const waiting =
          inside &&
          leavingBlocks.some((other) => other !== block) &&
          block.beats.every((beat) => beat.level === 0);
        const show = inside && !waiting;
        if (show !== block.shown) {
          block.shown = show;
          block.since = now;
        }
      }
      const count = block.beats.length;
      const beatOpacity = block.beats.map((beat, index) => {
        if (!held) return 1;
        const delay = (block.shown ? index : count - 1 - index) * BEAT_STAGGER;
        if ((now - block.since) / 1000 >= delay) {
          const step = dt / (finePointer ? FADE : FADE_TOUCH);
          beat.level = clamp(beat.level + (block.shown ? step : -step));
        }
        beat.rising = block.shown;
        if (block.shown ? beat.level < 1 : beat.level > 0) moving = true;
        const opacity = smoothstep(0, 1, beat.level);
        // Coming in it settles down into place; going out it passes the
        // camera.
        const settled = easeOutCubic(beat.level);
        const pass = 1 - beat.level;
        // Only time moves it: once the page has moved past its hold, it goes
        // with the page as it fades (holding it in place from script would
        // fight a phone's own scrolling and shake).
        const transform =
          opacity > 0
            ? beat.rising
              ? `translate3d(0, ${(-(1 - settled) * vh * 0.05).toFixed(1)}px, 0) scale(${(0.94 + 0.06 * settled).toFixed(4)})`
              : `scale(${(1 + 0.25 * pass * pass).toFixed(4)})`
            : "";
        if (transform !== beat.transform) {
          beat.transform = transform;
          beat.element.style.transform = transform;
        }
        return opacity;
      });
      // The veil lies behind the first beat, the words.
      const veil = held
        ? (beatOpacity[0] ?? 0)
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
      // Out of sight, it must not catch the clicks meant for the block on
      // screen (it may lie over it while it slides in or away).
      const visible = held ? Math.max(...beatOpacity) : veil;
      if (held) blockState.set(element, { shown: block.shown, visible, pin });
      const touchable = visible > 0.05;
      if (touchable !== block.touchable) {
        block.touchable = touchable;
        element.style.pointerEvents = touchable ? "" : "none";
      }
      parts.forEach((part) => {
        let shown: number;
        if (held) {
          const beat = block.beats[part.beat];
          shown = beat ? cascade(beat.level, part.order, part.of) : 0;
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
    // A block still fading keeps the frames coming after the scroll has
    // stopped.
    if (moving) requestSceneFrame();
  });

  const classes = `film-section film-section--${film}${className ? ` ${className}` : ""}`;
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
