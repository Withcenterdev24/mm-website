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

`/privacy/` publishes the supplied game policy in English and Korean, preserving the October 7, 2026 date. Source documents live in `src/content/`; headings are adapted to the page outline. The separate website notice explains hosting and email support. Its hosting source is [Vercel’s privacy notice](https://vercel.com/legal/privacy-notice), reviewed October 9, 2026. The site adds no analytics or tracking scripts.
