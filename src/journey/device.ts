const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const WIDE_LAYOUT_QUERY = "(min-width: 900px)";
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

const matches = (query: string) =>
  typeof window !== "undefined" && window.matchMedia(query).matches;

/**
 * The journey runs in its reduced mode — stills instead of films, nothing
 * held, no easing — when the system asks for reduced motion. index.html
 * marks it on <html data-motion="reduced"> before the first paint (and as
 * the setting changes); the stylesheets follow the same attribute.
 */
export const prefersReducedMotion = () =>
  (typeof document !== "undefined" &&
    document.documentElement.dataset.motion === "reduced") ||
  matches(REDUCED_MOTION_QUERY);

/** Desktop compositions start at MUI's `md` breakpoint. */
export const isWideLayout = () => matches(WIDE_LAYOUT_QUERY);

export const hasFinePointer = () => matches(FINE_POINTER_QUERY);

export type QualityTier = "low" | "medium" | "high";

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

/**
 * A coarse CPU budget used to size particle counts. Phones and low-memory
 * devices get the lightest variant.
 */
export const getQualityTier = (): QualityTier => {
  if (typeof window === "undefined") return "medium";
  const hints = navigator as NavigatorWithHints;
  const cores = hints.hardwareConcurrency ?? 4;
  const memory = hints.deviceMemory ?? 8;
  const coarse = matches("(pointer: coarse)");
  const smallScreen = Math.min(window.screen.width, window.screen.height) < 820;

  if (hints.connection?.saveData) return "low";
  if ((coarse && smallScreen) || memory <= 2 || cores <= 2) return "low";
  if (coarse || memory <= 4 || cores <= 4) return "medium";
  return "high";
};
