import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useAtomValue } from "jotai";
import type { Ref } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { localeAtom } from "../../hooks/localeAtom";
import { CV_FILES } from "../../seo";
import { assetUrl } from "../../utils/assets";
import { Cue } from "../film/FilmSection";
import "./chapters.css";

type IntroChapterProps = {
  /** Film time at which the block is centred on screen. */
  at: number;
  ref?: Ref<HTMLDivElement>;
};

/**
 * "The Sentence": the cover's greeting continues on the path, coming in
 * with the subtitle and the actions the way every block does, while the
 * film goes on behind them.
 */
const IntroChapter = ({ at, ref }: IntroChapterProps) => {
  const intl = useIntl();
  const locale = useAtomValue(localeAtom);
  const words = intl.formatMessage({ id: "homeGreeting" }).split(" ");

  return (
    <Cue at={at} id="home" ref={ref} className="stage-intro">
      <section
        className="film-copy film-copy--wide intro-copy"
        aria-labelledby="home-heading"
      >
        <h2 id="home-heading" className="intro-sentence film-parts">
          {words.map((word, index) => (
            <span key={`${word}-${index}`}>
              <span className="intro-word film-part">{word}</span>
              {index < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>
        <p className="film-lead intro-subtitle">
          <FormattedMessage id="homeSubtitle" />
        </p>
        <div className="film-actions">
          <Button
            variant="contained"
            href="#projects"
            startIcon={<SearchIcon />}
          >
            <FormattedMessage id="homeBtnExplore" />
          </Button>
          <Button
            variant="contained"
            component="a"
            href={assetUrl(CV_FILES[locale])}
            target="_blank"
            rel="noopener noreferrer"
            download
            startIcon={<FileDownloadIcon />}
          >
            <FormattedMessage id="homeBtnDownloadCv" />
          </Button>
        </div>
      </section>
    </Cue>
  );
};

export default IntroChapter;
