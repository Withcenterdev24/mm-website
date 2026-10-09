import { test, expect } from '@playwright/test';
const routes = ['/', '/support/', '/privacy/'];
const sizes = [
  { width: 360, height: 800 },
  { width: 768, height: 1024 },
  { width: 1440, height: 1000 },
];
for (const viewport of sizes) {
  for (const route of routes) {
    test(`${route} remains readable and navigable at ${viewport.width}px without JavaScript`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize(viewport);
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
      ).toBe(true);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await page.keyboard.press('Tab');
      await expect(
        page.getByRole('link', { name: 'Skip to content' }),
      ).toBeFocused();
      await expect(
        page.getByRole('link', { name: 'Skip to content' }),
      ).toBeVisible();
      await page.keyboard.press('Enter');
      await expect(page.locator('main')).toBeFocused();
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate(
              (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
            ),
          )
          .toBe(true);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: testInfo.outputPath('page.png'),
        fullPage: true,
      });
      await page
        .getByRole('link', { name: 'Support', exact: true })
        .first()
        .click();
      await expect(page).toHaveURL(/\/support\/$/);
      await expect(
        page.locator('main a[href="mailto:thruthesky@gmail.com"]'),
      ).toBeVisible();
      await page.getByRole('link', { name: 'Privacy', exact: true }).click();
      await expect(page).toHaveURL(/\/privacy\/$/);
      await page.getByRole('link', { name: '한국어', exact: true }).click();
      await expect(page).toHaveURL(/#korean$/);
      await expect(page.locator('#korean')).toBeInViewport();
      await page
        .getByRole('link', { name: 'Website & support', exact: true })
        .click();
      await expect(page.locator('#website')).toBeInViewport();
    });
  }
}
test('unknown paths provide a useful 404 and a working return home', async ({
  page,
}) => {
  const response = await page.goto('/this-page-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Off the edge',
  );
  await page.getByRole('link', { name: 'Back to the arena' }).click();
  await expect(page).toHaveURL('http://127.0.0.1:4322/');
});
