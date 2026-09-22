import { profile } from '../content';

/** Keep the address human-readable without adding a raw mailto link here. */
export function ContactInfo() {
  const email = profile.email.replace('@', ' [at] ').replaceAll('.', ' [dot] ');
  const accounts = [
    {
      platform: 'GitHub',
      icon: 'github',
      label: `@${profile.githubHandle}`,
      url: `https://github.com/${profile.githubHandle}`,
    },
    {
      platform: 'itch.io',
      icon: 'itch',
      label: `@${profile.itchHandle}`,
      url: `https://${profile.itchHandle}.itch.io`,
    },
    {
      platform: 'LinkedIn',
      icon: 'linkedin',
      label: 'LinkedIn',
      url: profile.linkedinUrl,
    },
  ];

  return (
    <ul className="intro-contacts" aria-label="Contact information">
      {accounts.map(({ platform, icon, label, url }) => (
        <li key={platform}>
          <a href={url} aria-label={`${platform}: ${label}`}>
            <img
              src={`./assets/contact/${icon}.svg`}
              alt=""
              width="18"
              height="18"
            />
            <span>{label}</span>
          </a>
        </li>
      ))}
      <li className="intro-email">
        <img
          src="./assets/contact/email.svg"
          alt="Email:"
          width="18"
          height="18"
        />
        <span>{email}</span>
      </li>
    </ul>
  );
}
