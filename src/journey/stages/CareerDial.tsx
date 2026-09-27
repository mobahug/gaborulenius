import { useEffect, useRef } from "react";
import { onDirectorFrame } from "../director/director";
import { filmIndex } from "../film/films";
import { clamp } from "../math";
import {
  INSTRUMENT_QUERY,
  WALKER_RADIUS,
  presenceBetween,
  showInstrument,
} from "./instrument";

const WORK = filmIndex("work");
/** The dial's scale (years), 270° of it from the lower left. */
const FIRST = 2016;
const LAST = 2027;
const SWEEP = 270;
const RADIUS = 70;
/** Film times over which the walk goes from the first year to today. */
const START = 0.9;
const END = 7.2;

/** The roles of the experience timeline's highlights. */
const ROLES = [
  { from: 2016, to: 2018, name: "SataEdu" },
  { from: 2021, to: 2024, name: "Hive Helsinki" },
  { from: 2022, to: 2024, name: "Anyhau" },
  { from: 2023, to: Infinity, name: "Tieto Caretech" },
];

const today = new Date();
const NOW = today.getFullYear() + today.getMonth() / 12;

/** Degrees clockwise from the top of the dial. */
const angleOf = (year: number) =>
  -SWEEP / 2 + ((year - FIRST) / (LAST - FIRST)) * SWEEP;

const polar = (radius: number, degrees: number) => {
  const radians = (degrees * Math.PI) / 180;
  return [100 + radius * Math.sin(radians), 100 - radius * Math.cos(radians)];
};

const arc = (radius: number, from: number, to: number) => {
  const [x0, y0] = polar(radius, from);
  const [x1, y1] = polar(radius, to);
  const large = to - from > 180 ? 1 : 0;
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
};

const YEARS = Array.from({ length: LAST - FIRST }, (_, index) => FIRST + index);
const ROUTE = arc(RADIUS, angleOf(FIRST), angleOf(NOW));

/**
 * The office film's instrument (wide screens only), the Explorer's walked
 * route turned into time: a dial of the years from 2016 to today, the
 * career walked in red as the film plays, a waypoint lit at every role of
 * the experience timeline's highlights as it is passed, and in the middle
 * the year and the role of that moment.
 */
const CareerDial = () => {
  const dialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dial = dialRef.current;
    if (!dial) return;
    const track = dial.querySelector<SVGPathElement>(".instrument-track")!;
    const head = dial.querySelector<SVGGElement>(".instrument-walker")!;
    const stops = Array.from(
      dial.querySelectorAll<SVGCircleElement>(".instrument-stop"),
    );
    const year = dial.querySelector<SVGTextElement>(".instrument-value")!;
    const role = dial.querySelector<SVGTextElement>(".instrument-caption")!;
    const length = track.getTotalLength();
    track.style.strokeDasharray = `${length.toFixed(2)}`;
    const wide = window.matchMedia(INSTRUMENT_QUERY);
    const show = showInstrument();
    let walked = -1;
    let label = "";
    return onDirectorFrame((frame) => {
      const entry = frame.timeline.films[WORK];
      const time = entry?.time ?? 0;
      const presence =
        wide.matches && entry && frame.timeline.current === WORK
          ? presenceBetween(time, START, END)
          : 0;
      if (!show(dial, presence)) return;
      const progress = frame.reduced
        ? 1
        : Math.round(clamp((time - START) / (END - START)) * 400) / 400;
      if (progress === walked) return;
      walked = progress;
      const current = FIRST + (NOW - FIRST) * progress;
      track.style.strokeDashoffset = (length * (1 - progress)).toFixed(2);
      const [x, y] = polar(RADIUS, angleOf(current));
      head.setAttribute(
        "transform",
        `translate(${x.toFixed(1)} ${y.toFixed(1)})`,
      );
      stops.forEach((stop, index) =>
        stop.classList.toggle(
          "instrument-stop--reached",
          current >= ROLES[index].from,
        ),
      );
      // The latest role begun by then and not yet over.
      const at = ROLES.filter(
        ({ from, to }) => from <= current && current < to,
      ).pop();
      const text = `${Math.floor(current)}|${at?.name ?? ""}`;
      if (text !== label) {
        label = text;
        year.textContent = String(Math.floor(current));
        role.textContent = at?.name ?? "";
      }
    }, 40);
  }, []);

  return (
    <div ref={dialRef} className="instrument career-dial" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        {YEARS.map((value) => {
          const [x0, y0] = polar(RADIUS + 6, angleOf(value));
          const [x1, y1] = polar(RADIUS + 11, angleOf(value));
          return (
            <line
              key={value}
              className="instrument-tick"
              x1={x0}
              y1={y0}
              x2={x1}
              y2={y1}
            />
          );
        })}
        {YEARS.filter((value) => value % 2 === 0).map((value) => {
          const [x, y] = polar(RADIUS + 20, angleOf(value));
          return (
            <text key={value} className="instrument-label" x={x} y={y}>
              ’{String(value).slice(2)}
            </text>
          );
        })}
        <path className="instrument-plan" d={ROUTE} />
        <path className="instrument-track" d={ROUTE} />
        {ROLES.map(({ from, name }) => {
          const [x, y] = polar(RADIUS, angleOf(from));
          return (
            <circle
              key={name}
              className="instrument-stop"
              cx={x}
              cy={y}
              r="4"
            />
          );
        })}
        <g className="instrument-walker">
          <circle className="instrument-pulse" r={WALKER_RADIUS} />
          <circle className="instrument-head" r={WALKER_RADIUS} />
        </g>
        <text className="instrument-value" x="100" y="98">
          {FIRST}
        </text>
        <text className="instrument-caption" x="100" y="118" />
      </svg>
    </div>
  );
};

export default CareerDial;
