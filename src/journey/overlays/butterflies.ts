import type { DirectorFrame } from "../director/director";
import { blockState } from "../film/holdProgress";

/*
 * Butterflies of the first scene. They share one wing shape (a forewing and
 * a hindwing, drawn as sprites, the upper side and the underside) and are
 * told apart by their colours and markings; a flapping wing is the sprite
 * narrowed, showing the underside as it closes.
 *
 * The flock: as the introduction and About come in, a few butterflies of
 * different kinds and sizes fade in from the edges of the screen, fly over
 * and settle on their edges — on the buttons, on the first fact's icon, on
 * the story card — slowly opening and closing their wings. A pointer that
 * comes close startles one up for a moment; when the block goes, they fly
 * away.
 */

/** Sprite resolution: one wing, this many times its size in wing units. */
const SCALE = 4;
const WING_W = 34;
const WING_H = 50;
/** The wing root in the sprite (wing units). */
const ROOT = [1, 24];

export type Species =
  | "morpho"
  | "monarch"
  | "sulphur"
  | "white"
  | "postman"
  | "emerald";

type Paint = (context: CanvasRenderingContext2D, upper: boolean) => void;

/** The right wings, the body at x = 0 and the root at y = 0, head up: a
 * forewing to its tip up and out and a rounded hindwing below (with a tail
 * for swallowtails; a longer forewing for heliconians). */
const wingPath = (
  context: CanvasRenderingContext2D,
  { long = 1, tail = false } = {},
) => {
  context.beginPath();
  context.moveTo(0, 0);
  context.bezierCurveTo(5 * long, -12, 16 * long, -19, 24 * long, -17);
  context.bezierCurveTo(27 * long, -12, 24 * long, -4, 15 * long, 0);
  context.bezierCurveTo(9, 2, 4, 2, 0, 1);
  context.moveTo(0, 1);
  context.bezierCurveTo(8, 1, 17, 4, 18, 11);
  if (tail) {
    context.bezierCurveTo(18, 14, 15, 16, 13, 18);
    context.bezierCurveTo(13, 21, 12, 25, 10, 27);
    context.bezierCurveTo(9, 24, 9, 21, 8, 18);
    context.bezierCurveTo(6, 18, 3, 16, 2, 13);
  } else {
    context.bezierCurveTo(18, 18, 10, 21, 4, 15);
    context.bezierCurveTo(2, 12, 0, 6, 0, 1);
  }
  context.closePath();
};

const radial = (
  context: CanvasRenderingContext2D,
  stops: Array<[number, string]>,
  radius = 26,
) => {
  const gradient = context.createRadialGradient(0, 0, 1, 0, 0, radius);
  stops.forEach(([at, color]) => gradient.addColorStop(at, color));
  return gradient;
};

const dots = (
  context: CanvasRenderingContext2D,
  color: string,
  points: Array<[number, number, number]>,
) => {
  context.fillStyle = color;
  points.forEach(([x, y, r]) => {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fill();
  });
};

const band = (
  context: CanvasRenderingContext2D,
  color: string,
  width: number,
  points: Array<[number, number]>,
) => {
  context.strokeStyle = color;
  context.lineWidth = width;
  context.lineCap = "round";
  context.beginPath();
  points.forEach(([x, y], index) =>
    index ? context.lineTo(x, y) : context.moveTo(x, y),
  );
  context.stroke();
};

type Look = { paint: Paint; long?: number; tail?: boolean; glow?: string };

