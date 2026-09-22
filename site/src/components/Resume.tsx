import { resume } from '../content';
import { Seabed, Wave } from './Scenery';

export function Resume() {
  return (
    <section
      className="ocean cv-ocean"
      id="background"
      aria-label="Academic background"
    >
      <Wave />
      <div className="resume-content">
        {resume.map((section, index) => (
          <section className="resume-section" key={section.title}>
            <div className="resume-heading">
              <span className="section-number">0{index + 1}</span>
              <h2>{section.title}</h2>
            </div>
            <div className="resume-entries">
              {section.entries.map((entry) => (
                <article className="resume-entry" key={entry.title}>
                  <p className="entry-date">{entry.date}</p>
                  <h3>
                    {entry.url ? (
                      <a href={entry.url}>{entry.title}</a>
                    ) : (
                      entry.title
                    )}
                  </h3>
                  <p className="organization">{entry.organization}</p>
                  {entry.descriptionHtml ? (
                    // Like the bio, this HTML is authored locally in content.ts.
                    <div
                      className="entry-description"
                      dangerouslySetInnerHTML={{
                        __html: entry.descriptionHtml,
                      }}
                    />
                  ) : (
                    <p className="entry-description">{entry.description}</p>
                  )}
                  {!!entry.links?.length && (
                    <ul
                      className="entry-links"
                      aria-label={`${entry.title} resources`}
                    >
                      {entry.links.map((link) => (
                        <li key={link.url}>
                          <a href={link.url}>{link.label}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
        <section className="resume-section skills-section">
          <div className="resume-heading">
            <span className="section-number">04</span>
            <h2>Skills & interests</h2>
          </div>
          <div className="resume-entries">
            <h3>Languages & Tools</h3>
            <p className="skill-list">
              Python · C++ · Go · JavaScript · SQL
              <br />
              PyTorch · Django · Godot · Unity · LaTeX
              <br />
              Proficient in Mandarin Chinese and English
            </p>
            <h3>Interests</h3>
            <p className="entry-description">
              ML/AI for creative processes, linguistics and languages, computer
              graphics, game development, animation and films, and bird
              watching.
            </p>
          </div>
        </section>
      </div>
      <Seabed />
    </section>
  );
}
