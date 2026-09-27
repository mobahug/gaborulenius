/**
 * How far each block is through its time on screen (0 as it appears … 1 as
 * it has gone), written by FilmSection every frame, for content that
 * animates with its block (the experience trail).
 */
export const holdProgress = new WeakMap<HTMLElement, number>();

/**
 * How a held block is doing, written by FilmSection every frame: whether it
 * is to be shown, how visible it is (0–1), and where its top rests on the
 * screen while it is (px) — for what lands on it (the first scene's
 * butterflies).
 */
export const blockState = new WeakMap<
  HTMLElement,
  { shown: boolean; visible: number; pin: number }
>();
