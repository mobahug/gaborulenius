import { smoothstep } from "../math";

/**
 * The small instruments in the corner of the screen, one for some of the
 * films (the Explorer's map, the career dial, the time in Espoo): wide
 * screens only, where there is room beside the content.
 */
export const INSTRUMENT_QUERY = "(min-width: 1100px) and (min-height: 680px)";

/** Fades in once `time` passes `from` and out after `to` (film times). */
export const presenceBetween = (time: number, from: number, to: number) =>
  smoothstep(from - 0.4, from + 0.1, time) *
  (1 - smoothstep(to + 0.15, to + 0.45, time));

/**
 * Shows an instrument at the given opacity (in steps of 2 %, written only
 * when it changes); returns whether it is visible at all.
 */
export const showInstrument = () => {
  let shown = -1;
  return (element: HTMLElement, presence: number) => {
    const opacity = Math.round(presence * 50) / 50;
    if (opacity !== shown) {
      shown = opacity;
      element.style.opacity = String(opacity);
      element.style.visibility = opacity > 0 ? "visible" : "hidden";
    }
    return opacity > 0;
  };
};

/** The walker at the head of a route: a red dot with a pulse (SVG). */
export const WALKER_RADIUS = 5;
