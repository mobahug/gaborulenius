import { assetUrl } from "../../utils/assets";

/**
 * The five films of the journey, in story order, and how each one is joined
 * to the one before it. See `docs/cinematic-audit.md` for what the footage
 * contains and why each seam is handled the way it is.
 *
 * The files in `public/film/` are scrub encodes of the delivered videos:
 * the same 193 frames at 24 fps, a keyframe every 8 frames, no frame
 * reordering (no B-frames), metadata first, BT.709 tags — made with
 * AVFoundation (`AVAssetWriter`). Each has a still frame (WebP) taken from
 * the delivered file at the film's `still` time.
 */

export type FilmId = "chase" | "neural" | "explorer" | "work" | "ending";

/** Scale around the centre, then a shift in fractions of the screen. */
export type Transform = { scale: number; x: number; y: number };

export type Portal = {
  opens: number;
  depth: number;
  track: ReadonlyArray<
    readonly [time: number, x: number, y: number, radius: number]
  >;
};

export type Seam = {
  /** Half-width of the blend around the boundary, in viewport heights. */
  blend: number;
  /**
   * Where the outgoing layer moves while the next film fades in over it:
   * across the blend, or, with `approach`, starting that many viewport
   * heights before the blend and arriving by its middle.
   */
  outgoing?: Transform;
  approach?: number;
  /**
   * Where the incoming film starts. It settles to rest as it fades in, or,
   * with `settle`, over that range of its own time (s).
   */
  incoming?: Transform & { settle?: readonly [number, number] };
  /**
   * A window into this film opening inside the previous one: from `opens`
   * (the previous film's time) the film shows through a circle that follows
   * `track` — keyframes of the previous film's time, and the circle's centre
   * and radius in its frame (fractions of the frame's width and height).
   * Inside it the film holds still on its `from` frame and comes closer as
   * the circle grows: tiny at first, growing `depth` times faster (on a log
   * scale) so it fills the screen just as the circle does, and only then
   * starts to play.
   */
  portal?: Portal;
};

export type Film = {
  id: FilmId;
  src: string;
  /** Duration of the file in seconds. */
  duration: number;
  /** How this film joins the one before it. */
  seam: Seam;
  /** Film time at the start of its section (s); 0 unless a portal leads in. */
  from?: number;
  /**
   * Horizontal focus (object-position, %) over film time on portrait
   * screens, where a 16:9 frame is cropped to its middle quarter.
   */
  focus: ReadonlyArray<readonly [time: number, x: number]>;
  /** Time of the still frame (s), shown instead of the film when motion
   * is reduced and while the film is still loading. */
  still: number;
  poster: string;
  /**
   * Mean brightness of the picture (0–1) every quarter second, measured
   * from the delivered file; the content's shade follows it.
   */
  light: readonly number[];
};

/** 193 frames at 24 fps. */
export const FILM_DURATION = 193 / 24;
/** Frame proportions of every film (864×496). */
export const FRAME_ASPECT = 864 / 496;

