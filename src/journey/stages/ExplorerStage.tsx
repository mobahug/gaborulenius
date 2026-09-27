import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  explorerCapabilities,
  explorerDetailGroups,
  explorerScreenshots,
  explorerStack,
  type ExplorerCapability,
} from "../../components/projects/explorerProjectData";
import { assetUrl } from "../../utils/assets";
import FilmSection, { Cue, Space } from "../film/FilmSection";
import ExplorerMap from "./ExplorerMap";
import "./stages.css";

const screenshotFor = (src: string) =>
  explorerScreenshots.find((screenshot) => screenshot.src === src)!;

/**
 * Two of the app's screens in phones: the one that does the capability, in
 * front, and another one behind it. Either can be brought to the front by
 * clicking it; the caption names the one in front.
 */
const Screens = ({ screens }: Pick<ExplorerCapability, "screens">) => {
  const intl = useIntl();
  const shots = screens.map(screenshotFor);
  const [front, setFront] = useState(0);
  return (
    <figure className="explorer-shot">
      <div className="explorer-pair">
        {shots.map((shot, index) => {
          const inFront = index === front;
          return (
            <button
              key={shot.src}
              type="button"
              className={`explorer-device explorer-device--${inFront ? "front" : "back"}`}
              aria-pressed={inFront}
              title={
                inFront
                  ? undefined
                  : intl.formatMessage(
                      { id: "projectExplorerBringForward" },
                      { title: intl.formatMessage({ id: shot.titleId }) },
                    )
              }
              onClick={() => setFront(index)}
            >
              <img
                src={assetUrl(shot.src)}
                alt={intl.formatMessage({ id: shot.altId })}
                width={397}
                height={844}
                loading="lazy"
                decoding="async"
              />
            </button>
          );
        })}
      </div>
      <figcaption aria-live="polite">
        <FormattedMessage id={shots[front].titleId} />
      </figcaption>
    </figure>
  );
};

/**
 * A capability of the app beside the screens that show it: the words at the
 * edge of the screen like every other block, the phones toward the film.
 * The words come first and the phones a beat later (see BEAT_DELAY in
 * FilmSection); the phones leave first.
 */
const Feature = ({ titleId, bodyId, icon, screens }: ExplorerCapability) => (
  <div className="explorer-feature">
    <div className="film-copy explorer-feature-copy film-beat">
      <span className="stage-capability-icon" aria-hidden="true">
        {icon}
      </span>
      <h4 className="explorer-feature-title">
        <FormattedMessage id={titleId} />
      </h4>
      <p className="film-lead explorer-feature-body">
        <FormattedMessage id={bodyId} />
      </p>
    </div>
    <div className="explorer-feature-screen film-part film-beat">
      <Screens screens={screens} />
    </div>
  </div>
);

/** One group of how the app is built. */
const DetailGroup = ({
  group: { titleId, items },
}: {
  group: (typeof explorerDetailGroups)[number];
}) => (
  <>
    <h5 className="stage-skill-title">
      <FormattedMessage id={titleId} />
    </h5>
    <ul className="film-list">
      {items.map((itemId) => (
        <li key={itemId}>
          <FormattedMessage id={itemId} />
        </li>
      ))}
    </ul>
  </>
);

/**
 * Out of the white, a sky; the camera comes down over the Okavango Delta,
 * races a mokoro along a channel, slips under the surface among the reeds
 * and meets a fish that swallows the light. The Explorer — the mobile
 * fieldwork app built for places like this — is shown on the way, in the
 * field rather than behind a dialog: each capability beside the app's
 * screens that do it, then how it is built, one group at a time, while a
 * small map in the corner walks the expedition.
 */
const ExplorerStage = () => {
  const intl = useIntl();
  const [maps, precision, capture, cloud] = explorerCapabilities;
  const [field, infrastructure, review] = explorerDetailGroups;

  return (
    <FilmSection
      film="explorer"
      id="explorer-project"
      labelledBy="explorer-heading"
      lead={{ vh: 108, narrow: 98 }}
      tail={{ vh: 60, narrow: 50 }}
    >
      <ExplorerMap />
      <Cue at={1.2} id="explorer" hold={80}>
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
      <Space vh={20} />
      {/* Low over the channel, the sun on the water. */}
      <Cue at={2.3} id="explorer-maps">
        <Feature {...maps} />
      </Cue>
      <Space vh={15} />
      {/* The mokoro: its poler stays clear on the left. */}
      <Cue at={3.3} id="explorer-precision" align="end">
        <Feature {...precision} />
      </Cue>
      <Space vh={45} narrow={40} />
      {/* Through the splash, under the surface among the reeds. */}
      <Cue at={4.9} id="explorer-capture">
        <Feature {...capture} />
      </Cue>
      <Space vh={15} />
      <Cue at={5.8} id="explorer-cloud" align="end">
        <Feature {...cloud} />
      </Cue>
      <Space vh={15} />
      {/* The fish comes out of the green: how the app is built. */}
      <Cue at={6.45} id="explorer-built" hold={75}>
        <div className="film-copy explorer-details">
          <h4 className="explorer-details-title">
            <FormattedMessage id="projectExplorerWhyHeading" />
          </h4>
          <DetailGroup group={field} />
        </div>
      </Cue>
      <Space vh={10} />
      <Cue at={6.95} align="end" hold={70}>
        <div className="film-copy explorer-details">
          <DetailGroup group={infrastructure} />
        </div>
      </Cue>
      <Space vh={10} />
      <Cue at={7.4} hold={70}>
        <div className="film-copy explorer-details">
          <DetailGroup group={review} />
          <h5 className="stage-skill-title explorer-stack-title">
            <FormattedMessage id="projectExplorerStackHeading" />
          </h5>
          <ul
            className="film-stack stage-stack-tight"
            aria-label={intl.formatMessage({
              id: "projectExplorerStackHeading",
            })}
          >
            {explorerStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Cue>
    </FilmSection>
  );
};

export default ExplorerStage;
