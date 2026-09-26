import OpenInNewIcon from "@mui/icons-material/Launch";
import { useAtomValue } from "jotai";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { categories, projects } from "../../contexts";
import { localeAtom } from "../../hooks/localeAtom";
import FilmSection, { Cue, Mark, Space } from "../film/FilmSection";
import "./stages.css";

const QualificationSection = React.lazy(
  () => import("../../components/sections/QualificationSection"),
);

const NODE_LABELS: Record<string, string> = {
  projectHusDatalakeTitle: "workNodeHus",
  projectMedicalPocTitle: "workNodePoc",
  projectIctDaysTitle: "workNodeIct",
  projectAnyhauTitle: "workNodeAnyhau",
};

type WorkStageProps = {
  experienceRef?: React.Ref<HTMLDivElement>;
  skillsRef?: React.Ref<HTMLDivElement>;
};

/**
 * Out of the fish's darkness, a reflection: it is espresso. The camera lifts
 * off the cup, turns across the desk to the workstation by the window, and
 * finally drifts toward the office plant. The professional side of the
 * portfolio — experience, work projects and the tool kit — lives here.
 */
const WorkStage = ({ experienceRef, skillsRef }: WorkStageProps) => {
  const locale = useAtomValue(localeAtom);
  const intl = useIntl();
  return (
    <FilmSection
      film="work"
      id="work-history"
      label={intl.formatMessage({ id: "navExperience" })}
      lead={{ vh: 130, narrow: 125 }}
      tail={{ vh: 26, narrow: 16 }}
    >
      <Mark at={1.4} />
      <Space vh={103} narrow={86} />
      <Cue
        at={3.9}
        id="experience"
        className="stage-experience"
        ref={experienceRef}
      >
        <div className="stage-experience-inner">
          <React.Suspense fallback={<div className="stage-placeholder" />}>
            <QualificationSection />
          </React.Suspense>
        </div>
      </Cue>
      <Space vh={27} narrow={23} />
      <Cue at={5.1} align="end" id="work">
        <div className="film-copy film-copy--wide">
          <h2 className="film-title stage-section-title">
            <FormattedMessage id="projectWorkHeading" />
          </h2>
          <ol className="stage-work-list">
            {projects.map(({ id, hrefEN, hrefFI }) => {
              const href = locale === "fi" ? hrefFI : hrefEN;
              return (
                <li key={id}>
                  <h3 className="stage-work-title">
                    <FormattedMessage id={NODE_LABELS[id]} />
                  </h3>
                  <p className="stage-work-body">
                    <FormattedMessage id={id} />
                  </p>
                  {href ? (
                    <a
                      className="stage-link"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FormattedMessage id="buttonReadMore" />
                      <OpenInNewIcon aria-hidden="true" />
                    </a>
                  ) : (
                    <p className="stage-note">
                      <FormattedMessage id="noLinkAvailable" />
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </Cue>
      <Space vh={25} narrow={20} />
      <Cue at={6.2} id="skills" ref={skillsRef}>
        <div className="film-copy film-copy--wide">
          <h2 className="film-title stage-section-title">
            <FormattedMessage id="skillsToolsHeading" />
          </h2>
          <div className="stage-skills">
            {categories.map((category) => (
              <div key={category.id} className="stage-skill-group">
                <h3 className="stage-skill-title">
                  <FormattedMessage id={category.id} />
                </h3>
                <ul className="film-stack stage-skill-list">
                  {category.items.map((skill) => (
                    <li key={`${category.id}-${skill}`}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Cue>
    </FilmSection>
  );
};

export default WorkStage;
