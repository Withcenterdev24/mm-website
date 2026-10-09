# Magnet Mayhem Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify Magnet Mayhem's static marketing, support, and bilingual privacy website, publish its source to the supplied GitHub repository, and prepare or complete Vercel hosting depending on available account access.

**Architecture:** Astro generates static pages from a shared layout and small reusable components. Site configuration holds publisher/contact details and verified deployment/store URLs. Ordinary CSS and existing game assets establish the arcade identity without a client framework or backend.

**Tech Stack:** Current compatible stable Astro, TypeScript, CSS, Astro image processing, Node's built-in test runner, and Playwright for browser verification. Select package versions from the registry at implementation time and commit the lockfile; use the Node LTS version supported by those versions and Vercel.

**Spec:** `docs/superpowers/specs/2026-10-09-magnet-website-design.md`

## Global Constraints

- Use Astro with static output, TypeScript for shared configuration, and ordinary CSS.
- Avoid CSS gradients, em dashes in authored site copy, generic dashboard cards, and stock illustrations.
- Only publish confirmed store links. If a platform URL is missing, show clear availability text rather than an actionable placeholder.
- Preserve screenshot aspect ratios and readable framing.
- Honor reduced-motion preferences. The layout must retain its hierarchy at 360px, tablet, and wide desktop widths.
- Publish the existing English and Korean policy, retaining publisher Withcenter, contact `thruthesky@gmail.com`, and October 7, 2026 update date.
- Do not add Vercel Analytics or another tracking service. Deployment remains static.
- Use `https://github.com/Withcenterdev24/mm-website` as the source repository.
- Commit each completed feature separately and update README.md and task_done.md with that feature.

## Review Focus

- Missing store URLs: visitors see honest availability text with no placeholder download link. Test in Task 1.
- Small screens and long text: at 360px, 768px, and 1440px every page remains readable without horizontal overflow. Test in Task 4.
- JavaScript disabled and keyboard navigation: content, navigation, support contact, privacy language anchors, and skip link work. Test in Task 4.
- Unconfigured production domain: metadata never advertises a guessed public origin; confirmed origin consistently drives canonicals and sitemap. Test in Task 4.
- Unknown paths and broken references: missing pages return a useful 404, and internal links, fragments, and images resolve. Test in Task 4.

## File responsibilities

- `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`: reproducible dependencies, scripts, static build, and type checks.
- `src/config/site.ts`: publisher/contact and environment-driven store/deployment settings.
- `src/layouts/SiteLayout.astro`: document metadata, landmarks, shared header/footer, and global styling.
- `src/components/StoreLinks.astro`: confirmed download links or noninteractive availability text.
- `src/styles/global.css`: colors, typography, layout, focus, responsive and reduced-motion rules.
- `src/assets/`: copied game imagery processed by Astro; `public/`: favicon and social preview.
- `src/pages/index.astro`, `support.astro`, `privacy.astro`, `404.astro`: individual page content.
- `src/content/privacy-en.md`, `privacy-ko.md`: supplied policy text with language-specific wrapping on the privacy page.
- `src/pages/robots.txt.ts`: build-time crawler information derived from the actual configured origin.
- `tests/site.test.mjs`: build artifact and internal reference checks.
- `tests/browser.spec.ts`, `playwright.config.ts`: rendered route, keyboard, responsive, and no-JavaScript checks.
- `README.md`, `.env.example`, `vercel.json`, `task_done.md`: operation, deployment configuration, and progress.

### Task 1: Working homepage and shared layout

**Files:** Create package/config files, site configuration, shared layout, StoreLinks, global CSS, homepage, selected assets, README, and build artifact tests. Update task_done.md.

**Interfaces:** `site` exports publisher `Withcenter`, email `thruthesky@gmail.com`, and optional `androidUrl`, `iosUrl`, `origin`. `SiteLayout` accepts `title: string`, `description: string`, and optional `noindex: boolean`; page content uses its default slot. `StoreLinks` consumes `site`. Scripts expose `dev`, `build`, `preview`, `check`, and `test`.

- [ ] Verify supported stable package versions and Node engine requirements using registry metadata and official Astro/Vercel documentation. Check current clean branch and create an isolated implementation branch/worktree using the applicable skill. Preserve the existing approved documents.
- [ ] Establish minimal build/test tooling and write `homepage_is_static_and_has_valid_assets` and `missing_store_urls_have_no_download_links` against built HTML. Assert that the home output has an accessible main landmark, referenced local image files exist, and empty store configuration emits no external store anchors or empty href values. Run `npm run build && npm test`; before homepage implementation expect failure because the home output is absent.
- [ ] Implement `site`, layout, StoreLinks, CSS, asset imports, and homepage. Use the approved headline, real screenshot gallery, attract/repulse explanation, campaign information, and Android/iOS availability. The rendered content must require no JavaScript. Give images dimensions and useful alternative text; prioritize the hero and lazy-load gallery images.
- [ ] Document `npm ci`, `npm run dev`, `npm run check`, `npm run build`, `npm test`, and configurable URLs in README. Run `npm run check && npm run build && npm test`; expect successful checks and tests. Review the desktop/mobile homepage visually and fix layout problems before committing.
- [ ] Update task_done.md and commit as `feat: build Magnet Mayhem marketing homepage`.

