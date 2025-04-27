import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  SwipeableDrawer,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  Divider,
  Link as MuiLink,
  Box,
  useTheme,
  useMediaQuery,
  Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import colors from "../colors";

const COVER_THRESHOLD = 300;

type ShowAfterCoverProps = { children: React.ReactElement };

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills-tools" },
  { label: "Contact", href: "#contact" },
];

const NavBar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);
  const handlePlayPause = () => setIsPlaying(p => !p);

  useEffect(() => {
    if (!isMobile && drawerOpen) setDrawerOpen(false);
  }, [isMobile, drawerOpen]);

  return (
    <>
      <ShowAfterCover>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            px: 2,
            borderRadius: 0,
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            backdropFilter: "blur(10px)",
            backgroundColor: colors.navBg,
            height: isMobile ? "72px" : "80px",
            justifyContent: "center",
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              minHeight: "72px",
              px: 2,
              justifyContent: isMobile ? "space-between" : "center",
            }}
          >
            {isMobile ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                {/* Avatar on left */}
                <MuiLink href="#home" underline="none">
                  <Avatar
                    src="/profile.jpg"
                    alt="Profile"
                    sx={{
                      width: 44,
                      height: 44,
                      border: `2px solid ${colors.accent}`,
                    }}
                  />
                </MuiLink>
                {/* Play/Pause center */}
                <IconButton color="inherit" onClick={handlePlayPause}>
                  {isPlaying ? (
                    <PauseCircleOutlineIcon fontSize="large" />
                  ) : (
                    <PlayCircleOutlineIcon fontSize="large" />
                  )}
                </IconButton>
                {/* Menu on right */}
                <IconButton color="inherit" onClick={toggleDrawer(true)}>
                  <MenuIcon fontSize="large" />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 6 }}>
                {navLinks.map(({ label, href }) => (
                  <MuiLink
                    key={label}
                    href={href}
                    underline="none"
                    sx={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: colors.textLight,
                      position: "relative",
                      "&:hover": { color: colors.accentHover },
                    }}
                  >
                    {label}
                  </MuiLink>
                ))}
                {/* Avatar and play/pause for desktop */}
                <MuiLink href="#home" underline="none">
                  <Avatar
                    src="/profile.jpg"
                    alt="Profile"
                    sx={{
                      width: 44,
                      height: 44,
                      border: `2px solid ${colors.accent}`,
                    }}
                  />
                </MuiLink>
                <IconButton color="inherit" onClick={handlePlayPause}>
                  {isPlaying ? (
                    <PauseCircleOutlineIcon fontSize="large" />
                  ) : (
                    <PlayCircleOutlineIcon fontSize="large" />
                  )}
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </ShowAfterCover>

      <Toolbar />

      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen
        swipeAreaWidth={0}
        transitionDuration={{ enter: 300, exit: 300 }}
        ModalProps={{
          BackdropProps: { style: { backgroundColor: colors.overlayBg } },
        }}
        slotProps={{
          paper: {
            sx: {
              p: 3,
              width: 260,
              bgcolor: colors.drawerBg,
              color: colors.textLight,
              borderRadius: 0,
              transition: "transform 300ms ease-in-out",
            },
          },
        }}
      >
        {/* Close icon top-right */}
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 3 }}>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon sx={{ color: colors.textLight, fontSize: 32 }} />
          </IconButton>
        </Box>
        <List disablePadding>
          {navLinks.map(({ label, href }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton
                component="a"
                href={href}
                onClick={toggleDrawer(false)}
                sx={{ py: 2 }}
              >
                <ListItemText
                  primary={label}
                  slotProps={{
                    primary: { fontWeight: "bold", color: colors.textLight },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ bgcolor: colors.dividerBg, my: 2 }} />
        {/* Social icons */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-start", gap: 2, p: 2 }}
        >
          <IconButton
            component="a"
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            aria-label="LinkedIn"
            sx={{ color: colors.textLight }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://github.com/yourusername"
            target="_blank"
            aria-label="GitHub"
            sx={{ color: colors.textLight }}
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default NavBar;

function ShowAfterCover({ children }: ShowAfterCoverProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > COVER_THRESHOLD);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <Slide
      direction="down"
      in={visible}
      timeout={{ enter: 300, exit: 300 }}
      appear={false}
    >
      {children}
    </Slide>
  );
}
