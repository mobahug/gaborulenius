import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { localeAtom } from "../hooks/localeAtom";
import type { AppLocale } from "../i18n/messages";
import {
  getStructuredData,
  RECRUITER_KEYWORDS,
  SEO_BY_LOCALE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_URL,
  SOCIAL_IMAGE_WIDTH,
} from "../seo";

/** Each language has its own address (see the hreflang links in index.html). */
const pageUrl = (locale: AppLocale) =>
  locale === "fi" ? `${SITE_URL}?lang=fi` : SITE_URL;

/** An address that names its language keeps naming the one shown, so a
 * reload or a shared link shows the same. */
const syncLanguageParam = (locale: AppLocale) => {
  const url = new URL(window.location.href);
  const asked = url.searchParams.get("lang");
  if (asked === null || asked === locale) return;
  url.searchParams.set("lang", locale);
  window.history.replaceState(window.history.state, "", url);
};

const upsertMeta = (
  attribute: "name" | "property",
  key: string,
  content: string,
) => {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
};

const upsertCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = href;
};

const upsertStructuredData = (payload: unknown) => {
  let element = document.getElementById(
    "portfolio-structured-data",
  ) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.id = "portfolio-structured-data";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(payload);
};

const Seo = () => {
  const locale = useAtomValue(localeAtom);

  useEffect(() => {
    const seo = SEO_BY_LOCALE[locale];

    document.documentElement.lang = locale;
    document.title = seo.title;

    syncLanguageParam(locale);
    upsertCanonical(pageUrl(locale));
    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "author", "Gábor Ulenius");
    upsertMeta("name", "keywords", RECRUITER_KEYWORDS);
    upsertMeta("name", "language", locale);
    upsertMeta("name", "robots", "index, follow, max-image-preview:large");
    upsertMeta("name", "googlebot", "index, follow, max-image-preview:large");
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", seo.ogLocale);
    upsertMeta("property", "og:locale:alternate", seo.ogLocaleAlternate);
    upsertMeta("property", "og:url", pageUrl(locale));
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:image", SOCIAL_IMAGE_URL);
    upsertMeta("property", "og:image:alt", seo.imageAlt);
    upsertMeta("property", "og:image:width", String(SOCIAL_IMAGE_WIDTH));
    upsertMeta("property", "og:image:height", String(SOCIAL_IMAGE_HEIGHT));
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", SOCIAL_IMAGE_URL);
    upsertMeta("name", "twitter:image:alt", seo.imageAlt);
    upsertStructuredData(getStructuredData(locale));
  }, [locale]);

  return null;
};

export default Seo;
