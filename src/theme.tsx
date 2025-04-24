import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import colors from "./colors";

let theme = createTheme({
  palette: {
    mode: "dark",
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
    fontSize: 16,

    h1: {
      fontWeight: 800,
      fontSize: "3rem",
      lineHeight: 1.15,
      color: colors.textLight,
      letterSpacing: "-0.02em",
    },

    h2: {
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.2,
      color: colors.textLight,
      mb: 2,
      letterSpacing: "-0.015em",
    },

    h3: {
      fontWeight: 700,
      fontSize: "1.75rem",
      lineHeight: 1.3,
      color: colors.textLight,
    },

    body1: {
      fontSize: "1.5rem",
      lineHeight: 1.75,
      fontWeight: 400,
      color: colors.textLight,
      mb: 2,
    },

    body2: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: colors.textHeading,
    },

    button: {
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1.125rem",
    },

    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.4,
      color: colors.textHeading,
    },
  },
  shape: {
    borderRadius: 20,
  },
  spacing: 4,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: "2rem",
          background: colors.glassBg,
          backdropFilter: "blur(30px)",
          border: `1px solid ${colors.glassBorder}`,
          boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 16px 50px rgba(0,0,0,0.5)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          px: 5,
          py: 1.5,
          borderRadius: 12,
          fontWeight: 700,
          fontSize: "1rem",
          backgroundColor: colors.btnBg,
          color: colors.textLight,
          transition: "background 0.3s ease, transform 0.2s ease",
          "&:hover": {
            backgroundColor: colors.btnBgHover, 
            transform: "scale(1.03)",
          },
          "&.MuiButton-outlined": {
            borderColor: colors.textLight,
            color: colors.textLight,
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "rgba(" + colors.textLightRgb + ", 0.1)",
              borderColor: colors.textLight,
            },
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
          "&:after": {
            content: '""',
            position: "absolute",
            width: 0,
            height: 2,
            bottom: -2,
            left: 0,
            backgroundColor: colors.accent,
            transition: "width 0.3s ease",
          },
          "&:hover:after": {
            width: "100%",
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
