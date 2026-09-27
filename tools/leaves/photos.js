/*
 * The cover's leaves from photographs (see cutout.js): the photo in
 * photos/ (not kept in the repository), where the leaf's stalk and tip are
 * in it, and how it is graded into the film's picture. The result replaces
 * the rendered leaf of the same name in public/cover/.
 */
export const PHOTO_LEAVES = [
  {
    name: "monstera",
    photo: "monstera.png",
    base: [1550, 500],
    tip: [1340, 1440],
    minHole: 120,
    long: 1200,
    saturation: 0.86,
    haze: 0,
    shade: 0.12,
    seed: 7,
    quality: 0.8,
    tint: [1.32, 1, 0.72],
  },
  {
    name: "banana-high",
    photo: "banana.png",
    base: [510, 1380],
    tip: [2430, 230],
    minHole: 30,
    long: 1360,
    saturation: 0.78,
    haze: 0,
    shade: 0.1,
    blur: 1.4,
    seed: 23,
    quality: 0.8,
    tint: [1.42, 1, 0.7],
  },
  {
    name: "fern-near",
    photo: "fern.png",
    base: [2604, 810],
    tip: [286, 1530],
    minHole: 6,
    long: 1300,
    saturation: 0.86,
    haze: 0,
    shade: 0.25,
    blur: 1.2,
    seed: 4,
    quality: 0.8,
    tint: [1.3, 1, 0.7],
  },
];
