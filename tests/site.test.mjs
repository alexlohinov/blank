import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { preview } from 'vite';
import { legacyDestination, resolveSection } from '../src/legacy.ts';

let server;
let origin;
before(async () => {
  server = await preview({ preview: { host: '127.0.0.1', port: 0, strictPort: true, open: false } });
  origin = `http://127.0.0.1:${server.httpServer.address().port}`;
});
after(async () => {
  if (server) await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve()));
});

const routes = ['/', '/work/accord', '/work/pascal', '/writings/how-i-use-codex'];

test('every public route serves distinct metadata and semantic content without JavaScript', async () => {
  const titles = new Set();
  const descriptions = new Set();
  const images = new Set();
  for (const route of routes) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.equal([...html.matchAll(/<title>/g)].length, 1);
    titles.add(html.match(/<title>(.*?)<\/title>/)[1]);
    descriptions.add(html.match(/<meta name="description" content="([^"]+)"/)[1]);
    assert.ok(html.includes(`<link rel="canonical" href="https://lohinov.com${route}"`));
    assert.ok(html.includes(`<meta property="og:url" content="https://lohinov.com${route}"`));
    assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
    assert.equal([...html.matchAll(/<main[ >]/g)].length, 1);
    assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1);
    assert.ok(!html.includes('href="#/'), 'Legacy hash routes must not be emitted');
    if (route !== '/') {
      assert.ok(html.includes('<article '));
      assert.ok(html.includes('aria-label="On this page"'));
      for (const anchor of html.matchAll(/href="[^"#]+#([^"]+)"/g)) {
        if (!['selected-work', 'writings'].includes(anchor[1])) assert.ok(html.includes(`id="${anchor[1]}"`), anchor[1]);
      }
    }
    const imageUrl = new URL(html.match(/property="og:image" content="([^"]+)"/)[1]);
    images.add(imageUrl.pathname);
    assert.equal(imageUrl.origin, 'https://lohinov.com');
    const image = await fetch(origin + imageUrl.pathname);
    assert.equal(image.status, 200);
    assert.match(image.headers.get('content-type'), /image\/png/);
    const png = Buffer.from(await image.arrayBuffer());
    assert.equal(png.subarray(1, 4).toString(), 'PNG');
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
  }
  assert.equal(titles.size, routes.length);
  assert.equal(descriptions.size, routes.length);
  assert.equal(images.size, routes.length);
});

test('unknown URLs return the custom page with HTTP 404 and noindex', async () => {
  for (const route of ['/this-page-does-not-exist', '/work/missing', '/missing.png']) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 404);
    const html = await response.text();
    assert.ok(html.includes('This page took a wrong turn.'));
    assert.ok(html.includes('content="noindex, follow"'));
    assert.ok(!html.includes('rel="canonical"'));
    assert.ok(html.includes('href="/"'));
  }
});

test('crawler files list only canonical public pages', async () => {
  const sitemap = await (await fetch(origin + '/sitemap.xml')).text();
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), routes.map(route => 'https://lohinov.com' + route));
  assert.ok(!sitemap.includes('#'));
  assert.ok(!sitemap.includes('/404'));
  const robots = await (await fetch(origin + '/robots.txt')).text();
  assert.ok(robots.includes('User-agent: *\nAllow: /'));
  assert.ok(robots.includes('Sitemap: https://lohinov.com/sitemap.xml'));
  const llm = await (await fetch(origin + '/llm.txt')).text();
  const llms = await (await fetch(origin + '/llms.txt')).text();
  assert.equal(llm, llms);
  for (const route of routes) assert.ok(llms.includes(`https://lohinov.com${route}`));
  assert.ok(llms.includes('CRM designed for small companies and teams'));
  assert.ok(!llms.includes('concept case study'));
});

test('legacy links retain sections and cannot redirect to another host', () => {
  assert.equal(legacyDestination('#/work/accord'), '/work/accord');
  assert.equal(legacyDestination('#/writings/how-i-use-codex?section=codex-app'), '/writings/how-i-use-codex#codex-app');
  assert.equal(legacyDestination('#selected-work'), null);
  for (const [old, current] of Object.entries({ 'accord-overview': 'accord-problem', 'accord-challenge': 'accord-problem', 'accord-approach': 'accord-decisions', 'accord-exploration': 'accord-solution', 'accord-next': 'accord-impact' })) {
    assert.equal(resolveSection('/work/accord', old), current);
    assert.equal(legacyDestination(`#/work/accord?section=${old}`), `/work/accord#${current}`);
  }
  assert.equal(legacyDestination('#/missing'), '/404');
  for (const hash of ['#//example.com', '#/\\example.com', '#/\n/example.com']) assert.equal(legacyDestination(hash), '/404');
});

test('Accord serves the five-part CRM story and all six original images', async () => {
  const html = await (await fetch(origin + '/work/accord')).text();
  let previous = -1;
  for (const section of ['problem', 'reasoning', 'decisions', 'solution', 'impact']) {
    const position = html.indexOf(`<h2 id="accord-${section}"`);
    assert.ok(position > previous, section);
    previous = position;
  }
  assert.ok(html.includes('Linear'));
  assert.ok(html.includes('not a measured business result'));
  assert.ok(!html.includes('$48,250'));
  assert.ok(!html.includes('Test case study'));
  for (const file of ['cover', 'workspace', 'companies-light', 'companies-dark', 'settings-light', 'settings-dark']) {
    const path = `/images/accord/${file}.webp`;
    assert.ok(html.includes(`src="${path}"`));
    const response = await fetch(origin + path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /image\/webp/);
  }
});


test('Pascal serves its five-part design story and original images', async () => {
  const html = await (await fetch(origin + '/work/pascal')).text();
  let previous = -1;
  for (const section of ['problem', 'reasoning', 'decisions', 'solution', 'impact']) {
    const position = html.indexOf(`<h2 id="pascal-${section}"`);
    assert.ok(position > previous, section);
    previous = position;
  }
  assert.ok(html.includes('A Quiet Space to Think'));
  assert.ok(html.includes('Obsidian'));
  assert.ok(html.includes('demonstration content'));
  for (const file of ['editor-light', 'editor-dark', 'commands-light', 'commands-dark', 'formatting']) {
    const path = `/images/pascal/${file}.webp`;
    assert.ok(html.includes(`src="${path}"`));
    const response = await fetch(origin + path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /image\/webp/);
  }
  const home = await (await fetch(origin)).text();
  assert.ok(home.includes('href="/work/pascal"'));
  assert.match(home, /<span class="entry" aria-disabled="true">[^]*?Wren/);
});
