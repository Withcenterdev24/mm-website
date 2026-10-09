import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
export function page(route = '') {
  const path = join(dist, route, 'index.html');
  assert.ok(existsSync(path), `Missing built page: /${route}`);
  return require('cheerio').load(readFileSync(path, 'utf8'));
}
test('homepage_is_static_and_has_valid_assets', () => {
  const $ = page();
  assert.equal($('main').length, 1);
  assert.ok($('main h1').text().trim());
  assert.ok(
    $('main img').length >= 3,
    'Show actual gameplay alongside promotional art',
  );
  for (const img of $('img').toArray()) {
    const src = $(img).attr('src');
    assert.ok(src && existsSync(join(dist, src)), `Missing image: ${src}`);
    assert.ok(
      $(img).attr('width') && $(img).attr('height'),
      'Images reserve their layout space',
    );
    assert.notEqual($(img).attr('alt'), undefined);
  }
});
test('store_availability_has_no_placeholder_links', () => {
  const $ = page();
  assert.equal($('a[href=""], a[href="#"]').length, 0);
  assert.equal($('[data-platform]').length, 2);
  for (const link of $('[data-platform] a').toArray())
    assert.ok($(link).attr('href').startsWith('https://'));
});
test('support_contact_and_controls_are_accessible_without_scripts', () => {
  const $ = page('support');
  assert.ok(
    $('main a[href="mailto:thruthesky@gmail.com"]').length,
    'Support email must be actionable',
  );
  assert.ok($('main table').length, 'Keyboard controls must be readable');
  assert.ok(
    $('main #training').length,
    'Training help must be directly reachable',
  );
  assert.ok(
    $('main #progress').length,
    'Local save limitations must be explained',
  );
  assert.ok($('main').text().includes('ATTRACT'));
  assert.ok($('main').text().includes('REPULSE'));
});
test('privacy_languages_and_game_scope_are_preserved', () => {
  const $ = page('privacy');
  assert.equal($('#english').attr('lang'), 'en');
  assert.equal($('#korean').attr('lang'), 'ko');
  assert.ok($('#english').text().includes('October 7, 2026'));
  assert.ok($('#korean').text().includes('2026년 10월 7일'));
  assert.ok($('#english').text().includes('thruthesky@gmail.com'));
  assert.ok($('#korean').text().includes('thruthesky@gmail.com'));
  assert.ok(
    $('#website').length,
    'Website handling must be distinct from the offline game',
  );
  assert.ok(
    $('#website a[href="https://vercel.com/legal/privacy-notice"]').length,
  );
  assert.equal(
    $('main h1').length,
    1,
    'Imported policy headings must keep a logical document outline',
  );
});
test('internal_links_fragments_and_assets_resolve', () => {
  for (const route of ['', 'support', 'privacy']) {
    const $ = page(route);
    for (const el of $('a[href], img[src], link[href]').toArray()) {
      const value = $(el).attr('href') || $(el).attr('src');
      if (!value || /^(https?:|mailto:|tel:)/.test(value)) continue;
      const url = new URL(
        value,
        `https://test.example/${route ? route + '/' : ''}`,
      );
      const destination = url.pathname.endsWith('/')
        ? join(dist, url.pathname, 'index.html')
        : join(dist, url.pathname);
      assert.ok(
        existsSync(destination),
        `Broken ${route || 'home'} reference: ${value}`,
      );
      if (url.hash) {
        const target = require('cheerio').load(
          readFileSync(destination, 'utf8'),
        );
        assert.ok(
          target(`[id="${decodeURIComponent(url.hash.slice(1))}"]`).length,
          `Broken fragment: ${value}`,
        );
      }
    }
  }
  const missing = join(dist, '404.html');
  assert.ok(existsSync(missing), 'A useful 404 page must be built');
  const $ = require('cheerio').load(readFileSync(missing, 'utf8'));
  assert.ok(
    $('main a[href="/"]').length,
    'Missing-page visitors can return home',
  );
});
