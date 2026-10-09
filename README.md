# Magnet Mayhem website

Static marketing website for Withcenter's Magnet Mayhem, built with Astro and ordinary CSS. Source: https://github.com/Withcenterdev24/mm-website. Hosting target: Vercel.

## Local development

Use Node 24 LTS (minimum 22.12).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321. `npm run check` checks Astro/TypeScript. `npm run build` creates `dist/`; `npm test` verifies that build's page and asset contracts. Run `npm run preview` to inspect production output.

## Content and configuration

The homepage is `/`. Shared publisher, contact, and optional Android/iOS store URLs live in `src/config/site.ts`. Set `PUBLIC_ANDROID_URL` and `PUBLIC_IOS_URL` to verified public listings at build time; without them the site displays coming-soon text. Do not set guessed store links. `SITE_URL` will configure the confirmed production origin.

Game artwork and actual screenshots are copied from the Magnet Mayhem Godot project. Images are optimized at build time with Astro. Nunito is bundled locally; the original font license accompanies it. No analytics, external font service, client UI framework, or backend is required.

Approved design and implementation plan are in `docs/superpowers/`. Progress is tracked in `task_done.md`.

## Support

`/support/` covers controls, training, saved progress, and troubleshooting. Contact uses a mailto link, not a hosted form. Gameplay guidance follows the Godot project README; update it when controls or save behavior change.

## Privacy

`/privacy/` publishes the game policy and a separate website/support notice in English and Korean, updated October 9, 2026. Source documents live in `src/content/privacy-*.md`; headings follow the page outline. The policy covers local saves and deletion, platform backups, hosting, Gmail support, retention criteria, privacy requests and children. The site adds no analytics or tracking scripts.

The privacy audit and remaining publication checks are in [docs/privacy-audit.md](docs/privacy-audit.md). Before treating the policy as finalized, confirm Withcenter's legal operator and country, adopt the stated support retention/deletion process, and verify hosting settings and the public policy URL. Keep the game's source policy, in-app access and store disclosures consistent with the published page.

## Verification and formatting

```sh
npm run check
npm run build
npm test
npx playwright install chromium
npm run test:browser
npm run format:check
```

Artifact tests check routes, internal references, privacy language boundaries, store availability, and metadata. Metadata tests build isolated fixtures in `.astro/` on the same filesystem as the project (Astro moves build assets with filesystem renames). Browser tests use Chromium with JavaScript disabled at 360px, 768px, and 1440px widths. They check image loading, overflow, keyboard skip navigation, page navigation, policy anchors, and 404 recovery. `npm run format` formats the source.

## Vercel deployment

1. Sign in to the Vercel account/team that should own the site.
2. Import **Withcenterdev24/mm-website** from GitHub, with production branch `main` and root directory `.`.
3. Use the **Astro** framework preset, Node **24.x**, build command `npm run build`, and output directory `dist`. The committed `vercel.json` declares the framework/build/output; no server adapter is needed.
4. Add `PUBLIC_ANDROID_URL` and `PUBLIC_IOS_URL` only when public listings are verified. They must use HTTPS on `play.google.com` and `apps.apple.com`, respectively; malformed values fail the build.
5. Deploy. Vercel's `VERCEL_PROJECT_PRODUCTION_URL` supplies the actual production domain for canonicals, social images, robots, and sitemap, including in preview builds. An optional `SITE_URL` overrides it for a confirmed custom domain; use an HTTPS origin with no path, query, credentials, or fragment. Enable Vercel's automatic system environment variables if disabled.
6. Confirm `/`, `/support/`, `/privacy/`, `/robots.txt`, `/sitemap.xml`, and an unknown path. Home, support, and privacy must return 200, and the unknown path must return 404. Copy those real production URLs into store metadata.

With no production origin configured, absolute canonical/social URL metadata is omitted, the sitemap has no entries, and robots disallows indexing. Add the confirmed origin and rebuild before indexing a standalone deployment. Vercel preview protection and indexing controls remain managed in the Vercel project.

Static deployment requires no Vercel adapter, database, or runtime secrets. A successful local build is not proof of a live deployment. `task_done.md` records the actual hosting status.

References reviewed October 9, 2026: [Astro's Vercel deployment guide](https://docs.astro.build/en/guides/deploy/vercel/), [Astro on Vercel](https://vercel.com/docs/frameworks/frontend/astro), and [Vercel system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables).
