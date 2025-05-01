import { atom, useAtom } from "jotai";

export const birdEnabledAtom = atom<boolean>(true);

export const useBirdEffect = () => {
  const [birdEnabled, setBirdEnabled] = useAtom(birdEnabledAtom);

  const toggleBirdEffects = () => {
    setBirdEnabled(prev => !prev);
  };

  return {
    birdEnabled,
    toggleBirdEffects,
  };
};
