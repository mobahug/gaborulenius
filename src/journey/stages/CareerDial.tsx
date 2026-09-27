import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { allEvents, highlightedEvents } from "../../contexts";
import {
  experienceTabAtom,
  selectedEventAtom,
} from "../../hooks/experienceAtoms";
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
/** The dial: 270° from the lower left, round to the lower right. */
const SWEEP = 270;
/** The office film's route, outside, and the career, inside. */
const ROUTE_RADIUS = 78;
const CAREER_RADIUS = 54;
/** Film times over which the walk goes round. */
const START = 0.9;
const END = 7.2;
/** The office film's parts, at the times of their blocks (WorkStage). */
const SECTIONS = [
  { time: 1.6, href: "#experience", label: "navExperience" },
  { time: 3.2, href: "#work", label: "navWorkProjects" },
  { time: 5.6, href: "#skills", label: "navSkillsList" },
  { time: 6.5, href: "#tools", label: "navTools" },
];
/** This year, the end of the career inside. */
const NOW = new Date().getFullYear();

/** Degrees clockwise from the top of the dial, for a share of the sweep. */
const angleAt = (share: number) => -SWEEP / 2 + share * SWEEP;
const along = (time: number) => clamp((time - START) / (END - START));

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

const ROUTE = arc(ROUTE_RADIUS, angleAt(0), angleAt(1));
const CAREER_ARC = arc(CAREER_RADIUS, angleAt(0), angleAt(1));

const at = (radius: number, degrees: number) => {
  const [x, y] = polar(radius, degrees);
  return `translate(${x.toFixed(1)} ${y.toFixed(1)})`;
};

/**
 * The office film's instrument (wide screens only), in the language of the
 * Explorer's map: the film's parts round the dial — the experience, the work
 * projects, the skills and the tools — walked in red as the film plays, each
 * lit once passed and taking you to it, and the one you are in named in the
 * middle. Inside, as an extra touch, the career: the events of the
 * experience timeline's open tab (its highlights, or all of it), oldest
 * first, from the first one's year round to this one; each tells its story
 * beside the timeline, and the one told is lit.
 */
const CareerDial = () => {
  const dialRef = useRef<HTMLDivElement>(null);
  const intl = useIntl();
  const [chosen, choose] = useAtom(selectedEventAtom);
  const tab = useAtomValue(experienceTabAtom);
  const events = tab === 0 ? highlightedEvents : allEvents;
  // The timeline lists the latest first; round the dial, time goes on.
  const career = [...events].reverse();
  // The one whose story is told: the chosen one, or the latest.
  const told = events.some((event) => event.titleId === chosen)
    ? chosen
    : events[0].titleId;
  const yearOf = (whenId: string) =>
    intl.formatMessage({ id: whenId }).match(/\d{4}/)?.[0] ?? "";
  const shareOf = (index: number) =>
    career.length > 1 ? index / (career.length - 1) : 0.5;

  useEffect(() => {
    const dial = dialRef.current;
    if (!dial) return;
    const track = dial.querySelector<SVGPathElement>(".instrument-track")!;
    const head = dial.querySelector<SVGGElement>(".instrument-walker")!;
    const stops = Array.from(
      dial.querySelectorAll<SVGCircleElement>(
        ".career-dial-section .instrument-stop",
      ),
    );
    const name = dial.querySelector<SVGTextElement>(".instrument-name")!;
    const count = dial.querySelector<SVGTextElement>(".instrument-caption")!;
    const names = SECTIONS.map(({ label }) =>
      intl.formatMessage({ id: label }),
    );
    const length = track.getTotalLength();
    track.style.strokeDasharray = `${length.toFixed(2)}`;
    const wide = window.matchMedia(INSTRUMENT_QUERY);
    const show = showInstrument();
    let walked = -1;
    let reached = -1;
    return onDirectorFrame((frame) => {
      const entry = frame.timeline.films[WORK];
      const time = entry?.time ?? 0;
      const presence =
        wide.matches && entry && frame.timeline.current === WORK
          ? presenceBetween(time, START, END)
          : 0;
      if (!show(dial, presence)) return;
      const progress = frame.reduced ? 1 : Math.round(along(time) * 400) / 400;
      if (progress !== walked) {
        walked = progress;
        track.style.strokeDashoffset = (length * (1 - progress)).toFixed(2);
        head.setAttribute("transform", at(ROUTE_RADIUS, angleAt(progress)));
      }
      const passed = frame.reduced
        ? SECTIONS.length
        : SECTIONS.filter((section) => time >= section.time - 0.05).length;
      if (passed !== reached) {
        reached = passed;
        stops.forEach((stop, index) =>
          stop.classList.toggle("instrument-stop--reached", index < passed),
        );
        // The part you are in (or, before the first, the one coming).
        const current = Math.max(0, passed - 1);
        name.textContent = names[current];
        count.textContent = `${current + 1} / ${SECTIONS.length}`;
      }
    }, 40);
  }, [intl]);

  return (
    <div ref={dialRef} className="instrument career-dial" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        {/* The career, inside (drawn anew for the other tab). */}
        <path className="career-dial-years" d={CAREER_ARC} />
        <g key={tab} className="career-dial-career">
          {[yearOf(career[0].whenId), String(NOW)].map((year, index) => (
            <text
              key={index}
              className="instrument-label"
              transform={at(CAREER_RADIUS - 14, angleAt(index))}
            >
              ’{year.slice(2)}
            </text>
          ))}
          {career.map(({ titleId, whenId }, index) => (
            <g
              key={titleId}
              transform={at(CAREER_RADIUS, angleAt(shareOf(index)))}
            >
              <a
                className={`instrument-waypoint career-dial-role${told === titleId ? " is-chosen" : ""}`}
                href="#experience"
                tabIndex={-1}
                onClick={() => choose(titleId)}
              >
                <title>{`${intl.formatMessage({ id: titleId })}, ${intl.formatMessage({ id: whenId })}`}</title>
                <circle className="instrument-hit" r="8" />
                <circle className="instrument-stop" r="2.8" />
              </a>
            </g>
          ))}
        </g>
        {/* The film's parts, round the outside. */}
        <path className="instrument-plan" d={ROUTE} />
        <path className="instrument-track" d={ROUTE} />
        {SECTIONS.map(({ time, href, label }) => (
          <g key={href} transform={at(ROUTE_RADIUS, angleAt(along(time)))}>
            <a
              className="instrument-waypoint career-dial-section"
              href={href}
              tabIndex={-1}
            >
              <title>{intl.formatMessage({ id: label })}</title>
              <circle className="instrument-hit" r="11" />
              <circle className="instrument-stop" r="4" />
            </a>
          </g>
        ))}
        <g className="instrument-walker">
          <circle className="instrument-pulse" r={WALKER_RADIUS} />
          <circle className="instrument-head" r={WALKER_RADIUS} />
        </g>
        <text className="instrument-name" x="100" y="97" />
        <text className="instrument-caption" x="100" y="113" />
      </svg>
    </div>
  );
};

export default CareerDial;
