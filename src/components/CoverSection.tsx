import React, { useRef, useEffect } from "react";
import { Box, Typography, Avatar, Link } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import colors from "../colors";

const CoverSection: React.FC = () => {
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (coverRef.current) {
        const scrollY = window.scrollY;
        const fadeOutPoint = 300;
        const opacity = Math.max(0, 1 - scrollY / fadeOutPoint);
        const cover = coverRef.current;

        cover.style.opacity = opacity.toString();
        cover.style.pointerEvents = opacity === 0 ? "none" : "auto";
        cover.style.display = opacity === 0 ? "none" : "flex";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      ref={coverRef}
      id="cover"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "100vh",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: colors.glassBg,
        backdropFilter: "blur(20px)",
        color: colors.textLight,
        px: 2,
        transition: "opacity 0.5s ease-out",
      }}
    >
      <Box sx={{ maxWidth: 600 }}>
        <Avatar
          alt="Gabor"
          src="/parallaxMui/profile.jpg"
          sx={{
            width: { xs: 140, sm: 180, md: 200 },
            height: { xs: 140, sm: 180, md: 200 },
            mb: 5,
            mx: "auto",
            borderRadius: "50%",
            border: `4px solid ${colors.accent}`,
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)",
          }}
        />
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            color: colors.textHeading,
            mb: 2,
          }}
        >
          Hi, I'm Gabor
        </Typography>
        <Link
          href="#home"
          underline="none"
          sx={{
            mt: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            color: colors.accentHover,
            animation: "bounce 2s infinite",
            textDecoration: "none",
          }}
        >
          <ExpandMoreIcon fontSize="large" />
          <Typography variant="h4" color={colors.accentHover}>
            Scroll Down
          </Typography>
        </Link>
        <style>
          {`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(8px); }
            }
          `}
        </style>
      </Box>
    </Box>
  );
};

export default CoverSection;
