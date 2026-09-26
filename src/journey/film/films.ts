import { assetUrl } from "../../utils/assets";

/**
 * The five films of the journey, in story order, and how each one is joined
 * to the one before it. See `docs/cinematic-audit.md` for what the footage
 * contains and why each seam is handled the way it is.
 *
 * `public/film/hd/` and `public/film/sd/` hold scrub encodes of the
 * delivered full-HD videos: 1880×1080 for large screens and 1128×648 for
 * phones and light connections (the chase, delivered at 1920×1080, is cut to
 * the same 47:27 frame), a keyframe every 8 frames, no frame reordering (no
 * B-frames), metadata first, BT.709 tags — made with AVFoundation
 * (`AVAssetWriter`). Each film also has a still frame (WebP) at its `still`
 * time.
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
  /** The film at full HD, and lighter for phones and slow connections. */
  src: { hd: string; sd: string };
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

/** Frame proportions of every film (1880×1080 and 1128×648). */
export const FRAME_ASPECT = 1880 / 1080;

const sources = (id: FilmId) => ({
  hd: assetUrl(`film/hd/${id}.mp4`),
  sd: assetUrl(`film/sd/${id}.mp4`),
});

export const FILMS: readonly Film[] = [
  {
    id: "chase",
    src: sources("chase"),
    // 193 frames at 24 fps.
    duration: 193 / 24,
    // The first film starts at the top of the page; nothing comes before it.
    seam: { blend: 0 },
    // Portrait screens follow the morpho across the path, the macaw across
    // the clearing (measured in every frame), then its eye into the
    // close-up.
    focus: [
      [0, 50],
      [1.4, 50],
      [1.55, 72],
      [1.75, 62],
      [1.95, 48],
      [2.25, 38],
      [2.55, 40],
      [2.9, 58],
      [3.15, 57],
      [3.5, 46],
      [3.8, 42],
      [4.1, 32],
      [4.6, 22],
      [4.9, 24],
      [5.2, 30],
      [5.5, 40],
      [5.9, 47],
      [6.3, 49.5],
      [6.9, 51],
      [7.6, 51.3],
    ],
    // The path under the greeting, as on the cover.
    still: 0,
    poster: assetUrl("film/jungle_chase-still.webp"),
    light: [
      0.19, 0.19, 0.2, 0.19, 0.18, 0.18, 0.24, 0.29, 0.24, 0.15, 0.16, 0.18,
      0.2, 0.2, 0.23, 0.29, 0.35, 0.19, 0.19, 0.22, 0.28, 0.26, 0.37, 0.26,
      0.28, 0.35, 0.35, 0.34, 0.34, 0.36, 0.31, 0.11, 0.01,
    ],
  },
  {
    id: "neural",
    src: sources("neural"),
    // 240 frames at 30 fps.
    duration: 8,
    // The pupil is the window: the first spark of the network is a tiny
    // point inside it while the camera moves into the eye (the pupil
    // measured in every frame of the chase from 6.92 s, then followed past
    // the edges of the frame), comes closer as the pupil grows and fills the
    // screen as the pupil does.
    seam: {
      blend: 0,
      portal: {
        opens: 6.917,
        depth: 1.3,
        track: [
          [6.917, 0.51, 0.5, 0.077],
          [6.958, 0.509, 0.497, 0.082],
          [7.0, 0.508, 0.496, 0.088],
          [7.042, 0.507, 0.491, 0.094],
          [7.083, 0.505, 0.49, 0.101],
          [7.125, 0.503, 0.487, 0.109],
          [7.167, 0.504, 0.489, 0.117],
          [7.208, 0.509, 0.487, 0.128],
          [7.25, 0.513, 0.493, 0.139],
          [7.292, 0.513, 0.5, 0.151],
          [7.333, 0.513, 0.507, 0.165],
          [7.375, 0.513, 0.507, 0.181],
          [7.417, 0.512, 0.507, 0.2],
          [7.458, 0.513, 0.51, 0.222],
          [7.5, 0.513, 0.516, 0.246],
          [7.542, 0.513, 0.515, 0.275],
          [7.583, 0.513, 0.517, 0.311],
          [7.625, 0.513, 0.521, 0.354],
          [7.667, 0.512, 0.533, 0.421],
          [7.708, 0.516, 0.534, 0.505],
          [7.75, 0.517, 0.546, 0.589],
          [7.792, 0.519, 0.569, 0.683],
          [7.833, 0.522, 0.604, 0.79],
          [7.875, 0.524, 0.62, 0.92],
          [7.917, 0.526, 0.63, 1.08],
          [8.042, 0.53, 0.64, 1.7],
        ],
      },
    },
    from: 0.4,
    focus: [[0, 50]],
    still: 3.5,
    poster: assetUrl("film/neural_decomplier-still.webp"),
    light: [
      0.01, 0.01, 0.01, 0.02, 0.02, 0.02, 0.03, 0.03, 0.04, 0.04, 0.05, 0.05,
      0.06, 0.08, 0.11, 0.13, 0.15, 0.14, 0.13, 0.12, 0.13, 0.14, 0.17, 0.2,
      0.22, 0.22, 0.21, 0.22, 0.27, 0.38, 0.65, 0.93, 0.99,
    ],
  },
  {
    id: "explorer",
    src: sources("explorer"),
    // 240 frames at 30 fps.
    duration: 8,
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
      0.77, 0.4, 0.38, 0.37, 0.38, 0.39, 0.43, 0.44, 0.42, 0.45, 0.37, 0.39,
      0.43, 0.44, 0.43, 0.5, 0.46, 0.54, 0.31, 0.26, 0.26, 0.27, 0.28, 0.27,
      0.28, 0.29, 0.3, 0.32, 0.32, 0.33, 0.3, 0.06, 0,
    ],
  },
  {
    id: "work",
    src: sources("work"),
    // 239 frames at 30 fps.
    duration: 239 / 30,
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
      0, 0, 0.03, 0.06, 0.08, 0.08, 0.07, 0.16, 0.4, 0.43, 0.44, 0.48, 0.45,
      0.43, 0.45, 0.46, 0.46, 0.48, 0.5, 0.51, 0.52, 0.51, 0.5, 0.5, 0.5, 0.49,
      0.55, 0.53, 0.48, 0.41, 0.34, 0.3, 0.3,
    ],
  },
  {
    id: "ending",
    src: sources("ending"),
    // 240 frames at 30 fps.
    duration: 8,
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
      0.28, 0.26, 0.23, 0.23, 0.18, 0.22, 0.24, 0.17, 0.18, 0.21, 0.26, 0.25,
      0.2, 0.23, 0.25, 0.27, 0.29, 0.3, 0.3, 0.3, 0.32, 0.32, 0.32, 0.33, 0.33,
      0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34,
    ],
  },
];

export const filmIndex = (id: FilmId) =>
  FILMS.findIndex((film) => film.id === id);
