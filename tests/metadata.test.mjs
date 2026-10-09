import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { load } from 'cheerio';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const astroPackage = JSON.parse(
  readFileSync(join(root, 'node_modules/astro/package.json'), 'utf8'),
);
const astro = join(root, 'node_modules/astro', astroPackage.bin.astro);
function build(envValues) {
  mkdirSync(join(root, '.astro'), { recursive: true });
  const dir = mkdtempSync(join(root, '.astro', 'metadata-test-'));
  const env = { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' };
  for (const key of [
    'SITE_URL',
    'VERCEL_PROJECT_PRODUCTION_URL',
    'PUBLIC_ANDROID_URL',
    'PUBLIC_IOS_URL',
  ])
    delete env[key];
  Object.assign(env, envValues);
  try {
    execFileSync(process.execPath, [astro, 'build', '--outDir', dir], {
      cwd: root,
      env,
      stdio: 'pipe',
      timeout: 120000,
    });
    const pages = ['', 'support/', 'privacy/'].map((route) =>
      load(readFileSync(join(dir, route, 'index.html'), 'utf8')),
    );
    return {
      pages,
      robots: readFileSync(join(dir, 'robots.txt'), 'utf8'),
      sitemap: readFileSync(join(dir, 'sitemap.xml'), 'utf8'),
    };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
test('metadata_respects_configured_origin', { timeout: 180000 }, () => {
  const result = build({
    SITE_URL: 'https://magnet.example/',
    PUBLIC_ANDROID_URL:
      'https://play.google.com/store/apps/details?id=com.withcenter.magnetmayhem',
    PUBLIC_IOS_URL: 'https://apps.apple.com/app/id123456789',
  });
  assert.equal(
    result.pages[0]('[data-platform=Android] a').attr('href'),
    'https://play.google.com/store/apps/details?id=com.withcenter.magnetmayhem',
  );
  assert.equal(
    result.pages[0]('[data-platform="iPhone & iPad"] a').attr('href'),
    'https://apps.apple.com/app/id123456789',
  );
  const expected = [
    'https://magnet.example/',
    'https://magnet.example/support/',
    'https://magnet.example/privacy/',
  ];
  result.pages.forEach(($, i) => {
    assert.equal($('link[rel="canonical"]').attr('href'), expected[i]);
    assert.equal($('meta[property="og:url"]').attr('content'), expected[i]);
    assert.equal(
      $('meta[property="og:image"]').attr('content'),
      'https://magnet.example/social-preview.jpg',
    );
    assert.ok(result.sitemap.includes(`<loc>${expected[i]}</loc>`));
  });
  assert.ok(
    result.robots.includes('Sitemap: https://magnet.example/sitemap.xml'),
  );
  assert.ok(!result.sitemap.includes('/404'));
});
test(
  'unconfigured_origin_does_not_invent_public_metadata',
  { timeout: 180000 },
  () => {
    const result = build({});
    assert.equal(result.pages[0]('[data-platform] a').length, 0);
    assert.equal(result.pages[0]('[data-platform]').length, 2);
    for (const $ of result.pages)
      assert.equal(
        $(
          'link[rel="canonical"], meta[property="og:url"], meta[property="og:image"]',
        ).length,
        0,
      );
    assert.ok(!result.robots.includes('Sitemap:'));
    assert.ok(!result.sitemap.includes('<loc>'));
  },
);
test(
  'vercel_production_domain_is_used_instead_of_preview_domain',
  { timeout: 180000 },
  () => {
    const result = build({
      VERCEL_PROJECT_PRODUCTION_URL: 'magnet-production.vercel.app',
      VERCEL_URL: 'magnet-preview.vercel.app',
    });
    assert.equal(
      result.pages[0]('link[rel="canonical"]').attr('href'),
      'https://magnet-production.vercel.app/',
    );
    assert.ok(!result.sitemap.includes('magnet-preview'));
  },
);
