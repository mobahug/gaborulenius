/*
 * Renders the pictures the portfolio is known by outside itself:
 *
 * - public/social-card.jpg (1200 × 630): the card shown where the address is
 *   shared (LinkedIn, Slack, Teams, search results) — the chase's path, the
 *   portrait, the name and the role;
 * - public/favicon-32.png and apple-touch-icon.png: the blue morpho of
 *   public/favicon.svg (the loader's butterfly), on the jungle's green
 *   where the icon must be opaque.
 *
 * Run from the repository root: node tools/social/render.mjs
 * (uses the installed Google Chrome through Playwright).
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const dataUrl = (path, type) =>
  `data:${type};base64,${readFileSync(join(root, path)).toString("base64")}`;

const font = dataUrl("public/fonts/inter-latin-var.woff2", "font/woff2");
const still = dataUrl("public/film/jungle_chase-still.webp", "image/webp");
const portrait = dataUrl("public/profile2-small.webp", "image/webp");
const morpho = dataUrl("public/favicon.svg", "image/svg+xml");

const base = `
  @font-face {
    font-family: "Inter";
    font-weight: 400 800;
    src: url("${font}") format("woff2");
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; }
`;

/* Centred, so that apps which crop it to a square (WhatsApp, iMessage)
   keep the portrait, the name and the role. */
const card = `<!doctype html><html><head><style>${base}
  body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    position: relative;
    font-family: "Inter", sans-serif;
    color: #f6f1e4;
    background: #0b110d url("${still}") center / cover no-repeat;
    -webkit-font-smoothing: antialiased;
  }
  .shade {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 75% at 50% 48%,
      rgba(7, 11, 8, 0.8) 0%, rgba(7, 11, 8, 0.6) 55%, rgba(7, 11, 8, 0.25) 100%);
  }
  .copy {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-bottom: 20px;
  }
  .portrait {
    width: 132px;
    height: 132px;
    border-radius: 50%;
    border: 3px solid #d9c89a;
    background: url("${portrait}") center / cover;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.55), 0 0 0 10px rgba(255, 236, 190, 0.06);
    margin-bottom: 30px;
  }
  h1 {
    margin: 0;
    font-size: 72px;
    font-weight: 800;
    letter-spacing: -0.035em;
    line-height: 1;
  }
  .role {
    margin: 20px 0 0;
    font-size: 29px;
    font-weight: 600;
    color: #e9dcb3;
    letter-spacing: -0.01em;
  }
  .focus {
    margin: 12px 0 0;
    font-size: 23px;
    font-weight: 500;
    color: rgba(246, 241, 228, 0.84);
  }
  .address {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 38px;
    font-size: 19px;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-align: center;
    color: rgba(246, 241, 228, 0.72);
  }
</style></head><body>
  <div class="shade"></div>
  <div class="copy">
    <div class="portrait"></div>
    <h1>Gábor Ulenius</h1>
    <p class="role">Full-Stack Developer · Espoo, Finland</p>
    <p class="focus">Healthcare data platforms · Cloud · AI</p>
  </div>
  <div class="address">mobahug.github.io/gaborulenius</div>
</body></html>`;

/** The morpho, square: on the jungle's green, or on nothing (the favicon). */
const icon = (size, opaque) => `<!doctype html><html><head><style>${base}
  body {
    width: ${size}px;
    height: ${size}px;
    display: grid;
    place-items: center;
    background: ${
      opaque
        ? "radial-gradient(ellipse at 50% 42%, #2a4d26 0%, #16301b 55%, #0a160d 100%)"
        : "transparent"
    };
  }
  img {
    display: block;
    height: ${Math.round(size * (opaque ? 0.82 : 1))}px;
    filter: ${opaque ? "drop-shadow(0 0 10px rgba(70, 160, 255, 0.45))" : "none"};
  }
</style></head><body><img src="${morpho}" alt=""></body></html>`;

const browser = await chromium.launch({ channel: "chrome" });
const shoot = async (html, width, height, path, options = {}) => {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(root, path), ...options });
  await page.close();
  console.log("wrote", path);
};

await shoot(card, 1200, 630, "public/social-card.jpg", {
  type: "jpeg",
  quality: 86,
});
await shoot(icon(32, false), 32, 32, "public/favicon-32.png", {
  omitBackground: true,
});
await shoot(icon(180, true), 180, 180, "public/apple-touch-icon.png");
await browser.close();
