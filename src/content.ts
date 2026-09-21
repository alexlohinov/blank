// Add destinations as new case studies, projects, and articles become available.
export const links: Record<string, string | undefined> = {
  linkedin: 'https://www.linkedin.com/in/alexlhv/',
  github: 'https://github.com/alexlohinov',
  x: 'https://x.com/alexlohinov',
  email: 'mailto:alex@lohinov.com',
};

export type Entry = { name: string; detail?: string; image?: string; href?: string };

export const sections: { id: string; title: string; entries: Entry[] }[] = [
  {
    id: 'selected-work',
    title: 'Selected Work',
    entries: [
      { name: 'Making Business Data Feel Simple', detail: 'Accord', href: '/work/accord' },
      { name: 'A Quiet Space to Think', detail: 'Pascal', href: '/work/pascal' },
    ],
  },
  {
    id: 'experience',
    title: 'Experience',
    entries: [
      { name: 'Koncepta Agency', detail: 'Digital product agency.', image: '/images/koncepta.png', href: 'https://www.konexta.agency/' },
      { name: 'OptiHint', detail: 'AI conversion optimization platform.', image: '/images/optihint.png', href: 'https://optihint.com/' },
    ],
  },
  {
    id: 'projects',
    title: 'Projects',
    entries: [{ name: 'Wren', detail: 'Coming Soon', image: '/images/wren.png' }],
  },
  {
    id: 'writings',
    title: 'Writing',
    entries: [{ name: 'How I Use Codex', detail: '10 min read', href: '/writings/how-i-use-codex' }],
  },
];
