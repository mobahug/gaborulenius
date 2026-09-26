export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

/** Maps `value` from the range [start, end] onto [0, 1], clamped. */
export const range = (value: number, start: number, end: number) =>
  end === start
    ? value >= end
      ? 1
      : 0
    : clamp((value - start) / (end - start));

export const smoothstep = (start: number, end: number, value: number) => {
  const t = range(value, start, end);
  return t * t * (3 - 2 * t);
};

export const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const easeInCubic = (t: number) => t * t * t;

/** Small deterministic PRNG so procedural shapes are identical every load. */
export const createRandom = (seed: number) => {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
