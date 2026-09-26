import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { colors } from "./colors";

/** A glass surface: the films show through, the text stays readable. */
const glass = (background: string) => ({
  background,
  backgroundImage: "none",
  backdropFilter: "blur(18px) saturate(1.15)",
  border: `1px solid ${colors.glassBorder}`,
});

const focusRing = {
  outline: `2px solid ${colors.accentHover}`,
  outlineOffset: 3,
};

let theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: colors.bgDark,
      paper: colors.bgDark,
    },
    text: {
      primary: colors.textLight,
      secondary: colors.textMuted,
    },
    primary: {
      main: colors.accent,
      contrastText: colors.bgDark,
    },
    secondary: {
      main: colors.accentHover,
    },
    divider: colors.dividerBg,
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    fontSize: 16,
    h1: {
      fontWeight: 800,
      color: colors.textLight,
    },
    h2: {
      fontWeight: 700,
      color: colors.textLight,
    },
    h3: {
      fontWeight: 700,
      color: colors.textLight,
    },
    h4: {
      fontWeight: 650,
      letterSpacing: "-0.01em",
      color: colors.textLight,
    },
    h5: {
      fontWeight: 600,
      color: colors.textLight,
    },
    h6: {
      fontWeight: 600,
      color: colors.textLight,
    },
    body2: {
      color: colors.textMuted,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "0.95rem",
      letterSpacing: "0.01em",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.4,
      color: colors.textMuted,
    },
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 4,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          backgroundColor: colors.bgDark,
        },
        "::selection": {
          backgroundColor: `rgba(${colors.accentRgb}, 0.35)`,
          color: colors.textLight,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          ...glass(colors.glassBgStrong),
          borderRadius: 20,
          padding: "2rem",
          boxShadow: "0 24px 70px rgba(0, 0, 0, 0.5)",
          scrollMarginTop: "120px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          ...glass(colors.glassBg),
          borderRadius: 16,
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
          overflow: "hidden",
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          "&:focus-visible": focusRing,
        },
        focusHighlight: {
          backgroundColor: colors.accent,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 44,
          padding: "10px 22px",
          borderRadius: 999,
          color: colors.textLight,
          backgroundColor: colors.btnBg,
          border: `1px solid ${colors.btnBorder}`,
          boxShadow: "none",
          backdropFilter: "blur(10px)",
          transition:
            "background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease",
          "& .MuiButton-startIcon, & .MuiButton-endIcon": {
            color: colors.accentHover,
          },
          "&:hover": {
            backgroundColor: colors.btnBgHover,
            borderColor: colors.accentHover,
            boxShadow: "none",
          },
          "&:focus-visible": focusRing,
          "&.MuiButton-text": {
            backgroundColor: "transparent",
            borderColor: "transparent",
            backdropFilter: "none",
            "&:hover": {
              backgroundColor: `rgba(${colors.accentRgb}, 0.1)`,
            },
          },
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          boxShadow: "none",
        },
        grouped: {
          minWidth: 44,
          minHeight: 34,
          padding: "4px 12px",
          "&:not(:last-of-type)": {
            borderRightColor: colors.btnBorder,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "inherit",
          cursor: "pointer",
          textDecoration: "none",
          position: "relative",
          padding: "0.5rem 1rem",
          borderRadius: 8,
          transition: "color 0.2s ease, background-color 0.2s ease",
          "&:hover": {
            backgroundColor: `rgba(${colors.accentRgb}, 0.08)`,
            color: colors.accentHover,
          },
          "&:focus-visible": focusRing,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colors.textLight,
          transition: "color 0.2s ease, background-color 0.2s ease",
          "&:hover": {
            backgroundColor: `rgba(${colors.accentRgb}, 0.1)`,
            color: colors.accentHover,
          },
          "&:focus-visible": focusRing,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          ...glass(colors.navBg),
          border: "none",
          borderBottom: `1px solid ${colors.glassBorder}`,
          boxShadow: "none",
          color: colors.textLight,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          "&:not(.MuiBackdrop-invisible)": {
            backgroundColor: colors.overlayBg,
            backdropFilter: "blur(6px)",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          ...glass(colors.glassBgStrong),
          color: colors.textLight,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: colors.textLight,
          fontWeight: 700,
          letterSpacing: "-0.01em",
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: colors.textMuted,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 2,
          borderRadius: 1,
          backgroundColor: colors.accent,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.95rem",
          color: colors.textMuted,
          "&.Mui-selected": {
            color: colors.textLight,
          },
          "&:focus-visible": focusRing,
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          color: colors.accent,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.dividerBg,
          backgroundColor: "transparent",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
