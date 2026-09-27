import { smoothstep } from "../math";
import type { Viewport } from "../scrollTimeline";
import { FILMS, type Film, type FilmId, type Transform } from "./films";

/**
 * The master timeline: from the scroll position to what every film shows.
 *
 * Each film belongs to a stage section in the page. The section's content
 * blocks carry cue times ("this block is centred on screen when the film is
 * at 4.2 s"), so the film follows the reading: it is at its `from` time just
 * after the seam that opens the section, passes each cue as its block
 * crosses the middle of the screen, and reaches its last frame just before
 * the seam that closes it. Everything here is a pure function of the scroll
 * position and the measured layout, so scrolling back replays it exactly.
 */

export type Cue = {
  /** Block centre, measured from the top of the section (px). */
  offset: number;
  /** Film time when that centre crosses the middle of the viewport (s). */
  time: number;
};

type Section = { top: number; height: number; cues: Cue[]; ready: boolean };

const sections = new Map<FilmId, Section>();

export const updateFilmSection = (
  id: FilmId,
  geometry: Partial<Omit<Section, "ready">>,
) => {
  const section = sections.get(id) ?? {
    top: 0,
    height: 0,
    cues: [],
    ready: false,
  };
  Object.assign(section, geometry);
  section.ready = section.height > 0;
  sections.set(id, section);
};

export const removeFilmSection = (id: FilmId) => sections.delete(id);

/** A stage section's measured position (for blocks that move on their own). */
export const getFilmSection = (id: FilmId) => sections.get(id) ?? null;

const IDENTITY: Transform = { scale: 1, x: 0, y: 0 };

/** A film seen through a window fades in over this much of the outer film's
 * time (s) as the window starts to open. */
const PORTAL_FADE = 0.6;

const mixTransform = (a: Transform, b: Transform, t: number): Transform => ({
  scale: a.scale + (b.scale - a.scale) * t,
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

export type FilmFrame = {
  film: Film;
  /** Film time the scroll position asks for (s). */
  time: number;
  /** Opacity over everything below it. */
  opacity: number;
  transform: Transform;
  /** Out of focus by this much (a fraction of the frame's height). */
  blur: number;
  /** 0 before the section has begun … 1 once it has fully faded in. */
  arrival: number;
  /** Scroll positions (px) where the fade-in starts and the film ends. */
  start: number;
  end: number;
  /**
   * While the film shows through a window in the previous one (its
   * portal): that film, its time, and how far the window has opened (0–1).
   */
  window?: { outer: Film; outerTime: number; progress: number };
};

export type TimelineFrame = {
  /** One entry per film in story order; null while its section is missing. */
  films: Array<FilmFrame | null>;
  /** Index of the film the viewer is in. */
  current: number;
};

/** Piecewise-linear interpolation through sorted (y, value) keys. */
const interpolate = (y: number, keys: Array<[number, number]>) => {
  if (y <= keys[0][0]) return keys[0][1];
  for (let index = 1; index < keys.length; index += 1) {
    const [y1, v1] = keys[index];
    if (y <= y1) {
      const [y0, v0] = keys[index - 1];
      return v0 + (v1 - v0) * ((y - y0) / Math.max(1e-6, y1 - y0));
    }
  }
  return keys[keys.length - 1][1];
};

export const computeTimeline = (
  viewport: Viewport,
  reduced: boolean,
): TimelineFrame | null => {
  const { smoothY: y, vh } = viewport;
  const opening = sections.get(FILMS[0].id);
  if (!opening?.ready) return null;

  const films: Array<FilmFrame | null> = [];
  let current = -1;

  FILMS.forEach((film, index) => {
    const section = sections.get(film.id);
    if (!section?.ready) {
      films.push(null);
      return;
    }
    const next = FILMS[index + 1];
    const blendIn = film.seam.blend * vh;
    const blendOut = next ? next.seam.blend * vh : 0;
    const top = section.top;
    const bottom = section.top + section.height;

    // Film time: `from` after the opening seam (for the first film: at the
    // top of the page), through the cues, to the last frame before the
    // closing seam (the final film ends when its section's bottom reaches
    // the bottom of the screen).
    const first = index === 0;
    const startY = first ? 0 : top + blendIn;
    const endY = next ? bottom - blendOut : bottom - vh;
    const from = film.from ?? 0;
    const keys: Array<[number, number]> = [[startY, from]];
    section.cues.forEach((cue) => {
      const cueY = top + cue.offset - vh / 2;
      const [lastY, lastTime] = keys[keys.length - 1];
      if (cueY > lastY + 1 && cue.time > lastTime && cueY < endY - 1) {
        keys.push([cueY, cue.time]);
      }
    });
    keys.push([Math.max(endY, keys[keys.length - 1][0] + 1), film.duration]);

    let opacity: number;
    let arrival: number;
    if (first) {
      // The first film is the page's opening: always there.
      arrival = 1;
      opacity = 1;
    } else if (reduced) {
      // Stills switch where a section's top crosses the middle of the screen.
      arrival = y + vh / 2 >= top ? 1 : 0;
      opacity = arrival;
    } else {
      arrival = smoothstep(top - blendIn, top + blendIn, y);
      opacity = arrival;
    }
    if (arrival > 0) current = index;

    let time = reduced ? film.still : interpolate(y, keys);

    // A window into this film inside the previous one, before its section.
    const portal = film.seam.portal;
    const outer = films[index - 1];
    let view: FilmFrame["window"];
    if (portal && !reduced && y < top) time = from;
    if (portal && outer && !reduced && y < top && outer.time >= portal.opens) {
      const progress = Math.min(
        1,
        (outer.time - portal.opens) /
          Math.max(1e-3, outer.film.duration - portal.opens),
      );
      view = { outer: outer.film, outerTime: outer.time, progress };
      // Held still on its first moment until the window has opened, and
      // fading in as the window starts to open.
      time = from;
      opacity = smoothstep(
        portal.opens,
        portal.opens + PORTAL_FADE,
        outer.time,
      );
    }

    const incoming = film.seam.incoming;
    let transform = IDENTITY;
    if (incoming && !reduced) {
      const rest = incoming.settle
        ? smoothstep(incoming.settle[0], incoming.settle[1], time)
        : arrival;
      transform = mixTransform(incoming, IDENTITY, rest);
    }
    const soften = film.seam.soften;
    const blur =
      soften && !reduced
        ? soften.blur * (1 - smoothstep(soften.clear[0], soften.clear[1], time))
        : 0;
    films.push({
      film,
      time,
      opacity,
      transform,
      blur,
      arrival,
      start: top - blendIn,
      end: keys[keys.length - 1][0],
      window: view,
    });
  });

  // Around a seam, the film below drifts to its outgoing transform (and
  // out of focus, if the seam is softened).
  films.forEach((frame, index) => {
    const above = films[index + 1];
    const seam = above?.film.seam;
    if (!frame || !above || !seam?.outgoing || reduced) return;
    const progress = seam.approach
      ? smoothstep(
          above.start - seam.approach * vh,
          above.start + seam.blend * vh,
          y,
        )
      : above.arrival;
    if (progress > 0) {
      frame.transform = mixTransform(IDENTITY, seam.outgoing, progress);
      if (seam.soften) frame.blur = seam.soften.blur * progress;
    }
  });

  return { films, current };
};
