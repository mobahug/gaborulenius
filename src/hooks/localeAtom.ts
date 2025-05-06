import { atomWithStorage } from "jotai/utils";
import type { AppLocale } from "../i18n/messages";

export const localeAtom = atomWithStorage<AppLocale>(
  "locale",
  "en",
  undefined,
  {
    getOnInit: true,
  },
);
