// theme.ts
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
      fontWeight: 700,
      // clamp(min, ideal, max)
      fontSize: "clamp(2rem, 6vw, 4rem)",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: "clamp(1.75rem, 5vw, 3rem)",
    },
    h3: {
      fontWeight: 600,
      fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
    },
    body1: {
      fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "clamp(0.875rem, 2vw, 1rem)",
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    },
    caption: {
      fontSize: "0.75rem",
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
    // in theme.ts, under components:
    MuiButton: {
      styleOverrides: {
        root: {
          px: 5,
          py: 1.5,
          borderRadius: 12,
          fontWeight: 700,
          fontSize: "1rem",
          backgroundColor: colors.btnBg, // dark olive button
          color: colors.textLight, // light text for contrast
          transition: "background 0.3s ease, transform 0.2s ease",
          "&:hover": {
            backgroundColor: colors.btnBgHover, // lighter olive on hover
            transform: "scale(1.03)",
          },
          // if you want to preserve an outlined variant but reverse colors:
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
