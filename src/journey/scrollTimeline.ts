import { prefersReducedMotion } from "./device";
import { clamp } from "./math";
import { isWheelGliding } from "./smoothWheel";

/**
 * The scroll position is the master timeline of the page. This module owns
 * the single scroll/resize listener and flushes every registered scene once
 * per animation frame, always in a read-then-write order. Scenes derive their
 * whole visual state from the progress values they receive, so scrolling
 * backwards replays every effect in reverse and jumping (for example through
 * the navigation) lands in a consistent state.
 */

export type Viewport = {
  y: number;
  /*
   * `vh` is the large viewport height (CSS `100lvh`): on phones it does not
   * change while the browser's toolbars slide in and out during scrolling,
   * so nothing timed by the scroll jumps when they do. The fixed stage is
   * exactly this tall.
   */
  /**
   * The scroll position eased toward `y`, for everything the scroll times
   * (films, reveals, zooms): wheels and trackpads that scroll in steps still
   * move them smoothly. Positions on screen always use `y`.
   */
  smoothY: number;
  vw: number;
  vh: number;
  maxY: number;
};

export type SceneFrame = {
  viewport: Viewport;
  /** Absolute document offset of the scene element. */
  top: number;
  height: number;
  /* Progress values follow the eased scroll position (`smoothY`). */
  /** 0 when the element's top meets the viewport top, 1 when its bottom meets the viewport bottom. */
  pin: number;
  /** 0 when the top enters at the viewport bottom, 1 when the bottom leaves at the viewport top. */
  pass: number;
  /** 0 when the top enters at the viewport bottom, 1 when the top reaches the viewport top. */
  enter: number;
  /** 0 when the bottom reaches the viewport bottom, 1 when the bottom reaches the viewport top. */
  exit: number;
  /** True while the element is within one viewport of being visible. */
  near: boolean;
};

export type SceneCallback = (frame: SceneFrame) => void;
export type FrameCallback = (viewport: Viewport) => void;

type SceneTarget = HTMLElement | (() => HTMLElement | null);

type Scene = {
  target: SceneTarget;
  callback: SceneCallback;
};

const scenes = new Set<Scene>();
const afterFrameCallbacks = new Set<FrameCallback>();
let frameId: number | null = null;
let listening = false;

/** Time constant of the eased scroll position (s); while a wheel glides
 * the page (smoothWheel.ts), which eases it already, a few milliseconds. */
const SMOOTH_SECONDS = 0.09;
const GLIDING_SECONDS = 0.02;
let smoothY: number | null = null;
let lastFlush = 0;

const resolveTarget = (target: SceneTarget) =>
  typeof target === "function" ? target() : target;

/** An invisible fixed element as tall as the large viewport (100lvh). */
let heightProbe: HTMLElement | null = null;
let stableHeight = 0;

const measureStableHeight = () => {
  if (!heightProbe) {
    heightProbe = document.createElement("div");
    heightProbe.setAttribute("aria-hidden", "true");
    heightProbe.style.cssText =
      "position:fixed;top:0;left:0;width:0;height:100vh;height:100lvh;visibility:hidden;pointer-events:none;";
    document.body.appendChild(heightProbe);
  }
  stableHeight = heightProbe.offsetHeight || window.innerHeight;
};

export const readViewport = (): Viewport => {
  if (!stableHeight) measureStableHeight();
  const y = window.scrollY;
  return {
    y,
    smoothY: smoothY ?? y,
    vw: document.documentElement.clientWidth || window.innerWidth,
    vh: stableHeight,
    maxY: Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    ),
  };
};

/** The large viewport only changes with the window (or a rotation). */
const onResize = () => {
  measureStableHeight();
  requestSceneFrame();
};

/**
 * Eases `smoothY` toward the scroll position. Jumps (links, a dragged
 * scroll bar) land at once; with reduced motion there is no easing.
 */
const easeScroll = (y: number, vh: number) => {
  const now = performance.now();
  // After a pause, count the first step as a single frame.
  const dt = now - lastFlush > 100 ? 1 / 60 : (now - lastFlush) / 1000;
  lastFlush = now;
  if (
    smoothY === null ||
    Math.abs(y - smoothY) > vh * 1.5 ||
    prefersReducedMotion()
  ) {
    smoothY = y;
  } else {
    const seconds = isWheelGliding() ? GLIDING_SECONDS : SMOOTH_SECONDS;
    smoothY += (y - smoothY) * (1 - Math.exp(-dt / seconds));
    if (Math.abs(y - smoothY) < 0.5) smoothY = y;
  }
  return smoothY;
};

export const computeSceneFrame = (
  viewport: Viewport,
  top: number,
  height: number,
): SceneFrame => {
  const { smoothY: y, vh } = viewport;
  return {
    viewport,
    top,
    height,
    pin: clamp((y - top) / Math.max(1, height - vh)),
    pass: clamp((y + vh - top) / Math.max(1, height + vh)),
    enter: clamp((y + vh - top) / Math.max(1, vh)),
    exit: clamp((y - (top + height - vh)) / Math.max(1, vh)),
    near: y + 2 * vh > top && y - vh < top + height,
  };
};

const measure = (element: HTMLElement, viewport: Viewport) => {
  const rect = element.getBoundingClientRect();
  return { top: rect.top + viewport.y, height: rect.height };
};

const flush = () => {
  frameId = null;
  const raw = readViewport();
  const viewport = { ...raw, smoothY: easeScroll(raw.y, raw.vh) };

  // Read phase: measure every scene before any scene writes styles.
  const measured: Array<[Scene, number, number]> = [];
  scenes.forEach((scene) => {
    const element = resolveTarget(scene.target);
    if (!element) return;
    const { top, height } = measure(element, viewport);
    measured.push([scene, top, height]);
  });

  // Write phase.
  measured.forEach(([scene, top, height]) => {
    scene.callback(computeSceneFrame(viewport, top, height));
  });
  afterFrameCallbacks.forEach((callback) => callback(viewport));
  // Keep going until the eased position has caught up.
  if (viewport.smoothY !== viewport.y) requestSceneFrame();
};

export const requestSceneFrame = () => {
  if (frameId !== null || typeof window === "undefined") return;
  frameId = window.requestAnimationFrame(flush);
};

const startListening = () => {
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.addEventListener("scroll", requestSceneFrame, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", onResize);
  window.addEventListener("load", requestSceneFrame);
  // Lazy sections change the document height; re-run so progress stays exact.
  if ("ResizeObserver" in window) {
    new ResizeObserver(requestSceneFrame).observe(document.documentElement);
  }
};

/**
 * Registers a scene. The callback runs immediately (so the first paint is
 * already correct) and then on every frame in which the page scrolls or
 * resizes.
 */
export const registerScene = (target: SceneTarget, callback: SceneCallback) => {
  startListening();
  const scene: Scene = { target, callback };
  scenes.add(scene);

  const element = resolveTarget(target);
  if (element) {
    const viewport = readViewport();
    const { top, height } = measure(element, viewport);
    callback(computeSceneFrame(viewport, top, height));
  }
  requestSceneFrame();

  return () => {
    scenes.delete(scene);
  };
};

/** Runs after all scenes have written their state for the frame. */
export const onAfterSceneFrame = (callback: FrameCallback) => {
  startListening();
  afterFrameCallbacks.add(callback);
  requestSceneFrame();
  return () => {
    afterFrameCallbacks.delete(callback);
  };
};
