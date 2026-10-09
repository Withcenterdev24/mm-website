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
