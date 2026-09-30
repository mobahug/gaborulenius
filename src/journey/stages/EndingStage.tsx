import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import type React from "react";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "../../seo";
import FilmSection, { Cue, Mark, Space } from "../film/FilmSection";
import "./stages.css";

type EndingStageProps = {
  contactRef?: React.Ref<HTMLDivElement>;
};

/**
 * The address itself, and a way to copy it: "Email Me" does nothing on a
 * computer without a mail app.
 */
const CopyEmail = () => {
  const intl = useIntl();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const reset = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(reset);
  }, [copied]);

  const copy = () => {
    navigator.clipboard?.writeText(EMAIL).then(
      () => setCopied(true),
      // No clipboard here: the address stays there to select.
      () => undefined,
    );
  };
  const label = intl.formatMessage({
    id: copied ? "contactEmailCopied" : "contactCopyEmail",
  });

  return (
    <p className="stage-contact-email">
      <span>{EMAIL}</span>
      <IconButton size="small" onClick={copy} aria-label={label} title={label}>
        {copied ? <CheckIcon /> : <ContentCopyIcon />}
      </IconButton>
      <span className="sr-only" aria-live="polite">
        {copied ? label : ""}
      </span>
    </p>
  );
};

/**
 * Through the office plant's leaf and out into the jungle again: the macaw
 * lands on its branch on the right, the morpho settles on a leaf beside it,
 * and the light stays. The journey ends with an open invitation, on the calm
 * left, resting in the upper half of the screen as the film ends.
 */
const EndingStage = ({ contactRef }: EndingStageProps) => (
  <FilmSection
    film="ending"
    id="connect"
    labelledBy="contact-heading"
    lead={{ vh: 105, narrow: 95 }}
    tail={{ vh: 45, narrow: 40 }}
  >
    <Mark at={1.5} />
    <Space vh={88} narrow={76} />
    <Mark at={3.6} />
    <Space vh={88} narrow={76} />
    <Mark at={5.7} />
    <Space vh={50} narrow={44} />
    <Cue at={7.2} id="contact" ref={contactRef} className="stage-contact">
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
