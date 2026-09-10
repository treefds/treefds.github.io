import { profile } from '../content';

export function Wave() {
  return (
    <svg
      className="wave"
      viewBox="0 0 1440 42"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 22 Q30 0 60 22 T120 22 T180 22 T240 22 T300 22 T360 22 T420 22 T480 22 T540 22 T600 22 T660 22 T720 22 T780 22 T840 22 T900 22 T960 22 T1020 22 T1080 22 T1140 22 T1200 22 T1260 22 T1320 22 T1380 22 T1440 22 V42 H0Z" />
    </svg>
  );
}

export function Boat() {
  return (
    <div className="boat" aria-hidden="true">
      <img src="./assets/boat.png" alt="" />
    </div>
  );
}

export function Seabed({ playful = false }: { playful?: boolean }) {
  return (
    <footer className={`seabed ${playful ? 'seabed--playful' : ''}`}>
      {playful && (
        <div className="treasures">
          <a href="https://www.github.com/treefds" target="_blank" rel="noreferrer">
            <img src="./assets/icon-github.png" alt="" />
            <span>GitHub</span>
          </a>
          <a href="https://zenkfds.itch.io" target="_blank" rel="noreferrer">
            <img src="./assets/icon-itch.png" alt="" />
            <span>itch.io</span>
          </a>
        </div>
      )}
      <div className="footer-content">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
