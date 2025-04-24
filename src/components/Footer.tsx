// Footer MUI version with glassy nav styling
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Footer() {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        background: "rgba(30, 42, 32, 0.9)", // fallback for --nav-bg
        backdropFilter: "blur(10px)",
        color: "#f2f3ef", // fallback for --text-light
        width: "100%",
        mt: 12,
        zIndex: 100,
      }}
    >
      <Container sx={{ py: 6 }}>
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              fontWeight={theme.typography.fontWeightBold}
              variant="h3"
            >
              Gabor
              <br />
              Ulenius
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(242, 243, 239, 0.8)",
              }}
            >
              Full stack developer
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <Link
              href="#about"
              underline="none"
              color="inherit"
              variant="body1"
            >
              About
            </Link>
            <Link
              href="#projects"
              underline="none"
              color="inherit"
              variant="body1"
            >
              Projects
            </Link>
            <Link
              href="mailto:you@example.com"
              underline="none"
              color="inherit"
              variant="body1"
            >
              Contact me
            </Link>
          </Grid>

          {/* Social */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              gap: "1.5rem",
            }}
          >
            <IconButton
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              aria-label="LinkedIn"
              // sx={{ color: "#f2f3ef", "&:hover": { color: "#c8e59f" } }}
            >
              <LinkedInIcon fontSize="large" />
            </IconButton>
            <IconButton
              href="https://github.com/yourusername"
              target="_blank"
              aria-label="GitHub"
              sx={{ color: "#f2f3ef", "&:hover": { color: "#c8e59f" } }}
            >
              <GitHubIcon fontSize="large" />
            </IconButton>
            <IconButton
              href="https://instagram.com/yourhandle"
              target="_blank"
              aria-label="Instagram"
              sx={{ color: "#f2f3ef", "&:hover": { color: "#c8e59f" } }}
            >
              <InstagramIcon fontSize="large" />
            </IconButton>
            <IconButton
              href="https://youtube.com/@yourchannel"
              target="_blank"
              aria-label="YouTube"
              sx={{ color: "#f2f3ef", "&:hover": { color: "#c8e59f" } }}
            >
              <YouTubeIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>

        <Box
          className="footer-bottom"
          sx={{ textAlign: "center", fontSize: "0.9rem", mt: 6 }}
        >
          © 2025 Gabor Ulenius. All rights reserved
        </Box>
      </Container>
    </Box>
  );
}
