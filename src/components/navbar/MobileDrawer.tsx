import React from "react";
import {
  SwipeableDrawer,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  Divider,
  Box,
  IconButton,
  Stack,
  FormControlLabel,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { FormattedMessage } from "react-intl";
import { navLinks } from "./navConstants";
import { useThemeToggle } from "../../hooks/useThemeToggle";
import { useBirdEffect } from "../../hooks/useBirdEffect";
import { useLeavesEffect } from "../../hooks/useLeavesEffect";
import { LanguageToggle } from "./LanguageToggle";
import { colors as lightColors } from "../../colors";
import { colors as darkColors } from "../../colorsDark";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  onOpen,
}) => {
  const theme = useTheme();
  const { selectedTheme, toggleTheme } = useThemeToggle();
  const { birdEnabled, toggleBirdEffects } = useBirdEffect();
  const { leavesEnabled, toggleLeavesEffects } = useLeavesEffect();

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      disableSwipeToOpen
      swipeAreaWidth={0}
      transitionDuration={{ enter: 300, exit: 300 }}
      ModalProps={{
        BackdropProps: {
          style: {
            backgroundColor:
              theme.palette.mode === "dark"
                ? darkColors.overlayBg
                : lightColors.overlayBg,
          },
        },
      }}
      slotProps={{
        paper: {
          sx: {
            p: 3,
            width: 260,
            bgcolor:
              theme.palette.mode === "dark"
                ? darkColors.drawerBg
                : lightColors.drawerBg,
            color:
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
            borderRadius: 0,
            transition: "transform 300ms ease-in-out",
          },
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 3 }}>
        <IconButton onClick={onClose}>
          <CloseIcon
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? darkColors.textLight
                  : lightColors.textLight,
              fontSize: 32,
            }}
          />
        </IconButton>
      </Box>
      <List disablePadding>
        {navLinks.map(({ id, href }) => (
          <ListItem key={id} disablePadding>
            <ListItemButton component="a" href={href} onClick={onClose}>
              <ListItemText
                primary={<FormattedMessage id={id} />}
                slotProps={{
                  primary: {
                    fontWeight: "bold",
                    color:
                      theme.palette.mode === "dark"
                        ? darkColors.textLight
                        : lightColors.textLight,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider
        sx={{
          bgcolor:
            theme.palette.mode === "dark"
              ? darkColors.dividerBg
              : lightColors.dividerBg,
          my: 2,
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2, p: 2 }}>
        <IconButton
          component="a"
          href="https://linkedin.com/in/gaborulenius"
          target="_blank"
          aria-label="LinkedIn"
          sx={{
            color:
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://github.com/mobahug"
          target="_blank"
          aria-label="GitHub"
          sx={{
            color:
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <GitHubIcon />
        </IconButton>
      </Box>
      <Divider
        sx={{
          bgcolor:
            theme.palette.mode === "dark"
              ? darkColors.dividerBg
              : lightColors.dividerBg,
          my: 2,
        }}
      />
      <Stack spacing={2} sx={{ px: 3, py: 2 }}>
        {/* Settings Header */}
        <Typography
          variant="h5"
          fontWeight={600}
          sx={{
            color:
              theme.palette.mode === "dark"
                ? darkColors.textHeading
                : lightColors.textHeading,
            mb: 2,
          }}
        >
          <FormattedMessage id="headingSettings" />
        </Typography>
        {/* Theme & Language Controls */}
        <Stack direction="row" spacing={5} alignItems="center">
          <IconButton onClick={toggleTheme} color="inherit">
            {selectedTheme === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>
          <LanguageToggle />
        </Stack>
        {/* Effects Section (without divider) */}
        <Typography
          variant="h6"
          sx={{
            color:
              theme.palette.mode === "dark"
                ? darkColors.textHeading
                : lightColors.textHeading,
          }}
        >
          <FormattedMessage id="headingEffects" defaultMessage="Effects" />
        </Typography>
        <Stack spacing={1}>
          <FormControlLabel
            control={
              <Switch
                checked={birdEnabled}
                onChange={toggleBirdEffects}
                color="primary"
              />
            }
            label={<FormattedMessage id="labelBird" />}
          />
          <FormControlLabel
            control={
              <Switch
                checked={leavesEnabled}
                onChange={toggleLeavesEffects}
                color="primary"
              />
            }
            label={<FormattedMessage id="labelLeaves" />}
          />
        </Stack>
      </Stack>
    </SwipeableDrawer>
  );
};

export default MobileDrawer;
