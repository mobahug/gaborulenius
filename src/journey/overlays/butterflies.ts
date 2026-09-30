import type { DirectorFrame } from "../director/director";
import { blockState } from "../film/holdProgress";
import { smoothstep } from "../math";
import { glowSprite } from "./surface";

/*
 * The morpho of the jungle films — iridescent blue, with a black margin and
 * white spots along its forewings — drawn from a wing sprite; a flapping
 * wing is the sprite narrowed, a deeper blue as it rises, and never
 * narrower than a third, so it does not seem to blink.
 *
 * The flock: in the jungle scenes (the introduction, About and its story,
 * and the invitation at the end), whenever a block comes in, two or three
 * morphos of different sizes fade in from the edges of the screen, fly over
 * and settle on its edges — on top of its heading, of a button or of the
 * story's portrait, on a fact's icon, or clinging to the side of a button —
 * each time somewhere else, like the old portfolio's pixel bird, and
 * slowly open and close their wings. Never more than five at once. A
 * pointer that comes close startles one up for a moment; when the block
 * goes, they fly away.
 */

/** Sprite resolution: one wing, this many times its size in wing units. */
const SCALE = 5;
const WING_W = 30;
const WING_H = 46;
/** The wing root in the sprite (wing units). */
const ROOT = [1, 22];

/** The right forewing: from the root up to a pointed apex, a slightly
 * concave outer margin, and back along the inner margin. */
const forewing = (context: CanvasRenderingContext2D) => {
  context.moveTo(0, 0);
  context.bezierCurveTo(4, -9, 13, -17, 24.5, -18.5);
  context.bezierCurveTo(25.5, -14, 23.5, -9, 23, -5);
  context.bezierCurveTo(22.5, -2, 19, 0.5, 14, 1);
  context.bezierCurveTo(9, 1.5, 4, 1.5, 0, 1);
};

/** The right hindwing: rounded, with a softly scalloped outer margin. */
const hindwing = (context: CanvasRenderingContext2D) => {
  context.moveTo(0, 1);
  context.bezierCurveTo(7, 0, 15, 2.5, 18.5, 8);
  context.quadraticCurveTo(19.5, 10.5, 18, 12.5);
  context.quadraticCurveTo(17.5, 15.5, 15, 17);
  context.quadraticCurveTo(12.5, 19.5, 9.5, 19.5);
  context.quadraticCurveTo(6, 19.5, 4, 16);
  context.bezierCurveTo(2, 12, 0.5, 6, 0, 1);
};

const noise = (seed: number) => {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
};

/**
 * A wing seen from above: iridescent blue, darker toward the body, a broad
 * black margin along the forewing's apex and outer edge with white spots,
 * a thin dark rim on the hindwing, dark veins radiating from the root and
 * the fine speckle of its scales. `dark` is the same wing turned away from
 * the light (a deep blue), laid over it as the wing closes.
 */
