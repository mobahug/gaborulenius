import { describe, expect, it } from "vitest";
import { FILMS, FRAME_ASPECT } from "../film/films";
import {
  coverRect,
  focusAt,
  portalCircle,
  pupilCoverTime,
  windowGeometry,
} from "./frameMapping";

const chase = FILMS[0];
const portal = FILMS[1].seam.portal!;

describe("coverRect", () => {
  it("covers a wide screen edge to edge, cropping top and bottom", () => {
    const rect = coverRect(1920, 1080, 0.5);
    expect(rect.left).toBe(0);
    expect(rect.width).toBe(1920);
    expect(rect.height).toBeCloseTo(1920 / FRAME_ASPECT);
    expect(rect.top).toBeCloseTo((1080 - rect.height) / 2);
  });

  it("covers a portrait screen top to bottom, cropping at the focus", () => {
    const left = coverRect(390, 844, 0);
    const middle = coverRect(390, 844, 0.5);
    expect(left.height).toBeCloseTo(844);
    expect(left.left).toBeCloseTo(0);
    expect(middle.left).toBeCloseTo((390 - middle.width) / 2);
  });
});

describe("focusAt", () => {
  it("keeps a wide screen on the frame's centre", () => {
    expect(focusAt(chase, 4.6, 16 / 9)).toBe(0.5);
  });

  it("follows the film's subject on a portrait screen", () => {
    // The macaw crosses the left of the clearing at 4.6 s (focus 22 %).
    expect(focusAt(chase, 4.6, 390 / 844)).toBeCloseTo(0.22);
  });
});

describe("the pupil", () => {
  it("grows as the camera dives into the eye", () => {
    const early = portalCircle(portal, portal.opens);
    const late = portalCircle(portal, chase.duration - 0.05);
    expect(late.radius).toBeGreaterThan(early.radius);
  });

  it("stays in the frame's coordinates while it is tracked", () => {
    const circle = portalCircle(portal, portal.opens + 0.2);
    expect(circle.x).toBeGreaterThan(0);
    expect(circle.x).toBeLessThan(1);
    expect(circle.y).toBeGreaterThan(0);
    expect(circle.y).toBeLessThan(1);
  });

  it("covers a portrait phone no later than a wide desktop", () => {
    const phone = pupilCoverTime(chase, portal, 390, 844);
    const desktop = pupilCoverTime(chase, portal, 1440, 900);
    expect(phone).toBeLessThanOrEqual(desktop);
    expect(phone).toBeGreaterThanOrEqual(portal.opens);
    expect(desktop).toBeLessThanOrEqual(chase.duration);
  });

  it("really covers the screen from that moment", () => {
    const time = pupilCoverTime(chase, portal, 1440, 900);
    expect(windowGeometry(chase, portal, time, 1440, 900).near).toBe(1);
  });
});
