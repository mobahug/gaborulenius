import OpenInNewIcon from "@mui/icons-material/Launch";
import { useAtomValue } from "jotai";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { categories, projects } from "../../contexts";
import { localeAtom } from "../../hooks/localeAtom";
import FilmSection, { Cue, Space } from "../film/FilmSection";
import CareerDial from "./CareerDial";
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

type Project = (typeof projects)[number];

/** Work projects, each with its link (or a note that it has none). */
const WorkList = ({ items, locale }: { items: Project[]; locale: string }) => (
  <ol className="stage-work-list">
    {items.map(({ id, hrefEN, hrefFI }) => {
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
);

/** Skill groups, each a titled line of tools. */
const SkillGroups = ({ groups }: { groups: typeof categories }) => (
  <div className="stage-skills">
    {groups.map((category) => (
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
);

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
      lead={{ vh: 112, narrow: 104 }}
      tail={{ vh: 62, narrow: 54 }}
    >
      <CareerDial />
      <Cue
        at={1.6}
        id="experience"
        className="stage-experience"
        ref={experienceRef}
        hold={110}
      >
        <div className="stage-experience-inner">
          <React.Suspense fallback={<div className="stage-placeholder" />}>
            <QualificationSection />
          </React.Suspense>
        </div>
      </Cue>
      <Space vh={20} />
      {/* Two projects at a time, so each set fits on a phone's screen. */}
      <Cue at={3.2} id="work">
        <div className="film-copy film-copy--wide">
          <h2 className="film-title stage-section-title">
            <FormattedMessage id="projectWorkHeading" />
          </h2>
          <WorkList items={projects.slice(0, 2)} locale={locale} />
        </div>
      </Cue>
      <Space vh={10} />
      <Cue at={4.2}>
        <div className="film-copy film-copy--wide">
          <WorkList items={projects.slice(2)} locale={locale} />
        </div>
      </Cue>
      <Space vh={25} />
      <Cue at={5.6} id="skills" ref={skillsRef}>
        <div className="film-copy film-copy--wide">
          <h2 className="film-title stage-section-title">
            <FormattedMessage id="skillsToolsHeading" />
          </h2>
          <SkillGroups groups={categories.slice(0, -1)} />
        </div>
      </Cue>
      <Space vh={10} />
      <Cue at={6.5} hold={80}>
        <div className="film-copy film-copy--wide">
          <SkillGroups groups={categories.slice(-1)} />
        </div>
      </Cue>
    </FilmSection>
  );
};

export default WorkStage;
