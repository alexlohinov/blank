export const siteOrigin = 'https://lohinov.com';

export type Page = {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type: 'website' | 'article';
};

export const pages: Page[] = [
  {
    path: '/',
    title: 'Alex Lohinov — Product Designer',
    description: 'Product designer based in Lithuania. Explore my selected work, design systems, working prototypes, and notes on building digital products with Codex.',
    image: '/og/home.png',
    imageAlt: 'Alex Lohinov — Product Designer. Thoughtful interfaces. Working ideas.',
    type: 'website',
  },
  {
    path: '/work/accord',
    title: 'Accord — Making Business Data Feel Simple · Alex Lohinov',
    description: 'Designing Accord, a modern CRM for small teams. My approach to clear company records, intuitive navigation, and a consistent interface in light and dark themes.',
    image: '/og/accord.png',
    imageAlt: 'Accord — Making Business Data Feel Simple. A design case study by Alex Lohinov.',
    type: 'article',
  },
  {
    path: '/work/pascal',
    title: 'Pascal — A Quiet Space to Think · Alex Lohinov',
    description: 'Designing Pascal, a local note-taking app focused on writing without distractions. A calm editor, contextual tools, and consistent light and dark themes.',
    image: '/og/pascal.png',
    imageAlt: 'Pascal — A Quiet Space to Think. A design case study by Alex Lohinov.',
    type: 'article',
  },
  {
    path: '/writings/how-i-use-codex',
    title: 'How I Use Codex · Alex Lohinov',
    description: 'How I use Codex to build my personal website, create working prototypes, and develop a private, local app for media, links, documents, and notes.',
    image: '/og/how-i-use-codex.png',
    imageAlt: 'How I Use Codex — From design to something you can use. By Alex Lohinov.',
    type: 'article',
  },
];

export const notFoundPage: Page = {
  path: '/404',
  title: 'Page Not Found · Alex Lohinov',
  description: 'This page could not be found. Explore Alex Lohinov’s selected work, articles, or return to the homepage.',
  image: '/og/home.png',
  imageAlt: pages[0].imageAlt,
  type: 'website',
};

export function normalizePath(path: string) {
  return path.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/';
}

export function getPage(path: string) {
  return pages.find(page => page.path === normalizePath(path)) ?? notFoundPage;
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
}

export function renderMetadata(page: Page) {
  const isNotFound = page === notFoundPage;
  const url = new URL(page.path, siteOrigin).href;
  const image = new URL(page.image, siteOrigin).href;
  const meta = (key: string, value: string, attribute = 'name') => `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return [
    `<title>${escapeHtml(page.title)}</title>`,
    meta('description', page.description),
    meta('author', 'Alex Lohinov'),
    meta('robots', isNotFound ? 'noindex, follow' : 'index, follow, max-image-preview:large'),
    ...(!isNotFound ? [`<link rel="canonical" href="${escapeHtml(url)}" />`] : []),
    meta('og:site_name', 'Alex Lohinov', 'property'),
    meta('og:locale', 'en_US', 'property'),
    meta('og:type', page.type, 'property'),
    meta('og:title', page.title, 'property'),
    meta('og:description', page.description, 'property'),
    ...(!isNotFound ? [meta('og:url', url, 'property')] : []),
    meta('og:image', image, 'property'),
    meta('og:image:type', 'image/png', 'property'),
    meta('og:image:width', '1200', 'property'),
    meta('og:image:height', '630', 'property'),
    meta('og:image:alt', page.imageAlt, 'property'),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:creator', '@alexlohinov'),
    meta('twitter:title', page.title),
    meta('twitter:description', page.description),
    meta('twitter:image', image),
    meta('twitter:image:alt', page.imageAlt),
  ].join('\n    ');
}

export function replaceMetadata(html: string, page: Page) {
  return html.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n    ${renderMetadata(page)}\n    <!--seo:end-->`);
}