### Task 2: Complete support page

**Files:** Create `src/pages/support.astro`; extend `tests/site.test.mjs`; update README and task_done.md.

**Interfaces:** Uses Task 1's `SiteLayout` and `site.email`. Public route `/support/` presents static support information and a usable mailto link.

- [ ] Add `support_contact_and_controls_are_accessible_without_scripts`. Assert built `/support/` exists, mailto uses the configured email, and controls/training content is rendered in HTML. Run `npm test`; expect failure because the route does not exist.
- [ ] Implement support content from the game's current README: touch movement/aim/actions, WASD or arrows, space, shift, mouse magnet actions, pause, training, stage unlocks, device-local progress, and sensitivity settings. Use semantic sections or native details/summary; provide a clearly visible email link and issue-report instructions without promising response times or save recovery.
- [ ] Run `npm run check && npm run build && npm test`; expect success. Check contact and keyboard reading flow in a browser.
- [ ] Update README route documentation and task_done.md; commit as `feat: add player support page`.

### Task 3: Complete bilingual privacy page

**Files:** Create English/Korean privacy Markdown and `src/pages/privacy.astro`; extend artifact tests; update README and task_done.md.

**Interfaces:** Uses shared layout; route `/privacy/` exposes `#english`, `#korean`, and `#website` sections with appropriate language attributes. Imported Markdown produces static policy HTML.

- [ ] Add `privacy_languages_and_game_scope_are_preserved`. Assert both policy sections exist, Korean has `lang="ko"`, contact is correct, update date is retained, and website notice is separated from the offline game policy. Run `npm test`; expect failure before the privacy route is built.
- [ ] Copy supplied policy prose into language-specific source documents. Preserve the policy's substance and replace heading punctuation only as needed for the approved typographic rule. Render clearly labeled English and Korean sections with anchor navigation.
- [ ] Read official Vercel privacy documentation for the short hosting notice. State that hosting processes technical request information according to Vercel's policy and that emailing support shares the sender's address and message. Link the authoritative policy; do not invent retention promises. Record the source in README.
- [ ] Run `npm run check && npm run build && npm test`; expect success. Compare rendered policy text against the supplied source, including Korean, and inspect mobile readability.
- [ ] Update README and task_done.md; commit as `feat: publish bilingual privacy policy`.

### Task 4: Metadata, browser verification, and hosting delivery

**Files:** Create 404 page, robots endpoint, `.env.example`, Vercel config, browser tests/config; update Astro config, layout, README, task_done.md, and artifact tests.

**Interfaces:** Build-time `SITE_URL` supplies the canonical deployment origin. Only emit absolute canonicals, sitemap entries, and robots sitemap declaration when a real origin is configured. Confirmed Vercel production URL may be used when available; never use a preview URL as production canonical. `npm run test:browser` runs Playwright against the built preview.

- [ ] Add tests for `metadata_respects_configured_origin` and `internal_links_fragments_and_assets_resolve`. Exercise builds with a confirmed-form test origin and no origin: absolute metadata uses the former consistently and is omitted in the latter. Check generated route targets, local assets, and fragment IDs rather than snapshotting markup.
- [ ] Implement unique titles/descriptions, favicon/social preview, origin-dependent canonicals, sitemap/robots, and helpful 404. Configure Vercel for Astro static output using current documentation. Document environment variables and store-link updates without storing credentials.
- [ ] Add browser tests for all routes at 360x800, 768x1024, and 1440x1000. Assert `scrollWidth <= clientWidth`, image loading succeeds, the first keyboard action exposes the skip link and targets main content, navigation works with JavaScript disabled, and privacy anchors are reachable. Exercise reduced motion and unknown-path behavior. Run the suite against the actual built preview, not markup mocks.
- [ ] Run `npm run check && npm run build && npm test && npm run test:browser`. Expect all checks to pass; inspect screenshots from each viewport and correct clipping, weak hierarchy, unreadable text, and focus problems. Perform a final independent code/copy review through the applicable review skill and fix meaningful issues.
- [ ] Update README with GitHub-to-Vercel import steps, Astro preset, `npm run build`, `dist`, and environment settings. Update task_done.md and commit as `feat: prepare and verify Vercel website delivery`. Push the implementation branch using the approved repository and integrate without overwriting remote changes.
- [ ] Discover available Vercel session/team access through appropriate tooling. If hosting access is available, link the confirmed project/repository, deploy, set the verified origin, and verify live home/support/privacy/404 status and asset loading. If access is unavailable, report the exact user setup step, completed source URL, and successful local validation; leave deployment incomplete in task_done.md.

## Research references

- https://docs.astro.build/en/guides/deploy/vercel/ confirms that static Astro deployment does not require a Vercel server adapter.
- https://vercel.com/docs/frameworks/frontend/astro provides the hosting framework guidance.
- https://vercel.com/legal/privacy-notice is the authoritative source for the website hosting notice.

## Execution recommendation

Use native execution for this small static site: the four tasks share a compact layout and configuration, and there is no backend or account system. Complete a final independent review after browser verification. The user approved this plan and selected native execution.
