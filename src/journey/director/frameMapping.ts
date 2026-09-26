import { smoothstep } from "../math";
import { FRAME_ASPECT, type Film, type Portal } from "../film/films";

/*
 * Where a film's frame lies on screen. Every layer that has to line up with
 * the footage (the portal's mask, the keyed macaw, the neural probe) maps
 * frame coordinates through these, with the same cover crop and focus as
 * the video element itself.
 */

export type Rect = { left: number; top: number; width: number; height: number };

/**
 * Horizontal focus (0–1) for the current viewport shape: the film's
 * authored focus on portrait screens, the frame's centre on wide ones.
 */
export const focusAt = (film: Film, time: number, aspect: number) => {
  const keys = film.focus;
  let x = keys[0][1];
  for (let index = 1; index < keys.length; index += 1) {
    const [t0, x0] = keys[index - 1];
    const [t1, x1] = keys[index];
    if (time <= t0) break;
    x = time >= t1 ? x1 : x0 + (x1 - x0) * ((time - t0) / (t1 - t0));
  }
  const weight = 1 - smoothstep(0.8, 1.6, aspect);
  return (50 + (x - 50) * weight) / 100;
};

/** The frame's rectangle on screen with `object-fit: cover` at `focus`. */
export const coverRect = (vw: number, vh: number, focus: number): Rect => {
  const width = Math.max(vw, vh * FRAME_ASPECT);
  const height = width / FRAME_ASPECT;
  return {
    left: (vw - width) * focus,
    top: (vh - height) * 0.5,
    width,
    height,
  };
};

/** The film's frame on screen at `time`. */
export const filmRect = (film: Film, time: number, vw: number, vh: number) =>
  coverRect(vw, vh, focusAt(film, time, vw / Math.max(1, vh)));

/** The circle a portal follows at the outer film's `time` (frame fractions). */
export const portalCircle = (portal: Portal, time: number) => {
  const track = portal.track;
  const [first, x0, y0, r0] = track[0];
  // Before the first key the pupil is shrunk back gently (the camera is
  // still approaching the eye).
  if (time < first) {
    return { x: x0, y: y0, radius: r0 * Math.exp((time - first) * 3) };
  }
  let key = 1;
  while (key < track.length - 1 && time > track[key][0]) key += 1;
  const [ta, xa, ya, ra] = track[key - 1];
  const [tb, xb, yb, rb] = track[key];
  const k = Math.min(1, (time - ta) / (tb - ta));
  return {
    x: xa + (xb - xa) * k,
    y: ya + (yb - ya) * k,
    radius: ra + (rb - ra) * k,
  };
};

/**
 * The pupil's path with the frame-to-frame wobble of the measured track
 * averaged out (±0.15 s): the title and the film seen through the pupil
 * follow this, so they glide instead of shaking. The radius is left as
 * measured; it only grows.
 */
export const smoothPortalCircle = (portal: Portal, time: number) => {
  const samples = 9;
  const spread = 0.15;
  let x = 0;
  let y = 0;
  for (let index = 0; index < samples; index += 1) {
    const at = time + spread * ((index / (samples - 1)) * 2 - 1);
    const circle = portalCircle(portal, at);
    x += circle.x;
    y += circle.y;
  }
  return {
    x: x / samples,
    y: y / samples,
    radius: portalCircle(portal, time).radius,
  };
};

export type WindowGeometry = {
  /** The pupil on screen (px). */
  cx: number;
  cy: number;
  radius: number;
  /** How much of the screen the pupil covers (0–1). */
  near: number;
  /** Scale and centre of the film seen through it. */
  scale: number;
  x: number;
  y: number;
  /** Scale and centre for content living inside it (the title). */
  content: { scale: number; x: number; y: number };
};

/**
 * Where a window into a film sits on screen: the circle its portal follows
 * in the outer film's frame (at the time that film is actually showing),
 * mapped through that film's cover crop and focus. Content in the window
 * (the title) grows with the window and reaches full size as the window
 * covers the screen; the film seen through it is further away — tiny at
 * first, it comes closer faster (`depth`) and fills the screen at the same
 * moment. Both drift from the window's centre to the screen's centre.
 */
export const windowGeometry = (
  outer: Film,
  portal: Portal,
  outerTime: number,
  vw: number,
  vh: number,
  smooth = false,
): WindowGeometry => {
  const circle = smooth
    ? smoothPortalCircle(portal, outerTime)
    : portalCircle(portal, outerTime);
  const rect = filmRect(outer, outerTime, vw, vh);
  const cx = rect.left + circle.x * rect.width;
  const cy = rect.top + circle.y * rect.height;
  const radius = circle.radius * rect.height;
  const far = Math.max(
    Math.hypot(cx, cy),
    Math.hypot(vw - cx, cy),
    Math.hypot(cx, vh - cy),
    Math.hypot(vw - cx, vh - cy),
  );
  const near = Math.min(1, radius / far);
  const scale = Math.max(0.004, Math.pow(near, portal.depth));
  const content = Math.max(0.01, near);
  return {
    cx,
    cy,
    radius,
    near,
    scale,
    x: cx + (vw / 2 - cx) * scale,
    y: cy + (vh / 2 - cy) * scale,
    content: {
      scale: content,
      x: cx + (vw / 2 - cx) * content,
      y: cy + (vh / 2 - cy) * content,
    },
  };
};
