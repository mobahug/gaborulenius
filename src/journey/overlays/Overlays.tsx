import { useEffect, useRef } from "react";
import { onDirectorFrame } from "../director/director";
import { prefersReducedMotion } from "../device";
import { getFilmVideo } from "../film/filmElements";
import { requestSceneFrame } from "../scrollTimeline";
import { MacawKey } from "./macawKey";
import { NeuralProbe } from "./neuralProbe";
import { Surface2D } from "./surface";
import "./overlays.css";

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

/** Runs `work` once the page is idle (shader compiles, off the scroll path). */
const whenIdle = (work: () => void) => {
  const idle = window as IdleWindow;
  if (idle.requestIdleCallback) {
    const handle = idle.requestIdleCallback(work, { timeout: 4000 });
    return () => idle.cancelIdleCallback?.(handle);
  }
  const handle = window.setTimeout(work, 2500);
  return () => window.clearTimeout(handle);
};

/**
 * Drawn right above the films, under the content: inside the Neural
 * Decompiler the pointer is a probe that reads the film's neurons. Idle and
 * hidden everywhere else. Follows the director's frame after the film
 * layer, so it lines up with the picture on screen.
 */
export const FilmOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const surface = new Surface2D(canvas);
    const probe = new NeuralProbe();
    const wake = () => requestSceneFrame();
    window.addEventListener("pointermove", wake, { passive: true });
    const stop = onDirectorFrame((frame) => {
      const probing = probe.draw(frame, surface, getFilmVideo(1));
      if (!probing) surface.idle();
      // The probe's pulses move on their own while it is out.
      else requestSceneFrame();
    }, 20);
    return () => {
      stop();
      probe.dispose();
      window.removeEventListener("pointermove", wake);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="overlay-canvas overlay-canvas--film" />
  );
};

/**
 * Drawn above the content: the macaw, keyed out of the chase, flying in
 * front of About as it comes at the camera.
 */
export const PageOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const macaw = new MacawKey(canvas);
    const cancelWarm = whenIdle(() => {
      if (!prefersReducedMotion()) macaw.warm();
    });
    const stop = onDirectorFrame((frame) => {
      macaw.draw(frame, getFilmVideo(0));
    }, 30);
    return () => {
      stop();
      cancelWarm();
    };
  }, []);

  return (
    <div className="page-overlay" aria-hidden="true">
      <canvas ref={canvasRef} className="overlay-canvas" />
    </div>
  );
};
