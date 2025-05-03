import en from "./en";
import fi from "./fi";

export const messages = { en, fi };
export type AppLocale = keyof typeof messages;
