/**
 * How far each block is through its time on screen (0 as it appears … 1 as
 * it has gone), written by FilmSection every frame, for content that
 * animates with its block (the experience trail).
 */
export const holdProgress = new WeakMap<HTMLElement, number>();
