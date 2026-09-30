/*
 * Quick read: the essentials on one calm page — who, what, where, the work
 * and how to get in touch — for a visitor who wants the facts first, in
 * place of the film journey (src/quickread/). index.html reads the choice
 * (or a ?read link) before the first paint and marks <html
 * data-quick-read="true">; main.tsx then renders the quick read instead of
 * the journey.
 */

const KEY = "quickRead";

export const isQuickRead = () =>
  typeof document !== "undefined" &&
  document.documentElement.dataset.quickRead === "true";

/**
 * Turns quick read on or off. The page loads again as the other one; the
 * journey returns to where the visitor was in it (see
 * director/restorePosition.ts).
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
