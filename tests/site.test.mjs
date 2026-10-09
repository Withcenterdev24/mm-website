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
  assert.ok($('main img').length >= 3, 'Show actual gameplay alongside promotional art');
  for (const img of $('img').toArray()) {
    const src = $(img).attr('src');
    assert.ok(src && existsSync(join(dist, src)), `Missing image: ${src}`);
    assert.ok($(img).attr('width') && $(img).attr('height'), 'Images reserve their layout space');
    assert.notEqual($(img).attr('alt'), undefined);
  }
});
test('missing_store_urls_have_no_download_links', () => {
  const $ = page();
  assert.equal($('a[href=""], a[href="#"]').length, 0);
  assert.equal($('a[href*="play.google.com"], a[href*="apps.apple.com"]').length, 0);
  assert.equal($('[data-platform]').length, 2);
  assert.equal($('[data-platform] a').length, 0);
});
test('support_contact_and_controls_are_accessible_without_scripts', () => {
  const $ = page('support');
  assert.ok($('main a[href="mailto:thruthesky@gmail.com"]').length, 'Support email must be actionable');
  assert.ok($('main table').length, 'Keyboard controls must be readable');
  assert.ok($('main #training').length, 'Training help must be directly reachable');
  assert.ok($('main #progress').length, 'Local save limitations must be explained');
  assert.ok($('main').text().includes('ATTRACT'));
  assert.ok($('main').text().includes('REPULSE'));
});
