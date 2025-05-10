import React from "react";
import {
  Button,
  ButtonGroup,
  ButtonGroupProps,
  Theme,
  SxProps,
} from "@mui/material";
import { useAtom } from "jotai";
import { localeAtom } from "../../hooks/localeAtom";

type LanguageToggleProps = Omit<ButtonGroupProps, "onChange"> & {
  sx?: SxProps<Theme>;
};

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  sx,
  size = "small",
}) => {
  const [locale, setLocale] = useAtom(localeAtom);

  return (
    <ButtonGroup
      size={size}
      aria-label="language switcher"
      variant="contained"
      sx={{
        boxShadow: "none",
        "& .MuiButton-root": {
          px: 1,
          py: 1,
          fontSize: "0.9rem",
        },
        ...sx,
      }}
    >
      <Button
        onClick={() => setLocale("en")}
        variant={locale === "en" ? "contained" : "outlined"}
      >
        EN
      </Button>
      <Button
        onClick={() => setLocale("fi")}
        variant={locale === "fi" ? "contained" : "outlined"}
      >
        FI
      </Button>
    </ButtonGroup>
  );
};
