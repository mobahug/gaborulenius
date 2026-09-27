import type { DirectorFrame } from "../director/director";
import { blockState } from "../film/holdProgress";
import { smoothstep } from "../math";
import { glowSprite } from "./surface";

/*
 * The morpho of the jungle films — iridescent blue above, brown with
 * eyespots below — drawn from two wing sprites; a flapping wing is its
 * sprite narrowed, showing the underside as it closes. The pointer's
 * companion (morpho.ts) and the flock below are the same butterfly.
 *
 * The flock: in the jungle scenes (the introduction, About and its story,
 * and the invitation at the end), whenever a block comes in, two or three
 * morphos of different sizes fade in from the edges of the screen, fly over
 * and settle on its edges — the top of its heading, of a button, of the
 * story card, of a fact's icon — each time somewhere else, like the old
 * portfolio's pixel bird, and slowly open and close their wings. Never more
 * than five at once. A pointer that comes close startles one up for a
 * moment; when the block goes, they fly away.
 */

/** Sprite resolution: one wing, this many times its size in wing units. */
const SCALE = 4;
const WING_W = 30;
const WING_H = 44;
/** The wing root in the sprite (wing units). */
const ROOT = [1, 21];

/** The right wings, the body at x = 0 and the root at y = 0, head up: a
 * forewing to its rounded tip up and out, a rounded hindwing below. */
