// theme.ts
import { createTheme } from "@mui/material/styles";
import colors from "./colors";

const theme = createTheme({
  palette: {
    background: {
      default: colors.bgDark,
      paper: colors.bgDark,
    },
    text: {
      primary: colors.textLight,
      secondary: colors.textHeading,
    },
    primary: {
      main: colors.accent,
      contrastText: colors.bgDark,
    },
    secondary: {
      main: colors.btnBgHover,
    },
    divider: colors.dividerBg,
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    fontSize: 16,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.5rem",
    },
    body1: {
      fontSize: "1.125rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    caption: {
      fontSize: "0.75rem",
    },
  },
  spacing: 4,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          px: 4,
          py: 2,
          borderRadius: 15,
          fontWeight: 700,
          fontSize: "1.125rem",
          backgroundColor: colors.btnBg,
          "&:hover": {
            backgroundColor: colors.btnBgHover,
          },
          color: colors.textLight,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "inherit",
          textDecoration: "none",
          transition: "color 0.3s ease",
          "&:hover": {
            color: colors.accentHover,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colors.textLight,
          "&:hover": {
            color: colors.accentHover,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          backdropFilter: "blur(20px)",
          background: colors.glassBg,
          border: `1px solid ${colors.glassBorder}`,
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.35)",
          padding: "16px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 12px 35px rgba(0, 0, 0, 0.45)",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          overflowWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "normal",
          maxWidth: "100%",
          flex: 1,
        },
      },
    },
  },
});

export default theme;
