import { useEffect, useRef } from "react";
import { onDirectorFrame } from "../director/director";
import { requestSceneFrame } from "../scrollTimeline";
import { Morpho } from "./morpho";
import { Surface2D } from "./surface";
import "./overlays.css";

/**
 * Drawn above the content, like the pointer it keeps company: on the jungle
 * path, the film's morpho follows the pointer while the introduction and
 * About are read (see morpho.ts). Idle and hidden everywhere else; it never
 * takes a click.
 */
const CursorLayer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const surface = new Surface2D(canvas);
    const morpho = new Morpho();
    const wake = () => requestSceneFrame();
    window.addEventListener("pointermove", wake, { passive: true });
    const stop = onDirectorFrame((frame) => {
      if (!morpho.draw(frame, surface)) surface.idle();
      // It flies on its own while it is out.
      else requestSceneFrame();
    }, 25);
    return () => {
      stop();
      morpho.dispose();
      window.removeEventListener("pointermove", wake);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="overlay-canvas overlay-canvas--cursor"
      aria-hidden="true"
    />
  );
};

export default CursorLayer;
