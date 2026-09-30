import { describe, expect, it } from "vitest";
import { CAREER_START, experienceYears } from "./experience";

describe("experienceYears", () => {
  it("counts whole half-years from the first developer role", () => {
    // December 2022 to September 2026: 3 years and 9 months.
    expect(experienceYears(CAREER_START, new Date(2026, 8, 30))).toBe(3.5);
  });

  it("moves on to the next half-year only once it is complete", () => {
    expect(experienceYears(CAREER_START, new Date(2026, 10, 30))).toBe(3.5);
    expect(experienceYears(CAREER_START, new Date(2026, 11, 1))).toBe(4);
    expect(experienceYears(CAREER_START, new Date(2027, 5, 1))).toBe(4.5);
  });

  it("is never negative", () => {
    expect(experienceYears(CAREER_START, new Date(2020, 0, 1))).toBe(0);
  });
});
