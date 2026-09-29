import React from "react";
import { useAtomValue } from "jotai";
import { IntlProvider } from "react-intl";
import { localeAtom } from "../hooks/localeAtom";
import { canPrefetchHeavyAsset } from "../utils/connection";
import {
  getCachedMessages,
  loadMessages,
  preloadMessages,
  type AppMessages,
} from "./messages";

type BrowserWindowWithIdleCallback = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function I18nWrapper({ children }: React.PropsWithChildren) {
  const locale = useAtomValue(localeAtom);
  const [messages, setMessages] = React.useState<AppMessages | null>(() =>
    getCachedMessages(locale),
  );

  React.useEffect(() => {
    let active = true;
    const cached = getCachedMessages(locale);

    // Mirror the active locale onto <html data-locale> so non-react-intl
    // surfaces (e.g. the pre-React cover section) can react to language
    // changes without importing jotai or react-intl.
    document.documentElement.dataset.locale = locale;

    if (cached) {
      setMessages(cached);
      return () => {
        active = false;
      };
    }

    setMessages(null);
    void loadMessages(locale).then((loadedMessages) => {
      if (active) {
        setMessages(loadedMessages);
      }
    });

    return () => {
      active = false;
    };
  }, [locale]);

  React.useEffect(() => {
    if (!canPrefetchHeavyAsset()) {
      return;
    }

    const alternateLocale = locale === "fi" ? "en" : "fi";
    const windowWithIdleCallback = window as BrowserWindowWithIdleCallback;
    const root = document.documentElement;
    let idleCallbackHandle: number | null = null;
    let timeoutId: number | null = null;
    let fallbackId: number | null = null;
    let observer: MutationObserver | null = null;

    const prefetchAlternateLocale = () => {
      preloadMessages(alternateLocale);
    };

    // Not while the first film is arriving: the connection is the film's
    // until it plays (data-film-ready, set by FilmLayer), or 8 s at most
    // (a film that never plays: reduced motion, no video).
    const schedule = () => {
      if (idleCallbackHandle !== null || timeoutId !== null) return;
      observer?.disconnect();
      if (fallbackId !== null) window.clearTimeout(fallbackId);
      if (windowWithIdleCallback.requestIdleCallback) {
        idleCallbackHandle = windowWithIdleCallback.requestIdleCallback(
          prefetchAlternateLocale,
          { timeout: 3000 },
        );
      } else {
        timeoutId = window.setTimeout(prefetchAlternateLocale, 3000);
      }
    };

    if (root.dataset.filmReady === "true") {
      schedule();
    } else {
      observer = new MutationObserver(() => {
        if (root.dataset.filmReady === "true") schedule();
      });
      observer.observe(root, {
        attributes: true,
        attributeFilter: ["data-film-ready"],
      });
      fallbackId = window.setTimeout(schedule, 8000);
    }

    return () => {
      observer?.disconnect();
      if (fallbackId !== null) {
        window.clearTimeout(fallbackId);
      }
      if (
        idleCallbackHandle !== null &&
        windowWithIdleCallback.cancelIdleCallback
      ) {
        windowWithIdleCallback.cancelIdleCallback(idleCallbackHandle);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [locale]);

  if (!messages) {
    return null;
  }

  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      {children}
    </IntlProvider>
  );
}
