# Website verification

Verified on October 9, 2026, against the completed native implementation.

- Astro check: 0 errors, 0 warnings, 0 hints.
- Production static build succeeded.
- Node test suite: 8 passed, 0 failed. Includes builds with explicit production origin, absent origin, and Vercel production-domain variables; checks store-link configuration, assets, internal links/fragments, policy sections, and 404 output.
- Playwright: 10 passed, 0 failed. Checks 360px, 768px, and 1440px layouts with JavaScript disabled, image loading, keyboard skip navigation, support/privacy navigation, policy anchors, and unknown-route recovery.
- Formatting check passed.
- Rendered phone, tablet, and desktop screenshots inspected. No horizontal overflow detected. The initial implementation preserved the supplied English/Korean policy; the subsequent privacy revision is recorded below.
- Independent final review: no Critical or Important findings; ready to merge. No behaviors declined for judgment.

## Decisions and limits

The host's native worktree tool could not target the external-volume repository, so implementation used an ignored manual Git worktree. Manual cleanup is required for that fallback.

The browser plugin failed to initialize because its runtime module was missing. Visual testing used local Chromium through Playwright, and the existing Vercel login state was inspected through Computer Use. Browser automation coverage is Chromium only.

## Privacy revision verification: October 9, 2026

- Astro check: 0 errors, 0 warnings, 0 hints.
- Static production build succeeded with the expanded bilingual policies.
- Node suite: 8 passed, 0 failed. Existing policy tests now check English/Korean language boundaries for both the game and website/support notice, plus the revised dates. All internal links and fragments resolve.
- Targeted Playwright privacy checks: 3 passed, 0 failed at 360px, 768px and 1440px without JavaScript. No horizontal overflow; policy navigation remains functional.
- Formatting and Git whitespace checks passed. Rendered desktop policy screenshot inspected; headings and both service-language sections remain clearly separated.
- Independent privacy review found no implementation blocker. Corrected a minor training-state description in both languages. The review emphasized confirming the support deletion process before publication.
- Owner identity/country, operational retention practices, live hosting settings, final game binaries and in-app/store policy access still require confirmation. See `docs/privacy-audit.md`; these are not established by the website tests.

## Deferred minor

Privacy is reachable from the footer but not the header. The independent reviewer classified the additional header link as a nonblocking discoverability improvement.

## Deployment status

Vercel deployment has not been verified. No CLI authentication/token was available, and the existing Chrome Vercel tab showed a login/account-not-found error. User sign-in and project import are pending. The committed Vercel configuration and README give the required build, output, Node version, and environment settings. Do not treat local validation as a live deployment.
