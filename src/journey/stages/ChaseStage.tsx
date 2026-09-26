import type { ReactNode } from "react";
import FilmSection, { Mark, Space } from "../film/FilmSection";

type ChaseStageProps = {
  /** The introduction and About, read on the path before the chase. */
  intro: ReactNode;
  about: ReactNode;
};

/**
 * The first film, from the top of the page: the jungle path under the
 * greeting, and while the introduction and About are read, a butterfly
 * drifting out of the light, the camera following it through the foliage
 * and a scarlet macaw bursting out after it. Once About has gone the macaw
 * comes at the camera and the camera moves into its eye; the pupil opens
 * onto the next film (see its portal in `films.ts`) until it is all there
 * is.
 */
const ChaseStage = ({ intro, about }: ChaseStageProps) => (
  <FilmSection film="chase" id="chase" lead={{ vh: 0 }} tail={{ vh: 0 }}>
    <Mark at={0.35} />
    {intro}
    <Mark at={1.1} />
    {about}
    <Mark at={6.0} />
    <Space vh={70} narrow={60} />
    <Mark at={7.0} />
    <Space vh={82} narrow={70} />
  </FilmSection>
);

export default ChaseStage;
