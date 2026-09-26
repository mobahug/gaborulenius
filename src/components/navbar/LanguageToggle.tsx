import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import type { ButtonGroupProps } from "@mui/material/ButtonGroup";
import type { SxProps, Theme } from "@mui/material/styles";
import { useAtom } from "jotai";
import { colors } from "../../colors";
import { localeAtom } from "../../hooks/localeAtom";

type LanguageToggleProps = Omit<ButtonGroupProps, "onChange"> & {
  sx?: SxProps<Theme>;
};

/** EN | FI as a small segmented control: the current language in gold. */
export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  sx,
  size = "small",
}) => {
  const [locale, setLocale] = useAtom(localeAtom);

  const option = (value: "en" | "fi", label: string) => {
    const selected = locale === value;
    return (
      <Button
        onClick={() => setLocale(value)}
        aria-pressed={selected}
        sx={{
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          color: selected ? colors.accentHover : colors.textMuted,
          backgroundColor: selected ? colors.btnBgHover : "transparent",
          "&:hover": {
            backgroundColor: colors.btnBgHover,
            color: colors.textLight,
          },
        }}
      >
        {label}
      </Button>
    );
  };

  return (
    <ButtonGroup
      size={size}
      aria-label="language switcher"
      variant="outlined"
      sx={{
        backgroundColor: colors.btnBg,
        backdropFilter: "blur(10px)",
        ...sx,
      }}
    >
      {option("en", "EN")}
      {option("fi", "FI")}
    </ButtonGroup>
  );
};
