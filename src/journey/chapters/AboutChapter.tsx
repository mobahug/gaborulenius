import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import type { ReactNode, Ref } from "react";
import { FormattedMessage } from "react-intl";
import LinkThumbnail from "../../components/LinkThumbnail";
import { assetUrl } from "../../utils/assets";
import { Cue } from "../film/FilmSection";
import "./chapters.css";

const META_ITEMS = [
  { id: "aboutExperience", icon: <WorkIcon /> },
  { id: "aboutEducation", icon: <SchoolIcon /> },
  { id: "aboutLocation", icon: <LocationOnIcon /> },
];

const CAREER_STORY_URL =
  "https://careers.tieto.com/career-story/2025-5/gabor-horvath-ulenius-a-non-traditional-journey-into-coding";

type AboutChapterProps = {
  /** Film time at which the block is centred on screen. */
  at: number;
  ref?: Ref<HTMLDivElement>;
};

/**
 * "Clearing of self": About on the path while the morpho comes out of the
 * light and the camera follows it. The heading, the lines, the facts and
 * the story card arrive one after another as they rise into view.
 */
const AboutChapter = ({ at, ref }: AboutChapterProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Cue at={at} id="about" ref={ref} className="stage-about">
      <section className="about-layout" aria-labelledby="about-heading">
        <div className="film-copy film-copy--wide about-copy">
          <h2 id="about-heading" className="film-title about-title">
            <FormattedMessage id="aboutHeading" />
          </h2>
          <p className="film-lead about-body">
            <FormattedMessage
              id="aboutBody"
              values={{
                b: (chunks: ReactNode) => (
                  <strong className="about-highlight">{chunks}</strong>
                ),
              }}
            />
          </p>
          <ul className="about-meta film-parts">
            {META_ITEMS.map(({ id, icon }) => (
              <li key={id} className="film-part">
                <span className="about-meta-icon" aria-hidden="true">
                  {icon}
                </span>
                <FormattedMessage id={id} />
              </li>
            ))}
          </ul>
        </div>
        <div className="about-card film-part">
          <LinkThumbnail
            id="linkThumbnailTitleGabor"
            descriptionId="linkThumbnailDescriptionGabor"
            image={assetUrl("profile2-small.webp")}
            urlEN={CAREER_STORY_URL}
            urlFI={CAREER_STORY_URL}
            readingMinutes={3}
            isArticle={true}
            date="05.2025"
            height={isMobile ? 180 : 240}
          />
        </div>
      </section>
    </Cue>
  );
};

export default AboutChapter;
