import { describe, expect, it } from "vitest";
import type { FilmId } from "../film/films";
import { Mixer, sceneAt, type TrackId } from "./soundscape";

/** A frame in `chapter`, each film at its time (chase, neural, explorer,
 * work, ending), maybe crossing a seam. */
const frame = (
  chapter: FilmId,
  times: Array<number | null>,
  transition: { from: FilmId; to: FilmId; progress: number } | null = null,
) =>
  ({
    activeChapter: chapter,
    transition,
    stage: { presented: times },
    timeline: { films: [], current: 0 },
  }) as unknown as Parameters<typeof sceneAt>[0];

const NONE = [null, null, null, null, null];

describe("the sound of each scene", () => {
  it("is the film's own", () => {
    expect(sceneAt(frame("chase", NONE))).toBe("jungle");
    expect(sceneAt(frame("neural", NONE))).toBe("neural");
    expect(sceneAt(frame("work", NONE))).toBe("office");
    expect(sceneAt(frame("ending", NONE))).toBe("jungle");
  });

  it("across a seam, is the film that shows the most", () => {
    const seam = (progress: number) =>
      sceneAt(frame("chase", NONE, { from: "chase", to: "neural", progress }));
    expect(seam(0.3)).toBe("jungle");
    expect(seam(0.7)).toBe("neural");
  });

  it("goes under the water with the Explorer's camera", () => {
    const at = (time: number) =>
      sceneAt(frame("explorer", [null, null, time, null, null]));
    expect(at(2)).toBe("wetland");
    expect(at(6)).toBe("underwater");
  });
});

const SCREEN = 900;

/** Runs the mixer through [from, to] ms, 40 ms at a time, the page at
 * `y(t)`, seeing `scene(t)`; the levels at the end. */
const run = (
  mixer: Mixer,
  from: number,
  to: number,
  y: (t: number) => number,
  scene: (t: number) => TrackId,
) => {
  let levels = mixer.step(from, y(from), SCREEN);
  for (let t = from; t <= to; t += 40) {
    mixer.see(scene(t), t);
    levels = mixer.step(t, y(t), SCREEN);
  }
  return levels;
};

const still = () => 0;

/** A mixer turned on at 0 on the jungle, which has faded in by 3 s. */
const playing = () => {
  const mixer = new Mixer();
  mixer.start(0);
  run(mixer, 0, 3000, still, () => "jungle");
  return mixer;
};

describe("when each sound plays", () => {
  it("fades the scene's sound in when the sound is turned on", () => {
    const mixer = new Mixer();
    mixer.start(0);
    const halfway = run(mixer, 0, 1000, still, () => "jungle");
    expect(halfway.jungle).toBeGreaterThan(0.1);
    expect(halfway.jungle).toBeLessThan(0.5);
    expect(run(mixer, 1040, 2200, still, () => "jungle").jungle).toBe(1);
  });

  it("fades the next scene's sound in once the visitor has stayed on it", () => {
    const mixer = playing();
    const neural = () => "neural" as const;
    const waiting = run(mixer, 3040, 3400, still, neural);
    expect(waiting.neural).toBe(0);
    expect(waiting.jungle).toBeGreaterThan(0);
    const crossing = run(mixer, 3440, 4300, still, neural);
    expect(crossing.jungle).toBe(0);
    expect(crossing.neural).toBeGreaterThan(0);
    expect(run(mixer, 4340, 5600, still, neural).neural).toBe(1);
  });

  it("stays quiet while the visitor skims through", () => {
    const mixer = playing();
    // Three screens a second, through a scene a second.
    const skim = (t: number) => ((t - 3000) / 1000) * 3 * SCREEN;
    const scenes: TrackId[] = ["jungle", "neural", "wetland", "office"];
    const passing = (t: number) => scenes[Math.floor((t - 3000) / 1000) % 4];
    const skimmed = run(mixer, 3040, 8000, skim, passing);
    expect(Object.values(skimmed).every((level) => level === 0)).toBe(true);
    expect(mixer.upcoming).toBeNull();
    // Landing on the office: its sound comes once the page is calm.
    const landed = skim(8000);
    const office = () => "office" as const;
    expect(run(mixer, 8040, 8600, () => landed, office).office).toBe(0);
    expect(run(mixer, 8640, 11000, () => landed, office).office).toBe(1);
  });

  it.each([
    ["half a screen in 0.4 s, every 1.5 s", 0.5, 400, 1500],
    ["a page turned with the keyboard, every 2 s", 1, 300, 2000],
  ])("keeps playing while the visitor reads on: %s", (_, size, ms, every) => {
    const mixer = playing();
    const reading = (t: number) => {
      const since = t - 3000;
      const into = Math.min(1, (since % every) / ms);
      return (Math.floor(since / every) + into) * size * SCREEN;
    };
    let lowest = 1;
    for (let t = 3040; t <= 12000; t += 40) {
      lowest = Math.min(
        lowest,
        run(mixer, t, t, reading, () => "jungle").jungle,
      );
    }
    expect(lowest).toBe(1);
  });

  it("brings a sound back as soon as the page slows down", () => {
    const mixer = playing();
    const jungle = () => "jungle" as const;
    // A second at three screens a second, then still.
    const skim = (t: number) =>
      ((Math.min(t, 4000) - 3000) / 1000) * 3 * SCREEN;
    const faded = run(mixer, 3040, 4000, skim, jungle).jungle;
    expect(faded).toBeLessThan(0.5);
    expect(run(mixer, 4040, 4800, skim, jungle).jungle).toBeGreaterThan(faded);
  });
});
