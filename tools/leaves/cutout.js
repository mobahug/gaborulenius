/*
 * Leaves from photographs, for the cover: the leaf is cut out of a light,
 * neutral background (white, or a "transparency" checkerboard baked into
 * the picture), turned upright (stalk down, tip up), cropped to itself,
 * graded into the film's picture like the rendered leaves (see leaves.js),
 * and saved as WebP at two sizes.
 *
 * The background is what is bright and grey and reaches the edge of the
 * photo, plus the large enclosed bright grey holes (a monstera's); small
 * bright spots inside the leaf are its gloss and stay. Edge pixels lose the
 * background's light that was mixed into them.
 *
 * The photos themselves are not kept in the repository (photos/ is
 * ignored): put them there under the names in photos.js.
 */

const makeCanvas = (width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

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

/** The leaf's opacity at every pixel of the photo. */
const matte = (data, width, height, minHole) => {
  const count = width * height;
  // How much each pixel looks like the background: bright and grey.
  const grey = new Float32Array(count);
  const saturation = new Float32Array(count);
  const luma = new Float32Array(count);
  for (let index = 0; index < count; index += 1) {
    const r = data[index * 4] / 255;
    const g = data[index * 4 + 1] / 255;
    const b = data[index * 4 + 2] / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const s = max > 0 ? (max - min) / max : 0;
    const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    saturation[index] = s;
    luma[index] = y;
    grey[index] = (1 - smooth(0.045, 0.14, s)) * smooth(0.76, 0.9, y);
  }
  // Regions of background-like pixels; which are background.
  const label = new Int32Array(count).fill(-1);
  const background = new Uint8Array(count);
  const stack = new Int32Array(count);
  let regions = 0;
  for (let start = 0; start < count; start += 1) {
    if (label[start] !== -1 || grey[start] <= 0.5) continue;
    let top = 0;
    stack[top++] = start;
    label[start] = regions;
    const members = [];
    let edge = false;
    let sumS = 0;
    let sumY = 0;
    while (top > 0) {
      const index = stack[--top];
      members.push(index);
      sumS += saturation[index];
      sumY += luma[index];
      const x = index % width;
      const y = (index / width) | 0;
      if (x === 0 || y === 0 || x === width - 1 || y === height - 1)
        edge = true;
      const neighbours = [
        x > 0 ? index - 1 : -1,
        x < width - 1 ? index + 1 : -1,
        y > 0 ? index - width : -1,
        y < height - 1 ? index + width : -1,
      ];
      for (const other of neighbours) {
        if (other >= 0 && label[other] === -1 && grey[other] > 0.5) {
          label[other] = regions;
          stack[top++] = other;
        }
      }
    }
    const isBackground =
      edge ||
      (members.length >= minHole &&
        sumS / members.length < 0.06 &&
        sumY / members.length > 0.86);
    if (isBackground) members.forEach((index) => (background[index] = 1));
    regions += 1;
  }
  // Near the background, opacity follows how background-like a pixel is
  // (the soft edge); everywhere else the leaf is solid.
  const near = new Uint8Array(count);
  const reach = 2;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (!background[y * width + x]) continue;
      for (let dy = -reach; dy <= reach; dy += 1) {
        for (let dx = -reach; dx <= reach; dx += 1) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < width && ny < height)
            near[ny * width + nx] = 1;
        }
      }
    }
  }
  const alpha = new Float32Array(count);
  for (let index = 0; index < count; index += 1) {
    alpha[index] = near[index] ? 1 - smooth(0.3, 0.82, grey[index]) : 1;
  }
  return alpha;
};

/**
 * Cuts a leaf out of a photo:
 * - url: the photo
 * - base, tip: where its stalk and its tip are in the photo (px)
 * - minHole: enclosed bright grey regions at least this large are holes
 * - long: length of the image's long side (px); half-size one too
 * - saturation, haze, hazeColor, shade, grain, tint: as in leaves.js
 * - blur: depth-of-field blur (px, at the image's size)
 * Returns the two images and where the stalk is in them (fractions).
 */
