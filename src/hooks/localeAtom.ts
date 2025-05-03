import { atom } from "jotai";
import type { AppLocale } from "../i18n/messages";

export const localeAtom = atom<AppLocale>("en");
