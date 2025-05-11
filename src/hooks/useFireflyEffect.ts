import { atom, useAtom } from "jotai";

const firefliesEnabledAtom = atom<boolean>(true);

export const useFireflyEffect = () => {
  const [firefliesEnabled, setFirefliesEnabled] =
    useAtom<boolean>(firefliesEnabledAtom);

  const toggleFireflyEffects = () => {
    setFirefliesEnabled((prev) => !prev);
  };

  return { firefliesEnabled, toggleFireflyEffects, setFirefliesEnabled };
};
