/*
 * The cover's leaves in the film's own look, the last step after leaves.js
 * and cutout.js (whose results are in renders/): the jungle behind them is
 * soft, hazy and lit from within, so each leaf
 *
 * - takes on the colours of the film around the place it hangs in: its
 *   lightness and colour (in Lab) move toward the film's there, their mean
 *   and their spread, a leaf near the camera a little darker than what is
 *   behind it;
 * - is lifted by the film's haze, which is the colour of that place;
 * - glows where it is lit, as the film's lights do;
 * - goes out of focus as much as it is near the camera (the camera is
 *   focused on the path);
 * - has the film's grain.
 *
 * Each leaf gets a margin as wide as its blur, so its soft edge never meets
 * the edge of its image: the cover places it by its new size and stalk
 * (CoverSection.tsx: `size`, `origin` and the widths grow with the margin).
 *
 * renders/ holds the large images leaves.js and cutout.js make; this makes
 * both sizes for public/cover/ (see filmlook.html).
 */

const makeCanvas = (width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

const loadImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Cannot load ${url}`));
    image.src = url;
  });

const random = (seed) => {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// sRGB ⇄ CIE Lab (D65).
const toLinear = (value) =>
  value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
const toGamma = (value) =>
  value <= 0.0031308 ? value * 12.92 : 1.055 * value ** (1 / 2.4) - 0.055;
const WHITE = [0.95047, 1, 1.08883];
const f = (t) =>
  t > 216 / 24389 ? Math.cbrt(t) : (t * 24389) / 27 / 116 + 16 / 116;
const fInverse = (t) =>
  t ** 3 > 216 / 24389 ? t ** 3 : (116 * t - 16) / (24389 / 27);

const toLab = (red, green, blue) => {
  const r = toLinear(red / 255);
  const g = toLinear(green / 255);
  const b = toLinear(blue / 255);
  const x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / WHITE[0];
  const y = (0.2126 * r + 0.7152 * g + 0.0722 * b) / WHITE[1];
  const z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / WHITE[2];
  const fy = f(y);
  return [116 * fy - 16, 500 * (f(x) - fy), 200 * (fy - f(z))];
};

const fromLab = (lightness, a, b) => {
  const fy = (lightness + 16) / 116;
  const x = fInverse(fy + a / 500) * WHITE[0];
  const y = fInverse(fy) * WHITE[1];
  const z = fInverse(fy - b / 200) * WHITE[2];
  const r = 3.2406 * x - 1.5372 * y - 0.4986 * z;
  const g = -0.9689 * x + 1.8758 * y + 0.0415 * z;
  const bl = 0.0557 * x - 0.204 * y + 1.057 * z;
  return [r, g, bl].map((value) =>
    Math.round(255 * Math.min(1, Math.max(0, toGamma(Math.max(0, value))))),
  );
};

/** Mean and spread of lightness and colour, and the mean colour (sRGB), of
 * the pixels `weight` counts. */
const statistics = (data, weight) => {
  const sum = [0, 0, 0];
  const squares = [0, 0, 0];
  const rgb = [0, 0, 0];
  let total = 0;
  for (let index = 0; index < data.length; index += 4) {
    const w = weight(index);
    if (w <= 0) continue;
    const lab = toLab(data[index], data[index + 1], data[index + 2]);
    for (let channel = 0; channel < 3; channel += 1) {
      sum[channel] += w * lab[channel];
      squares[channel] += w * lab[channel] * lab[channel];
      rgb[channel] += w * data[index + channel];
    }
    total += w;
  }
  const mean = sum.map((value) => value / total);
  const spread = squares.map((value, channel) =>
    Math.sqrt(Math.max(1e-6, value / total - mean[channel] ** 2)),
  );
  return { mean, spread, color: rgb.map((value) => value / total) };
};

/**
 * The film's picture in `region` (fractions of a 1440 × 900 screen showing
 * the cover, which crops the film to its middle).
 */
const filmRegion = (still, region) => {
  const screen = [1440, 900];
  const scale = Math.max(screen[0] / still.width, screen[1] / still.height);
  const shown = [still.width * scale, still.height * scale];
  const offset = [(shown[0] - screen[0]) / 2, (shown[1] - screen[1]) / 2];
  const [x0, y0, x1, y1] = region;
  const left = Math.round((x0 * screen[0] + offset[0]) / scale);
  const top = Math.round((y0 * screen[1] + offset[1]) / scale);
  const width = Math.max(1, Math.round(((x1 - x0) * screen[0]) / scale));
  const height = Math.max(1, Math.round(((y1 - y0) * screen[1]) / scale));
  const canvas = makeCanvas(width, height);
  canvas
    .getContext("2d")
    .drawImage(still, left, top, width, height, 0, 0, width, height);
  const { data } = canvas.getContext("2d").getImageData(0, 0, width, height);
  return statistics(data, () => 1);
};

/**
 * One leaf in the film's look. `spec`: its name, where it hangs on the
 * cover (`region`), how wide it is shown there (`vw`, on a 1440 px wide
 * screen) and how it is graded: `tone` and `match` (0–1, how far its
 * lightness and its colours move to the film's), `light` (the lightness it
 * moves to, against the film's), `contrast` (its spread of lightness,
 * against the film's), `haze`, `glow`, `blur` (CSS px on that screen) and
 * `grain` (levels of 255).
 */
export const filmLook = async (spec, still) => {
  const image = await loadImage(`renders/${spec.name}.webp`);
  const { width, height } = image;
  const source = makeCanvas(width, height);
  const context = source.getContext("2d", { willReadFrequently: true });
  context.drawImage(image, 0, 0);
  const pixels = context.getImageData(0, 0, width, height);
  const { data } = pixels;

  const film = filmRegion(still, spec.region);
  const leaf = statistics(data, (index) => (data[index + 3] > 128 ? 1 : 0));
  const target = film.mean.map((mean, channel) =>
    channel === 0 ? mean * spec.light : mean,
  );
  const spread = film.spread.map((value, channel) =>
    channel === 0 ? value * spec.contrast : value,
  );
  // Lightness moves by `tone`, colour by `match`.
  const strength = (channel) => (channel === 0 ? spec.tone : spec.match);
  const shift = leaf.mean.map(
    (mean, channel) => mean + (target[channel] - mean) * strength(channel),
  );
  const stretch = leaf.spread.map(
    (value, channel) => 1 + (spread[channel] / value - 1) * strength(channel),
  );
  const haze = film.color;

  // Its colours moved to the film's, then the haze over them.
  const glow = new Float32Array(width * height);
  for (let index = 0; index < data.length; index += 4) {
    if (data[index + 3] === 0) continue;
    const lab = toLab(data[index], data[index + 1], data[index + 2]);
    const moved = lab.map(
      (value, channel) =>
        shift[channel] + (value - leaf.mean[channel]) * stretch[channel],
    );
    const rgb = fromLab(...moved);
    for (let channel = 0; channel < 3; channel += 1) {
      data[index + channel] = Math.round(
        rgb[channel] + (haze[channel] - rgb[channel]) * spec.haze,
      );
    }
    // What glows: the lit part of the leaf.
    glow[index / 4] =
      Math.max(0, (moved[0] - 55) / 45) * (data[index + 3] / 255);
  }
  context.putImageData(pixels, 0, 0);

  // The glow: its lights, spread wide, added back where the leaf is.
  if (spec.glow > 0) {
    const lights = makeCanvas(width, height);
    const lightsContext = lights.getContext("2d");
    const lightPixels = lightsContext.createImageData(width, height);
    for (let pixel = 0; pixel < glow.length; pixel += 1) {
      const index = pixel * 4;
      lightPixels.data[index] = data[index];
      lightPixels.data[index + 1] = data[index + 1];
      lightPixels.data[index + 2] = data[index + 2];
      lightPixels.data[index + 3] = Math.round(255 * Math.min(1, glow[pixel]));
    }
    lightsContext.putImageData(lightPixels, 0, 0);
    const spreadOut = makeCanvas(width, height);
    const spreadContext = spreadOut.getContext("2d");
    spreadContext.filter = `blur(${Math.round(width / 40)}px)`;
    spreadContext.drawImage(lights, 0, 0);
    spreadContext.filter = "none";
    // Only on the leaf.
    spreadContext.globalCompositeOperation = "destination-in";
    spreadContext.drawImage(source, 0, 0);
    context.save();
    context.globalCompositeOperation = "screen";
    context.globalAlpha = spec.glow;
    context.drawImage(spreadOut, 0, 0);
    context.restore();
  }

  // Out of focus, with room around it for its soft edge.
  const imageBlur = (spec.blur * width) / ((spec.vw / 100) * 1440);
  const margin = Math.ceil(imageBlur * 2.5);
  const full = makeCanvas(width + 2 * margin, height + 2 * margin);
  const fullContext = full.getContext("2d", { willReadFrequently: true });
  fullContext.filter =
    imageBlur >= 0.3 ? `blur(${imageBlur.toFixed(2)}px)` : "none";
  fullContext.drawImage(source, margin, margin);
  fullContext.filter = "none";

  // The film's grain.
  if (spec.grain > 0) {
    const next = random(spec.seed ?? 1);
    const final = fullContext.getImageData(0, 0, full.width, full.height);
    for (let index = 0; index < final.data.length; index += 4) {
      if (final.data[index + 3] === 0) continue;
      const noise = (next() + next() + next() - 1.5) * spec.grain * 1.4;
      for (let channel = 0; channel < 3; channel += 1) {
        final.data[index + channel] = Math.min(
          255,
          Math.max(0, final.data[index + channel] + noise),
        );
      }
    }
    fullContext.putImageData(final, 0, 0);
  }

  const half = makeCanvas(
    Math.ceil(full.width / 2),
    Math.ceil(full.height / 2),
  );
  const halfContext = half.getContext("2d");
  halfContext.imageSmoothingQuality = "high";
  halfContext.drawImage(full, 0, 0, half.width, half.height);
  return {
    full,
    half,
    margin,
    film,
    leaf,
  };
};

/**
 * Where each leaf hangs on the cover (fractions of the screen), how wide it
 * is shown on a wide screen (vw, as in CoverSection.tsx) and its grade. The
 * ones near the camera are the softest and darkest; the ones high up in the
 * light keep the most of it.
 */
export const FILM_LOOK = [
  {
    name: "banana-high",
    region: [0, 0, 0.36, 0.42],
    vw: 15,
    tone: 0.5,
    match: 0.6,
    light: 1.0,
    contrast: 0.85,
    haze: 0.14,
    glow: 0.3,
    blur: 2.4,
    grain: 3,
    seed: 11,
  },
  {
    name: "palm-high",
    region: [0.66, 0, 1, 0.4],
    vw: 34,
    tone: 0.5,
    match: 0.6,
    light: 1.1,
    contrast: 0.85,
    haze: 0.16,
    glow: 0.3,
    blur: 2.0,
    grain: 3,
    seed: 12,
  },
  {
    name: "alocasia",
    region: [0.84, 0.52, 1, 1],
    vw: 30,
    tone: 0.45,
    match: 0.6,
    light: 1.6,
    contrast: 0.9,
    haze: 0.1,
    glow: 0.2,
    blur: 3.2,
    grain: 3,
    seed: 13,
  },
  {
    name: "monstera",
    region: [0, 0.64, 0.3, 1],
    vw: 27,
    tone: 0.4,
    match: 0.55,
    light: 1.2,
    contrast: 0.9,
    haze: 0.08,
    glow: 0.15,
    blur: 4.2,
    grain: 3,
    seed: 14,
  },
  {
    name: "fern-near",
    region: [0, 0.62, 0.3, 1],
    vw: 15,
    tone: 0.4,
    match: 0.6,
    light: 1.2,
    contrast: 0.9,
    haze: 0.08,
    glow: 0.15,
    blur: 3.8,
    grain: 3,
    seed: 15,
  },
  {
    name: "heart-near",
    region: [0.7, 0.74, 1, 1],
    vw: 34,
    tone: 0.45,
    match: 0.55,
    light: 1.8,
    contrast: 0.9,
    haze: 0.08,
    glow: 0.12,
    blur: 5.0,
    grain: 3,
    seed: 16,
  },
];
