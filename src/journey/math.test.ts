import { describe, expect, it } from "vitest";
import { clamp, easeInCubic, easeOutCubic, range, smoothstep } from "./math";

describe("clamp", () => {
  it("keeps a value inside [0, 1] by default", () => {
    expect(clamp(-2)).toBe(0);
    expect(clamp(0.4)).toBe(0.4);
    expect(clamp(3)).toBe(1);
  });

  it("takes its own bounds", () => {
    expect(clamp(12, 0, 10)).toBe(10);
    expect(clamp(-12, -5, 5)).toBe(-5);
  });
});

describe("range", () => {
  it("maps [start, end] onto [0, 1], clamped", () => {
    expect(range(5, 0, 10)).toBe(0.5);
    expect(range(-5, 0, 10)).toBe(0);
    expect(range(15, 0, 10)).toBe(1);
  });

  it("works for a descending range", () => {
    expect(range(7.5, 10, 0)).toBe(0.25);
  });

  it("is a step when start and end are the same", () => {
    expect(range(0.99, 1, 1)).toBe(0);
    expect(range(1, 1, 1)).toBe(1);
  });
});

describe("smoothstep", () => {
  it("eases from 0 to 1 through the middle", () => {
    expect(smoothstep(0, 1, 0)).toBe(0);
    expect(smoothstep(0, 1, 0.5)).toBe(0.5);
    expect(smoothstep(0, 1, 1)).toBe(1);
    expect(smoothstep(0, 1, 0.25)).toBeLessThan(0.25);
  });
});

describe("easing", () => {
  it("starts at 0 and ends at 1", () => {
    for (const ease of [easeInCubic, easeOutCubic]) {
      expect(ease(0)).toBe(0);
      expect(ease(1)).toBe(1);
    }
  });
});
