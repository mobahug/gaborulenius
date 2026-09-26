import {
  getQualityTier,
  prefersReducedMotion,
  type QualityTier,
} from "../device";
import { clamp, range } from "../math";
import {
  onAfterSceneFrame,
  requestSceneFrame,
  type Viewport,
} from "../scrollTimeline";
import { FILMS, type FilmId } from "../film/films";
import {
  computeTimeline,
  getFilmSection,
  type TimelineFrame,
} from "../film/filmTimeline";
import type { WindowGeometry } from "./frameMapping";

/**
 * The scene director: once per animation frame, after the scroll clock has
 * settled the layout, it turns the (eased) scroll position into one
 * description of where the visitor is in the journey and hands it to every
 * visual system in a fixed order — the film layer first, which adds what it
 * has actually put on screen, then the overlays and the content that moves
 * with the films. Nothing else guesses where the visitor is.
 *
 * All state is a function of the scroll position. Velocity and direction
 * are measured too, for presentation only; they decay to zero when the
 * page is still, so a given scroll position always settles to the same
 * picture.
 */

/**
 * A seam being crossed: the pupil opening onto the neural film, or one film
 * fading in over the one before it.
 */
export type Transition = { from: FilmId; to: FilmId; progress: number };

export type DirectorFrame = {
  viewport: Viewport;
  now: number;
  reduced: boolean;
  deviceTier: QualityTier;
  /** 0 at the top of the page, 1 at the bottom. */
  journeyProgress: number;
  /** The film the visitor is in, and how far through its section. */
  activeChapter: FilmId;
  chapterIndex: number;
  chapterProgress: number;
  /** The seam being crossed, if any, and its progress (0 otherwise). */
  transition: Transition | null;
  transitionProgress: number;
  /** −1 up, 1 down, 0 still. */
  scrollDirection: -1 | 0 | 1;
  /** Eased scroll velocity in viewport heights per second (signed). */
  scrollVelocity: number;
  timeline: TimelineFrame;
  /**
   * Filled in by the film layer during the frame: what it has actually put
   * on screen, for everything that has to line up with the footage.
   */
  stage: {
    /** Time of the frame each film is showing (null: nothing shown yet). */
    presented: Array<number | null>;
    /** The open portal (the pupil) on screen, if any. */
    window: WindowGeometry | null;
  };
};

type Subscriber = {
  order: number;
  callback: (frame: DirectorFrame) => void;
};

const subscribers: Subscriber[] = [];
let stop: (() => void) | null = null;
let tier: QualityTier | null = null;

// Motion, for presentation only.
const VELOCITY_SECONDS = 0.12;
let lastY: number | null = null;
let lastTime = 0;
let velocity = 0;

const measureMotion = (y: number, vh: number, now: number) => {
  if (lastY === null) {
    lastY = y;
    lastTime = now;
    return;
  }
  const dt = Math.max(0.001, (now - lastTime) / 1000);
  // A navigation jump or a dragged scroll bar is not motion.
  const jump = Math.abs(y - lastY) > vh * 1.5;
  const instant = jump || dt > 0.25 ? 0 : (y - lastY) / vh / dt;
  velocity += (instant - velocity) * (1 - Math.exp(-dt / VELOCITY_SECONDS));
  if (Math.abs(velocity) < 0.004) velocity = 0;
  lastY = y;
  lastTime = now;
};

/** The seam being crossed: an open portal, or a film fading in. */
const seamOf = (timeline: TimelineFrame): Transition | null => {
  for (let index = timeline.films.length - 1; index > 0; index -= 1) {
    const entry = timeline.films[index];
    if (!entry) continue;
    const progress = entry.window ? entry.window.progress : entry.arrival;
    if (progress > 0 && progress < 1) {
      return { from: FILMS[index - 1].id, to: entry.film.id, progress };
    }
  }
  return null;
};

const tick = (viewport: Viewport) => {
  const reduced = prefersReducedMotion();
  const timeline = computeTimeline(viewport, reduced);
  if (!timeline) return;
  const now = performance.now();
  measureMotion(viewport.y, viewport.vh, now);
  tier ??= getQualityTier();

  const y = viewport.smoothY;
  const chapterIndex = Math.max(0, timeline.current);
  const chapter = FILMS[chapterIndex];
  const section = getFilmSection(chapter.id);
  let chapterProgress = 0;
  if (section) {
    const start = chapterIndex === 0 ? 0 : section.top;
    const end = section.top + section.height - viewport.vh;
    chapterProgress = range(y, start, Math.max(start + 1, end));
  }

  const transition = seamOf(timeline);

  const frame: DirectorFrame = {
    viewport,
    now,
    reduced,
    deviceTier: tier,
    journeyProgress: clamp(y / Math.max(1, viewport.maxY)),
    activeChapter: chapter.id,
    chapterIndex,
    chapterProgress,
    transition,
    transitionProgress: transition?.progress ?? 0,
    scrollDirection: velocity > 0.02 ? 1 : velocity < -0.02 ? -1 : 0,
    scrollVelocity: reduced ? 0 : velocity,
    timeline,
    stage: { presented: FILMS.map(() => null), window: null },
  };
  subscribers.forEach((subscriber) => subscriber.callback(frame));
  if (import.meta.env.DEV) {
    // For inspection from the console while developing: the last frame,
    // and the timeline at any scroll position.
    Object.assign(window, {
      __journey: frame,
      __timelineAt: (at: number) =>
        computeTimeline({ ...viewport, y: at, smoothY: at }, false),
    });
  }
  // Let velocity-driven presentation settle once scrolling stops.
  if (velocity !== 0) requestSceneFrame();
};

/**
 * Receives every director frame. Lower `order` runs first: the film layer
 * is 0, layers that follow the footage come after it.
 */
export const onDirectorFrame = (
  callback: (frame: DirectorFrame) => void,
  order = 10,
) => {
  const subscriber = { order, callback };
  subscribers.push(subscriber);
  subscribers.sort((a, b) => a.order - b.order);
  stop ??= onAfterSceneFrame(tick);
  requestSceneFrame();
  return () => {
    const index = subscribers.indexOf(subscriber);
    if (index >= 0) subscribers.splice(index, 1);
    if (!subscribers.length && stop) {
      stop();
      stop = null;
    }
  };
};
