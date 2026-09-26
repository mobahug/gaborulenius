import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { colors as lightColors } from "../../colors";
import LinkThumbnail from "../../components/LinkThumbnail";
import { assetUrl } from "../../utils/assets";
import { prefersReducedMotion } from "../device";
import { smoothstep } from "../math";
import { useScene } from "../useScene";
import "./chapters.css";

const META_ITEMS = [
  { id: "aboutExperience", icon: <WorkIcon /> },
  { id: "aboutEducation", icon: <SchoolIcon /> },
  { id: "aboutLocation", icon: <LocationOnIcon /> },
];

/**
 * "Clearing of self": the text and the story card sit in the clearing. On
 * large screens the scene holds in place while the chase film goes on behind
 * it — the butterfly, the camera following it, the macaw — until about 6 s.
 */
const AboutChapter = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const accent = lightColors.accent;

  useScene(sectionRef, (frame) => {
    const copy = copyRef.current;
    const card = cardRef.current;
    if (prefersReducedMotion()) {
      if (copy) copy.style.opacity = "";
      if (card) card.style.opacity = "";
      return;
    }
    const { pass } = frame;
    // The scene fades in as it arrives and out as it leaves, the story card
    // a moment after the text.
    const fade = (start: number) =>
      Math.min(
        smoothstep(start, start + 0.16, pass),
        1 - smoothstep(0.8, 0.95, pass),
      );
    if (copy) {
      const opacity = fade(0.06);
      copy.style.opacity = opacity >= 0.999 ? "" : opacity.toFixed(3);
      copy.style.transform = `translate3d(0, ${((0.5 - pass) * 60).toFixed(1)}px, 0)`;
    }
    if (card) {
      const opacity = fade(0.12);
      card.style.opacity = opacity >= 0.999 ? "" : opacity.toFixed(3);
      // The card sits deeper in the scene, so it drifts less.
      card.style.transform = `translate3d(0, ${((0.5 - pass) * 150).toFixed(1)}px, 0)`;
    }
  });

  return (
    <section
      ref={sectionRef}
      className="chapter chapter-about"
      aria-labelledby="about-heading"
    >
      <div className="about-scene">
        <div className="about-layout">
          <div ref={copyRef} className="about-copy text-scrim">
            <h2 id="about-heading" className="chapter-title">
              <FormattedMessage id="aboutHeading" />
            </h2>
            <p className="chapter-lead about-body">
              <FormattedMessage
                id="aboutBody"
                values={{
                  b: (chunks: React.ReactNode) => (
                    <Box
                      component="span"
                      sx={{ fontWeight: 650, color: accent }}
                    >
                      {chunks}
                    </Box>
                  ),
                }}
              />
            </p>
            <ul className="about-meta">
              {META_ITEMS.map(({ id, icon }) => (
                <li key={id}>
                  <span className="about-meta-icon" aria-hidden="true">
                    {icon}
                  </span>
                  <FormattedMessage id={id} />
                </li>
              ))}
            </ul>
          </div>
          <div className="about-story">
            <div ref={cardRef} className="about-card">
              <LinkThumbnail
                id="linkThumbnailTitleGabor"
                descriptionId="linkThumbnailDescriptionGabor"
                image={assetUrl("profile2-small.webp")}
                urlEN="https://careers.tieto.com/career-story/2025-5/gabor-horvath-ulenius-a-non-traditional-journey-into-coding"
                urlFI="https://careers.tieto.com/career-story/2025-5/gabor-horvath-ulenius-a-non-traditional-journey-into-coding"
                readingMinutes={3}
                isArticle={true}
                date="05.2025"
                height={isMobile ? 160 : 240}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutChapter;
