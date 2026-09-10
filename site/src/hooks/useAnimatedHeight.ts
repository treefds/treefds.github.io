import { useLayoutEffect, useRef, useState } from 'react';

/** Measure natural content so CSS can interpolate both growth and collapse. */
export function useAnimatedHeight() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const measure = () => setHeight(content.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return { contentRef, height };
}