const LOOKS: Record<Species, Look> = {
  // Iridescent blue above, brown with eyespots below.
  morpho: {
    glow: "rgba(90, 180, 255, 0.55)",
    paint(context, upper) {
      context.fillStyle = upper
        ? radial(context, [
            [0, "#0b2a6e"],
            [0.35, "#1c7cf2"],
            [0.7, "#4ec3ff"],
            [1, "#1a4fa8"],
          ])
        : radial(context, [
            [0, "#3a2a1c"],
            [0.6, "#6e5536"],
            [1, "#4a3826"],
          ]);
      context.fill();
      if (upper) {
        dots(context, "rgba(245, 248, 255, 0.85)", [
          [21.5, -14.5, 0.8],
          [23.5, -10.5, 0.8],
          [20.5, -6.5, 0.8],
        ]);
      } else {
        dots(context, "#d9b25a", [
          [12, -8, 2.2],
          [10, 10, 2.6],
        ]);
        dots(context, "#1a120a", [
          [12, -8, 1.1],
          [10, 10, 1.3],
        ]);
      }
    },
  },
  // Orange with black veins, a black margin and white dots.
  monarch: {
    paint(context, upper) {
      context.fillStyle = radial(context, [
        [0, upper ? "#b8470c" : "#a2621c"],
        [0.5, upper ? "#ef7d1a" : "#e0a44a"],
        [1, upper ? "#f5a23a" : "#ecc06a"],
      ]);
      context.fill();
      [
        [
          [0, 0],
          [10, -9],
          [22, -15],
        ],
        [
          [0, 0],
          [12, -5],
          [23, -9],
        ],
        [
          [0, 0],
          [11, -1],
          [17, -1],
        ],
        [
          [0, 1],
          [9, 5],
          [16, 9],
        ],
        [
          [0, 1],
          [7, 9],
          [11, 16],
        ],
      ].forEach((vein) =>
        band(context, "#1c1208", 0.7, vein as Array<[number, number]>),
      );
    },
  },
  // Lemon yellow, a small orange mark.
  sulphur: {
    paint(context, upper) {
      context.fillStyle = radial(context, [
        [0, upper ? "#e9c21f" : "#cdbf4a"],
        [0.6, upper ? "#f7de49" : "#e4da78"],
        [1, upper ? "#fbe97c" : "#efe7a0"],
      ]);
      context.fill();
      dots(context, upper ? "#e88a1a" : "#b5793a", [[13, -8, 1.3]]);
    },
  },
  // White with dark forewing tips and a spot.
  white: {
    paint(context, upper) {
      context.fillStyle = radial(context, [
        [0, upper ? "#d9d6cc" : "#d8d8a8"],
        [0.5, upper ? "#f4f1e8" : "#ecebc4"],
        [1, upper ? "#fbfaf4" : "#f3f2d6"],
      ]);
      context.fill();
      if (upper) {
        dots(context, "#2b2b2b", [
          [22.5, -15, 3.6],
          [14.5, -7.5, 1.3],
        ]);
      }
    },
  },
  // Black, a red band across the forewing, a yellow line on the hindwing.
  postman: {
    long: 1.18,
    paint(context, upper) {
      context.fillStyle = upper ? "#101012" : "#231a14";
      context.fill();
      band(context, upper ? "#d62f2a" : "#c24a3a", 4.2, [
        [9, -5],
        [17, -11],
        [23, -14],
      ]);
      band(context, upper ? "#f0c43a" : "#e8d27a", 1.4, [
        [3, 6],
        [9, 7],
        [15, 9],
      ]);
    },
  },
  // Deep green-black with bright green bands; tails.
  emerald: {
    tail: true,
    paint(context, upper) {
      context.fillStyle = upper ? "#0c1d14" : "#2a2a20";
      context.fill();
      band(context, upper ? "#39d98a" : "#8aa27a", 3.6, [
        [7, -4],
        [14, -9],
        [20, -13],
      ]);
      band(context, upper ? "#2fc47c" : "#7a9670", 3, [
        [4, 6],
        [9, 7],
        [14, 9],
      ]);
    },
  },
};

type Sprites = {
  upper: HTMLCanvasElement;
  lower: HTMLCanvasElement;
  look: Look;
};
const cache = new Map<Species, Sprites>();