const wingSprite = (dark: boolean) => {
  const canvas = document.createElement("canvas");
  canvas.width = WING_W * SCALE;
  canvas.height = WING_H * SCALE;
  const context = canvas.getContext("2d")!;
  context.scale(SCALE, SCALE);
  context.translate(ROOT[0], ROOT[1]);
  const fill = (path: (context: CanvasRenderingContext2D) => void) => {
    context.beginPath();
    path(context);
    context.closePath();
  };
  [forewing, hindwing].forEach((path, index) => {
    context.save();
    fill(path);
    context.clip();
    const gradient = context.createRadialGradient(-2, 0, 1, 2, 0, 25);
    if (dark) {
      gradient.addColorStop(0, "#050d22");
      gradient.addColorStop(0.5, "#0c2a66");
      gradient.addColorStop(1, "#0a1f4c");
    } else {
      gradient.addColorStop(0, "#08204f");
      gradient.addColorStop(0.28, "#1557c9");
      gradient.addColorStop(0.58, "#2a93f5");
      gradient.addColorStop(0.8, "#5fd2ff");
      gradient.addColorStop(1, "#2f7fd6");
    }
    context.fillStyle = gradient;
    context.fillRect(-2, -22, 30, 44);
    // Veins from the root.
    context.strokeStyle = dark
      ? "rgba(2, 6, 16, 0.5)"
      : "rgba(6, 18, 48, 0.42)";
    context.lineWidth = 0.35;
    const veins =
      index === 0
        ? [
            [8, -10, 20, -17],
            [10, -7, 23, -12],
            [11, -4, 23, -6],
            [10, -2, 21, -1],
            [7, 0, 16, 1],
          ]
        : [
            [7, 3, 17, 9],
            [7, 6, 16, 14],
            [6, 9, 12, 18],
            [4, 10, 7, 18],
          ];
    veins.forEach(([cx, cy, x, y]) => {
      context.beginPath();
      context.moveTo(0.5, 0.5);
      context.quadraticCurveTo(cx, cy, x, y);
      context.stroke();
    });
    // Scales.
    const next = noise(index ? 97 : 31);
    for (let dot = 0; dot < 420; dot += 1) {
      const x = next() * 27;
      const y = -20 + next() * 42;
      context.fillStyle =
        next() < 0.5 ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 10, 30, 0.1)";
      context.fillRect(x, y, 0.35, 0.35);
    }
    context.restore();
  });
  // The forewing's black margin, along the apex and the outer edge, with
  // white spots in it.
  context.save();
  fill(forewing);
  context.clip();
  context.strokeStyle = "#060a14";
  context.lineWidth = 6;
  context.beginPath();
  context.moveTo(9, -14);
  context.bezierCurveTo(15, -18.5, 21, -19.5, 25.5, -18.5);
  context.bezierCurveTo(26, -13, 24.5, -8, 24, -3.5);
  context.stroke();
  if (!dark) {
    context.fillStyle = "rgba(246, 248, 255, 0.9)";
    [
      [22.4, -16.2, 0.75],
      [24.1, -12.4, 0.7],
      [23.6, -8.6, 0.65],
      [18.5, -16.4, 0.55],
    ].forEach(([x, y, r]) => {
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2);
      context.fill();
    });
  }
  context.restore();
  // Thin dark rims.
  context.strokeStyle = "rgba(4, 8, 18, 0.95)";
  context.lineWidth = 0.9;
  fill(forewing);
  context.stroke();
  fill(hindwing);
  context.stroke();
  return canvas;
};

type Sprites = {
  lit: HTMLCanvasElement;
  dark: HTMLCanvasElement;
  glow: HTMLCanvasElement;
};

let sprites: Sprites | null = null;

/** The morpho's sprites, made once. */
const morphoSprites = () => {
  sprites ??= {
    lit: wingSprite(false),
    dark: wingSprite(true),
    glow: glowSprite(64, [
      [0, "rgba(90, 180, 255, 0.5)"],
      [1, "rgba(40, 120, 255, 0)"],
    ]),
  };
  return sprites;
};

/** How far a wing is open (seen from above) for a beat of `lift` (0 open
 * flat … 1 up). Never less than a third: a wing seen edge-on would all but
 * vanish, and the butterfly would seem to blink at every beat. */
const openness = (lift: number) =>
  Math.max(0.36, Math.cos((lift * 70 * Math.PI) / 180));

/**
 * Draws a morpho at (x, y), its head toward `heading` (radians, 0 up), with
 * `span` px between its wing tips, in its soft blue glow. Its wings are
 * always blue: as they rise they narrow and turn a deeper blue, away from
 * the light.
 */
