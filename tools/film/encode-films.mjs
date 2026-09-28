// Encodes the journey's films from the delivered masters (not kept in the
// repository) into public/film/<rendition>/<id>.mp4 with encode.swift.
//
// usage: node tools/film/encode-films.mjs [--masters DIR] [hd] [sd] [portrait]
//
// - hd: the frame every rendition shares, 1880 × 1080, a keyframe every 4
//   frames (a seek decodes at most 3 frames before its own).
// - sd: the light encode, 1128 × 648, a keyframe every 8 frames.
// - portrait: for phones held upright, a 640 × 1080 window of the full-HD
//   frame that follows the film's focus (read from films.ts), a keyframe
//   every 8 frames: the same pixels a portrait screen shows of the full
//   frame, a third of them to decode.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");

/** Each film's master, how it is cut and graded, and bitrates (bit/s). */
const FILMS = [
  {
    id: "chase",
    master: "jungle_chase_seedance_2.5.mp4",
    cropX: 20,
    grade: "1.16,1.12,0.2,0.94",
    hd: 6_800_000,
    sd: 2_400_000,
    portrait: 2_400_000,
  },
  {
    id: "neural",
    master: "neural_decomplier_full_hd.mp4",
    hd: 5_700_000,
    sd: 2_000_000,
    portrait: 2_000_000,
  },
  {
    id: "explorer",
    master: "the_explorer_full_hd.mp4",
    hd: 8_500_000,
    sd: 3_000_000,
    portrait: 2_900_000,
  },
  {
    id: "work",
    master: "work_history_full_hd.mp4",
    hd: 5_700_000,
    sd: 2_000_000,
    portrait: 2_000_000,
  },
  {
    id: "ending",
    master: "ending_seedance_2.5_full_hd.mp4",
    cropX: 21,
    hd: 8_500_000,
    sd: 3_000_000,
    portrait: 2_900_000,
  },
];

/** The portrait window's width (px of the 1880-wide frame). */
const WINDOW = 640;

const args = process.argv.slice(2);
const mastersAt = args.indexOf("--masters");
const masters =
  mastersAt >= 0
    ? path.resolve(args[mastersAt + 1])
    : path.join(os.homedir(), "Downloads");
const wanted = args.filter(
  (arg, index) => !arg.startsWith("--") && args[index - 1] !== "--masters",
);
const renditions = wanted.length ? wanted : ["hd", "sd", "portrait"];

/** Each film's focus keyframes, as written in films.ts ("time:percent,…"). */
const focusOf = (() => {
  const source = fs.readFileSync(
    path.join(root, "src/journey/film/films.ts"),
    "utf8",
  );
  const table = {};
  const starts = [...source.matchAll(/id: "(\w+)",/g)];
  starts.forEach((match, index) => {
    const end = starts[index + 1]?.index ?? source.length;
    const block = source.slice(match.index, end);
    const open = block.indexOf("focus: [");
    if (open < 0) return;
    // The array, to its own closing bracket.
    let depth = 0;
    let close = open + "focus: ".length;
    for (; close < block.length; close += 1) {
      if (block[close] === "[") depth += 1;
      if (block[close] === "]") depth -= 1;
      if (depth === 0) break;
    }
    const focus = block.slice(open, close + 1);
    table[match[1]] = [...focus.matchAll(/\[([\d.]+),\s*([\d.]+)\]/g)]
      .map((pair) => `${pair[1]}:${pair[2]}`)
      .join(",");
  });
  return table;
})();

const build = fs.mkdtempSync(path.join(os.tmpdir(), "film-encode-"));
const encoder = path.join(build, "encode");
execFileSync("swiftc", ["-O", "-o", encoder, path.join(here, "encode.swift")], {
  stdio: "inherit",
});

for (const rendition of renditions) {
  const dir = path.join(root, "public/film", rendition);
  fs.mkdirSync(dir, { recursive: true });
  for (const film of FILMS) {
    const out = path.join(dir, `${film.id}.mp4`);
    const common = [
      path.join(masters, film.master),
      out,
      String(film[rendition]),
    ];
    const cut = [String(film.cropX ?? 0), film.grade ?? "-"];
    const run =
      rendition === "hd"
        ? [...common, "4", "1880", "1080", ...cut]
        : rendition === "sd"
          ? [...common, "8", "1128", "648", ...cut]
          : [
              ...common,
              "8",
              "1880",
              "1080",
              ...cut,
              String(WINDOW),
              focusOf[film.id],
            ];
    process.stdout.write(`${rendition}/${film.id}: `);
    execFileSync(encoder, run, { stdio: "inherit" });
  }
}
fs.rmSync(build, { recursive: true, force: true });
