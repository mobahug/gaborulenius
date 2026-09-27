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
    saturation: 0.74,
    haze: 0.08,
    shade: 0.16,
    seed: 7,
    quality: 0.8,
  },
  {
    name: "banana-high",
    photo: "banana.png",
    base: [510, 1380],
    tip: [2430, 230],
    minHole: 30,
    long: 1360,
    saturation: 0.62,
    haze: 0.2,
    shade: 0.06,
    blur: 1.4,
    seed: 23,
    quality: 0.8,
  },
  {
    name: "fern-near",
    photo: "fern.png",
    base: [2604, 810],
    tip: [286, 1530],
    minHole: 6,
    long: 1300,
    saturation: 0.7,
    haze: 0.06,
    shade: 0.3,
    blur: 1.2,
    seed: 4,
    quality: 0.8,
  },
];
