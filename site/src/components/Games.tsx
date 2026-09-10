import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Fish } from './Fish';
import { ScreenshotGallery } from './ScreenshotGallery';
import { useAnimatedHeight } from '../hooks/useAnimatedHeight';
import { games, type Game } from '../content';
import { useFishingLine } from '../hooks/useFishingLine';
import { Seabed, Wave } from './Scenery';

function ProjectBubbles({ game, closing }: { game: Game; closing: boolean }) {
  return (
    <section
      className={`project-bubbles ${closing ? 'is-popping' : ''}`}
      id={`details-${game.id}`}
      aria-label={`${game.title} details`}
    >
      <span className="little-bubble little-bubble--one" />
      <span className="little-bubble little-bubble--two" />
      <div className="description-bubble bubble-surface">
        <p className="eyebrow">{game.year} / INDEPENDENT GAME</p>
        <h3>{game.title}</h3>
        <p>{game.description}</p>
      </div>
      <ScreenshotGallery screenshots={game.screenshots} />
      <div className="link-bubbles">
        {game.links.map((link) => (
          <a
            className="bubble-surface"
            key={link.icon}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${link.label} (example link, opens in a new tab)`}
          >
            <span aria-hidden="true">{link.icon === 'play' ? '▶' : '</>'}</span>
            <span>{link.icon === 'play' ? 'itch.io' : 'Code'}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function GameRow({
  game,
  selected,
  children,
}: {
  game: Game;
  selected: boolean;
  children: ReactNode;
}) {
  const { contentRef, height } = useAnimatedHeight();
  return (
    <article
      className={`game-row ${selected ? 'is-selected' : ''}`}
      data-fish={game.id}
      style={{ height }}
    >
      <div className="game-row-content" ref={contentRef}>
        {children}
      </div>
    </article>
  );
}

export function Games({ exiting = false }: { exiting?: boolean }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { oceanRef, lineRef, hookRef } = useFishingLine(
    closing || exiting ? null : activeId,
  );
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const selectFish = (id: string | null) => {
    if (exiting) return;
    if (timer.current) clearTimeout(timer.current);
    const nextId = activeId === id ? null : id;
    if (
      activeId &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setClosing(true);
      timer.current = setTimeout(() => {
        setActiveId(nextId);
        setClosing(false);
      }, 180);
    } else {
      setActiveId(nextId);
      setClosing(false);
    }
  };

  return (
    <section
      className="ocean games-ocean"
      id="games"
      ref={oceanRef}
      aria-label="Independent games"
    >
      <Wave />
      <svg className="fishing-line" aria-hidden="true">
        <path ref={lineRef} />
        <g ref={hookRef}>
          <path d="M0 0v12c0 16-21 16-21 2v-5l6 5" />
        </g>
      </svg>
      <div className="games-content">
        <div className="section-intro">
          <p></p>
        </div>
        {games.map((game) => (
          <GameRow key={game.id} game={game} selected={activeId === game.id}>
            <div className="fish-group">
              <button
                className={`fish fish--${game.palette}`}
                aria-expanded={activeId === game.id}
                aria-controls={
                  activeId === game.id ? `details-${game.id}` : undefined
                }
                aria-label={`${activeId === game.id ? 'Release' : 'Explore'} ${game.title}`}
                onClick={() => selectFish(game.id)}
              >
                <Fish game={game} />
              </button>
              <div className="fish-caption">
                <span className="catch-number">{game.number}</span>
                <div>
                  <h2>{game.title}</h2>
                  <p>{game.genre}</p>
                </div>
              </div>
            </div>
            {activeId === game.id && (
              <ProjectBubbles game={game} closing={closing || exiting} />
            )}
          </GameRow>
        ))}
      </div>
      <Seabed playful />
    </section>
  );
}