export const cutout = async (spec) => {
  const image = new Image();
  image.src = spec.url;
  await image.decode();
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  const source = makeCanvas(width, height);
  const sourceContext = source.getContext("2d", { willReadFrequently: true });
  sourceContext.drawImage(image, 0, 0);
  const pixels = sourceContext.getImageData(0, 0, width, height);
  const data = pixels.data;
  const alpha = matte(data, width, height, spec.minHole ?? 400);
  // Take the background's light out of the edge pixels.
  const back = 245;
  for (let index = 0; index < width * height; index += 1) {
    const a = alpha[index];
    if (a < 0.999 && a > 0.01) {
      for (let channel = 0; channel < 3; channel += 1) {
        const value = data[index * 4 + channel];
        data[index * 4 + channel] = clamp((value - (1 - a) * back) / a, 0, 255);
      }
    }
    data[index * 4 + 3] = Math.round(a * 255);
  }
  sourceContext.putImageData(pixels, 0, 0);

  // Upright: the stalk-to-tip axis turned to point up.
  const [bx, by] = spec.base;
  const [tx, ty] = spec.tip;
  const angle = -Math.atan2(tx - bx, -(ty - by));
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const turnedWidth = Math.ceil(Math.abs(width * cos) + Math.abs(height * sin));
  const turnedHeight = Math.ceil(
    Math.abs(width * sin) + Math.abs(height * cos),
  );
  const turned = makeCanvas(turnedWidth, turnedHeight);
  const turnedContext = turned.getContext("2d", { willReadFrequently: true });
  turnedContext.imageSmoothingQuality = "high";
  turnedContext.translate(turnedWidth / 2, turnedHeight / 2);
  turnedContext.rotate(angle);
  turnedContext.drawImage(source, -width / 2, -height / 2);
  const turn = ([x, y]) => {
    const dx = x - width / 2;
    const dy = y - height / 2;
    return [
      dx * cos - dy * sin + turnedWidth / 2,
      dx * sin + dy * cos + turnedHeight / 2,
    ];
  };
  const stalk = turn(spec.base);

  // Cropped to the leaf (and its stalk).
  const turnedData = turnedContext.getImageData(
    0,
    0,
    turnedWidth,
    turnedHeight,
  ).data;
  let left = turnedWidth;
  let right = 0;
  let top = turnedHeight;
  let bottom = 0;
  for (let y = 0; y < turnedHeight; y += 1) {
    for (let x = 0; x < turnedWidth; x += 1) {
      if (turnedData[(y * turnedWidth + x) * 4 + 3] > 10) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }
  left = Math.min(left, stalk[0]);
  right = Math.max(right, stalk[0]);
  top = Math.min(top, stalk[1]);
  bottom = Math.max(bottom, stalk[1]);
  const margin = Math.round(Math.max(right - left, bottom - top) * 0.02);
  left = Math.max(0, Math.floor(left - margin));
  top = Math.max(0, Math.floor(top - margin));
  right = Math.min(turnedWidth, Math.ceil(right + margin));
  bottom = Math.min(turnedHeight, Math.ceil(bottom + margin));
  const cropWidth = right - left;
  const cropHeight = bottom - top;
  const scale = spec.long / Math.max(cropWidth, cropHeight);
  const outWidth = Math.round(cropWidth * scale);
  const outHeight = Math.round(cropHeight * scale);
  const out = makeCanvas(outWidth, outHeight);
  const outContext = out.getContext("2d", { willReadFrequently: true });
  outContext.imageSmoothingQuality = "high";
  outContext.drawImage(
    turned,
    left,
    top,
    cropWidth,
    cropHeight,
    0,
    0,
    outWidth,
    outHeight,
  );

  // Into the film's picture.
  const graded = outContext.getImageData(0, 0, outWidth, outHeight);
  const values = graded.data;
  const saturation = spec.saturation ?? 0.75;
  const haze = spec.haze ?? 0;
  const hazeColor = spec.hazeColor ?? [122, 142, 108];
  const dim = 1 - (spec.shade ?? 0);
  const grain = spec.grain ?? 5;
  const tint = spec.tint ?? [1, 1, 1];
  const next = random(spec.seed ?? 1);
  for (let index = 0; index < outWidth * outHeight; index += 1) {
    if (values[index * 4 + 3] === 0) continue;
    let r = values[index * 4] * dim * tint[0];
    let g = values[index * 4 + 1] * dim * tint[1];
    let b = values[index * 4 + 2] * dim * tint[2];
    const luma = 0.3 * r + 0.59 * g + 0.11 * b;
    r = luma + (r - luma) * saturation;
    g = luma + (g - luma) * saturation;
    b = luma + (b - luma) * saturation;
    r += (hazeColor[0] - r) * haze;
    g += (hazeColor[1] - g) * haze;
    b += (hazeColor[2] - b) * haze;
    const speck = (next() - 0.5) * grain;
    values[index * 4] = clamp(r + speck, 0, 255);
    values[index * 4 + 1] = clamp(g + speck, 0, 255);
    values[index * 4 + 2] = clamp(b + speck, 0, 255);
  }
  outContext.putImageData(graded, 0, 0);

  let result = out;
  if (spec.blur) {
    result = makeCanvas(outWidth, outHeight);
    const context = result.getContext("2d");
    context.filter = `blur(${spec.blur}px)`;
    context.drawImage(out, 0, 0);
  }
  const half = makeCanvas(Math.round(outWidth / 2), Math.round(outHeight / 2));
  const halfContext = half.getContext("2d");
  halfContext.imageSmoothingQuality = "high";
  halfContext.drawImage(result, 0, 0, half.width, half.height);
  return {
    full: result,
    half,
    origin: [(stalk[0] - left) / cropWidth, (stalk[1] - top) / cropHeight],
  };
};
