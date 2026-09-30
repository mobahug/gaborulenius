import { describe, expect, it } from "vitest";
import en from "./en";
import fi from "./fi";

const placeholders = (message: string) =>
  [...message.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();

const tags = (message: string) =>
  [...message.matchAll(/<(\w+)>/g)].map((match) => match[1]).sort();

describe("translations", () => {
  it("say the same things in English and Finnish", () => {
    expect(Object.keys(fi).sort()).toEqual(Object.keys(en).sort());
  });

  it("fill in the same values and markup", () => {
    const english = en as Record<string, string>;
    const finnish = fi as Record<string, string>;
    for (const key of Object.keys(english)) {
      expect(placeholders(finnish[key] ?? ""), key).toEqual(
        placeholders(english[key]),
      );
      expect(tags(finnish[key] ?? ""), key).toEqual(tags(english[key]));
    }
  });

  it("leave no message empty", () => {
    for (const [key, message] of [
      ...Object.entries(en),
      ...Object.entries(fi),
    ]) {
      expect(String(message).trim(), key).not.toBe("");
    }
  });
});
