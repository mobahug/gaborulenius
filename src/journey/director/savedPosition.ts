import type { FilmId } from "../film/films";

/** Where the visitor was in the journey: this far through that section
 * (see restorePosition.ts), kept for the tab's session. */
export type SavedPosition = { id: FilmId; progress: number };

export const POSITION_KEY = "journey-position";

export const readSavedPosition = (): SavedPosition | null => {
  try {
    const raw = sessionStorage.getItem(POSITION_KEY);
    return raw ? (JSON.parse(raw) as SavedPosition) : null;
  } catch {
    return null;
  }
};

/** A reload or back/forward: the page comes back to where it was. */
export const isReturning = () => {
  const entry = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  return entry?.type === "reload" || entry?.type === "back_forward";
};
