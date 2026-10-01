import { isReturning } from "../director/savedPosition";
import { readViewport } from "../scrollTimeline";
import type { FilmId } from "./films";
import { filmSources, isUpright, wideRendition } from "./filmSources";

/**
 * The whole film as a blob, telling how much of it has arrived (the page's
 * loader shows it for the first film, see index.html). Each film is
 * downloaded whole before its video element gets it (as a blob URL), so
 * every seek lands on frames already in memory: streamed with range
 * requests instead, a phone browser fetches the bytes of a seek only when
 * it is asked for them, and the picture stalls while the visitor scrolls.
 */
export const downloadFilm = async (
  url: string,
  index: number,
  signal: AbortSignal,
) => {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`${response.status}`);
  const total = Number(response.headers.get("content-length")) || 0;
  if (!response.body || !total) return response.blob();
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;
  let told = -1;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    const progress = Math.min(1, loaded / total);
    if (progress - told >= 0.01 || progress === 1) {
      told = progress;
      window.dispatchEvent(
        new CustomEvent("filmprogress", { detail: { index, progress } }),
      );
    }
  }
  return new Blob(chunks as BlobPart[], {
    type: response.headers.get("content-type") ?? "video/mp4",
  });
};

/** The film the journey opens with (the first in films.ts). */
const FIRST_FILM: FilmId = "chase";

/** The encode of the first film that a screen this size gets (as the film
 * layer chooses it). */
export const firstFilmUrl = (vw: number, vh: number) =>
  filmSources(FIRST_FILM)[isUpright(vw, vh) ? "portrait" : wideRendition()];

type Download = { url: string; blob: Promise<Blob>; abort: AbortController };

let early: Download | null = null;

/**
 * Starts the first film's download with the page: it is what the page's
 * loader waits for, and the film layer, which comes with the rest of the
 * app, would ask for it only once all of that has arrived too. Only for a
 * visitor starting at the top: a linked section or a return to where they
 * were opens elsewhere in the journey, and reduced motion has no films.
 */
export const startFirstFilm = () => {
  if (
    early ||
    document.documentElement.dataset.motion === "reduced" ||
    window.location.hash ||
    isReturning()
  ) {
    return;
  }
  const { vw, vh } = readViewport();
  const url = firstFilmUrl(vw, vh);
  const abort = new AbortController();
  const blob = downloadFilm(url, 0, abort.signal);
  // Whoever takes it handles a failure; one nobody takes is dropped.
  blob.catch(() => {});
  early = { url, blob, abort };
};

/** The first film's download already under way for `url`, once. */
export const takeFirstFilm = (url: string) => {
  if (!early || early.url !== url) return null;
  const taken = early;
  early = null;
  return taken;
};

/** Stops a download of the first film that the film layer did not take. */
export const dropFirstFilm = () => {
  early?.abort.abort();
  early = null;
};
