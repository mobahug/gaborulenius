// Encodes the films' sounds from their sources (not kept in the repository)
// into public/audio/<id>.m4a with afconvert (macOS), then measures every
// encoded sound's loudness and the gain that brings it to the jungle's: the
// gains in src/journey/audio/soundscape.ts.
//
// usage: node tools/audio/encode-sounds.mjs [--sources DIR] [id ...]
//
// - A sound that fades at its ends, or has a stretch that stands out, is
//   cut to a steady stretch whose last seconds are folded over its first
//   (an equal-power crossfade), so it loops without a seam.
// - Loudness is integrated loudness (ITU-R BS.1770-4: K-weighted, gated),
//   measured on the encoded files, as the visitor hears them.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");

/** Each sound's source, bitrate (bit/s) and, for a loop, its stretch (s). */
const SOUNDS = [
  // The portfolio's first sound (public/jungle-music.mp3 in the history).
  { id: "jungle", source: "jungle-music.mp3", bitrate: 96_000 },
  // Pixabay: "Space Cinematic Music" by Tunetank (414649).
  { id: "neural", source: "space-cinematic-music.mp3", bitrate: 96_000 },
  // Pixabay: "Birds in Wetland" (16740).
  { id: "wetland", source: "birds-in-wetland.mp3", bitrate: 64_000 },
  // Pixabay: "Underwater Ambience" (376890); it fades out from 18 s.
  {
    id: "underwater",
    source: "underwater-ambience.mp3",
    bitrate: 80_000,
    loop: { from: 0.5, to: 17.5, fold: 3 },
  },
  // Pixabay: "Office ambience" (24734); it has two loud moments, at 42 s
  // and at 116 s, 15 dB over the room.
  {
    id: "office",
    source: "office-ambience.mp3",
    bitrate: 64_000,
    loop: { from: 46.5, to: 111.5, fold: 4 },
  },
];

const args = process.argv.slice(2);
const sourcesAt = args.indexOf("--sources");
const sources =
  sourcesAt >= 0
    ? path.resolve(args[sourcesAt + 1])
    : path.join(os.homedir(), "Downloads");
const wanted = args.filter(
  (arg, index) => !arg.startsWith("--") && args[index - 1] !== "--sources",
);
const build = fs.mkdtempSync(path.join(os.tmpdir(), "sound-encode-"));

const readWav = (file) => {
  const buffer = fs.readFileSync(file);
  let offset = 12;
  const wav = { channels: 0, rate: 0, data: new Float32Array() };
  while (offset < buffer.length) {
    const id = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    if (id === "fmt ") {
      wav.channels = buffer.readUInt16LE(offset + 10);
      wav.rate = buffer.readUInt32LE(offset + 12);
    } else if (id === "data") {
      const start = buffer.byteOffset + offset + 8;
      wav.data = new Float32Array(buffer.buffer.slice(start, start + size));
    }
    offset += 8 + size + (size % 2);
  }
  return wav;
};

const writeWav = (file, { channels, rate, data }) => {
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + data.byteLength, 4);
  header.write("WAVEfmt ", 8);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(3, 20); // IEEE float
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(rate, 24);
  header.writeUInt32LE(rate * channels * 4, 28);
  header.writeUInt16LE(channels * 4, 32);
  header.writeUInt16LE(32, 34);
  header.write("data", 36);
  header.writeUInt32LE(data.byteLength, 40);
  fs.writeFileSync(file, Buffer.concat([header, Buffer.from(data.buffer)]));
};

const decode = (file) => {
  const wav = path.join(build, `${path.basename(file)}.wav`);
  execFileSync("afconvert", ["-f", "WAVE", "-d", "LEF32", file, wav]);
  return readWav(wav);
};

/** [from, to] of `wav`, its last `fold` seconds laid over its first. */
const loopOf = ({ channels, rate, data }, { from, to, fold }) => {
  const start = Math.round(from * rate);
  const length = Math.round((to - from) * rate);
  const overlap = Math.round(fold * rate);
  const out = new Float32Array((length - overlap) * channels);
  for (let t = 0; t < length - overlap; t++) {
    const x = Math.min(1, t / overlap);
    const rising = Math.sin((Math.PI / 2) * x);
    const falling = Math.cos((Math.PI / 2) * x);
    for (let c = 0; c < channels; c++) {
      const head = data[(start + t) * channels + c];
      const tail =
        x < 1 ? data[(start + length - overlap + t) * channels + c] : 0;
      out[t * channels + c] = head * rising + tail * falling;
    }
  }
  return { channels, rate, data: out };
};