const drawButterfly = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  heading: number,
  open: number,
  alpha: number,
  span: number,
) => {
  if (alpha <= 0.01) return;
  const { lit, dark, glow } = morphoSprites();
  context.save();
  context.translate(x, y);
  context.rotate(heading);
  context.globalAlpha = alpha * 0.45 * (0.7 + 0.3 * open);
  context.globalCompositeOperation = "lighter";
  context.drawImage(glow, -span * 0.76, -span * 0.76, span * 1.52, span * 1.52);
  context.globalCompositeOperation = "source-over";
  const scale = span / 2 / 25;
  // A deeper blue as it rises, never so dark that it is lost.
  const shade = Math.min(0.45, (1 - open) * 0.7);
  [1, -1].forEach((side) => {
    context.save();
    context.scale(side * open * scale, scale);
    context.globalAlpha = alpha;
    context.drawImage(lit, -ROOT[0], -ROOT[1], WING_W, WING_H);
    if (shade > 0.02) {
      context.globalAlpha = alpha * shade;
      context.drawImage(dark, -ROOT[0], -ROOT[1], WING_W, WING_H);
    }
    context.restore();
  });
  // The body: a furry thorax, a tapering abdomen, the head and its clubbed
  // antennae.
  const body = span / 42;
  context.globalAlpha = alpha;
  context.fillStyle = "#12100e";
  context.beginPath();
  context.ellipse(0, -1 * body, 1.6 * body, 3.4 * body, 0, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.ellipse(0, 5.2 * body, 1.05 * body, 5 * body, 0, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.arc(0, -4.8 * body, 1.2 * body, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "rgba(20, 18, 16, 0.95)";
  context.lineWidth = 0.55 * body;
  [-1, 1].forEach((side) => {
    context.beginPath();
    context.moveTo(side * 0.5 * body, -5.6 * body);
    context.quadraticCurveTo(
      side * 2 * body,
      -10 * body,
      side * 4.2 * body,
      -12.5 * body,
    );
    context.stroke();
    context.beginPath();
    context.arc(side * 4.3 * body, -12.7 * body, 0.6 * body, 0, Math.PI * 2);
    context.fill();
  });
  context.restore();
};

// ------------------------------------------------------------- the flock

/** Never more than this many at once. */
const MAX = 5;
/** Wingspans (px). */
const SPANS = [26, 32, 38, 46];

const cueOf = (element: Element | null | undefined) =>
  element?.closest(".film-hold")?.querySelector<HTMLElement>(".film-cue") ??
  null;

/** The blocks of the jungle scenes. */
const SCENE_BLOCKS: Array<() => HTMLElement | null> = [
  () => cueOf(document.getElementById("home")),
  () => cueOf(document.getElementById("about")),
  () => cueOf(document.getElementById("story")),
  () => cueOf(document.getElementById("contact")),
];

export type Perch = {
  element: HTMLElement;
  /** Which edge: its top, or one of its sides. */
  edge: "top" | "left" | "right";
  /** The stretch of that edge (0–1, left to right or top to bottom). */
  from: number;
  to: number;
};

/** Where on a block a butterfly can sit: along the top edges of its
 * heading, its buttons, the story's portrait and the facts' icons, and on
 * the sides of its buttons. */
const perchesOn = (block: HTMLElement) => {
  const perches: Perch[] = [];
  const add = (
    selector: string,
    edge: Perch["edge"],
    from: number,
    to: number,
  ) =>
    block
      .querySelectorAll<HTMLElement>(selector)
      .forEach((element) => perches.push({ element, edge, from, to }));
  add(".intro-sentence, .film-title", "top", 0.06, 0.55);
  add(".film-actions > *", "top", 0.2, 0.8);
  // The sides of the first and last buttons (not of words, which a
  // butterfly on the side would cover).
  add(".film-actions > .MuiButton-root:first-child", "left", 0.3, 0.6);
  add(".film-actions > .MuiButton-root:last-child", "right", 0.3, 0.6);
  add(".story-avatar", "top", 0.35, 0.65);
  add(".about-meta-icon", "top", 0.5, 0.5);
  return perches;
};

/** A block the flock may visit, as the page shows it now. */
export type FlockBlock = {
  element: HTMLElement;
  /** On screen: the flock may stay on it; once it is not, they leave. */
  shown: boolean;
  /** Well in view: visited, once while it is shown. */
  ready: boolean;
  /** Its top-left corner on screen (px). */
  x: number;
  y: number;
};

type FlockOptions = {
  /** Where on a block a butterfly can sit. */
  perches?: (block: HTMLElement) => Perch[];
  /** How many set off for a block: at least, at most. */
  visitors?: readonly [number, number];
};

/** The journey's blocks for the flock: those of the jungle scenes, where
 * they are held on screen. */
const sceneBlocks = (): FlockBlock[] =>
  SCENE_BLOCKS.flatMap((find) => {
    const element = find();
    if (!element) return [];
    const state = blockState.get(element);
    const shown = !!state?.shown;
    return [
      {
        element,
        shown,
        ready: shown && state!.visible > 0.6,
        x: 0,
        y: state?.pin ?? 0,
      },
    ];
  });

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
  /** How it sits: on a top edge, or clinging to a side (−1 left, 1 right). */
  cling: -1 | 0 | 1;
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
      cling: 0,
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
  private readonly onDown = (event: PointerEvent) => {
    this.onMove(event);
    // A short touch can end before the next frame, so startle it now.
    this.flyers.forEach((flyer) => {
      if (
        flyer.state === "perched" &&
        Math.hypot(this.pointer.x - flyer.x, this.pointer.y - flyer.y) <
          flyer.span * 1.2
      ) {
        flyer.state = "startled";
        flyer.since = performance.now();
      }
    });
  };
  private readonly onEnd = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") {
      this.pointer = { x: -1e4, y: -1e4 };
    }
  };
  private readonly perches: (block: HTMLElement) => Perch[];
  private readonly visitors: readonly [number, number];

  /** The journey's flock by default: two or three to a block, on its
   * heading, buttons, portrait and icons. */
  constructor({ perches = perchesOn, visitors = [2, 3] }: FlockOptions = {}) {
    this.perches = perches;
    this.visitors = visitors;
    window.addEventListener("pointermove", this.onMove, { passive: true });
    window.addEventListener("pointerdown", this.onDown, { passive: true });
    window.addEventListener("pointerup", this.onEnd, { passive: true });
    window.addEventListener("pointercancel", this.onEnd, { passive: true });
    if (import.meta.env.DEV) {
      (window as unknown as { __flock: Flyer[] }).__flock = this.flyers;
    }
  }

  dispose() {
    window.removeEventListener("pointermove", this.onMove);
    window.removeEventListener("pointerdown", this.onDown);
    window.removeEventListener("pointerup", this.onEnd);
    window.removeEventListener("pointercancel", this.onEnd);
  }

  /** A block has come in: a few set off for it. */
  private visit(block: FlockBlock, vw: number, now: number) {
    const free = this.flyers.filter((flyer) => flyer.state === "away");
    const perches = this.perches(block.element);
    const [fewest, most] = this.visitors;
    const count = Math.min(
      free.length,
      perches.length,
      fewest + Math.round(Math.random() * (most - fewest)),
    );
    const taken: Array<[number, number]> = [];
    for (let index = 0; index < count; index += 1) {
      // Somewhere else each time, and not on top of another one.
      let point: [number, number] | null = null;
      let cling: -1 | 0 | 1 = 0;
      for (let tries = 0; tries < 12 && !point; tries += 1) {
        const perch = pick(perches);
        const at = offsetIn(perch.element, block.element);
        const along = perch.from + Math.random() * (perch.to - perch.from);
        const { offsetWidth: width, offsetHeight: height } = perch.element;
        const x =
          block.x +
          (perch.edge === "top"
            ? at.left + width * along
            : at.left + (perch.edge === "right" ? width : 0));
        const y =
          block.y + at.top + (perch.edge === "top" ? 0 : height * along);
        if (taken.every(([tx, ty]) => Math.hypot(tx - x, ty - y) > 70)) {
          point = [x, y];
          cling = perch.edge === "top" ? 0 : perch.edge === "left" ? -1 : 1;
        }
      }
      if (!point) break;
      taken.push(point);
      const flyer = free[index];
      flyer.block = block.element;
      flyer.span = pick(SPANS);
      flyer.cling = cling;
      // On a top edge it stands on it; on a side it clings to it, head up,
      // leaning out a little.
      flyer.tx = point[0] + cling * flyer.span * 0.08;
      flyer.ty = point[1] - (cling ? 0 : flyer.span * 0.22);
      flyer.side = Math.random() < 0.5 ? -1 : 1;
      flyer.x = flyer.side > 0 ? vw + 40 : -40;
      flyer.y = flyer.ty - 100 - Math.random() * 180;
      flyer.vx = -flyer.side * 220;
      flyer.vy = 40;
      flyer.tilt = cling
        ? cling * (0.12 + Math.random() * 0.12)
        : (Math.random() - 0.5) * 0.4;
      flyer.alpha = 0;
      flyer.state = "coming";
      // One after another.
      flyer.since = now + index * 450;
    }
  }

  /** The journey: in the jungle scenes, on their blocks. */
  update(frame: DirectorFrame) {
    const inScene =
      !frame.reduced &&
      (frame.activeChapter === "chase" || frame.activeChapter === "ending");
    return this.step(frame.now, frame.viewport.vw, inScene, sceneBlocks());
  }

  /** Moves the flock on over `blocks` while it is `active`; returns
   * whether any of it is to be drawn. */
  step(now: number, vw: number, active: boolean, blocks: FlockBlock[]) {
    const dt = this.last ? Math.min(0.05, (now - this.last) / 1000) : 1 / 60;
    this.last = now;
    // A block that has come in (well in view) is visited once each time.
    blocks.forEach((block) => {
      const { element } = block;
      if (active && block.ready && !this.visited.has(element)) {
        this.visited.add(element);
        this.visit(block, vw, now);
      } else if (!block.shown && this.visited.has(element)) {
        this.visited.delete(element);
      }
    });
    let any = false;
    this.flyers.forEach((flyer) => {
      if (flyer.state === "away") return;
      const home = blocks.find((block) => block.element === flyer.block);
      const blockThere = active && !!home?.shown;
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
