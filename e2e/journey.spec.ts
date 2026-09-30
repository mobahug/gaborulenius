import { expect, test, type Page } from "@playwright/test";

/** Scrolls down a screen at a time until `locator` exists (the sections
 * further down load as they come near). */
const scrollUntil = async (page: Page, selector: string) => {
  await expect
    .poll(
      async () => {
        await page.evaluate(() =>
          window.scrollBy({ top: window.innerHeight, behavior: "instant" }),
        );
        return page.locator(selector).count();
      },
      { timeout: 30_000 },
    )
    .toBeGreaterThan(0);
  const target = page.locator(selector).first();
  await target.scrollIntoViewIfNeeded();
  return target;
};

test("greets the visitor and tells search engines who this is", async ({
  page,
}) => {
  const errors: Error[] = [];
  page.on("pageerror", (error) => errors.push(error));
  await page.goto("./");

  await expect(page.locator("#cover-heading")).toContainText("Gábor");
  await expect(page).toHaveTitle(/Gábor Ulenius/);
  const data = JSON.parse(
    (await page.locator("#portfolio-structured-data").textContent()) ?? "{}",
  );
  const person = data["@graph"].find(
    (node: { "@type": string }) => node["@type"] === "Person",
  );
  expect(person.name).toBe("Gábor Ulenius");
  expect(person.alternateName).toContain("Gabor Ulenius");
  await expect(
    page.locator('link[rel="alternate"][hreflang="fi"]'),
  ).toHaveAttribute("href", /\?lang=fi$/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /social-card\.jpg$/,
  );
  expect(errors).toEqual([]);
});

test("quick read shows the whole portfolio on one calm page", async ({
  page,
}) => {
  const films: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".mp4")) films.push(request.url());
  });
  await page.goto("./?read");

  const root = page.locator("html");
  await expect(root).toHaveAttribute("data-motion", "reduced");
  await expect(page.locator(".cover-quick-read")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  for (const heading of [
    "#about-heading",
    "#neural-heading",
    "#explorer-heading",
    "#contact-heading",
  ]) {
    await expect(await scrollUntil(page, heading)).toBeVisible();
  }
  expect(films).toEqual([]);

  // The choice stays for the next visit, and the switch turns it off.
  await page.goto("./");
  await expect(root).toHaveAttribute("data-motion", "reduced");
  await page.locator(".cover-quick-read").click();
  await expect(root).not.toHaveAttribute("data-motion", "reduced");
  await expect(page.locator(".cover-quick-read")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
});

test("a ?lang=fi link opens the portfolio in Finnish", async ({ page }) => {
  await page.goto("./?lang=fi");
  await expect(page.locator("#cover-heading")).toContainText("Hei, olen");
  await expect(page.locator("html")).toHaveAttribute("lang", "fi");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\?lang=fi$/,
  );
});

test("a link to a section lands on it", async ({ page }) => {
  await page.goto("./#skills");
  await expect(
    page.getByRole("heading", { name: "Skills & Tools" }),
  ).toBeInViewport();
});

test("the email address can be copied", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("./?read");
  await scrollUntil(page, "#contact-heading");
  const copy = page.getByRole("button", { name: "Copy the email address" });
  await copy.click();
  await expect(
    page.getByRole("button", { name: "Email address copied" }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "gaborulenius@gmail.com",
  );
});
