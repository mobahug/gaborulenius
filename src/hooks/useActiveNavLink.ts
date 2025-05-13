import { atom, useAtomValue, useSetAtom } from "jotai";

export const activeSectionIdAtom = atom<string>("");

export const useActiveNavLink = () => {
  const currentActiveSectionId = useAtomValue(activeSectionIdAtom);
  const setActiveSectionId = useSetAtom(activeSectionIdAtom);

  return {
    currentActiveSectionId,
    setActiveSectionId,
  };
};
