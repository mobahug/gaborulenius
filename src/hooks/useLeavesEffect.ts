import { atom, useAtom } from "jotai";

export const leavesEnabledAtom = atom<boolean>(true);

export const useLeavesEffect = () => {
  const [leavesEnabled, setLeavesEnabled] = useAtom(leavesEnabledAtom);

  const toggleLeavesEffects = () => {
    setLeavesEnabled(prev => !prev);
  };

  return {
    leavesEnabled,
    toggleLeavesEffects,
  };
};
