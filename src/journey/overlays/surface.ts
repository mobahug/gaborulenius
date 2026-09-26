import type { QualityTier } from "../device";

/** Highest canvas resolution per device tier (device pixels per CSS px). */
const MAX_RATIO: Record<QualityTier, number> = {
  high: 1.5,
  medium: 1.25,
  low: 1,
};

/**
 * A full-screen 2D canvas for an overlay. It is only drawn into while the
 * overlay has something to show; the rest of the time it is cleared once
 * and hidden, so it costs nothing.
 */
export class Surface2D {
  readonly canvas: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;
  width = 0;
  height = 0;
  ratio = 1;
  private shown = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d", { alpha: true })!;
    canvas.style.visibility = "hidden";
  }

  /** Sizes the canvas to the viewport, clears it and shows it. */
  begin(vw: number, vh: number, tier: QualityTier) {
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_RATIO[tier]);
    const width = Math.round(vw * ratio);
    const height = Math.round(vh * ratio);
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    this.width = vw;
    this.height = vh;
    this.ratio = ratio;
    const { context } = this;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.globalCompositeOperation = "source-over";
    context.globalAlpha = 1;
    context.clearRect(0, 0, width, height);
    // Draw in CSS pixels.
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (!this.shown) {
      this.shown = true;
      this.canvas.style.visibility = "visible";
    }
    return context;
  }

  /** Nothing to draw: clear once and hide. */
  idle() {
    if (!this.shown) return;
    this.shown = false;
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.style.visibility = "hidden";
  }
}

/** A soft round light, drawn once and stamped with `drawImage`. */
export const glowSprite = (
  size: number,
  stops: ReadonlyArray<readonly [number, string]>,
) => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d")!;
  const half = size / 2;
  const gradient = context.createRadialGradient(
    half,
    half,
    0,
    half,
    half,
    half,
  );
  stops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  return canvas;
};