export const FILMS: readonly Film[] = [
  {
    id: "chase",
    src: assetUrl("film/chase.mp4"),
    duration: FILM_DURATION,
    // The first film starts at the top of the page; nothing comes before it.
    seam: { blend: 0 },
    // Portrait screens follow the macaw's eye into the close-up.
    focus: [
      [0, 50],
      [2.8, 52],
      [4.9, 56],
      [6.3, 50],
      [6.55, 30],
      [6.75, 46],
      [7.0, 49],
    ],
    // The path under the greeting, as on the cover.
    still: 0,
    poster: assetUrl("film/jungle_chase-still.webp"),
    light: [
      0.16, 0.16, 0.16, 0.17, 0.16, 0.15, 0.16, 0.16, 0.16, 0.16, 0.11, 0.07,
      0.09, 0.1, 0.09, 0.12, 0.15, 0.15, 0.15, 0.15, 0.19, 0.19, 0.18, 0.16,
      0.14, 0.14, 0.19, 0.3, 0.31, 0.26, 0.18, 0.08, 0,
    ],
  },
  {
    id: "neural",
    src: assetUrl("film/neural.mp4"),
    duration: FILM_DURATION,
    // The pupil is the window: the first spark of the network is a tiny
    // point inside it while the camera moves into the eye (the pupil
    // measured in every frame of the chase from 6.96 s), comes closer as the
    // pupil grows and fills the screen as the pupil does.
    seam: {
      blend: 0,
      portal: {
        opens: 6.96,
        depth: 1.3,
        track: [
          [6.96, 0.491, 0.397, 0.07],
          [7.0, 0.494, 0.405, 0.096],
          [7.1, 0.493, 0.403, 0.135],
          [7.2, 0.491, 0.399, 0.18],
          [7.3, 0.49, 0.404, 0.23],
          [7.4, 0.489, 0.405, 0.276],
          [7.5, 0.487, 0.404, 0.306],
          [7.6, 0.487, 0.405, 0.345],
          [7.7, 0.485, 0.408, 0.41],
          [7.8, 0.481, 0.4, 0.52],
          [7.875, 0.476, 0.395, 0.68],
          [7.92, 0.478, 0.4, 0.81],
          [8.0, 0.49, 0.42, 1.6],
        ],
      },
    },
    from: 0.4,
    focus: [[0, 50]],
    still: 3.5,
    poster: assetUrl("film/neural_decomplier-still.webp"),
    light: [
      0.01, 0.01, 0.02, 0.02, 0.02, 0.03, 0.03, 0.03, 0.04, 0.04, 0.05, 0.05,
      0.07, 0.08, 0.11, 0.13, 0.15, 0.14, 0.13, 0.12, 0.13, 0.14, 0.17, 0.2,
      0.22, 0.23, 0.21, 0.22, 0.27, 0.37, 0.64, 0.91, 0.99,
    ],
  },
  {
    id: "explorer",
    src: assetUrl("film/explorer.mp4"),
    duration: FILM_DURATION,
    // The bright node's white → the sky's warm white; no black in between.
    seam: { blend: 0.1 },
    focus: [
      [0, 50],
      [2.1, 50],
      [3.5, 52],
      [4.9, 50],
      [7.0, 48],
    ],
    still: 1.6,
    poster: assetUrl("film/the_explorer-still.webp"),
    light: [
      0.81, 0.42, 0.39, 0.38, 0.38, 0.4, 0.43, 0.44, 0.43, 0.45, 0.38, 0.39,
      0.44, 0.45, 0.44, 0.5, 0.47, 0.55, 0.34, 0.27, 0.27, 0.28, 0.28, 0.28,
      0.28, 0.29, 0.3, 0.32, 0.33, 0.34, 0.32, 0.1, 0,
    ],
  },
  {
    id: "work",
    src: assetUrl("film/work.mp4"),
    duration: FILM_DURATION,
    // The fish's mouth closes to black; the espresso surfaces from black.
    seam: { blend: 0.05 },
    focus: [
      [0, 50],
      [2.8, 52],
      [4.2, 58],
      [5.6, 60],
      [6.3, 52],
      [7.0, 42],
      [8, 50],
    ],
    still: 4.9,
    poster: assetUrl("film/work_history-still.webp"),
    light: [
      0, 0, 0.03, 0.07, 0.08, 0.09, 0.08, 0.14, 0.39, 0.44, 0.44, 0.48, 0.46,
      0.44, 0.45, 0.47, 0.47, 0.48, 0.5, 0.52, 0.52, 0.52, 0.51, 0.5, 0.5, 0.5,
      0.55, 0.55, 0.5, 0.43, 0.36, 0.31, 0.29,
    ],
  },
  {
    id: "ending",
    src: assetUrl("film/ending.mp4"),
    duration: FILM_DURATION,
    // The office leaf and the jungle's first leaf are nearly the same frame
    // (the jungle one a touch closer and lower). The camera keeps pushing
    // into the office leaf until its veins and holes lie on the jungle
    // leaf's, then the jungle leaf dissolves in. Both are slightly enlarged,
    // so no edge ever shows, and the jungle leaf is anchored low enough to
    // keep the dark edge along the bottom of its first second off screen;
    // it eases back once its shot has changed.
    seam: {
      blend: 0.15,
      outgoing: { scale: 1.09, x: 0, y: 0.043 },
      approach: 0.3,
      incoming: { scale: 1.11, x: 0, y: 0.03, settle: [1.0, 1.8] },
    },
    // Portrait screens follow the macaw in, stay with it on its branch,
    // then go with the butterfly down to its leaf.
    focus: [
      [0, 50],
      [2.8, 50],
      [3.5, 64],
      [4.2, 62],
      [4.9, 46],
      [5.6, 22],
      [6.4, 18],
      [7.2, 78],
      [7.8, 86],
    ],
    still: 7.8,
    poster: assetUrl("film/ending-still.webp"),
    light: [
      0.28, 0.27, 0.24, 0.25, 0.18, 0.22, 0.26, 0.18, 0.18, 0.21, 0.26, 0.26,
      0.2, 0.24, 0.26, 0.27, 0.3, 0.3, 0.31, 0.31, 0.32, 0.33, 0.33, 0.33, 0.34,
      0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34,
    ],
  },
];

export const filmIndex = (id: FilmId) =>
  FILMS.findIndex((film) => film.id === id);
