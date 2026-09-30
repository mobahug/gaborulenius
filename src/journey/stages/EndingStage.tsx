import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import type React from "react";
import { FormattedMessage } from "react-intl";
import CopyEmail from "../../components/CopyEmail";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "../../seo";
import FilmSection, { Cue, Mark, Space } from "../film/FilmSection";
import "./stages.css";

type EndingStageProps = {
  contactRef?: React.Ref<HTMLDivElement>;
};

/**
 * Through the office plant's leaf and out into the jungle again: the macaw
 * lands on its branch on the right, the morpho settles on a leaf beside it,
 * and the light stays. The journey ends with an open invitation on the calm
 * left: it comes in as the macaw flies in and stays while the film ends, so
 * the way to get in touch is not the last thing to wait for.
 */
const EndingStage = ({ contactRef }: EndingStageProps) => (
  <FilmSection
    film="ending"
    id="connect"
    labelledBy="contact-heading"
    lead={{ vh: 105, narrow: 95 }}
    tail={{ vh: 37, narrow: 50 }}
  >
    <Mark at={1.5} />
    <Space vh={35} narrow={40} />
    <Cue
      at={6.0}
      id="contact"
      ref={contactRef}
      className="stage-contact"
      hold={207}
      holdNarrow={150}
    >
      <div className="film-copy stage-contact-copy">
        <h2 id="contact-heading" className="film-title">
          <FormattedMessage id="contactHeading" />
        </h2>
        <p className="film-lead">
          <FormattedMessage id="contactIntro" />
        </p>
        <div className="film-actions">
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
        </div>
        <CopyEmail />
      </div>
    </Cue>
  </FilmSection>
);

export default EndingStage;
