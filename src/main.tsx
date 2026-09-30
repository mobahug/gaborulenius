import React from "react";
import ReactDOM from "react-dom/client";
import CoverSection from "./components/CoverSection";
import { isQuickRead } from "./journey/quickRead";

// Lazy boundary for the rest of the app so the cover (LCP element) can
// paint without waiting for MUI/emotion/react-intl/jotai/theme code to
// download, parse and evaluate.
const AppShell = React.lazy(() => import("./AppShell"));
// Quick read replaces the journey (index.html chose before the first paint).
const QuickReadShell = React.lazy(() => import("./quickread/QuickReadShell"));

const quickRead = isQuickRead();

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
        <React.Suspense fallback={null}>
          <AppShell />
        </React.Suspense>
      </>
    )}
  </React.StrictMode>,
);
