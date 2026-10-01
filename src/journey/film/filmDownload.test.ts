import { describe, expect, it } from "vitest";
import { firstFilmUrl } from "./filmDownload";
import { FILMS } from "./films";

describe("firstFilmUrl", () => {
  it("is the journey's first film, as the film layer chooses it", () => {
    // A phone held upright gets the portrait window, other screens full HD.
    expect(firstFilmUrl(390, 844)).toBe(FILMS[0].src.portrait);
    expect(firstFilmUrl(1440, 900)).toBe(FILMS[0].src.hd);
    expect(firstFilmUrl(820, 1180)).toBe(FILMS[0].src.hd);
  });
});
