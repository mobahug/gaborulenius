import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import type React from "react";
import { FormattedMessage } from "react-intl";
import { GITHUB_URL, LINKEDIN_URL } from "../../seo";
import FilmSection, { Cue, Mark, Space } from "../film/FilmSection";
import "./stages.css";

type EndingStageProps = {
  contactRef?: React.Ref<HTMLDivElement>;
};

/**
 * Through the office plant's leaf and out into the jungle again: the macaw
 * lands on a branch on one side, the butterfly settles on the other, and
 * the light stays. The journey ends with an open invitation, which fades in
 * like every other block as the butterfly comes to rest.
 */
const EndingStage = ({ contactRef }: EndingStageProps) => (
  <FilmSection
    film="ending"
    id="connect"
    labelledBy="contact-heading"
    lead={{ vh: 145, narrow: 135 }}
    tail={{ vh: 12, narrow: 10 }}
  >
    <Mark at={1.5} />
    <Space vh={105} narrow={90} />
    <Mark at={3.6} />
    <Space vh={100} narrow={85} />
    <Mark at={5.7} />
    <Space vh={100} narrow={70} />
    <Cue align="center" id="contact" ref={contactRef} className="stage-contact">
      <div className="film-copy stage-contact-copy">
        <h2 id="contact-heading" className="film-title">
          <FormattedMessage id="contactHeading" />
        </h2>
        <p className="film-lead">
          <FormattedMessage id="contactIntro" />
        </p>
        <div className="film-actions stage-contact-actions">
          <Button
            variant="contained"
            component="a"
            href="mailto:gaborulenius@gmail.com"
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
      </div>
    </Cue>
  </FilmSection>
);

export default EndingStage;