const wingSprite = (look: Look, upper: boolean) => {
  const canvas = document.createElement("canvas");
  canvas.width = WING_W * SCALE;
  canvas.height = WING_H * SCALE;
  const context = canvas.getContext("2d")!;
  context.scale(SCALE, SCALE);
  context.translate(ROOT[0], ROOT[1]);
  wingPath(context, look);
  context.save();
  context.clip();
  look.paint(context, upper);
  context.restore();
  wingPath(context, look);
  context.lineWidth = upper ? 2 : 1;
  context.strokeStyle = upper
    ? "rgba(8, 10, 14, 0.9)"
    : "rgba(30, 24, 16, 0.8)";
  context.stroke();
  return canvas;
};

export const spritesFor = (species: Species) => {
  let sprites = cache.get(species);
  if (!sprites) {
    const look = LOOKS[species];
    sprites = {
      upper: wingSprite(look, true),
      lower: wingSprite(look, false),
      look,
    };
    cache.set(species, sprites);
  }
  return sprites;
};

/** How far a wing is open (seen from above) for a beat of `lift` (0 open
 * flat … 1 closed up). */
export const openness = (lift: number) =>
  Math.max(0.1, Math.cos((lift * 80 * Math.PI) / 180));

/**
 * Draws a butterfly at (x, y), its head toward `heading` (radians, 0 up),
 * with `span` px between its wing tips.
 */
