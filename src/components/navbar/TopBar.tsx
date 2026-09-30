import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MuiLink from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useIntl } from "react-intl";
import { colors } from "../../colors";
import { LanguageToggle } from "./LanguageToggle";
import { ModeButton, type PageMode } from "./ModeButton";

type TopBarProps = {
  mode: PageMode;
  /** Phones and narrow screens: the buttons alone, and a menu. */
  compact: boolean;
  /** Over the cover, which has the name already, the name is not shown. */
  bare?: boolean;
  homeHref: string;
  onHome?: () => void;
  /** The films' sound (the journey has it). */
  audio?: { playing: boolean; toggle: () => void };
  /** Narrow screens: opens the menu. */
  menu?: { open: () => void; prefetch?: () => void };
};

/** Every control is its own piece of dark glass, so it reads over any
 * frame of the films, bright or dark, with no bar behind it. */
const glass = {
  color: colors.textLight,
  backgroundColor: colors.floatBg,
  border: `1px solid ${colors.btnBorder}`,
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  "&:hover": {
    backgroundColor: colors.btnBgHover,
    color: colors.accentHover,
  },
};

/**
 * The controls at the top of both pages, the journey and quick read. There
 * is no bar: the controls float over the page, each on its own glass, so the
 * films and the content keep the whole screen. On wide screens the name sits
 * on the left, the way home (not over the cover, which has it); on the
 * right the sounds, the language and the way to the other page. Phones keep
 * only the sounds, the way to the other page and the menu (with the way
 * home in it). The sounds come first, so on quick read, which has none,
 * nothing else moves: switching pages leaves every control where it was.
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
  // Big enough for a thumb on phones; as tall as the pills beside them on
  // wide screens.
  const round = compact ? 44 : 34;
  const iconSize = compact ? 24 : 20;

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
        backgroundColor: "transparent",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        border: "none",
        boxShadow: "none",
        // Only the controls take the pointer, not the space between them.
        pointerEvents: "none",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: height,
          px: 1.5,
          py: 0,
          gap: 1,
          justifyContent: compact ? "flex-end" : "space-between",
          "& > *": { pointerEvents: "auto" },
        }}
      >
        {compact ? null : (
          <MuiLink
            href={homeHref}
            underline="none"
            aria-label={intl.formatMessage({ id: "navHome" })}
            aria-hidden={bare || undefined}
            tabIndex={bare ? -1 : undefined}
            onClick={onHome}
            sx={{
              ...glass,
              display: "inline-flex",
              alignItems: "center",
              minHeight: 34,
              px: 1.75,
              borderRadius: 999,
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              opacity: bare ? 0 : 1,
              visibility: bare ? "hidden" : "visible",
              transition:
                "opacity 0.3s ease, visibility 0.3s, background-color 0.2s ease",
            }}
          >
            Gábor Ulenius
          </MuiLink>
        )}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: compact ? 1 : 2 }}
        >
          {audio ? (
            <IconButton
              onClick={audio.toggle}
              aria-label={intl.formatMessage({
                id: audio.playing ? "navAudioPause" : "navAudioPlay",
              })}
              sx={{ ...glass, width: round, height: round }}
            >
              {audio.playing ? (
                <PauseRoundedIcon sx={{ fontSize: iconSize }} />
              ) : (
                <PlayArrowRoundedIcon sx={{ fontSize: iconSize }} />
              )}
            </IconButton>
          ) : null}
          {compact ? null : (
            <LanguageToggle sx={{ backgroundColor: colors.floatBg }} />
          )}
          <ModeButton mode={mode} compact={compact} />
          {compact && menu ? (
            <IconButton
              aria-label={intl.formatMessage({ id: "navMenu" })}
              onPointerDown={menu.prefetch}
              onTouchStart={menu.prefetch}
              onMouseEnter={menu.prefetch}
              onClick={menu.open}
              sx={{ ...glass, width: round, height: round }}
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
