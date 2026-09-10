import { useEffect, useRef } from 'react';

/** Keep the line centered and bring the selected fish's mouth to the hook tip. */
export function useFishingLine(activeId: string | null) {
  const oceanRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const hookRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const ocean = oceanRef.current;
      if (!ocean || !lineRef.current || !hookRef.current) return;
      const bounds = ocean.getBoundingClientRect();
      const centerX = bounds.width / 2;
      let hookY = Math.min(
        bounds.height - 280,
        Math.max(140, -bounds.top + window.innerHeight * 0.55),
      );
      let direction = 1;

      for (const row of ocean.querySelectorAll<HTMLElement>('[data-fish]')) {
        const button = row.querySelector<HTMLButtonElement>('.fish');
        const group = row.querySelector<HTMLElement>('.fish-group');
        if (!button || !group) continue;
        if (row.dataset.fish !== activeId) {
          button.style.setProperty('--catch-offset', '0px');
          continue;
        }

        const illustration =
          button.querySelector<HTMLElement>('.fish-illustration');
        if (!illustration) continue;
        const reversed = illustration.dataset.facing === 'left';
        direction = reversed ? -1 : 1;
        const origin = group.getBoundingClientRect();
        // Read the stationary group, not the animated button, to avoid feedback.
        // Normalized mouth coordinates come from each asset’s original dimensions.
        const mouthX =
          origin.left -
          bounds.left +
          button.offsetLeft +
          button.offsetWidth * Number(illustration.dataset.mouthX);
        const mouthY =
          origin.top -
          bounds.top +
          button.offsetTop +
          button.offsetHeight * Number(illustration.dataset.mouthY);
        const tipX = centerX - 21 * direction;
        button.style.setProperty('--catch-offset', `${tipX - mouthX}px`);
        // The hook's exposed tip is (-21, 9), mirrored for a left-facing fish.
        hookY = mouthY - 9;
      }

      lineRef.current.setAttribute('d', `M ${centerX} 0 V ${hookY}`);
      hookRef.current.setAttribute(
        'transform',
        `translate(${centerX}, ${hookY}) scale(${direction}, 1)`,
      );
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    if (oceanRef.current) observer.observe(oceanRef.current);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [activeId]);

  return { oceanRef, lineRef, hookRef };
}
