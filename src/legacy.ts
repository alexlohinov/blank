// Old shared links remain usable after migrating away from hash routing.
const accordSections: Record<string, string> = {
  'accord-overview': 'accord-problem',
  'accord-challenge': 'accord-problem',
  'accord-approach': 'accord-decisions',
  'accord-exploration': 'accord-solution',
  'accord-next': 'accord-impact',
};

export function resolveSection(path: string, section: string) {
  return path === '/work/accord' ? accordSections[section] ?? section : section;
}

export function legacyDestination(hash: string) {
  if (!hash.startsWith('#/')) return null;
  const [path, query = ''] = hash.slice(1).split('?');
  if (!['/', '/work/pascal', '/work/accord', '/writings/how-i-use-codex'].includes(path)) return '/404';
  const section = new URLSearchParams(query).get('section');
  return path + (section ? `#${encodeURIComponent(resolveSection(path, section))}` : '');
}
