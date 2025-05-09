import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";

export type Theme = "light" | "dark";
const themeAtom = atomWithStorage<Theme>("theme", "light");

export const useThemeToggle = () => {
  const [selectedTheme, setSelectedTheme] = useAtom(themeAtom);
  return {
    selectedTheme,
    toggleTheme: () =>
      setSelectedTheme((prev) => (prev === "light" ? "dark" : "light")),
  };
};
