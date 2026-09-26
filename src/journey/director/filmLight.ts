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

/**
 * Content over the films stays dominant: the soft shade behind every
 * block deepens when the picture behind it is bright (the office in
 * daylight, the splash on the Okavango) and relaxes in the dark jungle
 * and the neural void. Published as `--film-shade` (1 = the base shade).
 */
export const useFilmLight = () => {
  useEffect(() => {
    const root = document.documentElement;
    let applied = -1;
    const stop = onDirectorFrame((frame) => {
      const entry = frame.timeline.films[frame.chapterIndex];
      if (!entry) return;
      const time = frame.stage.presented[frame.chapterIndex] ?? entry.time;
      const light = lightAt(entry.film, time);
      // In steps of 0.05: a custom property on the root restyles the whole
      // page whenever it changes, so it changes only a few times a stage.
      const exact = 1 + Math.min(0.6, Math.max(0, (light - 0.15) * 1.8));
      const shade = Math.round(exact * 20) / 20;
      if (shade === applied) return;
      applied = shade;
      root.style.setProperty("--film-shade", shade.toFixed(2));
    }, 15);
    return () => {
      stop();
      root.style.removeProperty("--film-shade");
    };
  }, []);
};
