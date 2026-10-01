import React, { useEffect, useState } from "react";

/**
 * Its children once the cover is on screen: the rest of the app is asked
 * for only after the greeting has been shown, so its files never hold the
 * greeting up. The browser tells when the cover's largest element reached
 * the screen; one that cannot tell gets them after the next paint (a frame
 * callback runs just before a paint, a task queued from it just after), and
 * a page opening in a background tab, which paints nothing, after a second.
 */
const AfterCover = ({ children }: { children: React.ReactNode }) => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let timeout = 0;
    let frame = 0;
    let task = 0;
    let observer: PerformanceObserver | null = null;
    const stop = () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(task);
      window.clearTimeout(timeout);
    };
    const show = () => {
      stop();
      setShown(true);
    };
    timeout = window.setTimeout(show, 1000);
    if (
      PerformanceObserver.supportedEntryTypes?.includes(
        "largest-contentful-paint",
      )
    ) {
      observer = new PerformanceObserver((list) => {
        const entries = list.getEntries() as LargestContentfulPaint[];
        if (entries.some((entry) => entry.element?.closest("#cover"))) show();
      });
      observer.observe({ type: "largest-contentful-paint", buffered: true });
    } else {
      frame = requestAnimationFrame(() => {
        task = window.setTimeout(show);
      });
    }
    return stop;
  }, []);

  return shown ? children : null;
};

export default AfterCover;
