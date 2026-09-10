import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

// Render both initial routes without a browser, then verify local public assets.
const server = await createServer({ server: { middlewareMode: true } });
try {
  const { App } = await server.ssrLoadModule('/src/App.tsx');
  const { games, profile } = await server.ssrLoadModule('/src/content.ts');
  const { ScreenshotGallery } = await server.ssrLoadModule('/src/components/ScreenshotGallery.tsx');
  const slides = games.flatMap(game => game.screenshots).slice(0, 2);
  const singleGallery = renderToStaticMarkup(createElement(ScreenshotGallery, { screenshots: slides.slice(0, 1) }));
  assert.ok(!singleGallery.includes('gallery-controls'), 'Single screenshot has no slideshow controls');
  const gallery = renderToStaticMarkup(createElement(ScreenshotGallery, { screenshots: slides }));
  assert.equal((gallery.match(/class="gallery-slide/g) || []).length, slides.length, 'Gallery renders supplied screenshots');
  assert.equal((gallery.match(/class="gallery-slide is-active"/g) || []).length, 1, 'Only the first slide starts visible');
  assert.ok(gallery.includes('Next screenshot'), 'Multiple screenshots have a next control');
  assert.equal(renderToStaticMarkup(createElement(ScreenshotGallery, { screenshots: [] })), '', 'Empty galleries are omitted');

  for (const game of games) {
    for (const asset of [game.fishAsset, ...game.screenshots.map(screenshot => screenshot.asset)]) {
      assert.ok(existsSync(resolve('public/assets', asset)), `Missing game asset: ${asset}`);
    }
  }
  for (const [hash, heading] of [['#cv', profile.name], ['#works', 'Games']]) {
    globalThis.window = { location: { hash } };
    const html = renderToStaticMarkup(createElement(App));
    assert.ok(html.includes(heading), `${hash}: correct heading`);
    if (hash === '#cv') {
      for (const section of ['Education', 'Experience', 'Selected projects', 'Skills &amp; interests']) {
        assert.ok(html.includes(section), `CV includes ${section}`);
      }
    } else {
      assert.equal((html.match(/class="fish-art"/g) || []).length, games.length, 'Every fish has an illustration');
      assert.equal((html.match(/data-fish=/g) || []).length, games.length, 'All configured game fish');
      assert.equal((html.match(/aria-expanded="false"/g) || []).length, games.length, 'Fish start collapsed');
    }
    for (const [, asset] of html.matchAll(/(?:src|href)="\.\/([^"?]+)"/g)) {
      assert.ok(existsSync(resolve('public', asset)), `Missing asset: ${asset}`);
    }
  }
  const builtHtml = readFileSync('dist/index.html', 'utf8');
  for (const [, asset] of builtHtml.matchAll(/(?:src|href)="\.\/([^"?]+)"/g)) {
    assert.ok(existsSync(resolve('dist', asset)), `Missing build asset: ${asset}`);
  }
  assert.ok(!/(?:src|href)="\/(?!\/)/.test(builtHtml), 'Build uses project-relative assets');
  console.log('PASS: both views, CV sections, configured collapsed fish, public assets, and GitHub Pages build paths.');
} finally {
  delete globalThis.window;
  await server.close();
}
