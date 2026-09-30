import { atomWithStorage } from "jotai/utils";
import type { AppLocale } from "../i18n/messages";

// index.html has already chosen (a ?lang link, the stored choice): start
// there, even where storage cannot be read.
const initialLocale: AppLocale =
  typeof document !== "undefined" &&
  document.documentElement.dataset.locale === "fi"
    ? "fi"
    : "en";

export const localeAtom = atomWithStorage<AppLocale>(
  "locale",
  initialLocale,
  undefined,
  {
    getOnInit: true,
  },
);
