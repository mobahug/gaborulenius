import { readFileSync } from "node:fs";

/*
 * A Lighthouse report as a short Markdown table (for a CI run's summary).
 * Budgets are checked by assert-lighthouse.mjs; this only reports: a local
 * preview server is slower than GitHub Pages, so its LCP says less than the
 * live site's.
 */
const reportPath = process.argv[2] ?? ".lighthouse/mobile.json";
const report = JSON.parse(readFileSync(reportPath, "utf8"));

const rows = Object.values(report.categories).map(
  (category) => `| ${category.title} | ${Math.round(category.score * 100)} |`,
);
const metrics = [
  "largest-contentful-paint",
  "total-blocking-time",
  "cumulative-layout-shift",
]
  .map((id) => report.audits[id])
  .filter(Boolean)
  .map((audit) => `| ${audit.title} | ${audit.displayValue} |`);

console.log(
  [
    "### Lighthouse (mobile, local preview)",
    "",
    "| | |",
    "| --- | --- |",
    ...rows,
    ...metrics,
  ].join("\n"),
);
