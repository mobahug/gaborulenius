import { FormattedMessage, useIntl } from "react-intl";
import {
  explorerCapabilities,
  explorerDetailGroups,
  explorerScreenshots,
  explorerStack,
  type ExplorerCapability,
  type ExplorerScreenshot,
} from "../../components/projects/explorerProjectData";
import { assetUrl } from "../../utils/assets";
import FilmSection, { Cue, Space } from "../film/FilmSection";
import "./stages.css";

/** Each screen of the strip arrives this much after the one before it. */
const STRIP_DELAY = 0.015;

const screenshotFor = (src: string) =>
  explorerScreenshots.find((screenshot) => screenshot.src === src)!;

/** The screens that are not shown beside a capability, in the strip. */
const stripScreenshots = explorerScreenshots.filter(
  ({ src }) => !explorerCapabilities.some(({ screen }) => screen === src),
);

/** An app screen in a phone. */
const Screen = ({
  screenshot,
  small = false,
}: {
  screenshot: ExplorerScreenshot;
  small?: boolean;
}) => {
  const intl = useIntl();
  return (
    <figure className={`explorer-shot${small ? " explorer-shot--small" : ""}`}>
      <div className="explorer-device">
        <img
          src={assetUrl(screenshot.src)}
          alt={intl.formatMessage({ id: screenshot.altId })}
          width={397}
          height={844}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption>
        <FormattedMessage id={screenshot.titleId} />
      </figcaption>
    </figure>
  );
};

/**
 * A capability of the app beside the screen that shows it: the words at the
 * edge of the screen like every other block, the phone toward the film.
 */
const Feature = ({ titleId, bodyId, icon, screen }: ExplorerCapability) => (
  <div className="explorer-feature">
    <div className="film-copy explorer-feature-copy">
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
    <div className="explorer-feature-screen film-part">
      <Screen screenshot={screenshotFor(screen)} />
    </div>
  </div>
);

/**
 * Out of the white, a sky; the camera comes down over the Okavango Delta,
 * races a mokoro along a channel, slips under the surface among the reeds
 * and meets a fish that swallows the light. The Explorer — the mobile
 * fieldwork app built for places like this — is shown on the way, in the
 * field rather than behind a dialog: each capability beside the app screen
 * that does it, then how it is built, and the rest of the app's screens.
 */
const ExplorerStage = () => {
  const intl = useIntl();
  const [maps, precision, capture, cloud] = explorerCapabilities;

  return (
    <FilmSection
      film="explorer"
      id="explorer-project"
      labelledBy="explorer-heading"
      lead={{ vh: 108, narrow: 98 }}
      tail={{ vh: 60, narrow: 50 }}
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
      <Space vh={40} narrow={30} />
      {/* Low over the channel, the sun on the water. */}
      <Cue at={2.3}>
        <Feature {...maps} />
      </Cue>
      <Space vh={30} narrow={24} />
      {/* The mokoro: its poler stays clear on the left. */}
      <Cue at={3.3} align="end">
        <Feature {...precision} />
      </Cue>
      <Space vh={55} narrow={40} />
      {/* Through the splash, under the surface among the reeds. */}
      <Cue at={4.9}>
        <Feature {...capture} />
      </Cue>
      <Space vh={30} narrow={24} />
      <Cue at={5.8} align="end">
        <Feature {...cloud} />
      </Cue>
      <Space vh={30} narrow={24} />
      {/* The fish comes out of the green. */}
      <Cue at={6.6}>
        <div className="film-copy film-copy--wide explorer-details">
          <h4 className="explorer-details-title">
            <FormattedMessage id="projectExplorerWhyHeading" />
          </h4>
          <div className="explorer-detail-groups film-parts">
            {explorerDetailGroups.map(({ titleId, items }) => (
              <section key={titleId} className="explorer-detail-group">
                <h5 className="stage-skill-title film-part">
                  <FormattedMessage id={titleId} />
                </h5>
                <ul className="film-list">
                  {items.map((itemId) => (
                    <li key={itemId}>
                      <FormattedMessage id={itemId} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
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
      <Space vh={24} narrow={20} />
      <Cue at={7.25} align="center">
        <div className="explorer-strip-block">
          <p className="film-kicker film-part">
            <FormattedMessage id="projectExplorerGalleryHeading" />
          </p>
          {/* Scrolls sideways where the screen is too narrow for it. */}
          <ul
            className="explorer-strip"
            aria-label={intl.formatMessage({
              id: "projectExplorerGalleryLabel",
            })}
            tabIndex={0}
          >
            {stripScreenshots.map((screenshot, index) => (
              <li
                key={screenshot.src}
                data-delay={(index * STRIP_DELAY).toFixed(3)}
              >
                <Screen screenshot={screenshot} small />
              </li>
            ))}
          </ul>
        </div>
      </Cue>
    </FilmSection>
  );
};

export default ExplorerStage;
