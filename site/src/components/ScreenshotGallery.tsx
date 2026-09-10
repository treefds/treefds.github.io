import { useCallback, useEffect, useState } from 'react';
import type { Screenshot } from '../content';

const SLIDE_INTERVAL_MS = 5000;

export function ScreenshotGallery({
  screenshots,
}: {
  screenshots: Screenshot[];
}) {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [ready, setReady] = useState<Set<number>>(() => new Set());
  const multiple = screenshots.length > 1;

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(motion.matches);
    const updateVisibility = () => setHidden(document.hidden);

    updateMotion();
    updateVisibility();

    motion.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      motion.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  // Keep the current image visible until another image has loaded successfully.
  const advance = useCallback(() => {
    setActive((current) => {
      for (let step = 1; step < screenshots.length; step++) {
        const next = (current + step) % screenshots.length;
        if (ready.has(next)) return next;
      }
      return current;
    });
  }, [ready, screenshots.length]);

  useEffect(() => {
    if (!multiple || reducedMotion || hidden || ready.size < 2) return;
    const timer = window.setInterval(advance, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [multiple, reducedMotion, hidden, ready.size, advance]);

  if (screenshots.length === 0) return null;

  return (
    <figure
      className="screenshot-bubble bubble-surface"
      aria-label="Game screenshots"
    >
      <div className="screenshot-gallery">
        {screenshots.map((screenshot, index) => (
          <img
            key={screenshot.asset}
            className={`gallery-slide ${active === index ? 'is-active' : ''}`}
            src={`./assets/${screenshot.asset}`}
            alt={screenshot.alt}
            aria-hidden={active !== index}
            onLoad={() => setReady((previous) => new Set(previous).add(index))}
          />
        ))}
        {multiple && (
          <div className="gallery-controls">
            <button
              type="button"
              onClick={advance}
              aria-label="Next screenshot"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </figure>
  );
}
