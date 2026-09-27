import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const ESPOO = {
  latitude: 60.2055,
  longitude: 24.6559,
  zone: "Europe/Helsinki",
};
const RADIUS = 70;
const HOURS = [0, 3, 6, 9, 12, 15, 18, 21];

/** Hours since midnight (with minutes) in a time zone. */
const hourIn = (date: Date, zone?: string) => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const part = (type: string) =>
    Number(parts.find((entry) => entry.type === type)?.value ?? 0);
  return part("hour") + part("minute") / 60;
};

/** The zone's offset from UTC (h), within a day. */
const offsetOf = (date: Date, zone?: string) => {
  const utc = date.getUTCHours() + date.getUTCMinutes() / 60;
  let offset = hourIn(date, zone) - utc;
  if (offset > 14) offset -= 24;
  if (offset < -12) offset += 24;
  return offset;
};

/**
 * Sunrise and sunset in Espoo on that day (local hours), from the NOAA
 * approximation of the sun's declination and the equation of time.
 */
const daylight = (date: Date, offset: number) => {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start) / 86400000);
  const g = ((2 * Math.PI) / 365) * (day - 1);
  const equation =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(g) -
      0.032077 * Math.sin(g) -
      0.014615 * Math.cos(2 * g) -
      0.040849 * Math.sin(2 * g));
  const declination =
    0.006918 -
    0.399912 * Math.cos(g) +
    0.070257 * Math.sin(g) -
    0.006758 * Math.cos(2 * g) +
    0.000907 * Math.sin(2 * g) -
    0.002697 * Math.cos(3 * g) +
    0.00148 * Math.sin(3 * g);
  const latitude = (ESPOO.latitude * Math.PI) / 180;
  const cosine =
    Math.cos((90.833 * Math.PI) / 180) /
      (Math.cos(latitude) * Math.cos(declination)) -
    Math.tan(latitude) * Math.tan(declination);
  const angle = (Math.acos(Math.max(-1, Math.min(1, cosine))) * 180) / Math.PI;
  const noon = (720 - 4 * ESPOO.longitude - equation) / 60 + offset;
  return { rise: noon - (angle * 4) / 60, set: noon + (angle * 4) / 60 };
};

/** Degrees clockwise from the top: noon at the top, midnight below. */
const angleOf = (hour: number) => (hour / 24) * 360 + 180;

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

const minuteNow = () => Math.floor(Date.now() / 60000);

/**
 * Under the invitation: what time it is in Espoo, so a visitor knows when
 * to expect a reply. A small dial of the day — noon at the top, midnight
 * below — with today's daylight in gold and the moment in red, and beside
 * it the time in Espoo and the visitor's own.
 */
const EspooNow = () => {
  const intl = useIntl();
  const [minute, setMinute] = useState(minuteNow);

  useEffect(() => {
    const tick = window.setInterval(() => setMinute(minuteNow()), 15000);
    return () => window.clearInterval(tick);
  }, []);

  const now = new Date(minute * 60000);
  const offset = offsetOf(now, ESPOO.zone);
  const { rise, set } = daylight(now, offset);
  const [x, y] = polar(RADIUS, angleOf(hourIn(now, ESPOO.zone)));
  const clock = (zone?: string) =>
    new Intl.DateTimeFormat(intl.locale, {
      timeZone: zone,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(now);
  const sameTime = Math.abs(offsetOf(now) - offset) < 0.01;

  return (
    <p className="espoo-now">
      <svg className="espoo-now-dial" viewBox="0 0 200 200" aria-hidden="true">
        <circle className="instrument-night" cx="100" cy="100" r={RADIUS} />
        <path
          className="instrument-day"
          d={arc(RADIUS, angleOf(rise), angleOf(set))}
        />
        {HOURS.map((hour) => {
          const [x0, y0] = polar(RADIUS + 8, angleOf(hour));
          const [x1, y1] = polar(RADIUS + 17, angleOf(hour));
          return (
            <line
              key={hour}
              className="instrument-tick"
              x1={x0}
              y1={y0}
              x2={x1}
              y2={y1}
            />
          );
        })}
        <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
          <circle className="instrument-pulse" r="11" />
          <circle className="instrument-head espoo-now-sun" r="11" />
        </g>
      </svg>
      <span className="espoo-now-text">
        <span className="espoo-now-time">{clock(ESPOO.zone)}</span>
        <span className="espoo-now-place">
          <FormattedMessage id="connectPlace" />
        </span>
        <span className="espoo-now-note">
          {sameTime ? (
            <FormattedMessage id="connectSameTime" />
          ) : (
            <FormattedMessage id="connectYourTime" values={{ time: clock() }} />
          )}
        </span>
      </span>
    </p>
  );
};

export default EspooNow;
