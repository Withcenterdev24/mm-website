# Website verification

Verified on October 9, 2026, against the completed native implementation.

- Astro check: 0 errors, 0 warnings, 0 hints.
- Production static build succeeded.
- Node test suite: 8 passed, 0 failed. Includes builds with explicit production origin, absent origin, and Vercel production-domain variables; checks store-link configuration, assets, internal links/fragments, policy sections, and 404 output.
- Playwright: 10 passed, 0 failed. Checks 360px, 768px, and 1440px layouts with JavaScript disabled, image loading, keyboard skip navigation, support/privacy navigation, policy anchors, and unknown-route recovery.
- Formatting check passed.
- Rendered phone, tablet, and desktop screenshots inspected. No horizontal overflow detected. Supplied English/Korean policy prose preserved; only heading levels and title punctuation adapted.
- Independent final review: no Critical or Important findings; ready to merge. No behaviors declined for judgment.

## Decisions and limits

The host's native worktree tool could not target the external-volume repository, so implementation used an ignored manual Git worktree. Manual cleanup is required for that fallback.

The browser plugin failed to initialize because its runtime module was missing. Visual testing used local Chromium through Playwright, and the existing Vercel login state was inspected through Computer Use. Browser automation coverage is Chromium only.

## Deferred minor

Privacy is reachable from the footer but not the header. The independent reviewer classified the additional header link as a nonblocking discoverability improvement.

## Deployment status

Vercel deployment has not been verified. No CLI authentication/token was available, and the existing Chrome Vercel tab showed a login/account-not-found error. User sign-in and project import are pending. The committed Vercel configuration and README give the required build, output, Node version, and environment settings. Do not treat local validation as a live deployment.
