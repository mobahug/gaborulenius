import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { colors } from "./colorsDark";

let darkTheme = createTheme({
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
      fontWeight: 600,
      color: colors.textHeading,
    },
    h5: {
      fontWeight: 600,
      color: colors.textLight,
    },
    h6: {
      fontWeight: 600,
      color: colors.textLight,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
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
          },
          scrollMarginTop: "120px",
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
              backgroundColor: `rgba(${colors.textLightRgb}, 0.1)`,
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
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          "&:hover": {
            backgroundColor: `rgba(${colors.textLightRgb}, 0.1)`,
            color: colors.accentHover,
          },
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
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colors.textLight,
          "&:hover": {
            backgroundColor: `rgba(${colors.textLightRgb}, 0.1)`,
            color: colors.accentHover,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.navBg,
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
          backgroundColor: colors.dividerBg,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: colors.textLight,
        },
      },
    },
  },
});

darkTheme = responsiveFontSizes(darkTheme);

export default darkTheme;
