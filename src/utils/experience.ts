/** The first developer role: Anyhau, December 2022. */
export const CAREER_START = new Date(2022, 11, 1);

/**
 * Professional experience in whole half-years (3.5, 4, 4.5 …), counted from
 * the start of the first developer role, so the About section never states
 * an experience it has outgrown.
 */
export const experienceYears = (
  start: Date = CAREER_START,
  now: Date = new Date(),
) => {
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    now.getMonth() -
    start.getMonth();
  return Math.max(0, Math.floor(months / 6) / 2);
};
