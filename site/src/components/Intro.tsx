import { profile } from '../content';
import { Boat } from './Scenery';
import { ContactInfo } from './ContactInfo';

export function Intro({
  works,
  onSwitch,
}: {
  works: boolean;
  onSwitch: () => void;
}) {
  return (
    <header
      className={`intro ${works ? 'intro--works' : 'intro--cv'}`}
      id="top"
    >
      <nav className="navigation" aria-label="Main navigation">
        <a
          className="home-link"
          href="#cv"
          onClick={(event) => {
            event.preventDefault();
            if (works) onSwitch();
            else window.scrollTo({ top: 0, behavior: 'instant' });
          }}
        >
          Home
        </a>
        <div className="nav-views">
          <button
            aria-current={!works ? 'page' : undefined}
            onClick={() => works && onSwitch()}
          >
            About me
          </button>
          <button
            aria-current={works ? 'page' : undefined}
            onClick={() => !works && onSwitch()}
          >
            Selected games
          </button>
        </div>
      </nav>
      <div className="intro-content">
        <div className="intro-text">
          <h1 tabIndex={-1}>{works ? 'Games' : profile.name}</h1>
          {!works && (
            <p className="academic-affiliation">
              {profile.role}
              <br />
              {profile.affiliation}
            </p>
          )}
          {works ? (
            <p className="intro-description">
              Independent games by me!
            </p>
          ) : (
            // This HTML is authored in the repository, never taken from user input.
            <div
              className="intro-description"
              dangerouslySetInnerHTML={{ __html: profile.bioHtml }}
            />
          )}
          {!works && <p className="intro-meta">{profile.location}</p>}
          {!works && <ContactInfo />}
        </div>
        {!works && (
          <figure className="portrait">
            <img
              src="./assets/avatar.jpg"
              alt={`Portrait of ${profile.name}`}
            />
            <figcaption>{profile.avatarCaption || profile.name}</figcaption>
          </figure>
        )}
      </div>
      <a className="dive-cue" href={works ? '#games' : '#background'}>
        <span>↓</span> {works ? 'View games' : 'View CV'}
      </a>
      {works && <Boat />}
    </header>
  );
}
