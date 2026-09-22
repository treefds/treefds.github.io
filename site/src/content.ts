export const profile = {
  name: 'Runkun Chen',
  role: 'MS in Information Networking',
  affiliation: 'Carnegie Mellon University',
  bioHtml: `
    <p>Hi, I'm Runkun Chen. I am a second-year Master's student at <a href="https://www.cmu.edu/ini/">Information Networking Institute</a>, CMU. Previously, I received my Bachelor's degree in Artificial Intelligence at Shanghai Jiao Tong University.</p>
    <p>I am interested in exploring human creativity through both engineering and research. My current research is focused on applying ML/AI to creative processes, with a focus on <strong>agentic game development</strong>.I am also an indie game developer :-) </p>
  `,
  location: 'Pittsburgh, PA',
  email: 'runkunc[AT]andrew[]cmu[]edu',
  githubHandle: 'treefds',
  itchHandle: 'zenkfds',
  // Replace with your personal LinkedIn profile URL.
  linkedinUrl: 'https://linkedin.com/in/rkchen',
  // An empty caption falls back to your name.
  avatarCaption: 'Some photo I took',
};

export interface ResumeEntry {
  date: string;
  title: string;
  organization: string;
  description: string;
  url?: string;
  links?: { label: string; url: string }[];
  descriptionHtml?: string;
}

export interface ResumeSection {
  title: string;
  entries: ResumeEntry[];
}

export const resume: ResumeSection[] = [
  {
    title: 'Education',
    entries: [
      {
        date: '2025 — PRESENT',
        title: 'MS in Information Networking',
        organization: 'Carnegie Mellon University',
        description:
          "Master's program in computer systems and networks, with a concentration on machine learning. Expected graduation in May 2027.",
      },
      {
        date: '2021 — 2025',
        title: 'B.Eng. in Artificial Intelligence',
        organization: 'Shanghai Jiao Tong University',
        description:
          'Undergraduate program focused on machine learning/artificial intelligence. Worked on research in automated MLE via LLM agents.',
      },
    ],
  },
  {
    title: 'Experience',
    entries: [
      {
        date: 'Jan 2025 — Jul 2025',
        title: 'Undergraduate Research Intern',
        organization: 'SJTU · MARL Lab',
        description:
          'Researched multi-agent systems and RL algorithms with LLMs for automated machine learning engineering on MLE-Bench. Co-authored ML-Master, and collaborated with companies to develop backends for an internal agentic platform.',
      },
      {
        date: 'Apr 2024 — Dec 2024',
        title: 'Research Intern',
        organization: '01.AI · Digital Human Department',
        description:
          'Studies generation of facial features and expressions in real-time digital human videos. Developed in-house pipelines for facial generation, used in commercial production.',
      },
    ],
  },
  {
    title: 'Selected projects',
    entries: [
      {
        date: '2026',
        title: 'GameDevBench',
        organization: 'Research paper · accepted by ICML 2026',
        description:
          'A benchmark for evaluating LLM agents on game development tasks in a modern game engine, with 333 tasks. Co-author.',
        links: [
          { label: 'Paper', url: 'https://arxiv.org/abs/2602.11103' },
          { label: 'Code', url: 'https://github.com/waynchi/gamedevbench' },
          { label: 'Page', url: 'https://waynechi.com/gamedevbench/' },
        ],
      },
      {
        date: '2025',
        title: 'ML-Master',
        organization: 'Technical report',
        description:
          'An LLM agent for ML-engineering tasks enhanced by MCTS-inspired tree-of-thought and inference-time augmentation. Co-author.',
        links: [
          { label: 'Paper', url: 'https://arxiv.org/abs/2506.16499' },
          {
            label: 'Code',
            url: 'https://github.com/sjtu-sai-agents/ML-Master/',
          },
          {
            label: 'Page',
            url: 'https://sjtu-sai-agents.github.io/ML-Master/',
          },
        ],
      },
    ],
  },
];

export interface Screenshot {
  asset: string;
  alt: string;
}

export interface Game {
  id: string;
  number: string;
  title: string;
  genre: string;
  year: string;
  description: string;
  palette: 'gold' | 'pink' | 'mint';
  fishAsset: string;
  fishGeometry: {
    width: number;
    height: number;
    mouthX: number;
    mouthY: number;
    facing: 'left' | 'right';
  };
  screenshots: Screenshot[];
  links: { label: string; url: string; icon: 'play' | 'code' }[];
}

// Example destinations, intentionally pointing to real platform landing pages.
export const games: Game[] = [
  {
    id: 'ld55',
    number: '01',
    title: "A Wizard's Spring Hike",
    genre: 'Developed for Ludam Dare Jam 55',
    year: '2024',
    palette: 'mint',
    fishAsset: 'fish/ld55-fish.png',
    fishGeometry: {
      width: 1120,
      height: 840,
      mouthX: 963,
      mouthY: 339,
      facing: 'right',
    },

    description:
      'A Sokoban puzzle game created for LD Jam 55 (themed "Summon"). Summon golems with the raw materials around, command them to push away obstacles, and find your way home.',
    screenshots: [
      {
        asset: 'screenshots/ld55a.png',
        alt: 'Screenshot',
      },
    ],
    links: [
      {
        label: 'Visit itch.io',
        url: 'https://zenkfds.itch.io/spring-hike',
        icon: 'play',
      },
      {
        label: 'Visit GitHub',
        url: 'https://github.com/treefds/WizardExpedition',
        icon: 'code',
      },
    ],
  },
  {
    id: 'gmtk25',
    number: '02',
    title: 'Loopbeat Café',
    genre: 'Developed for GMTK Jam 2025',
    year: '2025',
    palette: 'pink',
    fishAsset: 'fish/gmtk25-fish.png',
    fishGeometry: {
      width: 1120,
      height: 840,
      mouthX: 176,
      mouthY: 382,
      facing: 'left',
    },

    description:
      'A programming(?) puzzle game created for GMTK Jam 2025. Write loops and rhythms to streamline a coffee shop in action. Ranked Top 1% (out of 9500+) in Audio and Creativity!',
    screenshots: [
      {
        asset: 'screenshots/gmtk25a.gif',
        alt: 'GMTK 2025',
      },
    ],
    links: [
      {
        label: 'Visit itch.io',
        url: 'https://zenkfds.itch.io/cafe',
        icon: 'play',
      },
    ],
  },
  {
    id: 'others',
    number: '03',
    title: 'Other games',
    genre: 'on itch.io',
    year: '2024–2026',
    palette: 'gold',
    fishAsset: 'fish/puffer-fish.png',
    fishGeometry: {
      width: 1120,
      height: 840,
      mouthX: 863,
      mouthY: 339,
      facing: 'right',
    },

    description: 'You can find my many other games on itch.io!',
    screenshots: [
      {
        asset: 'screenshots/ld56.png',
        alt: 'Illustrated game concept: a cheerful sprout among terraced green gardens.',
      },
      {
        asset: 'screenshots/gmtk26a.png',
        alt: 'GMTK 2026',
      },
    ],
    links: [
      { label: 'Visit itch.io', url: 'https://zenkfds.itch.io', icon: 'play' },
    ],
  },
];
