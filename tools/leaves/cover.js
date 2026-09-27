/*
 * The cover's leaves: what each image is, and how its leaf is lit. Every
 * leaf is rendered upright (stalk down, tip up); the cover turns it into
 * place (`rotate`, in degrees, the same as in CoverSection.tsx), so its
 * light is the scene's — the sun high above the path, a little to the
 * right — turned back by as much.
 *
 * `size` is the large image (for 2× screens); a half-size one is made too.
 * The monstera, the banana leaf and the fern come from photographs instead
 * (photos.js).
 */

/** The sun on the cover (x right, y down, z toward the viewer). */
const SUN = [0.18, -0.8, 0.55];

const lightFor = (rotate) => {
  const angle = (rotate * Math.PI) / 180;
  const [x, y, z] = SUN;
  return [
    x * Math.cos(angle) + y * Math.sin(angle),
    -x * Math.sin(angle) + y * Math.cos(angle),
    z,
  ];
};

const leaf = (spec) => ({
  quality: 0.8,
  ...spec,
  light: lightFor(spec.rotate),
});

export const COVER_LEAVES = [
  // Hanging from the top right, lit through.
  leaf({
    name: "palm-high",
    species: "palm",
    seed: 9,
    rotate: 206,
    haze: 0.2,
    saturation: 0.72,
    size: [900, 1100],
    origin: [0.32, 0.97],
    scale: 0.9,
    backlight: 0.8,
    shade: 0.04,
    dry: 0.35,
    blemish: 0.2,
    domeRadius: 1.2,
    foldRadius: 2.2,
    foldLevel: 1,
    fold: 1.6,
    blur: 1.4,
  }),
  // In from the right edge, half in the light.
  leaf({
    name: "alocasia",
    species: "alocasia",
    seed: 3,
    rotate: -52,
    haze: 0.14,
    saturation: 0.74,
    size: [900, 1240],
    origin: [0.5, 0.62],
    scale: 0.56,
    bend: -0.06,
    turn: 0.2,
    backlight: 0.3,
    shade: 0.32,
    dry: 0.3,
    blemish: 0.35,
    blur: 1.8,
  }),
  leaf({
    name: "heart-near",
    species: "heart",
    seed: 5,
    rotate: -28,
    size: [640, 820],
    origin: [0.5, 0.74],
    scale: 0.64,
    bend: -0.1,
    turn: 0.1,
    backlight: 0.1,
    shade: 0.48,
    dry: 0.2,
    blemish: 0.2,
    blur: 4,
    quality: 0.72,
  }),
];
