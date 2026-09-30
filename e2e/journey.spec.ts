import { expect, test, type Page } from "@playwright/test";

/** Waits until the loader over the first screen lets clicks through. */
const loaderLetGo = (page: Page) =>
  page.waitForFunction(() => {
    const loader = document.getElementById("jungle-loader");
    return (
      !loader ||
      loader.classList.contains("is-landing") ||
      loader.classList.contains("is-leaving")
    );
  });

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
    /social-card\.jpg\?v=\d+$/,
  );
  expect(errors).toEqual([]);
});

test("quick read shows the essentials on one calm page", async ({ page }) => {
  const films: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".mp4")) films.push(request.url());
  });
  await page.goto("./?read");

  await expect(page.locator("#qr-name")).toHaveText("Gábor Ulenius");
  for (const name of [
    "About Me",
    "Experience",
    "Work projects",
    "Personal projects",
    "Skills & Tools",
    "Let’s Connect",
  ]) {
    const heading = page.getByRole("heading", { name, level: 2 });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  }
  await expect(page.locator("#cover-heading")).toHaveCount(0);
  await expect(page.locator("#jungle-loader")).toHaveCount(0);
  expect(films).toEqual([]);

  // The choice stays for the next visit; the bar leads back to the film.
  await page.goto("./");
  await expect(page.locator("#qr-name")).toBeVisible();
  await page.getByRole("button", { name: "Film journey", exact: true }).click();
  await expect(page.locator("#cover-heading")).toBeVisible();
  await expect(page.locator(".qr")).toHaveCount(0);

  // And the bar leads to quick read again, once the loader lets go.
  await loaderLetGo(page);
  await page.getByRole("button", { name: "Quick read", exact: true }).click();
  await expect(page.locator("#qr-name")).toBeVisible();
});

test("the bar's buttons stay in place between the two pages", async ({
  page,
}) => {
  const place = async (name: string) => {
    const box = await page
      .getByRole("button", { name, exact: true })
      .boundingBox();
    expect(box).not.toBeNull();
    return box!;
  };
  // Wide screens only: phones keep the language in the menu.
  const language = async () => {
    const group = page.getByRole("group", { name: "Language" });
    return (await group.count()) ? group.boundingBox() : null;
  };

  await page.goto("./?read");
  const film = await place("Film journey");
  const quickLanguage = await language();

  await page.goto("./?read=0");
  await loaderLetGo(page);
  const quick = await place("Quick read");
  expect(quick.x).toBeCloseTo(film.x, 0);
  expect(quick.y).toBeCloseTo(film.y, 0);
  expect(quick.width).toBeCloseTo(film.width, 0);
  // Wide screens show the language in the bar too, in the same place.
  if (quickLanguage) {
    const journeyLanguage = await language();
    expect(journeyLanguage?.x).toBeCloseTo(quickLanguage.x, 0);
  }
});

test("the CV comes in the language of the page", async ({ page }) => {
  await page.goto("./?read&lang=en");
  await expect(
    page.getByRole("link", { name: "Download My CV" }),
  ).toHaveAttribute("href", /Gabor_Ulenius_CV_EN\.pdf$/);
  await page.goto("./?read&lang=fi");
  await expect(page.getByRole("link", { name: "Lataa CV:ni" })).toHaveAttribute(
    "href",
    /Gabor_Ulenius_CV_FI\.pdf$/,
  );
});

test("quick read speaks Finnish too", async ({ page }) => {
  await page.goto("./?lang=fi&read");
  await expect(page.locator(".qr-kicker")).toHaveText("Pikakatsaus");
  await expect(
    page.getByRole("heading", { name: "Työkokemus", level: 2 }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "fi");
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
  const copy = page.getByRole("button", { name: "Copy the email address" });
  await copy.click();
  await expect(
    page.getByRole("button", { name: "Email address copied" }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "gaborulenius@gmail.com",
  );
});

test("the journey loads its sections on the way to the end", async ({
  page,
}) => {
  await page.goto("./?read=0");
  for (const heading of [
    "#about-heading",
    "#neural-heading",
    "#explorer-heading",
    "#contact-heading",
  ]) {
    await expect(await scrollUntil(page, heading)).toBeAttached();
  }
  await expect(page.locator(".copy-email")).toContainText(
    "gaborulenius@gmail.com",
  );
});