export const drawButterfly = (
  context: CanvasRenderingContext2D,
  sprites: Sprites,
  x: number,
  y: number,
  heading: number,
  open: number,
  alpha: number,
  span: number,
  glow?: HTMLCanvasElement,
) => {
  if (alpha <= 0.01) return;
  context.save();
  context.translate(x, y);
  context.rotate(heading);
  if (glow) {
    context.globalAlpha = alpha * 0.5;
    context.globalCompositeOperation = "lighter";
    context.drawImage(glow, -span * 0.75, -span * 0.75, span * 1.5, span * 1.5);
    context.globalCompositeOperation = "source-over";
  }
  context.globalAlpha = alpha;
  const scale = span / 2 / (24 * (sprites.look.long ?? 1));
  const sprite = open > 0.42 ? sprites.upper : sprites.lower;
  [1, -1].forEach((side) => {
    context.save();
    context.scale(side * open * scale, scale);
    context.drawImage(sprite, -ROOT[0], -ROOT[1], WING_W, WING_H);
    context.restore();
  });
  // The body and its antennae.
  const body = span / 42;
  context.fillStyle = "#0d0d10";
  context.beginPath();
  context.ellipse(0, 2 * body, 1.3 * body, 7 * body, 0, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "rgba(20, 20, 24, 0.9)";
  context.lineWidth = 0.7 * body;
  context.beginPath();
  context.moveTo(0, -4 * body);
  context.quadraticCurveTo(-2 * body, -9 * body, -4 * body, -11 * body);
  context.moveTo(0, -4 * body);
  context.quadraticCurveTo(2 * body, -9 * body, 4 * body, -11 * body);
  context.stroke();
  context.restore();
};

// ------------------------------------------------------------- the flock

type Perch = {
  species: Species;
  span: number;
  /** The block it belongs to, and the element it lands on in it. */
  block: () => HTMLElement | null;
  target: (block: HTMLElement) => HTMLElement | null;
  /** Where on the element's top edge (0 left … 1 right). */
  along: number;
  /** Which edge of the screen it comes from. */
  from: -1 | 1;
};

const cueOf = (id: string) =>
  document
    .getElementById(id)
    ?.closest(".film-hold")
    ?.querySelector<HTMLElement>(".film-cue") ?? null;

const PERCHES: Perch[] = [
  {
    species: "monarch",
    span: 46,
    block: () => cueOf("home"),
    target: (block) =>
      block.querySelectorAll<HTMLElement>(".film-actions > *")[1] ?? null,
    along: 0.8,
    from: 1,
  },
  {
    species: "sulphur",
    span: 34,
    block: () => cueOf("home"),
    target: (block) =>
      block.querySelector<HTMLElement>(".film-actions > *") ?? null,
    along: 0.16,
    from: -1,
  },
  {
    species: "white",
    span: 32,
    block: () => cueOf("about"),
    target: (block) => block.querySelector<HTMLElement>(".about-meta-icon"),
    along: 0.5,
    from: -1,
  },
  {
    species: "postman",
    span: 46,
    block: () =>
      document
        .querySelector(".about-card")
        ?.closest<HTMLElement>(".film-cue") ?? null,
    target: (block) => block.querySelector<HTMLElement>(".about-card > *"),
    along: 0.84,
    from: 1,
  },
  {
    species: "emerald",
    span: 42,
    block: () =>
      document
        .querySelector(".about-card")
        ?.closest<HTMLElement>(".film-cue") ?? null,
    target: (block) => block.querySelector<HTMLElement>(".about-card > *"),
    along: 0.14,
    from: 1,
  },
];

/** The element's offset inside `ancestor` (through the offset parents). */
const offsetIn = (element: HTMLElement, ancestor: HTMLElement) => {
  let left = 0;
  let top = 0;
  let node: HTMLElement | null = element;
  while (node && node !== ancestor) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { left, top };
};

type Flyer = {
  perch: Perch;
  sprites: Sprites;
  state: "away" | "coming" | "perched" | "startled" | "leaving";
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Where it lands (screen px), measured when it sets off. */
  tx: number;
  ty: number;
  heading: number;
  tilt: number;
  flap: number;
  alpha: number;
  since: number;
  seed: number;
};

export class Flock {
  private readonly flyers: Flyer[];
  private pointer = { x: -1e4, y: -1e4 };
  private last = 0;
  private readonly onMove = (event: PointerEvent) => {
    this.pointer = { x: event.clientX, y: event.clientY };
  };

  constructor() {
    this.flyers = PERCHES.map((perch, index) => ({
      perch,
      sprites: spritesFor(perch.species),
      state: "away",
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      tx: 0,
      ty: 0,
      heading: 0,
      tilt: 0,
      flap: index * 1.7,
      alpha: 0,
      since: 0,
      seed: index * 13.7 + 3,
    }));
    window.addEventListener("pointermove", this.onMove, { passive: true });
  }

  dispose() {
    window.removeEventListener("pointermove", this.onMove);
  }

  /** Moves the flock on; returns whether any of it is to be drawn. */
  update(frame: DirectorFrame) {
    const now = frame.now;
    const dt = this.last ? Math.min(0.05, (now - this.last) / 1000) : 1 / 60;
    this.last = now;
    const { vw } = frame.viewport;
    const inScene = !frame.reduced && frame.activeChapter === "chase";
    let any = false;
    this.flyers.forEach((flyer) => {
      const block = flyer.perch.block();
      const state = block ? blockState.get(block) : undefined;
      const blockThere = inScene && !!state?.shown && state.visible > 0.6;
      // Setting off: toward its perch, measured on the block at rest.
      if (blockThere && flyer.state === "away" && block) {
        const target = flyer.perch.target(block);
        if (target) {
          const at = offsetIn(target, block);
          flyer.tx = at.left + target.offsetWidth * flyer.perch.along;
          flyer.ty = state!.pin + at.top - flyer.perch.span * 0.22;
          flyer.x = flyer.perch.from > 0 ? vw + 40 : -40;
          flyer.y = flyer.ty - 120 - Math.random() * 160;
          flyer.vx = -flyer.perch.from * 220;
          flyer.vy = 40;
          flyer.tilt = (Math.random() - 0.5) * 0.35;
          flyer.state = "coming";
          flyer.since = now;
        }
      }
      if (!blockThere && flyer.state !== "away" && flyer.state !== "leaving") {
        flyer.state = "leaving";
        flyer.since = now;
      }
      if (flyer.state === "away") return;
      any = true;
      // A pointer close by startles it up for a moment.
      const near =
        Math.hypot(this.pointer.x - flyer.x, this.pointer.y - flyer.y) < 46;
      if (flyer.state === "perched" && near) {
        flyer.state = "startled";
        flyer.since = now;
      }
      if (flyer.state === "startled" && now - flyer.since > 1400 && !near) {
        flyer.state = "coming";
        flyer.since = now;
      }
      const t = now / 1000 + flyer.seed;
      let targetX = flyer.tx;
      let targetY = flyer.ty;
      if (flyer.state === "startled") {
        targetX = flyer.tx + Math.sin(flyer.seed) * 60;
        targetY = flyer.ty - 90;
      } else if (flyer.state === "leaving") {
        targetX = flyer.x + flyer.perch.from * 300;
        targetY = -160;
      }
      if (flyer.state === "perched") {
        flyer.x = flyer.tx;
        flyer.y = flyer.ty;
        flyer.vx = 0;
        flyer.vy = 0;
      } else {
        const dx = targetX - flyer.x;
        const dy = targetY - flyer.y;
        const flutter = flyer.state === "coming" ? 1 : 1.4;
        const ax =
          dx * 9 -
          flyer.vx * 4 +
          flutter * (Math.sin(t * 2.7) * 120 + Math.sin(t * 6.1) * 60);
        const ay =
          dy * 9 -
          flyer.vy * 4 +
          flutter * (Math.sin(t * 3.3) * 140 + Math.cos(t * 7.3) * 50);
        flyer.vx += ax * dt;
        flyer.vy += ay * dt;
        const speed = Math.hypot(flyer.vx, flyer.vy);
        if (speed > 600) {
          flyer.vx *= 600 / speed;
          flyer.vy *= 600 / speed;
        }
        flyer.x += flyer.vx * dt;
        flyer.y += flyer.vy * dt;
        // Lands once it is there and slow.
        if (
          flyer.state === "coming" &&
          Math.hypot(dx, dy) < 5 &&
          Math.hypot(flyer.vx, flyer.vy) < 60
        ) {
          flyer.state = "perched";
          flyer.since = now;
        }
      }
      const perched = flyer.state === "perched";
      const aim = perched ? flyer.tilt : Math.atan2(flyer.vx, -flyer.vy) * 0.5;
      flyer.heading += (aim - flyer.heading) * (1 - Math.exp(-dt / 0.2));
      flyer.flap += dt * (perched ? 1.1 + Math.sin(flyer.seed) * 0.3 : 22);
      // Fades in as it comes, out as it goes.
      const aimAlpha = flyer.state === "leaving" ? 0 : 1;
      flyer.alpha += (aimAlpha - flyer.alpha) * (1 - Math.exp(-dt / 0.45));
      if (flyer.state === "leaving" && (flyer.alpha < 0.02 || flyer.y < -120)) {
        flyer.state = "away";
        flyer.alpha = 0;
      }
    });
    return any;
  }

  render(context: CanvasRenderingContext2D) {
    this.flyers.forEach((flyer) => {
      if (flyer.state === "away") return;
      const perched = flyer.state === "perched";
      // At rest it opens and closes its wings slowly, now and then a few
      // quick beats.
      const lift = perched
        ? 0.3 +
          0.3 * Math.sin(flyer.flap) +
          (Math.sin(flyer.flap * 0.37) > 0.93 ? 0.3 : 0)
        : 0.35 + 0.65 * Math.sin(flyer.flap);
      drawButterfly(
        context,
        flyer.sprites,
        flyer.x,
        flyer.y,
        flyer.heading,
        openness(lift),
        flyer.alpha,
        flyer.perch.span,
      );
    });
  }
}
