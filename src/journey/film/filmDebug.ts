/**
 * `?debug=film`: a small panel in a corner of the screen telling how the
 * film on screen is doing, measured on the device itself — which encode it
 * plays and at what size, whether it plays (and how fast) or seeks, how long
 * its seeks take (the median and the slow tenth of the last 60), how many
 * of its frames reach the screen each second while scrolling, the page's
 * own frame rate, and the frames the browser dropped. For checking a phone
 * without a computer beside it.
 */
type FilmStats = { seeks: number[]; presented: number; mode: string };

export const createFilmDebug = () => {
  const panel = document.createElement("pre");
  panel.setAttribute("aria-hidden", "true");
  panel.style.cssText = [
    "position:fixed",
    "left:8px",
    "bottom:8px",
    "z-index:3000",
    "margin:0",
    "padding:8px 10px",
    "border-radius:8px",
    "background:rgba(0,0,0,0.72)",
    "color:#e9dcb3",
    "font:11px/1.45 ui-monospace,Menlo,monospace",
    "white-space:pre",
    "pointer-events:none",
  ].join(";");
  panel.textContent = "film …";
  document.body.append(panel);
  let pageFrames = 0;
  let since = performance.now();
  let presentedBefore: number | null = null;
  let lastStats: FilmStats | null = null;

  return {
    frame(
      now: number,
      info: {
        film: string;
        rendition: string;
        video: HTMLVideoElement;
        stats: FilmStats;
      },
    ) {
      pageFrames += 1;
      // Another film (or its move to full HD): count its frames afresh.
      if (info.stats !== lastStats) {
        lastStats = info.stats;
        presentedBefore = info.stats.presented;
      }
      if (now - since < 500) return;
      const seconds = (now - since) / 1000;
      const seeks = [...info.stats.seeks].sort((a, b) => a - b);
      const at = (share: number) =>
        seeks.length
          ? seeks[Math.floor(share * (seeks.length - 1))].toFixed(0)
          : "–";
      const shown = info.stats.presented - (presentedBefore ?? 0);
      const quality = info.video.getVideoPlaybackQuality?.();
      panel.textContent = [
        `${info.film} · ${info.rendition} ${info.video.videoWidth}×${info.video.videoHeight}`,
        info.stats.mode,
        `seek ${at(0.5)} ms · slow ${at(0.9)} ms (${seeks.length})`,
        `film ${(shown / seconds).toFixed(0)}/s · page ${(pageFrames / seconds).toFixed(0)} fps`,
        quality
          ? `dropped ${quality.droppedVideoFrames} of ${quality.totalVideoFrames}`
          : "",
      ]
        .filter(Boolean)
        .join("\n");
      presentedBefore = info.stats.presented;
      pageFrames = 0;
      since = now;
    },
    dispose() {
      panel.remove();
    },
  };
};