const biquad = (b, a) => {
  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;
  return (x) => {
    const y = b[0] * x + b[1] * x1 + b[2] * x2 - a[1] * y1 - a[2] * y2;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;
    return y;
  };
};

/** BS.1770's K-weighting at any sample rate: a high shelf, then a high pass. */
const kWeighting = (rate) => {
  let K = Math.tan((Math.PI * 1681.974450955533) / rate);
  let Q = 0.7071752369554196;
  const Vh = 10 ** (3.999843853973347 / 20);
  const Vb = Vh ** 0.4996667741545416;
  let a0 = 1 + K / Q + K * K;
  const shelf = biquad(
    [
      (Vh + (Vb * K) / Q + K * K) / a0,
      (2 * (K * K - Vh)) / a0,
      (Vh - (Vb * K) / Q + K * K) / a0,
    ],
    [1, (2 * (K * K - 1)) / a0, (1 - K / Q + K * K) / a0],
  );
  K = Math.tan((Math.PI * 38.13547087602444) / rate);
  Q = 0.5003270373238773;
  a0 = 1 + K / Q + K * K;
  const highPass = biquad(
    [1, -2, 1],
    [1, (2 * (K * K - 1)) / a0, (1 - K / Q + K * K) / a0],
  );
  return (x) => highPass(shelf(x));
};

/** Integrated loudness (LUFS) and sample peak (dBFS). */
const measure = ({ channels, rate, data }) => {
  const filters = Array.from({ length: channels }, () => kWeighting(rate));
  const step = Math.round(rate / 10);
  const steps = [];
  let sum = 0;
  let peak = 0;
  for (let i = 0; i < data.length / channels; i++) {
    for (let c = 0; c < channels; c++) {
      const x = data[i * channels + c];
      peak = Math.max(peak, Math.abs(x));
      sum += filters[c](x) ** 2;
    }
    if ((i + 1) % step === 0) {
      steps.push(sum / step);
      sum = 0;
    }
  }
  // 400 ms blocks, overlapping by 75 %.
  const blocks = steps
    .slice(3)
    .map((_, i) => (steps[i] + steps[i + 1] + steps[i + 2] + steps[i + 3]) / 4);
  const lufs = (power) => -0.691 + 10 * Math.log10(power);
  const mean = (values) => values.reduce((a, b) => a + b, 0) / values.length;
  const audible = blocks.filter((power) => lufs(power) > -70);
  const gate = lufs(mean(audible)) - 10;
  return {
    loudness: lufs(mean(audible.filter((power) => lufs(power) > gate))),
    peak: 20 * Math.log10(peak),
  };
};

for (const sound of SOUNDS) {
  if (wanted.length && !wanted.includes(sound.id)) continue;
  const source = path.join(sources, sound.source);
  const out = path.join(root, "public/audio", `${sound.id}.m4a`);
  let input = source;
  if (sound.loop) {
    input = path.join(build, `${sound.id}-loop.wav`);
    writeWav(input, loopOf(decode(source), sound.loop));
  }
  execFileSync("afconvert", [
    "-f",
    "m4af",
    "-d",
    "aac",
    "-b",
    String(sound.bitrate),
    "-s",
    "1",
    input,
    out,
  ]);
}

const measured = SOUNDS.map((sound) => ({
  ...sound,
  ...measure(decode(path.join(root, "public/audio", `${sound.id}.m4a`))),
}));
const reference = measured.find((sound) => sound.id === "jungle").loudness;
for (const sound of measured) {
  const gain = 10 ** ((reference - sound.loudness) / 20);
  const bytes = fs.statSync(
    path.join(root, "public/audio", `${sound.id}.m4a`),
  ).size;
  console.log(
    `${sound.id.padEnd(11)} ${sound.loudness.toFixed(1)} LUFS, peak ${sound.peak.toFixed(1)} dBFS` +
      ` -> gain ${gain.toFixed(2)} (peak ${(sound.peak + 20 * Math.log10(gain)).toFixed(1)} dBFS),` +
      ` ${(bytes / 1e6).toFixed(2)} MB`,
  );
}
fs.rmSync(build, { recursive: true, force: true });
