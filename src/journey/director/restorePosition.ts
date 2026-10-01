import { useEffect } from "react";
import { getFilmSection } from "../film/filmTimeline";
import { onDirectorFrame } from "./director";
import {
  isReturning,
  POSITION_KEY,
  readSavedPosition,
  type SavedPosition,
} from "./savedPosition";

/*
 * Coming back to the page (a reload, back/forward) returns the visitor to
 * the same moment of the journey, and a link from elsewhere to a section
 * (`#experience`) lands on it. The browser can do neither by itself: when
 * the page arrives only the cover exists, and sections above the visitor
 * (About, lazily loaded) still change height after that. So the position is
 * kept as "this far through that section" (or the linked element) and
 * re-applied while the layout settles, until the visitor scrolls
 * themselves.
 */

/** How long the layout may keep settling after a return (ms). */
const SETTLE_MS = 2500;

const scrollInstantly = (top: number) => {
  // The page scrolls smoothly for links; a restore must not.
  const root = document.documentElement;
  const behaviour = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, top);
  root.style.scrollBehavior = behaviour;
};

export const useRestorePosition = () => {
  useEffect(() => {
    let current: SavedPosition | null = null;
    const watch = onDirectorFrame((frame) => {
      const section = getFilmSection(frame.activeChapter);
      if (!section) return;
      current = {
        id: frame.activeChapter,
        progress:
          (frame.viewport.y - section.top) / Math.max(1, section.height),
      };
    }, 40);
    const save = () => {
      try {
        if (current)
          sessionStorage.setItem(POSITION_KEY, JSON.stringify(current));
      } catch {
        // Private mode or storage disabled: nothing to come back to.
      }
    };
    window.addEventListener("pagehide", save);

    const saved = isReturning() ? readSavedPosition() : null;
    const hash = window.location.hash;
    const linked = !saved && hash.length > 1 ? hash.slice(1) : null;
    let restoring = saved !== null || linked !== null;
    const until = performance.now() + SETTLE_MS;
    const stopRestoring = () => {
      restoring = false;
      window.removeEventListener("wheel", stopRestoring);
      window.removeEventListener("touchstart", stopRestoring);
      window.removeEventListener("keydown", stopRestoring);
    };
    if (restoring) {
      window.addEventListener("wheel", stopRestoring, { passive: true });
      window.addEventListener("touchstart", stopRestoring, { passive: true });
      window.addEventListener("keydown", stopRestoring);
    }
    const target = () => {
      if (saved) {
        const section = getFilmSection(saved.id);
        return section ? section.top + saved.progress * section.height : null;
      }
      const element = linked ? document.getElementById(linked) : null;
      if (!element) return null;
      const margin = parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
      return element.getBoundingClientRect().top + window.scrollY - margin;
    };
    const restore = onDirectorFrame(() => {
      if (!restoring) return;
      if (performance.now() > until) {
        stopRestoring();
        return;
      }
      const top = target();
      if (top !== null && Math.abs(window.scrollY - top) > 2) {
        scrollInstantly(top);
      }
    }, 1);

    return () => {
      watch();
      restore();
      stopRestoring();
      window.removeEventListener("pagehide", save);
    };
  }, []);
};
