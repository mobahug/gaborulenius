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

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const easeInCubic = (t: number) => t * t * t;
