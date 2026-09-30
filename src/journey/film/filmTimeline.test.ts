import { beforeAll, describe, expect, it } from "vitest";
import type { Viewport } from "../scrollTimeline";
import { computeTimeline, updateFilmSection } from "./filmTimeline";
import { FILMS } from "./films";

const VW = 1440;
const VH = 900;
/** Each stage section is six screens tall, one after another. */
const SECTION = 6 * VH;

const at = (y: number) =>
  ({ y, smoothY: y, vw: VW, vh: VH }) as unknown as Viewport;

const timeAt = (index: number, y: number, reduced = false) =>
  computeTimeline(at(y), reduced)?.films[index]?.time ?? NaN;

describe("computeTimeline before the layout", () => {
  it("waits until the opening section has been measured", () => {
    expect(computeTimeline(at(0), false)).toBeNull();
  });
});

describe("computeTimeline", () => {
  beforeAll(() => {
    FILMS.forEach((film, index) => {
      updateFilmSection(film.id, {
        top: index * SECTION,
        height: SECTION,
        cues: [{ offset: SECTION / 2, time: film.duration / 2 }],
      });
    });
  });

  it("opens on the first film's first moment", () => {
    const frame = computeTimeline(at(0), false)!;
    expect(frame.current).toBe(0);
    expect(frame.films[0]?.time).toBe(FILMS[0].from ?? 0);
    expect(frame.films[0]?.opacity).toBe(1);
  });

  it("passes a cue as its block crosses the middle of the screen", () => {
    const cueY = SECTION / 2 - VH / 2;
    expect(timeAt(0, cueY)).toBeCloseTo(FILMS[0].duration / 2);
  });

  it("only moves a film forward as the page scrolls down", () => {
    let last = -Infinity;
    for (let y = 0; y < SECTION - VH; y += 97) {
      const time = timeAt(0, y);
      expect(time).toBeGreaterThanOrEqual(last);
      last = time;
    }
  });

  it("replays exactly on the way back: scroll is the only clock", () => {
    const y = 2.3 * SECTION;
    const first = computeTimeline(at(y), false);
    computeTimeline(at(4 * SECTION), false);
    computeTimeline(at(0.5 * SECTION), false);
    expect(computeTimeline(at(y), false)).toEqual(first);
  });

  it("names the film the visitor is in", () => {
    expect(computeTimeline(at(2.5 * SECTION), false)?.current).toBe(2);
    expect(computeTimeline(at(4.5 * SECTION), false)?.current).toBe(4);
  });

  it("shows each film's still in the reduced mode (quick read)", () => {
    FILMS.forEach((film, index) => {
      const y = index * SECTION + SECTION / 2;
      expect(timeAt(index, y, true)).toBe(film.still);
    });
  });

  it("switches stills where a section's top crosses the middle", () => {
    const top = 3 * SECTION;
    const before = computeTimeline(at(top - VH / 2 - 1), true)!;
    const after = computeTimeline(at(top - VH / 2), true)!;
    expect(before.films[3]?.opacity).toBe(0);
    expect(after.films[3]?.opacity).toBe(1);
  });
});
