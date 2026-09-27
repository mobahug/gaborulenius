import { useEffect, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { onDirectorFrame } from "../../journey/director/director";
import { useActiveNavLink } from "../../hooks/useActiveNavLink";
import { navLinks } from "./navConstants";
import { useAfterCover } from "./useAfterCover";
import "./sectionRail.css";

/**
 * The page's sections down the right edge of the screen (wide screens):
 * a dot for each, the current one lit, on a thin gold line that fills as
 * the journey goes on. Hovering it (or moving into it with the keyboard)
 * shows the sections' names; each one takes you there, like the links the
 * navigation bar used to carry. It comes in once the cover has gone.
 */
const SectionRail = () => {
  const intl = useIntl();
  const { currentActiveSectionId, requestActiveSection } = useActiveNavLink();
  const fillRef = useRef<HTMLSpanElement>(null);
  const visible = useAfterCover();

  // How far the journey has come, on the line.
  useEffect(() => {
    let shown = -1;
    return onDirectorFrame(({ journeyProgress }) => {
      const fill = fillRef.current;
      const progress = Math.round(journeyProgress * 400) / 400;
      if (!fill || progress === shown) return;
      shown = progress;
      fill.style.transform = `scaleY(${progress})`;
    }, 50);
  }, []);

  return (
    <nav
      className={`section-rail${visible ? " is-visible" : ""}`}
      aria-label={intl.formatMessage({ id: "navSections" })}
      aria-hidden={visible ? undefined : true}
      inert={!visible}
    >
      <span className="section-rail-track" aria-hidden="true">
        <span ref={fillRef} className="section-rail-fill" />
      </span>
      <ul>
        {navLinks.map(({ id, href }) => {
          const active = currentActiveSectionId === href;
          return (
            <li key={id}>
              <a
                href={href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "location" : undefined}
                onClick={() => requestActiveSection(href)}
              >
                <span className="section-rail-label">
                  <FormattedMessage id={id} />
                </span>
                <span className="section-rail-dot" aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SectionRail;
