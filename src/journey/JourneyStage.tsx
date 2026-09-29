import { useFilmLight } from "./director/filmLight";
import { useRestorePosition } from "./director/restorePosition";
import FilmLayer from "./film/FilmLayer";
import { FilmOverlay } from "./overlays/Overlays";
import { useSmoothWheel } from "./smoothWheel";
import "./journey.css";

/**
 * The fixed background of the whole journey: the five films that carry the
 * visitor from the jungle path through the eye, the neural network, the
 * Okavango and the office back to the jungle, and right above them the
 * probe that reads the neural film. Content scrolls over it; nothing here is
 * announced.
 */
const JourneyStage = () => {
  useFilmLight();
  useRestorePosition();
  useSmoothWheel();
  return (
    <div className="journey-stage" aria-hidden="true">
      <FilmLayer />
      <FilmOverlay />
    </div>
  );
};

export default JourneyStage;
