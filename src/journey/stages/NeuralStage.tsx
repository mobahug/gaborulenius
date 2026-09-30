import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import type React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { neuralStack } from "../../contexts";
import { NEURAL_REPOSITORY_URL } from "../../seo";
import FilmSection, { Cue, Space } from "../film/FilmSection";
import PortalTitle from "../film/PortalTitle";
import "./stages.css";

/** The question holds at full size until 1.5 s, and has passed by 2.1 s. */
const QUESTION_HOLD = [1.5, 2.1] as const;

type NeuralStageProps = {
  projectsRef?: React.Ref<HTMLDivElement>;
};

/**
 * Inside the eye: the pupil opens onto a black void in which a single
 * neuron sparks — the question comes toward us with it — grows its
 * dendrites and becomes a network the camera flies through, until one
 * bright node swallows the frame in white. The Neural Decompiler research
 * surfaces along the way, one idea at a time.
 */
const NeuralStage = ({ projectsRef }: NeuralStageProps) => {
  const intl = useIntl();
  return (
    <FilmSection
      film="neural"
      id="neural-decompiler"
      labelledBy="neural-heading"
      lead={{ vh: 45, narrow: 40 }}
      tail={{ vh: 42, narrow: 36 }}
    >
      <PortalTitle
        film="neural"
        hold={QUESTION_HOLD}
        offset={-0.22}
        id="projects"
        ref={projectsRef}
      >
        <p className="film-copy film-question stage-question">
          <FormattedMessage id="neuralQuestion" />
        </p>
      </PortalTitle>
      <Space vh={100} narrow={90} />
      <Cue at={3.0} id="neural" hold={90}>
        <div className="film-copy">
          <p className="film-kicker">
            <FormattedMessage id="neuralTag" />
          </p>
          <h3 id="neural-heading" className="film-title">
            <FormattedMessage id="neuralTitle" />
          </h3>
          <p className="film-lead">
            <FormattedMessage id="neuralSummary" />
          </p>
        </div>
      </Cue>
      <Space vh={20} />
      <Cue at={4.4} id="neural-case" align="end" hold={80}>
        <div className="film-copy film-copy--narrow">
          <p className="film-lead stage-emphasis">
            <FormattedMessage id="neuralCaseStudy" />
          </p>
        </div>
      </Cue>
      <Space vh={25} />
      <Cue at={5.9} id="neural-method" hold={100}>
        <div className="film-copy">
          <h4 className="film-subheading">
            <FormattedMessage id="neuralMethodHeading" />
          </h4>
          <ul className="film-list">
            {["neuralMethod1", "neuralMethod2", "neuralMethod3"].map((id) => (
              <li key={id}>
                <FormattedMessage id={id} />
              </li>
            ))}
          </ul>
        </div>
      </Cue>
      <Space vh={10} />
      <Cue at={7.0} align="end" hold={70}>
        <div className="film-copy">
          <ul
            className="film-stack"
            aria-label={intl.formatMessage({
              id: "projectExplorerStackHeading",
            })}
          >
            {neuralStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="film-actions">
            <Button
              variant="contained"
              component="a"
              href={NEURAL_REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHubIcon />}
            >
              <FormattedMessage id="neuralRepoLink" />
            </Button>
          </div>
        </div>
      </Cue>
    </FilmSection>
  );
};

export default NeuralStage;
