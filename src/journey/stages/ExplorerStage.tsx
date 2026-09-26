import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  explorerCapabilities,
  explorerStack,
} from "../../components/projects/explorerProjectData";
import FilmSection, { Cue, Space } from "../film/FilmSection";
import "./stages.css";

const ExplorerProjectDialog = React.lazy(
  () => import("../../components/projects/ExplorerProjectDialog"),
);

/**
 * Out of the white, a sky; the camera comes down over the Okavango Delta,
 * races a mokoro along a channel, slips under the surface among the reeds
 * and meets a fish that swallows the light. The Explorer — the mobile
 * fieldwork app built for places like this — is introduced on the way.
 */
const ExplorerStage = () => {
  const theme = useTheme();
  const fullScreenDialog = useMediaQuery(theme.breakpoints.down("md"));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogLoaded, setDialogLoaded] = useState(false);
  const [first, second, third, fourth] = explorerCapabilities;

  const capability = ({
    titleId,
    bodyId,
    icon,
  }: (typeof explorerCapabilities)[number]) => (
    <li key={titleId}>
      <span className="stage-capability-icon" aria-hidden="true">
        {icon}
      </span>
      <span>
        <strong className="stage-capability-title">
          <FormattedMessage id={titleId} />
        </strong>
        <span className="stage-capability-body">
          <FormattedMessage id={bodyId} />
        </span>
      </span>
    </li>
  );

  return (
    <FilmSection
      film="explorer"
      id="explorer-project"
      labelledBy="explorer-heading"
      lead={{ vh: 108, narrow: 98 }}
      tail={{ vh: 70, narrow: 60 }}
    >
      <Cue at={1.2} id="explorer">
        <div className="film-copy">
          <p className="film-kicker">
            <FormattedMessage id="projectExplorerTag" />
          </p>
          <h3 id="explorer-heading" className="film-title">
            <FormattedMessage id="projectExplorerTitle" />
          </h3>
          <p className="film-lead">
            <FormattedMessage id="projectExplorerSummary" />
          </p>
        </div>
      </Cue>
      <Space vh={80} narrow={70} />
      <Cue at={3.3} align="end">
        <div className="film-copy">
          <ul className="stage-capabilities">
            {[first, second].map(capability)}
          </ul>
        </div>
      </Cue>
      <Space vh={62} narrow={54} />
      <Cue at={5.0}>
        <div className="film-copy">
          <ul className="stage-capabilities">
            {[third, fourth].map(capability)}
          </ul>
        </div>
      </Cue>
      <Space vh={48} narrow={42} />
      <Cue at={6.4} align="end">
        <div className="film-copy">
          <h4 className="film-subheading">
            <FormattedMessage id="projectExplorerStackHeading" />
          </h4>
          <ul className="film-stack stage-stack-tight">
            {explorerStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="film-actions">
            <Button
              variant="contained"
              startIcon={<InfoOutlinedIcon />}
              onClick={() => {
                setDialogLoaded(true);
                setDialogOpen(true);
              }}
            >
              <FormattedMessage id="projectExplorerButtonDetails" />
            </Button>
          </div>
        </div>
      </Cue>
      {dialogLoaded ? (
        <React.Suspense fallback={null}>
          <ExplorerProjectDialog
            fullScreen={fullScreenDialog}
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
          />
        </React.Suspense>
      ) : null}
    </FilmSection>
  );
};

export default ExplorerStage;
