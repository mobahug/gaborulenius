import { systemPrefersReducedMotion } from "./device";

/*
 * Quick read: the whole portfolio on one calm page — each stage's still
 * behind its content, nothing held, no film to scrub — for a visitor who
 * wants the facts first. It is the page's reduced mode, chosen: index.html
 * reads the choice (or a ?read link) before the first paint and marks
 * <html data-quick-read> and <html data-motion="reduced">.
 */

const KEY = "quickRead";

export const isQuickRead = () =>
  typeof document !== "undefined" &&
  document.documentElement.dataset.quickRead === "true";

/** A system that asks for reduced motion always gets the calm page, so
 * there is nothing to switch. */
export const canSwitchQuickRead = () => !systemPrefersReducedMotion();

/**
 * Turns quick read on or off. The page loads again in its new mode and
 * returns to the same moment (see director/restorePosition.ts).
 */
export const setQuickRead = (on: boolean) => {
  const url = new URL(window.location.href);
  try {
    localStorage.setItem(KEY, on ? "1" : "0");
    url.searchParams.delete("read");
  } catch {
    // No storage (private mode): the address carries the choice instead.
    url.searchParams.set("read", on ? "1" : "0");
  }
  window.history.replaceState(window.history.state, "", url);
  window.location.reload();
};
