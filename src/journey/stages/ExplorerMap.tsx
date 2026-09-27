import { useEffect, useRef, type CSSProperties } from "react";
import { assetUrl } from "../../utils/assets";
import { onDirectorFrame } from "../director/director";
import { filmIndex } from "../film/films";
import { clamp } from "../math";
import {
  INSTRUMENT_QUERY,
  WALKER_RADIUS,
  presenceBetween,
  showInstrument,
} from "./instrument";

/** The route on the map (a 200 × 200 box), from the trailhead to the camp. */
const ROUTE =
  "M 30 170 C 52 158, 56 136, 80 130 C 106 124, 128 136, 136 114 C 144 92, 112 84, 118 64 C 124 44, 152 50, 166 32";
/** Film times at which the walker sets out and arrives … */
const START = 1.2;
const END = 7.4;
/** … and reaches each waypoint: the four capabilities, then how the app is
 * built (the times of their blocks in ExplorerStage). */
const WAYPOINTS = [2.3, 3.3, 4.9, 5.8, 6.45];
const EXPLORER = filmIndex("explorer");
/** Samples of the walker's place along the route. */
const SAMPLES = 200;

const along = (time: number) => clamp((time - START) / (END - START));

/**
 * The Explorer's expedition, in a corner of the screen while its film plays
 * (wide screens only): an almost transparent topographic map, the planned
 * route dotted, the walked track in red with the walker at its head, and a
 * waypoint for every capability, lit once the walker has passed it. The
 * walk follows the film's time, so it moves with the scroll and back.
 */
const ExplorerMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const plan = map.querySelector<SVGPathElement>(".instrument-plan")!;
    const track = map.querySelector<SVGPathElement>(".instrument-track")!;
    const head = map.querySelector<SVGGElement>(".instrument-walker")!;
    const stops = Array.from(
      map.querySelectorAll<SVGCircleElement>(".instrument-stop"),
    );
    const length = plan.getTotalLength();
    const samples = Array.from({ length: SAMPLES + 1 }, (_, index) =>
      plan.getPointAtLength((length * index) / SAMPLES),
    );
    WAYPOINTS.forEach((time, index) => {
      const point = plan.getPointAtLength(length * along(time));
      stops[index].setAttribute("cx", point.x.toFixed(1));
      stops[index].setAttribute("cy", point.y.toFixed(1));
    });
    track.style.strokeDasharray = `${length.toFixed(2)}`;
    const wide = window.matchMedia(INSTRUMENT_QUERY);
    const show = showInstrument();
    let walked = -1;
    let reached = -1;
    return onDirectorFrame((frame) => {
      const entry = frame.timeline.films[EXPLORER];
      const time = entry?.time ?? 0;
      // From the title to the end of the expedition, in the Explorer only.
      const presence =
        wide.matches && entry && frame.timeline.current === EXPLORER
          ? presenceBetween(time, START, END)
          : 0;
      if (!show(map, presence)) return;
      const progress = frame.reduced
        ? 1
        : Math.round(along(time) * SAMPLES) / SAMPLES;
      if (progress !== walked) {
        walked = progress;
        track.style.strokeDashoffset = (length * (1 - progress)).toFixed(2);
        const point = samples[Math.round(progress * SAMPLES)];
        head.setAttribute(
          "transform",
          `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`,
        );
      }
      const passed = WAYPOINTS.filter((stop) => time >= stop - 0.05).length;
      if (passed !== reached) {
        reached = passed;
        stops.forEach((stop, index) =>
          stop.classList.toggle("instrument-stop--reached", index < passed),
        );
      }
    }, 40);
  }, []);

  return (
    <div
      ref={mapRef}
      className="instrument explorer-map"
      aria-hidden="true"
      style={
        {
          "--route-map": `url("${assetUrl("explorer/topography.svg")}")`,
        } as CSSProperties
      }
    >
      <svg viewBox="0 0 200 200">
        <path className="instrument-plan" d={ROUTE} />
        <path className="instrument-track" d={ROUTE} />
        {WAYPOINTS.map((time) => (
          <circle key={time} className="instrument-stop" r="4" />
        ))}
        <g className="instrument-walker">
          <circle className="instrument-pulse" r={WALKER_RADIUS} />
          <circle className="instrument-head" r={WALKER_RADIUS} />
        </g>
      </svg>
    </div>
  );
};

export default ExplorerMap;
