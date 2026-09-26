import type { Ref } from "react";
import AboutChapter from "../chapters/AboutChapter";
import IntroChapter from "../chapters/IntroChapter";
import FilmSection, { Mark, Space } from "../film/FilmSection";

type ChaseStageProps = {
  homeRef?: Ref<HTMLDivElement>;
  aboutRef?: Ref<HTMLDivElement>;
};

/**
 * The first film, from the top of the page: the camera walks down the
 * jungle path under the greeting and the introduction, a morpho flies out
 * of the light while About is read and the camera follows it, a scarlet
 * macaw crosses the clearing, turns to the camera, and the camera moves
 * into its eye; the pupil opens onto the next film (see its portal in
 * `films.ts`) until it is all there is. The film moves from the first
 * scroll: about a second of it for every viewport height.
 */
const ChaseStage = ({ homeRef, aboutRef }: ChaseStageProps) => (
  <FilmSection film="chase" id="chase" lead={{ vh: 0 }} tail={{ vh: 0 }}>
    <IntroChapter at={1.0} ref={homeRef} />
    <Space vh={70} narrow={45} />
    <AboutChapter at={2.6} ref={aboutRef} />
    <Space vh={45} narrow={30} />
    <Mark at={3.7} />
    <Space vh={175} narrow={150} />
    <Mark at={5.6} />
    <Space vh={95} narrow={85} />
    <Mark at={7.0} />
    <Space vh={90} narrow={80} />
  </FilmSection>
);

export default ChaseStage;
