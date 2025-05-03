import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import colors from "../colors";
import { FormattedMessage, useIntl } from "react-intl";

export default function Footer({
  innerRef,
}: {
  innerRef: React.Ref<HTMLDivElement>;
}) {
  const intl = useIntl();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      id="footer"
      ref={innerRef}
      component="footer"
      sx={{
        backgroundColor: colors.navBg,
        backdropFilter: "blur(10px)",
        color: colors.textLight,
        width: "100%",
        mt: 12,
        zIndex: 100,
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      <Container sx={{ py: 10, px: isMobile ? 8 : 4 }}>
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
              <FormattedMessage id="footerJobTitle" />
            </Typography>
          </Grid>

          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <Link
              href="#about"
              underline="none"
              color="inherit"
              variant="body1"
            >
              <FormattedMessage id="footerNavAbout" />
            </Link>
            <Link
              href="#projects"
              underline="none"
              color="inherit"
              variant="body1"
            >
              <FormattedMessage id="footerNavProjects" />
            </Link>
            <Link
              href="mailto:you@example.com"
              underline="none"
              color="inherit"
              variant="body1"
            >
              <FormattedMessage id="footerNavContact" />
            </Link>
          </Grid>

          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              gap: "1.5rem",
            }}
          >
            <IconButton
              href="https://www.linkedin.com/in/g%C3%A0bor-horv%C3%A0th-ulenius-07526719a/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <LinkedInIcon fontSize="large" />
            </IconButton>
            <IconButton
              href="https://github.com/mobahug"
              target="_blank"
              aria-label="GitHub"
            >
              <GitHubIcon fontSize="large" />
            </IconButton>
            <IconButton
              href="https://www.instagram.com/mobahug/"
              target="_blank"
              aria-label="Instagram"
            >
              <InstagramIcon fontSize="large" />
            </IconButton>
            <IconButton
              href="https://www.youtube.com/@mobahug"
              target="_blank"
              aria-label="YouTube"
            >
              <YouTubeIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>

        <Box
          className="footer-bottom"
          sx={{ textAlign: "center", fontSize: "0.9rem", mt: 6 }}
        >
          {intl.formatMessage(
            { id: "footerCopyright" },
            { year: new Date().getFullYear() },
          )}
        </Box>
      </Container>
    </Box>
  );
}
