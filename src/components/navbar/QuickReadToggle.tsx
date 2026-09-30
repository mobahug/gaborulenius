import React from "react";
import Button from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";
import SubjectIcon from "@mui/icons-material/Subject";
import { useIntl } from "react-intl";
import { colors } from "../../colors";
import { setQuickRead } from "../../journey/quickRead";

type QuickReadToggleProps = {
  sx?: SxProps<Theme>;
};

/** The way to quick read from the journey (the cover has its twin). */
export const QuickReadToggle: React.FC<QuickReadToggleProps> = ({ sx }) => {
  const intl = useIntl();

  return (
    <Button
      size="small"
      variant="outlined"
      title={intl.formatMessage({ id: "quickReadOn" })}
      startIcon={<SubjectIcon />}
      onClick={() => setQuickRead(true)}
      sx={{
        // As tall as the language switch beside it.
        minHeight: 34,
        py: 0.5,
        px: 1.75,
        fontSize: "0.8rem",
        fontWeight: 700,
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
        color: colors.textLight,
        backgroundColor: colors.btnBg,
        backdropFilter: "blur(10px)",
        "& .MuiButton-startIcon": { color: colors.accent },
        "&:hover": {
          backgroundColor: colors.btnBgHover,
          color: colors.accentHover,
        },
        ...sx,
      }}
    >
      {intl.formatMessage({ id: "quickRead" })}
    </Button>
  );
};
