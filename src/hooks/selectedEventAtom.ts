import { atom } from "jotai";

/** The experience event whose details are shown (its title's message id),
 * chosen on the timeline or on the career dial. */
export const selectedEventAtom = atom<string | null>(null);
