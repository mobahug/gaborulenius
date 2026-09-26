import { useCallback, useEffect, useRef, type RefObject } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import {
  onAfterSceneFrame,
  registerScene,
  type Viewport,
} from "../journey/scrollTimeline";

export const activeSectionIdAtom = atom<string>("#home");
type RequestedSection = {
  expiresAt: number;
  id: string;
};

const requestedSectionIdAtom = atom<RequestedSection | null>(null);
const NAV_ACTIVATION_OFFSET_RATIO = 0.35;
const REQUESTED_SECTION_TIMEOUT_MS = 3000;
const SCROLL_END_THRESHOLD_PX = 2;

const normalizeSectionHash = (sectionId: string) =>
  sectionId.startsWith("#") ? sectionId : `#${sectionId}`;

const getSectionHash = (section: HTMLElement) => `#${section.id}`;

export const useActiveNavLink = () => {
  const currentActiveSectionId = useAtomValue(activeSectionIdAtom);
  const requestedSection = useAtomValue(requestedSectionIdAtom);
  const setActiveSectionId = useSetAtom(activeSectionIdAtom);
  const setRequestedSectionId = useSetAtom(requestedSectionIdAtom);

  const updateActiveSectionId = useCallback(
    (sectionId: string) => {
      setActiveSectionId(normalizeSectionHash(sectionId));
    },
    [setActiveSectionId],
  );

  const requestActiveSection = useCallback(
    (sectionId: string) => {
      const nextSectionId = normalizeSectionHash(sectionId);

      setRequestedSectionId({
        expiresAt: Date.now() + REQUESTED_SECTION_TIMEOUT_MS,
        id: nextSectionId,
      });
      setActiveSectionId(nextSectionId);
    },
    [setActiveSectionId, setRequestedSectionId],
  );

  const clearRequestedSectionId = useCallback(
    (sectionId?: string) => {
      const sectionHash = sectionId ? normalizeSectionHash(sectionId) : null;

      setRequestedSectionId((currentSection) => {
        if (sectionHash && currentSection?.id !== sectionHash) {
          return currentSection;
        }

        return null;
      });
    },
    [setRequestedSectionId],
  );

  return {
    currentActiveSectionId,
    requestedSection,
    setActiveSectionId: updateActiveSectionId,
    requestActiveSection,
    clearRequestedSectionId,
  };
};

export const useActiveNavScrollSpy = <TSection extends HTMLElement>(
  sectionRefs: ReadonlyArray<RefObject<TSection>>,
) => {
  const {
    clearRequestedSectionId,
    currentActiveSectionId,
    requestedSection,
    requestActiveSection,
    setActiveSectionId,
  } = useActiveNavLink();
  const activeSectionIdRef = useRef(currentActiveSectionId);
  const requestedSectionRef = useRef(requestedSection);

  useEffect(() => {
    activeSectionIdRef.current = currentActiveSectionId;
  }, [currentActiveSectionId]);

  useEffect(() => {
    requestedSectionRef.current = requestedSection;
  }, [requestedSection]);

  useEffect(() => {
    const observedSections = sectionRefs
      .map((sectionRef) => sectionRef.current)
      .filter((section): section is TSection => Boolean(section));

    if (observedSections.length === 0) {
      return;
    }

    // Every section is measured by the scroll clock in its read phase, with
    // everything else, so the spy never forces a layout after the journey
    // has written its styles for the frame.
    const geometry = observedSections.map(() => ({ top: 0, height: 0 }));
    const unregister = observedSections.map((section, index) =>
      registerScene(section, (frame) => {
        geometry[index] = { top: frame.top, height: frame.height };
      }),
    );

    const getActivationOffset = (viewport: Viewport) =>
      viewport.vh * NAV_ACTIVATION_OFFSET_RATIO;

    const isPageScrolledToEnd = (viewport: Viewport) =>
      viewport.y >= viewport.maxY - SCROLL_END_THRESHOLD_PX;

    const findSectionByHash = (sectionHash: string) =>
      observedSections.find(
        (section) => getSectionHash(section) === sectionHash,
      );

    const getCurrentSection = (viewport: Viewport) => {
      if (isPageScrolledToEnd(viewport)) {
        return observedSections[observedSections.length - 1];
      }

      const activationOffset = getActivationOffset(viewport);

      return observedSections.reduce((activeSection, section, index) => {
        const sectionTop = geometry[index].top - viewport.y;

        if (sectionTop <= activationOffset) {
          return section;
        }

        return activeSection;
      }, observedSections[0]);
    };

    const hasReachedRequestedSection = (
      section: TSection,
      viewport: Viewport,
    ) => {
      const { top, height } = geometry[observedSections.indexOf(section)];
      const sectionTop = top - viewport.y;
      const activationOffset = getActivationOffset(viewport);
      const lastSection = observedSections[observedSections.length - 1];

      return (
        (sectionTop <= activationOffset &&
          sectionTop + height > activationOffset) ||
        (getSectionHash(section) === getSectionHash(lastSection) &&
          isPageScrolledToEnd(viewport))
      );
    };

    const updateActiveSectionId = (sectionHash: string) => {
      if (activeSectionIdRef.current === sectionHash) {
        return;
      }

      activeSectionIdRef.current = sectionHash;
      setActiveSectionId(sectionHash);
    };

    const updateActiveSection = (viewport: Viewport) => {
      const requestedNavigation = requestedSectionRef.current;
      const requestedHash = requestedNavigation?.id;

      if (requestedHash) {
        const requestedSection = findSectionByHash(requestedHash);

        if (!requestedSection || Date.now() > requestedNavigation.expiresAt) {
          requestedSectionRef.current = null;
          clearRequestedSectionId(requestedHash);
        } else if (!hasReachedRequestedSection(requestedSection, viewport)) {
          return;
        } else {
          requestedSectionRef.current = null;
          clearRequestedSectionId(requestedHash);
        }
      }

      updateActiveSectionId(getSectionHash(getCurrentSection(viewport)));
    };

    const handleHashChange = () => {
      const sectionHash = window.location.hash;

      if (!sectionHash || !findSectionByHash(sectionHash)) {
        return;
      }

      activeSectionIdRef.current = sectionHash;
      requestedSectionRef.current = {
        expiresAt: Date.now() + REQUESTED_SECTION_TIMEOUT_MS,
        id: sectionHash,
      };
      requestActiveSection(sectionHash);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    const stop = onAfterSceneFrame(updateActiveSection);

    return () => {
      unregister.forEach((release) => release());
      stop();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [
    clearRequestedSectionId,
    requestActiveSection,
    sectionRefs,
    setActiveSectionId,
  ]);
};
