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

/**
 * Scale around the centre of the screen, then a shift in fractions of the
 * film's frame as displayed.
 */
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
   * Both films go out of focus into each other: the outgoing one blurs by
   * `blur` (a fraction of the frame's height) as it moves to its outgoing
   * transform, the incoming one arrives just as blurred and comes back into
   * focus over `clear`, a range of its own time (s).
   */
  soften?: { blur: number; clear: readonly [number, number] };
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
   * More stills for a long film, from the time each is for: while the video
   * loads (after a jump), the one nearest before the scroll's time stands
   * in, instead of a frame from somewhere else in the film.
   */
  posters?: ReadonlyArray<readonly [time: number, url: string]>;
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
    // The path under the greeting, as on the cover. Graded when encoded
    // (richer greens: saturation 1.16, contrast 1.12, vibrance 0.2, gamma
    // 0.94); it still ends on black.
    still: 0,
    poster: assetUrl("film/jungle_chase-still.webp"),
    posters: [
      [5.3, assetUrl("film/jungle_chase-still-macaw.webp")],
      [6.9, assetUrl("film/jungle_chase-still-eye.webp")],
    ],
    light: [
      0.18, 0.18, 0.19, 0.19, 0.17, 0.16, 0.18, 0.26, 0.32, 0.13, 0.13, 0.15,
      0.18, 0.21, 0.19, 0.35, 0.38, 0.17, 0.18, 0.17, 0.31, 0.26, 0.33, 0.3,
      0.28, 0.33, 0.32, 0.4, 0.33, 0.37, 0.36, 0.18, 0.0,
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
    // 239 frames at 30 fps.
    duration: 239 / 30,
    // The office film ends pushing into a monstera leaf; the ending opens on
    // the same leaf, 1.306 times closer and 1.6 % to the right (measured
    // between the last and the first frame). The office leaf is pushed in by
    // that much more (on top of the jungle leaf's own framing) until its
    // veins and holes lie on the jungle leaf's, then the jungle leaf
    // dissolves in. The jungle leaf opens enlarged and lowered, keeping the
    // dark band along the bottom of its first second off screen, and eases
    // back once its shot has turned into the jungle.
    //
    // The two leaves are not the same plant: their holes and colours differ.
    // So the office leaf goes out of focus as the camera closes in, the
    // jungle leaf arrives just as soft, and the two melt into one another;
    // the jungle leaf only comes back into focus where its own shot starts
    // to defocus (from about 0.55 s), so it is never sharp until the jungle.
    seam: {
      blend: 0.2,
      outgoing: { scale: 1.567, x: -0.0244, y: 0.0834 },
      approach: 0.3,
      incoming: { scale: 1.2, x: 0, y: 0.08, settle: [1.15, 1.9] },
      soften: { blur: 0.014, clear: [0.55, 1.1] },
    },
    // Portrait screens follow the macaw in and onto its branch, then go
    // with the morpho to where it settles.
    focus: [
      [0, 50],
      [3.0, 50],
      [3.9, 64],
      [4.3, 78],
      [4.8, 75],
      [5.8, 73],
      [6.4, 48],
      [7.0, 50],
    ],
    // The macaw on its branch, the morpho beside it.
    still: 7.8,
    poster: assetUrl("film/ending-still.webp"),
    light: [
      0.31, 0.3, 0.29, 0.28, 0.24, 0.18, 0.15, 0.14, 0.16, 0.22, 0.17, 0.16,
      0.2, 0.22, 0.24, 0.26, 0.24, 0.24, 0.24, 0.24, 0.26, 0.28, 0.29, 0.3,
      0.29, 0.29, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28,
    ],
  },
];

export const filmIndex = (id: FilmId) =>
  FILMS.findIndex((film) => film.id === id);
