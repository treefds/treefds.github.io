import { useEffect, useRef, useState } from 'react';
import { Intro } from './components/Intro';
import { Resume } from './components/Resume';
import { Games } from './components/Games';

type View = 'cv' | 'works';
const viewFromHash = (): View =>
  window.location.hash === '#works' || window.location.hash === '#games'
    ? 'works'
    : 'cv';
const delay = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export function App() {
  const [view, setView] = useState<View>(viewFromHash);
  const [phase, setPhase] = useState<'idle' | 'leaving' | 'entering'>('idle');
  const changing = useRef(false);
  const siteRef = useRef<HTMLElement>(null);
  const [leavingWorks, setLeavingWorks] = useState(false);

  const changeView = async (next: View, updateHistory = true) => {
    if (changing.current || next === view) return;
    changing.current = true;
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (view === 'works') {
      setLeavingWorks(true);
      if (!reduced) await delay(480);
    }
    window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' });
    if (!reduced) {
      // Wait for the return to the surface, bounded for interrupted scrolling.
      const start = performance.now();
      while (window.scrollY > 2 && performance.now() - start < 1200)
        await delay(30);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    setPhase('leaving');
    if (!reduced) await delay(320);
    setView(next);
    setLeavingWorks(false);
    if (updateHistory) window.history.pushState(null, '', `#${next}`);
    setPhase('entering');
  };

  useEffect(() => {
    if (phase !== 'entering') return;
    let cancelled = false;
    // Wait for the committed page's fade, boat, and fish animations. Removing
    // the entrance class early would cancel their transforms and cause a snap.
    const animations = siteRef.current?.getAnimations({ subtree: true }) ?? [];
    void Promise.all(
      animations.map((animation) => animation.finished.catch(() => {})),
    ).then(() => {
      if (cancelled) return;
      setPhase('idle');
      changing.current = false;
      siteRef.current
        ?.querySelector<HTMLHeadingElement>('h1')
        ?.focus({ preventScroll: true });
    });
    return () => {
      cancelled = true;
    };
  }, [phase]);

  useEffect(() => {
    const onHistory = () => {
      void changeView(viewFromHash(), false);
    };
    window.addEventListener('popstate', onHistory);
    return () => window.removeEventListener('popstate', onHistory);
  });

  return (
    <>
      <a className="skip-link" href={view === 'cv' ? '#background' : '#games'}>
        Skip to content
      </a>
      <main
        ref={siteRef}
        className={`site view-${view} phase-${phase}`}
        aria-busy={phase !== 'idle'}
      >
        <Intro
          works={view === 'works'}
          onSwitch={() => void changeView(view === 'cv' ? 'works' : 'cv')}
        />
        {view === 'cv' ? <Resume /> : <Games exiting={leavingWorks} />}
      </main>
      <button
        className="view-switch"
        onClick={() => void changeView(view === 'cv' ? 'works' : 'cv')}
        disabled={phase !== 'idle'}
        aria-label={view === 'cv' ? 'Switch to games' : 'Switch to CV'}
      >
        <span className="switch-icon" aria-hidden="true">
          {view === 'cv' ? '↝' : '≡'}
        </span>
        <span>{view === 'cv' ? 'View games' : 'View CV'}</span>
        <span aria-hidden="true">↗</span>
      </button>
      <output className="sr-only" aria-live="polite">
        {view === 'cv'
          ? 'CV and academic background'
          : 'Independent game showcase'}
      </output>
    </>
  );
}
