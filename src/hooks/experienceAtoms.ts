import { atom } from "jotai";

/** The experience event whose details are shown (its title's message id),
 * chosen on the timeline or on the office's dial. */
export const selectedEventAtom = atom<string | null>(null);

/** The experience timeline's open tab: its highlights (0) or all of it (1).
 * The office's dial shows the same events. */
export const experienceTabAtom = atom(0);
