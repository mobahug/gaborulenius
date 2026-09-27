import { useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { onDirectorFrame } from "../../journey/director/director";
import { onAfterSceneFrame, registerScene } from "../../journey/scrollTimeline";
import { useActiveNavLink } from "../../hooks/useActiveNavLink";
import {
  PART_REACHED,
  allParts,
  groupOf,
  navLinks,
  placeOf,
} from "./navConstants";
import { useAfterCover } from "./useAfterCover";
import "./sectionRail.css";

/**
 * The page's sections down the right edge of the screen (wide screens):
 * a dot for each, the current one lit, on a thin gold line that fills as
 * the journey goes on. The current section opens its own parts below it,
 * grouped by project — the Neural Decompiler (its case study and method),
 * the Explorer (each capability, how it is built) — the one on screen lit,
 * with its project, following the scroll. Hovering the dots (or moving into
 * the rail with the keyboard) shows the names; each one takes you there.
 * Until then only the dots take the pointer, so the rail never covers what
 * is beside it (the corner instruments). It comes in once the cover has
 * gone.
 */
const SectionRail = () => {
  const intl = useIntl();
  const { currentActiveSectionId, requestActiveSection } = useActiveNavLink();
  const fillRef = useRef<HTMLSpanElement>(null);
  const visible = useAfterCover();
  const [activeChild, setActiveChild] = useState<string | null>(null);

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

  // Which part is on screen: the last one whose place has come up to
  // REACHED — measured by the scroll clock with everything else.
  useEffect(() => {
    const tops = new Map<string, number>();
    const unregister = allParts.map(({ href }) =>
      registerScene(
        () => placeOf(href),
        (frame) => tops.set(href, frame.top - frame.viewport.y),
      ),
    );
    let current: string | null = null;
    const stop = onAfterSceneFrame(({ vh }) => {
      let reached: string | null = null;
      let best = -Infinity;
      tops.forEach((top, href) => {
        if (top <= vh * PART_REACHED && top > best) {
          best = top;
          reached = href;
        }
      });
      if (reached === current) return;
      current = reached;
      setActiveChild(reached);
    });
    return () => {
      unregister.forEach((undo) => undo());
      stop();
    };
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
        {navLinks.map(({ id, href, children }) => {
          const active = currentActiveSectionId === href;
          const open = active && !!children;
          return (
            <li key={id} className={open ? "is-open" : undefined}>
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
              {children ? (
                <div className="section-rail-children">
                  <ul inert={!open}>
                    {children.map((child) => {
                      const here = open && activeChild === child.href;
                      const group = child.group
                        ? open && groupOf(children, activeChild) === child.href
                        : false;
                      const classes = [
                        here ? "is-active" : "",
                        group ? "is-current" : "",
                      ]
                        .filter(Boolean)
                        .join(" ");
                      return (
                        <li
                          key={child.id}
                          className={child.group ? "is-group" : undefined}
                        >
                          <a
                            href={child.href}
                            className={classes || undefined}
                            aria-current={here ? "location" : undefined}
                            onClick={() => requestActiveSection(href)}
                          >
                            <span className="section-rail-label">
                              <FormattedMessage id={child.id} />
                            </span>
                            <span
                              className="section-rail-dot"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SectionRail;
