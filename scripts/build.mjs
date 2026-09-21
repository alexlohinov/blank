import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

await build();
await build({ build: { ssr: 'src/entry-server.tsx', outDir: '.prerender', copyPublicDir: false } });

const { render, pages, notFoundPage, siteOrigin, replaceMetadata, escapeHtml } = await import(pathToFileURL(resolve('.prerender/entry-server.js')).href);
const template = await readFile('dist/index.html', 'utf8');

for (const page of [...pages, notFoundPage]) {
  const destination = page.path === '/' ? 'dist/index.html' : `dist${page.path}.html`;
  const html = replaceMetadata(template, page).replace('<div id="root"></div>', `<div id="root">${render(page.path)}</div>`);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html);
}

await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url><loc>${escapeHtml(new URL(page.path, siteOrigin).href)}</loc></url>`).join('\n')}
</urlset>
`);

await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`);

const llms = `# Alex Lohinov

> Product designer based in Lithuania, working on B2B SaaS, mobile apps, websites, design systems, and interactive prototypes.

This is Alex Lohinov's personal portfolio and writing website. Accord is a modern CRM designed for small companies and teams. Its case study covers the problem, reasoning, design decisions, solution, and design outcomes. No measured business results are claimed; figures in interface screenshots are display content, not evidence of impact.

Pascal is a local note-taking app design focused on writing without visual distractions. Its case study describes interface decisions and intended benefits, not a released implementation or measured outcomes. Research notes shown in screenshots are demonstration content.

## Pages

${pages.map(page => `- [${page.title}](${new URL(page.path, siteOrigin).href}): ${page.description}`).join('\n')}

## Contact

- [Email Alex](mailto:alex@lohinov.com)
- [LinkedIn](https://www.linkedin.com/in/alexlhv/)
- [GitHub](https://github.com/alexlohinov)

## Index

- [Sitemap](${siteOrigin}/sitemap.xml)
`;
await Promise.all(['llm.txt', 'llms.txt'].map(name => writeFile(`dist/${name}`, llms)));
console.log(`Prerendered ${pages.length} pages and the 404 page; generated robots.txt, llm.txt, llms.txt, and sitemap.xml.`);
