import { useEffect, useRef } from "react";
import { onDirectorFrame } from "../director/director";
import { getFilmVideo } from "../film/filmElements";
import { requestSceneFrame } from "../scrollTimeline";
import { NeuralProbe } from "./neuralProbe";
import { Surface2D } from "./surface";
import "./overlays.css";

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
