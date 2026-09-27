import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/Launch";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import type { CSSProperties, ReactNode, Ref } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { assetUrl } from "../../utils/assets";
import { Cue, Space } from "../film/FilmSection";
import "./chapters.css";

const META_ITEMS = [
  { id: "aboutExperience", icon: <WorkIcon /> },
  { id: "aboutEducation", icon: <SchoolIcon /> },
  { id: "aboutLocation", icon: <LocationOnIcon /> },
];

const CAREER_STORY_URL =
  "https://careers.tieto.com/career-story/2025-5/gabor-horvath-ulenius-a-non-traditional-journey-into-coding";
/** When the story was published, and how long it takes to read. */
const STORY_DATE = new Date(2025, 4, 1);
const STORY_MINUTES = 3;

type AboutChapterProps = {
  /** Film times in the middle of the words' and of the story's time on
   * screen. */
  at: number;
  storyAt: number;
  ref?: Ref<HTMLDivElement>;
};

/**
 * "Clearing of self": About on the path while the morpho comes out of the
 * light and the camera follows it — first the words and the facts, then
 * the story of how it began, told the way the greeting is: its title large,
 * a line about it, the way to read it, and who wrote it and when.
 */
const AboutChapter = ({ at, storyAt, ref }: AboutChapterProps) => {
  const intl = useIntl();

  return (
    <section className="about-layout" aria-labelledby="about-heading">
      <Cue at={at} id="about" ref={ref} className="stage-about" hold={100}>
        <div className="film-copy film-copy--wide about-copy">
          <h2 id="about-heading" className="film-title">
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
      </Cue>
      <Space vh={10} />
      <Cue at={storyAt} id="story" hold={90}>
        <div className="film-copy story-copy">
          <p className="film-kicker">
            <FormattedMessage id="navAboutStory" />
          </p>
          <h3 className="film-title story-title">
            <FormattedMessage id="linkThumbnailTitleGabor" />
          </h3>
          <p className="film-lead story-lead">
            <FormattedMessage id="linkThumbnailDescriptionGabor" />
          </p>
          <div className="film-actions story-actions">
            <Button
              variant="contained"
              component="a"
              href={CAREER_STORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon />}
            >
              <FormattedMessage id="storyRead" />
            </Button>
            <span className="story-byline">
              <span
                className="story-avatar"
                aria-hidden="true"
                style={
                  {
                    "--portrait": `url("${assetUrl("profile2-small.webp")}")`,
                  } as CSSProperties
                }
              />
              <span>
                <FormattedMessage
                  id="linkThumbnailReadingTime"
                  values={{ minutes: STORY_MINUTES }}
                />
                {" · "}
                {intl.formatDate(STORY_DATE, {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </span>
          </div>
        </div>
      </Cue>
    </section>
  );
};

export default AboutChapter;
