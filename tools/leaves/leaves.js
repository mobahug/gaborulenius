/*
 * The cover's jungle leaves, rendered offline into WebP images
 * (public/cover/). Each species is built from its structure — outline,
 * midrib and veins, splits, holes and tears — into maps (shape, height,
 * veins, thickness), and then lit per pixel: the blade's curvature and
 * raised veins catch the light, glossy leaves shine, thin tissue glows when
 * light comes through it from behind, fine veinlets and blemishes break up
 * the surface, and dry margins brown. Everything is seeded, so the same
 * leaves come out every time.
 *
 * Open leaves.html in Chrome to preview them and download the images.
 */

// ---------------------------------------------------------------- basics

const SS = 2; // supersampling

const makeCanvas = (width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
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

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const mix = (a, b, t) => a + (b - a) * t;
const mix3 = (a, b, t) => [
  mix(a[0], b[0], t),
  mix(a[1], b[1], t),
  mix(a[2], b[2], t),
];
const smooth = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

/** Gradient noise (Perlin-like), about −0.7 … 0.7. */
const makeNoise = (seed) => {
  const next = random(seed);
  const table = Array.from({ length: 256 }, (_, index) => index);
  for (let index = 255; index > 0; index -= 1) {
    const other = Math.floor(next() * (index + 1));
    [table[index], table[other]] = [table[other], table[index]];
  }
  const perm = new Uint8Array(512);
  for (let index = 0; index < 512; index += 1) perm[index] = table[index & 255];
  const gradient = (hash, x, y) => {
    const angle = ((hash & 15) / 16) * Math.PI * 2;
    return Math.cos(angle) * x + Math.sin(angle) * y;
  };
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  return (x, y) => {
    const X = Math.floor(x);
    const Y = Math.floor(y);
    const xf = x - X;
    const yf = y - Y;
    const x0 = X & 255;
    const y0 = Y & 255;
    const aa = perm[perm[x0] + y0];
    const ab = perm[perm[x0] + y0 + 1];
    const ba = perm[perm[x0 + 1] + y0];
    const bb = perm[perm[x0 + 1] + y0 + 1];
    const u = fade(xf);
    const v = fade(yf);
    const x1 = mix(gradient(aa, xf, yf), gradient(ba, xf - 1, yf), u);
    const x2 = mix(gradient(ab, xf, yf - 1), gradient(bb, xf - 1, yf - 1), u);
    return mix(x1, x2, v);
  };
};

const fbm = (noise, x, y, octaves) => {
  let amplitude = 0.5;
  let frequency = 1;
  let sum = 0;
  for (let octave = 0; octave < octaves; octave += 1) {
    sum += amplitude * noise(x * frequency, y * frequency);
    frequency *= 2.03;
    amplitude *= 0.5;
  }
  return sum;
};

/** Distance to the nearest cell edge of a jittered grid (veinlet areoles),
 * as 1 on an edge falling to 0 at `width` pixels from it. */
const makeAreoles = (seed, cell, width) => {
  const next = random(seed);
  const size = 64;
  const jitter = new Float32Array(size * size * 2);
  for (let index = 0; index < jitter.length; index += 1) jitter[index] = next();
  return (x, y) => {
    const cx = Math.floor(x / cell);
    const cy = Math.floor(y / cell);
    let d1 = 1e9;
    let d2 = 1e9;
    for (let oy = -1; oy <= 1; oy += 1) {
      for (let ox = -1; ox <= 1; ox += 1) {
        const gx = cx + ox;
        const gy = cy + oy;
        const index = (((gx & (size - 1)) * size + (gy & (size - 1))) * 2) | 0;
        const px = (gx + 0.15 + 0.7 * jitter[index]) * cell;
        const py = (gy + 0.15 + 0.7 * jitter[index + 1]) * cell;
        const d = Math.hypot(px - x, py - y);
        if (d < d1) {
          d2 = d1;
          d1 = d;
        } else if (d < d2) {
          d2 = d;
        }
      }
    }
    return 1 - smooth(0, width, (d2 - d1) * 0.5);
  };
};

/** A Gaussian-like blur of a single channel (three box passes). */
const gauss = (source, width, height, sigma) => {
  const radius = Math.max(1, Math.round(sigma * 0.9));
  // Never into the source: it is used again.
  let a = Float32Array.from(source);
  let b = new Float32Array(source.length);
  const pass = (from, to, horizontal) => {
    const size = horizontal ? width : height;
    const lines = horizontal ? height : width;
    const scale = 1 / (radius * 2 + 1);
    for (let line = 0; line < lines; line += 1) {
      const at = (i) => (horizontal ? line * width + i : i * width + line);
      let sum = 0;
      for (let i = -radius; i <= radius; i += 1)
        sum += from[at(clamp(i, 0, size - 1))];
      for (let i = 0; i < size; i += 1) {
        to[at(i)] = sum * scale;
        const drop = from[at(clamp(i - radius, 0, size - 1))];
        const add = from[at(clamp(i + radius + 1, 0, size - 1))];
        sum += add - drop;
      }
    }
  };
  for (let round = 0; round < 3; round += 1) {
    pass(a, b, true);
    [a, b] = [b, a];
    pass(a, b, false);
    [a, b] = [b, a];
  }
  return a;
};

// ------------------------------------------------------------- geometry

/** A dense polyline through points (Catmull-Rom). */
const spline = (points, samples = 14) => {
  const out = [];
  for (let index = 0; index < points.length - 1; index += 1) {
    const p0 = points[Math.max(0, index - 1)];
    const p1 = points[index];
    const p2 = points[index + 1];
    const p3 = points[Math.min(points.length - 1, index + 2)];
    for (let step = 0; step < samples; step += 1) {
      const t = step / samples;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push([
        0.5 *
          (2 * p1[0] +
            (-p0[0] + p2[0]) * t +
            (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
            (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 *
          (2 * p1[1] +
            (-p0[1] + p2[1]) * t +
            (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
            (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
      ]);
    }
  }
  out.push(points[points.length - 1]);
  return out;
};

const quadratic = (a, control, b, samples = 24) =>
  Array.from({ length: samples + 1 }, (_, index) => {
    const t = index / samples;
    const u = 1 - t;
    return [
      u * u * a[0] + 2 * u * t * control[0] + t * t * b[0],
      u * u * a[1] + 2 * u * t * control[1] + t * t * b[1],
    ];
  });

const inside = (polygon, [x, y]) => {
  let hit = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      hit = !hit;
    }
  }
  return hit;
};

const length = (points) => {
  let total = 0;
  for (let index = 1; index < points.length; index += 1) {
    total += Math.hypot(
      points[index][0] - points[index - 1][0],
      points[index][1] - points[index - 1][1],
    );
  }
  return total;
};

/** Marches from `start` along `direction` until it leaves the outline;
 * returns the last point inside, `inset` short of the margin. */
const toMargin = (outline, start, direction, inset = 0) => {
  const step = 0.004;
  let point = start;
  for (let distance = step; distance < 3; distance += step) {
    const next = [
      start[0] + direction[0] * distance,
      start[1] + direction[1] * distance,
    ];
    if (!inside(outline, next)) {
      return [
        start[0] + direction[0] * Math.max(0, distance - inset),
        start[1] + direction[1] * Math.max(0, distance - inset),
      ];
    }
    point = next;
  }
  return point;
};

/**
 * A two-sided outline from its right half (sinus or base → tip), mirrored,
 * with a slightly different left half and a margin that is never quite
 * smooth.
 */
const bladeOutline = (
  right,
  next,
  { asymmetry = 0.04, ripple = 0.004, scallop } = {},
) => {
  const half = spline(right, 18);
  const wobble = makeNoise(Math.floor(next() * 1e6));
  const lean = 1 + (next() - 0.5) * asymmetry * 2;
  const edge = (points, side) =>
    points.map(([x, y], index) => {
      const t = index / (points.length - 1);
      let offset = wobble(t * 9 + side * 17, side * 3.3) * ripple * 2;
      if (scallop)
        offset -=
          scallop.depth *
          (0.5 - 0.5 * Math.cos(t * Math.PI * 2 * scallop.count));
      const widen = side > 0 ? 1 : lean;
      // The ripple fades out toward the midline, where both halves meet.
      return [side * (x * widen + offset * Math.min(1, Math.abs(x) * 10)), y];
    });
  const rightSide = edge(half, 1);
  const leftSide = edge(half, -1).reverse();
  return [...rightSide, ...leftSide.slice(1, -1)];
};

/** A cut from outside the margin inward: a narrowing slit ending round. */
const slit = (from, to, widthOut, widthIn) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const size = Math.hypot(dx, dy);
  const ux = dx / size;
  const uy = dy / size;
  const nx = -uy;
  const ny = ux;
  const start = [from[0] - ux * 0.06, from[1] - uy * 0.06];
  const polygon = [];
  const steps = 16;
  for (let index = 0; index <= steps; index += 1) {
    const t = index / steps;
    const w = mix(widthOut, widthIn, Math.pow(t, 0.7)) / 2;
    polygon.push([
      mix(start[0], to[0], t) + nx * w,
      mix(start[1], to[1], t) + ny * w,
    ]);
  }
  for (let index = 0; index <= 8; index += 1) {
    const angle = (index / 8) * Math.PI;
    const r = widthIn / 2;
    polygon.push([
      to[0] + nx * Math.cos(angle) * r + ux * Math.sin(angle) * r,
      to[1] + ny * Math.cos(angle) * r + uy * Math.sin(angle) * r,
    ]);
  }
  for (let index = steps; index >= 0; index -= 1) {
    const t = index / steps;
    const w = mix(widthOut, widthIn, Math.pow(t, 0.7)) / 2;
    polygon.push([
      mix(start[0], to[0], t) - nx * w,
      mix(start[1], to[1], t) - ny * w,
    ]);
  }
  return polygon;
};

/** A lateral vein from the midrib toward the margin, bowing toward the tip. */
const lateral = (outline, start, angle, side, curve, inset) => {
  const direction = [Math.sin(angle) * side, -Math.cos(angle)];
  const end = toMargin(outline, start, direction, inset);
  const size = Math.hypot(end[0] - start[0], end[1] - start[1]);
  const control = [
    start[0] + direction[0] * size * 0.5,
    start[1] + direction[1] * size * 0.5 - size * curve,
  ];
  return { points: quadratic(start, control, end), direction, end, size };
};

// --------------------------------------------------------------- species

/**
 * Each species returns its geometry in leaf units: the stalk attaches at
 * (0, 0), the tip is at (0, −1) (before the bend), x runs across.
 * - blades: polygons of tissue
 * - cuts: polygons removed from them
 * - veins: { points, width: [base, end], level } (0 midrib, 1 primary, 2 fine)
 * - stem: { points, width: [base, end] }
 */
const SPECIES = {
  monstera(next) {
    const right = [
      [0, 0.035],
      [0.07, 0.135],
      [0.2, 0.195],
      [0.35, 0.165],
      [0.46, 0.065],
      [0.525, -0.1],
      [0.545, -0.28],
      [0.515, -0.48],
      [0.435, -0.665],
      [0.305, -0.825],
      [0.155, -0.94],
      [0.045, -0.99],
      [0, -1],
    ];
    const outline = bladeOutline(right, next, {
      asymmetry: 0.05,
      ripple: 0.003,
    });
    const veins = [
      {
        points: spline([
          [0, 0.02],
          [0.004, -0.4],
          [0.002, -0.75],
          [0, -0.985],
        ]),
        width: [0.028, 0.004],
        level: 0,
      },
    ];
    const cuts = [];
    [-1, 1].forEach((side) => {
      const laterals = [];
      // Basal veins into the lobes, then the laterals toward the tip.
      laterals.push(
        lateral(outline, [0, 0.0], 1.95 + next() * 0.12, side, -0.05, 0.03),
      );
      for (let index = 0; index < 9; index += 1) {
        const s = 0.07 + index * 0.098 + (next() - 0.5) * 0.02;
        const angle = 0.95 - s * 0.35 + (next() - 0.5) * 0.08;
        laterals.push(
          lateral(outline, [0, -s], angle, side, 0.1 + s * 0.06, 0.03),
        );
      }
      laterals.forEach((vein, index) =>
        veins.push({
          points: vein.points,
          width: [index === 0 ? 0.012 : 0.013, 0.0035],
          level: 1,
        }),
      );
      // Splits between the laterals, from the margin toward the midrib.
      for (let index = 1; index < laterals.length - 1; index += 1) {
        const a = laterals[index];
        const b = laterals[index + 1];
        if (next() < 0.12) continue;
        const margin = [(a.end[0] + b.end[0]) / 2, (a.end[1] + b.end[1]) / 2];
        const dir = [
          -(a.direction[0] + b.direction[0]) / 2,
          -(a.direction[1] + b.direction[1]) / 2,
        ];
        const size = Math.hypot(dir[0], dir[1]);
        const depth =
          ((a.size + b.size) / 2) *
          (0.42 + next() * 0.38) *
          (index > 6 ? 0.6 : 1);
        const inner = [
          margin[0] + (dir[0] / size) * depth,
          margin[1] + (dir[1] / size) * depth,
        ];
        cuts.push(
          slit(margin, inner, 0.03 + next() * 0.035, 0.012 + next() * 0.008),
        );
        // A hole or two between the veins, near the midrib.
        if (index < 7 && next() < 0.75) {
          const along = 0.14 + next() * 0.12;
          const cx = mix(0, margin[0], along) + (next() - 0.5) * 0.02;
          const cy = mix(
            (a.points[0][1] + b.points[0][1]) / 2,
            margin[1],
            along,
          );
          const rx = 0.011 + next() * 0.012;
          const ry = 0.03 + next() * 0.03;
          const angle = Math.atan2(dir[0], -dir[1]);
          const hole = [];
          for (let step = 0; step < 24; step += 1) {
            const t = (step / 24) * Math.PI * 2;
            const ex = Math.cos(t) * rx;
            const ey = Math.sin(t) * ry;
            hole.push([
              cx + ex * Math.cos(angle) - ey * Math.sin(angle),
              cy + ex * Math.sin(angle) + ey * Math.cos(angle),
            ]);
          }
          cuts.push(hole);
        }
      }
    });
    return {
      blades: [outline],
      cuts,
      veins,
      stem: {
        points: [
          [0, 0.02],
          [0.01, 0.3],
          [0.03, 0.62],
        ],
        width: [0.028, 0.034],
      },
    };
  },

  heart(next) {
    const right = [
      [0, 0.045],
      [0.07, 0.15],
      [0.2, 0.235],
      [0.325, 0.2],
      [0.4, 0.075],
      [0.43, -0.12],
      [0.41, -0.33],
      [0.35, -0.55],
      [0.25, -0.75],
      [0.12, -0.9],
      [0.035, -0.975],
      [0, -1],
    ];
    const outline = bladeOutline(right, next, {
      asymmetry: 0.04,
      ripple: 0.0025,
    });
    const veins = [
      {
        points: spline([
          [0, 0.02],
          [0.003, -0.5],
          [0, -0.985],
        ]),
        width: [0.024, 0.003],
        level: 0,
      },
    ];
    [-1, 1].forEach((side) => {
      // Basal veins into the lobes, curving up along the margin.
      veins.push({
        points: spline([
          [0, 0.01],
          [0.11 * side, 0.12],
          [0.27 * side, 0.12],
          [0.35 * side, -0.08],
          [0.33 * side, -0.35],
          [0.24 * side, -0.62],
          [0.12 * side, -0.83],
        ]),
        width: [0.011, 0.002],
        level: 1,
      });
      [0.16, 0.33, 0.5, 0.66].forEach((s) => {
        const vein = lateral(
          outline,
          [0, -s],
          0.75 - s * 0.25 + (next() - 0.5) * 0.06,
          side,
          0.32,
          0.06,
        );
        veins.push({ points: vein.points, width: [0.009, 0.002], level: 1 });
      });
    });
    return {
      blades: [outline],
      cuts: [],
      veins,
      stem: {
        points: [
          [0, 0.03],
          [0.012, 0.35],
          [0.04, 0.7],
        ],
        width: [0.022, 0.028],
      },
    };
  },

  alocasia(next) {
    const right = [
      [0, 0.0],
      [0.045, 0.15],
      [0.11, 0.31],
      [0.19, 0.41],
      [0.27, 0.41],
      [0.345, 0.3],
      [0.395, 0.14],
      [0.415, -0.04],
      [0.395, -0.26],
      [0.34, -0.5],
      [0.245, -0.72],
      [0.12, -0.9],
      [0.03, -0.98],
      [0, -1],
    ];
    const outline = bladeOutline(right, next, {
      asymmetry: 0.04,
      ripple: 0.003,
      scallop: { depth: 0.006, count: 7 },
    });
    const veins = [
      {
        points: spline([
          [0, 0.0],
          [0.002, -0.5],
          [0, -0.985],
        ]),
        width: [0.026, 0.003],
        level: 0,
      },
    ];
    [-1, 1].forEach((side) => {
      veins.push({
        points: spline([
          [0, 0.0],
          [0.08 * side, 0.18],
          [0.16 * side, 0.32],
          [0.22 * side, 0.39],
        ]),
        width: [0.014, 0.003],
        level: 1,
      });
      [0.08, 0.2, 0.33, 0.46, 0.6, 0.74].forEach((s) => {
        const vein = lateral(
          outline,
          [0, -s],
          1.0 - s * 0.35 + (next() - 0.5) * 0.06,
          side,
          0.08,
          0.025,
        );
        veins.push({ points: vein.points, width: [0.011, 0.0025], level: 1 });
      });
    });
    return {
      blades: [outline],
      cuts: [],
      veins,
      stem: {
        points: [
          [0, 0.0],
          [0.004, 0.3],
          [0.02, 0.62],
        ],
        width: [0.03, 0.036],
      },
    };
  },

  banana(next) {
    const right = [
      [0, 0.025],
      [0.06, 0.005],
      [0.125, -0.045],
      [0.165, -0.15],
      [0.178, -0.35],
      [0.175, -0.6],
      [0.16, -0.78],
      [0.125, -0.9],
      [0.07, -0.975],
      [0, -1],
    ];
    const outline = bladeOutline(right, next, {
      asymmetry: 0.06,
      ripple: 0.002,
    });
    const veins = [
      {
        points: spline([
          [0, 0.02],
          [0.003, -0.5],
          [0, -0.99],
        ]),
        width: [0.03, 0.006],
        level: 0,
      },
    ];
    const cuts = [];
    [-1, 1].forEach((side) => {
      const count = 64;
      for (let index = 0; index < count; index += 1) {
        const s = 0.03 + (index / count) * 0.93;
        const vein = lateral(
          outline,
          [0, -s],
          1.22 - s * 0.12,
          side,
          0.04,
          0.004,
        );
        veins.push({ points: vein.points, width: [0.0032, 0.0012], level: 2 });
        // Tears along the veins, from the margin in.
        if (index > 3 && index < count - 3 && next() < 0.2) {
          const depth = 0.25 + next() * 0.75;
          const inner = [
            mix(vein.end[0], vein.points[0][0], depth),
            mix(vein.end[1], vein.points[0][1], depth),
          ];
          cuts.push(slit(vein.end, inner, 0.006 + next() * 0.012, 0.002));
        }
      }
    });
    return {
      blades: [outline],
      cuts,
      veins,
      stem: {
        points: [
          [0, 0.02],
          [0.004, 0.25],
          [0.012, 0.5],
        ],
        width: [0.034, 0.04],
      },
    };
  },

  fern(next) {
    // Bipinnate, like a tree fern's: pinnae along the rachis, pinnules
    // along each pinna.
    const blades = [];
    const veins = [];
    const bend = 0.2;
    const rachisAt = (s) => [bend * s * s, -s];
    const rachis = Array.from({ length: 48 }, (_, index) =>
      rachisAt(index / 47),
    );
    veins.push({ points: rachis, width: [0.012, 0.003], level: 0 });
    const pairs = 22;
    for (let index = 0; index < pairs; index += 1) {
      const s = 0.07 + (index / pairs) * 0.88;
      const [bx, by] = rachisAt(s);
      const tangent = [2 * bend * s, -1];
      const tSize = Math.hypot(tangent[0], tangent[1]);
      const tx = tangent[0] / tSize;
      const ty = tangent[1] / tSize;
      const size =
        0.32 *
        Math.pow(Math.sin(Math.PI * (0.1 + 0.9 * s)), 0.75) *
        (1 - 0.4 * s) *
        (0.9 + next() * 0.2);
      [-1, 1].forEach((side) => {
        const angle = (1.02 + (next() - 0.5) * 0.14) * side;
        const ux = tx * Math.cos(angle) - ty * Math.sin(angle);
        const uy = tx * Math.sin(angle) + ty * Math.cos(angle);
        const uSize = Math.hypot(ux, uy);
        const dx = ux / uSize;
        const dy = uy / uSize;
        const droop = (0.18 + next() * 0.1) * size;
        const axis = Array.from({ length: 30 }, (_, step) => {
          const t = step / 29;
          return [bx + dx * size * t, by + dy * size * t + droop * t * t];
        });
        veins.push({ points: axis, width: [0.0035, 0.001], level: 1 });
        blades.push(ribbon(axis, [0.004, 0.0015]));
        const count = Math.max(4, Math.round(size * 55));
        for (let k = 0; k < count; k += 1) {
          const t = 0.06 + (k / count) * 0.9;
          const step = Math.round(t * 29);
          const at = axis[step];
          const after = axis[Math.min(29, step + 1)];
          const before = axis[Math.max(0, step - 1)];
          const ax = after[0] - before[0];
          const ay = after[1] - before[1];
          const aSize = Math.hypot(ax, ay) || 1;
          const pinnule = size * 0.2 * (1 - t * 0.75) * (0.85 + next() * 0.3);
          [-1, 1].forEach((flank) => {
            const turn = (0.95 + (next() - 0.5) * 0.2) * flank;
            const px = (ax * Math.cos(turn) - ay * Math.sin(turn)) / aSize;
            const py = (ax * Math.sin(turn) + ay * Math.cos(turn)) / aSize;
            const nx = -py;
            const ny = px;
            const left = [];
            const rightSide = [];
            for (let point = 0; point <= 10; point += 1) {
              const u = point / 10;
              const w = pinnule * 0.3 * Math.pow(u, 0.2) * Math.pow(1 - u, 0.6);
              const cx = at[0] + px * pinnule * u;
              const cy = at[1] + py * pinnule * u + pinnule * 0.12 * u * u;
              left.push([cx + nx * w, cy + ny * w]);
              rightSide.push([cx - nx * w, cy - ny * w]);
            }
            blades.push([...left, ...rightSide.reverse()]);
          });
        }
      });
    }
    blades.push(ribbon(rachis, [0.012, 0.003]));
    return {
      blades,
      cuts: [],
      veins,
      stem: {
        points: [
          [0, 0.0],
          [0.002, 0.25],
          [0.01, 0.5],
        ],
        width: [0.012, 0.014],
      },
    };
  },

  palm(next) {
    const blades = [];
    const veins = [];
    const bend = 0.36;
    const rachisAt = (s) => [bend * s * s, -s];
    const rachis = Array.from({ length: 48 }, (_, index) =>
      rachisAt(index / 47),
    );
    veins.push({ points: rachis, width: [0.013, 0.003], level: 0 });
    const count = 34;
    for (let index = 0; index < count; index += 1) {
      const s = 0.05 + (index / count) * 0.92;
      const [bx, by] = rachisAt(s);
      const tangent = [2 * bend * s, -1];
      const tSize = Math.hypot(tangent[0], tangent[1]);
      const tx = tangent[0] / tSize;
      const ty = tangent[1] / tSize;
      const size =
        0.46 *
        Math.pow(Math.sin(Math.PI * (0.1 + 0.9 * s)), 0.55) *
        (1 - 0.3 * s) *
        (0.88 + next() * 0.24);
      [-1, 1].forEach((side) => {
        const angle = (0.62 + (next() - 0.5) * 0.16) * side;
        const ux = tx * Math.cos(angle) - ty * Math.sin(angle);
        const uy = tx * Math.sin(angle) + ty * Math.cos(angle);
        const uSize = Math.hypot(ux, uy);
        const dx = ux / uSize;
        const dy = uy / uSize;
        const nx = -dy;
        const ny = dx;
        const droop = (0.3 + next() * 0.18) * size;
        const width = 0.012 + next() * 0.005;
        const left = [];
        const rightSide = [];
        const midvein = [];
        for (let step = 0; step <= 40; step += 1) {
          const t = step / 40;
          const cx = bx + dx * size * t;
          const cy = by + dy * size * t + droop * t * t;
          const w = width * Math.pow(t, 0.25) * Math.pow(1 - t, 1.1) * 1.9;
          left.push([cx + nx * w, cy + ny * w]);
          rightSide.push([cx - nx * w, cy - ny * w]);
          midvein.push([cx, cy]);
        }
        blades.push([...left, ...rightSide.reverse()]);
        veins.push({ points: midvein, width: [0.0028, 0.0006], level: 1 });
      });
    }
    blades.push(ribbon(rachis, [0.013, 0.003]));
    return {
      blades,
      cuts: [],
      veins,
      stem: {
        points: [
          [0, 0.0],
          [0.003, 0.25],
          [0.012, 0.5],
        ],
        width: [0.014, 0.016],
      },
    };
  },
};

/**
 * Colours per species (shade and light green, veins, the midrib, the glow
 * when lit through, a dry margin) and surface: gloss and its tightness, how
 * far the veins stand out (negative: sunken, in leaf hundredths), and the
 * fine veinlet network.
 */
const LOOKS = {
  monstera: {
    base: [26, 64, 30],
    light: [52, 100, 42],
    vein: [60, 102, 50],
    midrib: [96, 132, 70],
    glow: [120, 170, 56],
    dry: [96, 90, 44],
    gloss: 0.5,
    shine: 34,
    veins: -0.06,
    areole: 0.14,
  },
  heart: {
    base: [18, 50, 28],
    light: [38, 80, 42],
    vein: [150, 172, 122],
    midrib: [160, 180, 128],
    glow: [100, 148, 56],
    dry: [86, 80, 42],
    gloss: 0.55,
    shine: 40,
    veins: 0.05,
    areole: 0.12,
  },
  alocasia: {
    base: [42, 90, 40],
    light: [80, 128, 52],
    vein: [132, 164, 92],
    midrib: [150, 178, 104],
    glow: [150, 192, 66],
    dry: [110, 100, 50],
    gloss: 0.34,
    shine: 26,
    veins: 0.07,
    areole: 0.14,
  },
  banana: {
    base: [58, 100, 40],
    light: [96, 134, 50],
    vein: [84, 120, 44],
    midrib: [176, 184, 104],
    glow: [150, 178, 70],
    dry: [132, 106, 54],
    gloss: 0.18,
    shine: 14,
    veins: 0.06,
    areole: 0,
  },
  fern: {
    base: [46, 94, 40],
    light: [92, 140, 56],
    vein: [80, 120, 56],
    midrib: [96, 120, 60],
    glow: [150, 196, 74],
    dry: [120, 104, 52],
    gloss: 0.14,
    shine: 12,
    veins: 0.06,
    areole: 0,
  },
  palm: {
    base: [54, 96, 42],
    light: [96, 134, 56],
    vein: [120, 150, 70],
    midrib: [140, 160, 84],
    glow: [150, 180, 78],
    dry: [130, 110, 56],
    gloss: 0.24,
    shine: 18,
    veins: 0.05,
    areole: 0,
  },
};

// -------------------------------------------------------------- rendering

/** A tapered ribbon along a polyline. */
const ribbon = (points, [w0, w1]) => {
  const left = [];
  const right = [];
  points.forEach((point, index) => {
    const before = points[Math.max(0, index - 1)];
    const after = points[Math.min(points.length - 1, index + 1)];
    let tx = after[0] - before[0];
    let ty = after[1] - before[1];
    const size = Math.hypot(tx, ty) || 1;
    tx /= size;
    ty /= size;
    const w = mix(w0, w1, index / (points.length - 1)) / 2;
    left.push([point[0] - ty * w, point[1] + tx * w]);
    right.push([point[0] + ty * w, point[1] - tx * w]);
  });
  return [...left, ...right.reverse()];
};

const drawPolygon = (context, polygon) => {
  context.beginPath();
  polygon.forEach(([x, y], index) =>
    index ? context.lineTo(x, y) : context.moveTo(x, y),
  );
  context.closePath();
};

const alphaOf = (canvas) => {
  const { data } = canvas
    .getContext("2d")
    .getImageData(0, 0, canvas.width, canvas.height);
  const out = new Float32Array(canvas.width * canvas.height);
  for (let index = 0; index < out.length; index += 1)
    out[index] = data[index * 4 + 3] / 255;
  return out;
};

/**
 * Renders a leaf described by `spec`:
 * - species, seed
 * - size: [width, height] of the image (px)
 * - origin: where the stalk attaches, as fractions of the image
 * - scale: leaf length as a fraction of the image height
 * - bend: sideways curve of the midrib (tip leans right when positive)
 * - turn: foreshortens the right half (0–0.7), as if the leaf turned away
 * - light: direction of the light [x, y, z] (x right, y down, z to the viewer)
 * - backlight: 0 … 1, light coming through the leaf from behind
 * - shade: 0 … 1, the leaf in shadow
 * - dry: 0 … 1, browned margins; blemish: 0 … 1, spots
 * - fold: how far the blade falls away from its midrib (leaf hundredths)
 * - blur: depth-of-field blur (px)
 * - hue: tint shift [r, g, b] added to the colours
 * - saturation (0.8), haze (0 … 1, toward hazeColor: the mist between the
 *   leaf and the camera), grain: to sit in the film's picture
 * - tint: [r, g, b] factors (e.g. less blue for a warmer, lime green)
 */
export const renderLeaf = (spec) => {
  const [W, H] = spec.size;
  const width = W * SS;
  const height = H * SS;
  const next = random(spec.seed);
  const geometry = SPECIES[spec.species](next);
  const look = LOOKS[spec.species];
  const L = spec.scale * height;
  const unit = L / 100; // a hundredth of the leaf (px)
  const [ox, oy] = [spec.origin[0] * width, spec.origin[1] * height];
  const bend = spec.bend ?? 0;
  const turn = spec.turn ?? 0;
  const place = ([x, y]) => {
    const across = x > 0 ? x * (1 - turn) : x * (1 + turn * 0.25);
    return [ox + (across + bend * y * y) * L, oy + y * L];
  };
  const placeAll = (points) => points.map(place);
  const toneNext = random(spec.seed * 31 + 3);

  // Shape (blades, minus the cuts, plus the stalk), and a tone per blade.
  const shape = makeCanvas(width, height);
  const shapeContext = shape.getContext("2d");
  const tone = makeCanvas(width, height);
  const toneContext = tone.getContext("2d");
  geometry.blades.forEach((blade) => {
    const polygon = placeAll(blade);
    shapeContext.fillStyle = "#000";
    drawPolygon(shapeContext, polygon);
    shapeContext.fill();
    toneContext.fillStyle = `rgba(0, 0, 0, ${0.25 + toneNext() * 0.75})`;
    drawPolygon(toneContext, polygon);
    toneContext.fill();
  });
  shapeContext.globalCompositeOperation = "destination-out";
  geometry.cuts.forEach((cut) => {
    drawPolygon(shapeContext, placeAll(cut));
    shapeContext.fill();
  });
  shapeContext.globalCompositeOperation = "source-over";
  const bladeAlpha = alphaOf(shape);
  if (geometry.stem) {
    drawPolygon(
      shapeContext,
      placeAll(ribbon(geometry.stem.points, geometry.stem.width)),
    );
    shapeContext.fill();
  }
  const alpha = alphaOf(shape);

  // Veins: the midrib (and stalk) on their own, the others by level.
  const layer = () => {
    const canvas = makeCanvas(width, height);
    return [canvas, canvas.getContext("2d")];
  };
  const [midrib, midribContext] = layer();
  const [primary, primaryContext] = layer();
  const [fine, fineContext] = layer();
  geometry.veins.forEach((vein) => {
    const context =
      vein.level === 0
        ? midribContext
        : vein.level === 1
          ? primaryContext
          : fineContext;
    drawPolygon(context, placeAll(ribbon(vein.points, vein.width)));
    context.fill();
  });
  if (geometry.stem) {
    drawPolygon(
      midribContext,
      placeAll(ribbon(geometry.stem.points, geometry.stem.width)),
    );
    midribContext.fill();
  }
  const midribAlpha = alphaOf(midrib);
  const primaryAlpha = alphaOf(primary);
  const fineAlpha = alphaOf(fine);
  const toneAlpha = alphaOf(tone);

  // Large shapes, blurred: the blade's dome near its margins, and its fold
  // along the midrib (compound leaves fold along each leaflet's vein).
  const dome = gauss(bladeAlpha, width, height, (spec.domeRadius ?? 4) * unit);
  const foldSource = spec.foldLevel === 1 ? primaryAlpha : midribAlpha;
  const fold = gauss(foldSource, width, height, (spec.foldRadius ?? 16) * unit);
  let foldMax = 0;
  for (let index = 0; index < fold.length; index += 1)
    foldMax = Math.max(foldMax, fold[index]);
  const edge = gauss(bladeAlpha, width, height, 0.7 * unit);
  const midribSoft = gauss(midribAlpha, width, height, 0.25 * unit);
  const primarySoft = gauss(primaryAlpha, width, height, 0.2 * unit);
  const fineSoft = gauss(fineAlpha, width, height, 0.12 * unit);

  const noise = makeNoise(spec.seed * 7 + 1);
  const detail = makeNoise(spec.seed * 13 + 5);
  const areoles = makeAreoles(spec.seed * 3 + 2, 0.9 * unit, 0.1 * unit);

  // Height, in leaf hundredths.
  const heightMap = new Float32Array(width * height);
  const areoleMap = new Float32Array(width * height);
  const foldHeight = spec.fold ?? 5;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = y * width + x;
      if (alpha[index] <= 0) continue;
      const u = x / unit;
      const v = y / unit;
      const areole = look.areole ? areoles(x, y) : 0;
      areoleMap[index] = areole;
      heightMap[index] =
        (fold[index] / (foldMax || 1)) * foldHeight +
        dome[index] * 1.4 +
        fbm(noise, u * 0.045, v * 0.045, 3) * 2.2 +
        (midribSoft[index] * 0.35 +
          primarySoft[index] +
          fineSoft[index] * 0.6) *
          look.veins *
          3 +
        midribSoft[index] * 0.25 -
        areole * 0.035 * look.areole +
        fbm(detail, u * 0.8, v * 0.8, 2) * 0.05;
    }
  }

  const light = (() => {
    const [lx, ly, lz] = spec.light ?? [0.3, -0.6, 0.75];
    const size = Math.hypot(lx, ly, lz);
    return [lx / size, ly / size, lz / size];
  })();
  const half = [light[0], light[1], light[2] + 1];
  const halfSize = Math.hypot(...half);
  const hx0 = half[0] / halfSize;
  const hy0 = half[1] / halfSize;
  const hz0 = half[2] / halfSize;
  const hue = spec.hue ?? [0, 0, 0];
  const tint = (color) => color.map((value, index) => value + hue[index]);
  const base = tint(look.base);
  const lightTone = tint(look.light);
  const veinTone = tint(look.vein);
  const midribTone = tint(look.midrib);
  const backlight = spec.backlight ?? 0;
  const shade = spec.shade ?? 0;
  const dry = spec.dry ?? 0.3;
  const blemish = spec.blemish ?? 0.5;
  const slope = spec.bump ?? 1;
  const saturation = spec.saturation ?? 0.8;
  const haze = spec.haze ?? 0;
  const hazeColor = spec.hazeColor ?? [122, 142, 108];
  const grain = spec.grain ?? 5;
  const grainNext = random(spec.seed * 17 + 9);
  const warmth = spec.tint ?? [1, 1, 1];

  const out = makeCanvas(width, height);
  const outContext = out.getContext("2d");
  const image = outContext.createImageData(width, height);
  const data = image.data;
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = y * width + x;
      const a = alpha[index];
      if (a <= 0) continue;
      // Slopes in leaf hundredths per hundredth.
      const gx =
        (heightMap[index + 1] - heightMap[index - 1]) * unit * 0.5 * slope;
      const gy =
        (heightMap[index + width] - heightMap[index - width]) *
        unit *
        0.5 *
        slope;
      let nx = -gx;
      let ny = -gy;
      let nz = 1;
      const nSize = Math.hypot(nx, ny, nz);
      nx /= nSize;
      ny /= nSize;
      nz /= nSize;
      const u = x / unit;
      const v = y / unit;
      const patch = clamp(
        0.5 + fbm(noise, u * 0.03 + 11, v * 0.03 + 7, 3) * 1.4,
      );
      const leaflet = toneAlpha[index];
      // Younger and lighter toward the tip.
      const along = clamp((oy - y) / L);
      let color = mix3(
        base,
        lightTone,
        clamp(patch * 0.7 + along * 0.18 + (leaflet - 0.6) * 0.35),
      );
      const vein = clamp(primarySoft[index] * 1.2 + fineSoft[index] * 0.5);
      color = mix3(color, veinTone, clamp(vein * 0.55));
      color = mix3(color, midribTone, clamp(midribSoft[index] * 1.3));
      // Dry, browned margins, unevenly, and a few blemishes.
      const margin = (1 - smooth(0.12, 0.6, edge[index])) * bladeAlpha[index];
      const dryness = clamp(
        margin *
          dry *
          clamp(0.3 + fbm(detail, u * 0.07, v * 0.07, 3) * 2.4) *
          1.5,
      );
      color = mix3(color, look.dry, dryness);
      const spot =
        smooth(0.6, 0.7, fbm(detail, u * 0.1 + 40, v * 0.1, 2) + 0.36) *
        blemish;
      color = mix3(color, look.dry, spot * 0.4);

      const NdotL = nx * light[0] + ny * light[1] + nz * light[2];
      const diffuse = Math.max(0, (NdotL + 0.25) / 1.25);
      const NdotH = Math.max(0, nx * hx0 + ny * hy0 + nz * hz0);
      const gloss =
        look.gloss *
        (1 - dryness) *
        (Math.pow(NdotH, look.shine) * 0.9 + Math.pow(NdotH, 5) * 0.12);
      // Light through the leaf: thin tissue glows, veins and the veinlet
      // network stay darker.
      const thickness = clamp(
        0.18 +
          vein * 0.7 +
          midribSoft[index] * 0.45 +
          areoleMap[index] * 0.3 * look.areole +
          (1 - bladeAlpha[index]) * 0.6,
      );
      const through =
        backlight *
        (1 - thickness) *
        (0.7 + 0.3 * patch) *
        (0.85 + 0.3 * (leaflet - 0.5));
      const lit = (0.3 + diffuse) * (1 - backlight * 0.55);
      let r = color[0] * lit + look.glow[0] * through;
      let g = color[1] * lit + look.glow[1] * through;
      let b = color[2] * lit + look.glow[2] * through;
      const sheen = 255 * gloss * (1 - backlight * 0.5);
      r += sheen * 0.9;
      g += sheen;
      b += sheen * 0.85;
      // Into the film's picture: its softer colour, the mist between the
      // leaf and the camera, and a little grain.
      const dim = 1 - shade;
      r *= dim * warmth[0];
      g *= dim * warmth[1];
      b *= dim * warmth[2];
      const luma = 0.3 * r + 0.59 * g + 0.11 * b;
      r = luma + (r - luma) * saturation;
      g = luma + (g - luma) * saturation;
      b = luma + (b - luma) * saturation;
      r = mix(r, hazeColor[0], haze);
      g = mix(g, hazeColor[1], haze);
      b = mix(b, hazeColor[2], haze);
      const speck = (grainNext() - 0.5) * grain;
      data[index * 4] = clamp(r + speck, 0, 255);
      data[index * 4 + 1] = clamp(g + speck, 0, 255);
      data[index * 4 + 2] = clamp(b + speck, 0, 255);
      data[index * 4 + 3] = a * 255;
    }
  }
  outContext.putImageData(image, 0, 0);

  // Depth of field (on premultiplied colour, so the edges stay clean), then
  // down to the image's size and half of it.
  let result = out;
  if (spec.blur) {
    result = makeCanvas(width, height);
    const context = result.getContext("2d");
    context.filter = `blur(${spec.blur * SS}px)`;
    context.drawImage(out, 0, 0);
  }
  const sized = (factor) => {
    const canvas = makeCanvas(Math.round(W * factor), Math.round(H * factor));
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(result, 0, 0, canvas.width, canvas.height);
    return canvas;
  };
  return { full: sized(1), half: sized(0.5) };
};

export const toWebp = (canvas, quality = 0.82) =>
  canvas.toDataURL("image/webp", quality);
