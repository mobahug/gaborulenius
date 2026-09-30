import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { FormattedMessage, useIntl } from "react-intl";
import { colors } from "../colors";
import { LanguageToggle } from "../components/navbar/LanguageToggle";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "../seo";

/** Quick read's sections (the ids of their headings' cards). */
const SECTIONS = [
  { href: "#qr-about", labelId: "navAbout" },
  { href: "#qr-experience", labelId: "navExperience" },
  { href: "#qr-education", labelId: "qrEducation" },
  { href: "#qr-work", labelId: "navWorkProjects" },
  { href: "#qr-personal", labelId: "qrPersonalProjects" },
  { href: "#qr-skills", labelId: "navSkills" },
  { href: "#qr-contact", labelId: "navContact" },
];

type QuickReadMenuProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

/** Quick read's menu on narrow screens, where the journey has its own:
 * the sections, the ways to get in touch and the language. */
const QuickReadMenu: React.FC<QuickReadMenuProps> = ({
  open,
  onOpen,
  onClose,
}) => {
  const intl = useIntl();
  const accent = colors.accent;

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      disableSwipeToOpen
      swipeAreaWidth={0}
      transitionDuration={{ enter: 220, exit: 180 }}
      slotProps={{
        paper: {
          sx: (theme) => ({
            width: 288,
            background: colors.drawerBg,
            backdropFilter: "blur(18px) saturate(1.15)",
            color: colors.textLight,
            border: "none",
            borderLeft: `1px solid ${colors.glassBorder}`,
            borderRadius: 0,
            borderTopLeftRadius: theme.spacing(5),
            borderBottomLeftRadius: theme.spacing(5),
            boxShadow: `0 8px 40px 0 ${alpha(theme.palette.common.black, 0.45)}`,
            p: theme.spacing(2, 0),
          }),
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, mb: 1 }}>
        <IconButton
          onClick={onClose}
          aria-label={intl.formatMessage({ id: "navCloseMenu" })}
          sx={{ color: colors.textLight }}
        >
          <CloseIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Box>

      <List disablePadding sx={{ px: 1.5 }}>
        {SECTIONS.map(({ href, labelId }) => (
          <ListItem key={href} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component="a"
              href={href}
              onClick={onClose}
              sx={{
                py: 1.25,
                px: 2,
                borderRadius: 3,
                color: colors.textMuted,
                "&:hover": {
                  backgroundColor: alpha(accent, 0.12),
                  color: accent,
                },
                "&.Mui-focusVisible": {
                  backgroundColor: alpha(accent, 0.2),
                  boxShadow: `0 0 0 2px ${alpha(accent, 0.5)} inset`,
                },
              }}
            >
              <ListItemText
                primary={<FormattedMessage id={labelId} />}
                slotProps={{
                  primary: {
                    fontWeight: 600,
                    fontSize: "1.05rem",
                    color: "inherit",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ bgcolor: alpha(colors.dividerBg, 0.7), mx: 2.5, my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, my: 1 }}>
        {[
          {
            href: `mailto:${EMAIL}`,
            label: "Email",
            icon: <EmailRoundedIcon />,
          },
          { href: LINKEDIN_URL, label: "LinkedIn", icon: <LinkedInIcon /> },
          { href: GITHUB_URL, label: "GitHub", icon: <GitHubIcon /> },
        ].map((social) => (
          <IconButton
            key={social.label}
            component="a"
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            sx={{
              color: alpha(colors.textLight, 0.7),
              "&:hover": { color: accent },
            }}
          >
            {social.icon}
          </IconButton>
        ))}
      </Box>

      <Divider sx={{ bgcolor: alpha(colors.dividerBg, 0.7), mx: 2.5, my: 2 }} />

      <Box sx={{ px: 3.5, display: "grid", gap: 2 }}>
        <Typography
          variant="overline"
          sx={{
            color: colors.textHeading,
            letterSpacing: "0.14em",
            fontWeight: 700,
          }}
        >
          <FormattedMessage id="headingSettings" />
        </Typography>
        <LanguageToggle sx={{ justifySelf: "start" }} />
      </Box>
    </SwipeableDrawer>
  );
};

export default QuickReadMenu;
