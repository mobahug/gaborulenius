import React from "react";
import ReactDOM from "react-dom/client";
import AfterCover from "./components/AfterCover";
import CoverSection from "./components/CoverSection";
import { startFirstFilm } from "./journey/film/filmDownload";
import { isQuickRead } from "./journey/quickRead";

// Lazy boundary for the rest of the app so the cover (LCP element) can
// paint without waiting for MUI/emotion/react-intl/jotai/theme code to
// download, parse and evaluate.
const AppShell = React.lazy(() => import("./AppShell"));
// Quick read replaces the journey (index.html chose before the first paint).
const QuickReadShell = React.lazy(() => import("./quickread/QuickReadShell"));

const quickRead = isQuickRead();

// The first film is what the page's loader waits for: it starts with the
// page, not once the rest of the app has arrived too.
if (!quickRead) startFirstFilm();

// A page loaded before the site was updated asks for code files that the
// update replaced (their names change with their contents) and are gone:
// load the page again to get the new ones, instead of breaking. Once — a
// second failure soon after is not an update, so it is not retried.
window.addEventListener("vite:preloadError", () => {
  try {
    const last = Number(sessionStorage.getItem("reloadedForUpdate") ?? 0);
    if (Date.now() - last < 30_000) return;
    sessionStorage.setItem("reloadedForUpdate", String(Date.now()));
  } catch {
    return;
  }
  window.location.reload();
});

// The journey puts the visitor back where they were itself, once its
// sections exist (see journey/director/restorePosition.ts); the browser's
// own restore would run while only the cover is there.
if (!quickRead && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    {quickRead ? (
      <React.Suspense fallback={null}>
        <QuickReadShell />
      </React.Suspense>
    ) : (
      <>
        <CoverSection />
        <AfterCover>
          <React.Suspense fallback={null}>
            <AppShell />
          </React.Suspense>
        </AfterCover>
      </>
    )}
  </React.StrictMode>,
);