const wingPath = (context: CanvasRenderingContext2D) => {
  context.beginPath();
  context.moveTo(0, 0);
  context.bezierCurveTo(5, -12, 16, -19, 24, -17);
  context.bezierCurveTo(27, -12, 24, -4, 15, 0);
  context.bezierCurveTo(9, 2, 4, 2, 0, 1);
  context.moveTo(0, 1);
  context.bezierCurveTo(8, 1, 17, 4, 18, 11);
  context.bezierCurveTo(18, 18, 10, 21, 4, 15);
  context.bezierCurveTo(2, 12, 0, 6, 0, 1);
  context.closePath();
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

/** A wing, blue from above (with its black margin and white spots) or
 * brown with eyespots from below. */
const wingSprite = (upper: boolean) => {
  const canvas = document.createElement("canvas");
  canvas.width = WING_W * SCALE;
  canvas.height = WING_H * SCALE;
  const context = canvas.getContext("2d")!;
  context.scale(SCALE, SCALE);
  context.translate(ROOT[0], ROOT[1]);
  wingPath(context);
  const gradient = context.createRadialGradient(0, 0, 1, 0, 0, 24);
  if (upper) {
    gradient.addColorStop(0, "#0b2a6e");
    gradient.addColorStop(0.35, "#1c7cf2");
    gradient.addColorStop(0.7, "#4ec3ff");
    gradient.addColorStop(1, "#1a4fa8");
  } else {
    gradient.addColorStop(0, "#3a2a1c");
    gradient.addColorStop(0.6, "#6e5536");
    gradient.addColorStop(1, "#4a3826");
  }
  context.fillStyle = gradient;
  context.fill();
  context.lineWidth = upper ? 2.4 : 1.2;
  context.strokeStyle = upper ? "#07101f" : "#2a1f15";
  context.stroke();
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
  return canvas;
};

type Sprites = {
  upper: HTMLCanvasElement;
  lower: HTMLCanvasElement;
  glow: HTMLCanvasElement;
};

let sprites: Sprites | null = null;

/** The morpho's sprites, made once. */
const morphoSprites = () => {
  sprites ??= {
    upper: wingSprite(true),
    lower: wingSprite(false),
    glow: glowSprite(64, [
      [0, "rgba(90, 180, 255, 0.55)"],
      [1, "rgba(40, 120, 255, 0)"],
    ]),
  };
  return sprites;
};

/** How far a wing is open (seen from above) for a beat of `lift` (0 open
 * flat … 1 closed up). */
export const openness = (lift: number) =>
  Math.max(0.1, Math.cos((lift * 80 * Math.PI) / 180));

/**
 * Draws a morpho at (x, y), its head toward `heading` (radians, 0 up), with
 * `span` px between its wing tips, in its soft blue glow.
 */
export const drawButterfly = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  heading: number,
  open: number,
  alpha: number,
  span: number,
) => {
  if (alpha <= 0.01) return;
  const { upper, lower, glow } = morphoSprites();
  context.save();
  context.translate(x, y);
  context.rotate(heading);
  context.globalAlpha = alpha * 0.5;
  context.globalCompositeOperation = "lighter";
  context.drawImage(glow, -span * 0.76, -span * 0.76, span * 1.52, span * 1.52);
  context.globalCompositeOperation = "source-over";
  context.globalAlpha = alpha;
  const scale = span / 2 / 24;
  const sprite = open > 0.42 ? upper : lower;
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

/** Never more than this many at once. */
const MAX = 5;
/** Wingspans (px); the pointer's own is 42. */
const SPANS = [26, 32, 38, 46];

const cueOf = (element: Element | null | undefined) =>
  element?.closest(".film-hold")?.querySelector<HTMLElement>(".film-cue") ??
  null;

/** The blocks of the jungle scenes. */
const SCENE_BLOCKS: Array<() => HTMLElement | null> = [
  () => cueOf(document.getElementById("home")),
  () => cueOf(document.getElementById("about")),
  () => cueOf(document.querySelector(".about-card")),
  () => cueOf(document.getElementById("contact")),
];

/** Where on a block a butterfly can sit: along the top edges of its
 * heading, its buttons, its card and its facts' icons (element, and the
 * stretch of its top edge). */
const perchesOn = (block: HTMLElement) => {
  const perches: Array<{ element: HTMLElement; from: number; to: number }> = [];
  const add = (selector: string, from: number, to: number) =>
    block
      .querySelectorAll<HTMLElement>(selector)
      .forEach((element) => perches.push({ element, from, to }));
  add(".intro-sentence, .film-title", 0.06, 0.55);
  add(".film-actions > *", 0.2, 0.8);
  add(".about-card > *", 0.1, 0.9);
  add(".about-meta-icon", 0.5, 0.5);
  add(".espoo-now-dial", 0.5, 0.5);
  return perches;
};

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

const pick = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

type Flyer = {
  state: "away" | "coming" | "perched" | "startled" | "leaving";
  block: HTMLElement | null;
  span: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Where it lands (screen px), measured when it sets off. */
  tx: number;
  ty: number;
  /** Which way it came from, and leaves toward. */
  side: -1 | 1;
  heading: number;
  tilt: number;
  flap: number;
  alpha: number;
  since: number;
  seed: number;
};

export class Flock {
  private readonly flyers: Flyer[] = Array.from(
    { length: MAX },
    (_, index) => ({
      state: "away",
      block: null,
      span: 32,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      tx: 0,
      ty: 0,
      side: 1,
      heading: 0,
      tilt: 0,
      flap: index * 1.7,
      alpha: 0,
      since: 0,
      seed: index * 13.7 + 3,
    }),
  );
  /** The blocks the flock has visited while they are shown. */
  private readonly visited = new Set<HTMLElement>();
  private pointer = { x: -1e4, y: -1e4 };
  private last = 0;
  private readonly onMove = (event: PointerEvent) => {
    this.pointer = { x: event.clientX, y: event.clientY };
  };

  constructor() {
    window.addEventListener("pointermove", this.onMove, { passive: true });
    if (import.meta.env.DEV) {
      (window as unknown as { __flock: Flyer[] }).__flock = this.flyers;
    }
  }

  dispose() {
    window.removeEventListener("pointermove", this.onMove);
  }

  /** A block has come in: two or three set off for it. */
  private visit(block: HTMLElement, pin: number, vw: number, now: number) {
    const free = this.flyers.filter((flyer) => flyer.state === "away");
    const perches = perchesOn(block);
    const count = Math.min(
      free.length,
      perches.length,
      2 + Math.round(Math.random()),
    );
    const taken: Array<[number, number]> = [];
    for (let index = 0; index < count; index += 1) {
      // Somewhere else each time, and not on top of another one.
      let point: [number, number] | null = null;
      for (let tries = 0; tries < 12 && !point; tries += 1) {
        const perch = pick(perches);
        const at = offsetIn(perch.element, block);
        const along = perch.from + Math.random() * (perch.to - perch.from);
        const x = at.left + perch.element.offsetWidth * along;
        const y = pin + at.top;
        if (taken.every(([tx, ty]) => Math.hypot(tx - x, ty - y) > 70)) {
          point = [x, y];
        }
      }
      if (!point) break;
      taken.push(point);
      const flyer = free[index];
      flyer.block = block;
      flyer.span = pick(SPANS);
      flyer.tx = point[0];
      flyer.ty = point[1] - flyer.span * 0.22;
      flyer.side = Math.random() < 0.5 ? -1 : 1;
      flyer.x = flyer.side > 0 ? vw + 40 : -40;
      flyer.y = flyer.ty - 100 - Math.random() * 180;
      flyer.vx = -flyer.side * 220;
      flyer.vy = 40;
      flyer.tilt = (Math.random() - 0.5) * 0.4;
      flyer.alpha = 0;
      flyer.state = "coming";
      // One after another.
      flyer.since = now + index * 450;
    }
  }

  /** Moves the flock on; returns whether any of it is to be drawn. */
  update(frame: DirectorFrame) {
    const now = frame.now;
    const dt = this.last ? Math.min(0.05, (now - this.last) / 1000) : 1 / 60;
    this.last = now;
    const { vw } = frame.viewport;
    const inScene =
      !frame.reduced &&
      (frame.activeChapter === "chase" || frame.activeChapter === "ending");
    // A block that has come in (well in view) is visited once each time.
    SCENE_BLOCKS.forEach((find) => {
      const block = find();
      if (!block) return;
      const state = blockState.get(block);
      const there = inScene && !!state?.shown && state.visible > 0.6;
      if (there && !this.visited.has(block)) {
        this.visited.add(block);
        this.visit(block, state!.pin, vw, now);
      } else if (!state?.shown && this.visited.has(block)) {
        this.visited.delete(block);
      }
    });
    let any = false;
    this.flyers.forEach((flyer) => {
      if (flyer.state === "away") return;
      const state = flyer.block ? blockState.get(flyer.block) : undefined;
      const blockThere = inScene && !!state?.shown;
      if (!blockThere && flyer.state !== "leaving") {
        flyer.state = "leaving";
        flyer.since = now;
      }
      any = true;
      // Waiting for its turn to set off.
      if (flyer.state === "coming" && now < flyer.since) return;
      // A pointer close by startles it up for a moment.
      const near =
        Math.hypot(this.pointer.x - flyer.x, this.pointer.y - flyer.y) <
        flyer.span * 1.2;
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
        targetX = flyer.x + flyer.side * 300;
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
        const distance = Math.hypot(dx, dy);
        // Its flutter calms as it comes in to land.
        const flutter =
          flyer.state === "coming" ? smoothstep(8, 90, distance) : 1.4;
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
        // It lands once it is there and slow.
        if (
          flyer.state === "coming" &&
          distance < 6 &&
          Math.hypot(flyer.vx, flyer.vy) < 80
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
        flyer.block = null;
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
        flyer.x,
        flyer.y,
        flyer.heading,
        openness(lift),
        flyer.alpha,
        flyer.span,
      );
    });
  }
}
