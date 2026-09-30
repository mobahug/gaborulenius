import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/Launch";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import SchoolIcon from "@mui/icons-material/School";
import TranslateIcon from "@mui/icons-material/Translate";
import WorkIcon from "@mui/icons-material/Work";
import { useAtomValue } from "jotai";
import type { ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import CopyEmail from "../components/CopyEmail";
import { LanguageToggle } from "../components/navbar/LanguageToggle";
import { explorerStack } from "../components/projects/explorerProjectData";
import { keySkills, neuralStack, projects } from "../contexts";
import { localeAtom } from "../hooks/localeAtom";
import { setQuickRead } from "../journey/quickRead";
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  NEURAL_REPOSITORY_URL,
  TIETO_CAREERS_PROFILE_URL,
} from "../seo";
import { assetUrl } from "../utils/assets";
import { experienceYears } from "../utils/experience";
import "./quickRead.css";

const FACTS = [
  { id: "aboutExperience", icon: <WorkIcon /> },
  { id: "aboutEducation", icon: <SchoolIcon /> },
  { id: "aboutLocation", icon: <LocationOnIcon /> },
  { id: "aboutLanguages", icon: <TranslateIcon /> },
];

/** The developer years, newest first, one line each. */
const EXPERIENCE = [
  {
    titleId: "eventTietoCaretechTitle",
    whenId: "eventTietoCaretechWhen",
    textId: "eventTietoCaretechP1",
  },
  {
    titleId: "eventAnyhauTitle",
    whenId: "eventAnyhauWhen",
    textId: "projectAnyhauTitle",
  },
  {
    titleId: "eventHiveTitle",
    whenId: "eventHiveWhen",
    textId: "eventHiveP1",
  },
];

const bold = (chunks: ReactNode) => <strong>{chunks}</strong>;

/** A link out of the page, marked as one. */
const OutLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a className="qr-link" href={href} target="_blank" rel="noopener noreferrer">
    {children}
    <OpenInNewIcon aria-hidden="true" />
  </a>
);

