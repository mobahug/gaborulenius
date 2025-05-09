import { ThemeProvider } from "@emotion/react";
import { useMemo } from "react";
import darkTheme from "../darkTheme";
import { useThemeToggle } from "../hooks/useThemeToggle";
import theme from "../theme";

type SelectedThemeProviderProps = {
  children: React.ReactNode;
};

export const SelectedThemeProvider = ({
  children,
}: SelectedThemeProviderProps) => {
  const { selectedTheme } = useThemeToggle();

  const selectedMuiTheme = useMemo(
    () => (selectedTheme === "dark" ? darkTheme : theme),
    [selectedTheme],
  );

  return <ThemeProvider theme={selectedMuiTheme}>{children}</ThemeProvider>;
};
