import React from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MuiLink from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useIntl } from "react-intl";
import { colors } from "../../colors";
import { assetUrl } from "../../utils/assets";
import { LanguageToggle } from "./LanguageToggle";
import { ModeButton, type PageMode } from "./ModeButton";

type TopBarProps = {
  mode: PageMode;
  /** Phones and narrow screens: the avatar alone, and a menu. */
  compact: boolean;
  /** Over the cover only the buttons show: the cover has the name, and
   * the jungle stays clear of glass. */
  bare?: boolean;
  homeHref: string;
  onHome?: () => void;
  /** The jungle sounds (the journey has them). */
  audio?: { playing: boolean; toggle: () => void };
  /** Narrow screens: opens the menu. */
  menu?: { open: () => void; prefetch?: () => void };
};

/**
 * The bar at the top of both pages, the journey and quick read: who this is
 * on the left; on the right the sounds, the language (wide screens) and
 * the way to the other page, then the menu (narrow screens). The sounds
 * come first, so where a page has none nothing else moves: switching pages
 * leaves every button where it was.
 */
const TopBar: React.FC<TopBarProps> = ({
  mode,
  compact,
  bare = false,
  homeHref,
  onHome,
  audio,
  menu,
}) => {
  const intl = useIntl();
  const height = compact ? 64 : 60;
  const iconSize = compact ? 32 : 28;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        px: 2,
        py: 0,
        height,
        borderRadius: 0,
        justifyContent: "center",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
        ...(bare && {
          backgroundColor: "transparent",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          borderBottomColor: "transparent",
        }),
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: height,
          px: 1.5,
          py: 0,
          gap: 1,
          justifyContent: "space-between",
        }}
      >
        <MuiLink
          href={homeHref}
          underline="none"
          aria-label={intl.formatMessage({ id: "navHome" })}
          aria-hidden={bare || undefined}
          tabIndex={bare ? -1 : undefined}
          onClick={onHome}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: compact ? 0 : 1,
            color: colors.textLight,
            opacity: bare ? 0 : 1,
            visibility: bare ? "hidden" : "visible",
            transition: "opacity 0.3s ease, visibility 0.3s",
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          <Avatar
            src={assetUrl("profile-160.webp")}
            alt=""
            sx={{
              width: compact ? 40 : 34,
              height: compact ? 40 : 34,
              border: `1.5px solid ${colors.accent}`,
            }}
          />
          {compact ? null : (
            <Box
              component="span"
              sx={{
                fontSize: "0.95rem",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              Gábor Ulenius
            </Box>
          )}
        </MuiLink>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: compact ? 0.5 : 2 }}
        >
          {audio ? (
            <IconButton
              color="inherit"
              onClick={audio.toggle}
              aria-label={intl.formatMessage({
                id: audio.playing ? "navAudioPause" : "navAudioPlay",
              })}
            >
              {audio.playing ? (
                <PauseCircleOutlineIcon sx={{ fontSize: iconSize }} />
              ) : (
                <PlayCircleOutlineIcon sx={{ fontSize: iconSize }} />
              )}
            </IconButton>
          ) : null}
          {compact ? null : <LanguageToggle />}
          <ModeButton mode={mode} compact={compact} />
          {compact && menu ? (
            <IconButton
              color="inherit"
              aria-label={intl.formatMessage({ id: "navMenu" })}
              onPointerDown={menu.prefetch}
              onTouchStart={menu.prefetch}
              onMouseEnter={menu.prefetch}
              onClick={menu.open}
            >
              <MenuIcon sx={{ fontSize: iconSize }} />
            </IconButton>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