const Chips = ({ items, label }: { items: string[]; label?: string }) => (
  <ul className="qr-chips" aria-label={label}>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

/** Email, LinkedIn and GitHub, as everywhere else on the site. */
const ContactButtons = () => (
  <>
    <Button
      variant="contained"
      component="a"
      href={`mailto:${EMAIL}`}
      startIcon={<EmailIcon />}
    >
      <FormattedMessage id="contactBtnEmail" />
    </Button>
    <Button
      variant="contained"
      component="a"
      href={LINKEDIN_URL}
      target="_blank"
      rel="me noopener noreferrer"
      startIcon={<LinkedInIcon />}
    >
      <FormattedMessage id="contactBtnLinkedIn" />
    </Button>
    <Button
      variant="contained"
      component="a"
      href={GITHUB_URL}
      target="_blank"
      rel="me noopener noreferrer"
      startIcon={<GitHubIcon />}
    >
      GitHub
    </Button>
  </>
);

/**
 * Quick read: the essentials on one calm page — who, the developer years,
 * the work and how to get in touch — standing still on the jungle path
 * (index.html draws it, out of focus). Everything is the journey's own copy;
 * the journey itself is a button away.
 */
const QuickReadPage = () => {
  const intl = useIntl();
  const locale = useAtomValue(localeAtom);
  const years = intl.formatNumber(experienceYears());
  const backToFilm = intl.formatMessage({ id: "quickReadOff" });

  return (
    <div className="qr">
      <header className="qr-bar">
        <a className="qr-bar-name" href="#qr-name">
          <img src={assetUrl("profile-160.webp")} alt="" />
          <span>Gábor Ulenius</span>
        </a>
        <div className="qr-bar-actions">
          <LanguageToggle />
          <Button
            size="small"
            variant="outlined"
            className="qr-film-button"
            title={backToFilm}
            startIcon={<MovieOutlinedIcon />}
            onClick={() => setQuickRead(false)}
          >
            <FormattedMessage id="qrFilmJourney" />
          </Button>
        </div>
      </header>

      <main className="qr-page" id="main-content">
        <section className="qr-card qr-intro" aria-labelledby="qr-name">
          <img
            className="qr-portrait"
            src={assetUrl("profile-320.webp")}
            alt=""
            width={132}
            height={132}
          />
          <div>
            <p className="qr-kicker">
              <FormattedMessage id="quickRead" />
            </p>
            <h1 id="qr-name">Gábor Ulenius</h1>
            <p className="qr-role">
              <FormattedMessage id="qrRole" />
            </p>
            <p className="qr-lead">
              <FormattedMessage id="homeSubtitle" />
            </p>
          </div>
          <ul className="qr-facts">
            {FACTS.map(({ id, icon }) => (
              <li key={id}>
                <span aria-hidden="true">{icon}</span>
                <FormattedMessage id={id} values={{ years }} />
              </li>
            ))}
          </ul>
          <div className="qr-actions">
            <ContactButtons />
            <Button
              variant="contained"
              component="a"
              href={assetUrl("Gabor_Ulenius_-_Full_Stack_Developer.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              download
              startIcon={<FileDownloadIcon />}
            >
              <FormattedMessage id="homeBtnDownloadCv" />
            </Button>
          </div>
          <p className="qr-note">
            <FormattedMessage id="qrNote" />
          </p>
        </section>

        <section className="qr-card" aria-labelledby="qr-about">
          <h2 id="qr-about">
            <FormattedMessage id="aboutHeading" />
          </h2>
          <p className="qr-text">
            <FormattedMessage id="aboutBody" values={{ b: bold }} />
          </p>
          <OutLink href={TIETO_CAREERS_PROFILE_URL}>
            <FormattedMessage id="navAboutStory" />
            {": "}
            <FormattedMessage id="linkThumbnailTitleGabor" />
          </OutLink>
        </section>

        <section className="qr-card" aria-labelledby="qr-experience">
          <h2 id="qr-experience">
            <FormattedMessage id="navExperience" />
          </h2>
          <ol className="qr-timeline">
            {EXPERIENCE.map(({ titleId, whenId, textId }) => (
              <li key={titleId}>
                <h3>
                  <FormattedMessage id={titleId} />
                </h3>
                <p className="qr-meta">
                  <FormattedMessage id={whenId} />
                </p>
                <p className="qr-text">
                  <FormattedMessage id={textId} />
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="qr-card" aria-labelledby="qr-work">
          <h2 id="qr-work">
            <FormattedMessage id="projectWorkHeading" />
          </h2>
          <ul className="qr-grid">
            {projects.map(({ id, labelId, hrefEN, hrefFI }) => {
              const href = locale === "fi" ? hrefFI : hrefEN;
              return (
                <li key={id}>
                  <h3>
                    <FormattedMessage id={labelId} />
                  </h3>
                  <p className="qr-text">
                    <FormattedMessage id={id} />
                  </p>
                  {href ? (
                    <OutLink href={href}>
                      <FormattedMessage id="buttonReadMore" />
                      <span className="sr-only">
                        : <FormattedMessage id={labelId} />
                      </span>
                    </OutLink>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="qr-card" aria-labelledby="qr-personal">
          <h2 id="qr-personal">
            <FormattedMessage id="qrPersonalProjects" />
          </h2>
          <ul className="qr-grid">
            <li>
              <p className="qr-tag">
                <FormattedMessage id="neuralTag" />
              </p>
              <h3>
                <FormattedMessage id="neuralTitle" />
              </h3>
              <p className="qr-text">
                <FormattedMessage id="neuralSummary" />
              </p>
              <Chips items={neuralStack} />
              <OutLink href={NEURAL_REPOSITORY_URL}>
                <FormattedMessage id="neuralRepoLink" />
              </OutLink>
            </li>
            <li>
              <p className="qr-tag">
                <FormattedMessage id="projectExplorerTag" />
              </p>
              <h3>
                <FormattedMessage id="projectExplorerTitle" />
              </h3>
              <p className="qr-text">
                <FormattedMessage id="projectExplorerSummary" />
              </p>
              <Chips items={explorerStack} />
            </li>
          </ul>
        </section>

        <section className="qr-card" aria-labelledby="qr-skills">
          <h2 id="qr-skills">
            <FormattedMessage id="skillsToolsHeading" />
          </h2>
          <div className="qr-skills">
            {keySkills.map(({ id, items }) => (
              <div key={id}>
                <h3>
                  <FormattedMessage id={id} />
                </h3>
                <Chips items={items} />
              </div>
            ))}
          </div>
        </section>

        <section className="qr-card" aria-labelledby="qr-contact">
          <h2 id="qr-contact">
            <FormattedMessage id="contactHeading" />
          </h2>
          <div className="qr-actions">
            <ContactButtons />
          </div>
          <CopyEmail />
        </section>
      </main>

      <footer className="qr-footer">
        <span>
          <FormattedMessage
            id="footerCopyright"
            values={{ year: new Date().getFullYear() }}
          />
        </span>
        <button type="button" onClick={() => setQuickRead(false)}>
          {backToFilm}
        </button>
      </footer>
    </div>
  );
};

export default QuickReadPage;
