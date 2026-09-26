import { useEffect } from "react";
import type { Film } from "../film/films";
import { onDirectorFrame } from "./director";

/** Brightness of a film's picture at `time` (0–1), from its measured curve. */
export const lightAt = (film: Film, time: number) => {
  const samples = film.light;
  const position = Math.max(0, Math.min(samples.length - 1, time * 4));
  const index = Math.floor(position);
  const next = Math.min(samples.length - 1, index + 1);
  return samples[index] + (samples[next] - samples[index]) * (position - index);
};

/** The elements whose veil (see film.css) reads `--film-shade`. */
const SHADED = ".film-copy, .trail-panel--overlay";

/**
 * Content over the films stays dominant: the veil behind every block
 * deepens when the picture behind it is bright (the office in daylight,
 * the splash on the Okavango) and relaxes in the dark jungle and the neural
 * void. Published as `--film-shade` (1 = the base shade) on the blocks
 * themselves: it is not inherited (film.css), so a change restyles only
 * the veils, not the page.
 */
export const useFilmLight = () => {
  useEffect(() => {
    let applied = -1;
    let chapter = -1;
    const stop = onDirectorFrame((frame) => {
      const entry = frame.timeline.films[frame.chapterIndex];
      if (!entry) return;
      const time = frame.stage.presented[frame.chapterIndex] ?? entry.time;
      const light = lightAt(entry.film, time);
      // In steps of 0.05, so it changes only a few times a stage.
      const exact = 1 + Math.min(0.6, Math.max(0, (light - 0.15) * 1.8));
      const shade = Math.round(exact * 20) / 20;
      // Blocks that mounted since (loaded late) get it with the next
      // chapter at the latest.
      if (shade === applied && frame.chapterIndex === chapter) return;
      applied = shade;
      chapter = frame.chapterIndex;
      const value = shade.toFixed(2);
      document
        .querySelectorAll<HTMLElement>(SHADED)
        .forEach((element) => element.style.setProperty("--film-shade", value));
    }, 15);
    return () => {
      stop();
      document
        .querySelectorAll<HTMLElement>(SHADED)
        .forEach((element) => element.style.removeProperty("--film-shade"));
    };
  }, []);
};
