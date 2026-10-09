# Magnet Mayhem website design

Date: 2026-10-09
Status: Design direction approved; written specification awaiting review.

## Purpose and success criteria

Create Magnet Mayhem's public marketing, support, and privacy-policy website. The user selected GitHub for source control and Vercel for hosting and approved the design direction below. The website must look like the game, work on phones and desktops, and provide stable URLs usable in app-store metadata.

Success means three complete pages, verified navigation and responsive layouts, accurate game information, a repeatable production build, committed source, and a documented Vercel deployment workflow. A deployed URL and remote repository are separate delivery outcomes and must only be reported when verified.

## Architecture

Use Astro with static output, TypeScript for shared configuration, and ordinary CSS. Shared layout, header, footer, and store-link components prevent duplication across pages. No backend is needed: support uses email, and content is maintained in source control. Generate HTML at build time so essential content and navigation work without JavaScript.

Keep publisher name, support email, store URLs, and canonical site URL in a small shared configuration. Only publish confirmed store links. If a platform URL is missing, show clear availability text rather than an actionable placeholder. The intended platforms are Android and iOS, following the approved proposal; browser gameplay is outside this website's scope.

Astro is preferred over raw HTML for reusable layouts and image processing, and over Next.js because these pages do not need application state or server rendering. Do not install a UI component framework for this small site.

## Visual direction

Build a playful arcade identity using cream and deep navy surfaces, yellow calls to action, and selective red and blue accents drawn from the magnets. Use large expressive headings, strong outlines, crisp offset shadows, roomy sections, and real game imagery. Avoid CSS gradients, em dashes in authored site copy, generic dashboard cards, and stock illustrations.

Reuse assets from `/Volumes/Samsung 1TB/tristan/godot`: the existing promotional feature graphic, logo or app icon, and selected recent store screenshots. Copy only the assets required by the website into this repository. Distinguish promotional artwork from actual gameplay screenshots. Preserve screenshot aspect ratios and readable framing. Optimize sizes and provide useful alternative text; decorative images have empty alternative text.

Use local assets and fonts where possible, system fallback fonts, and minimal decorative motion. Honor reduced-motion preferences. The layout must retain its hierarchy at 360px, tablet, and wide desktop widths.

## Pages

### Home `/`

Header: recognizable game branding with links to gameplay, support, and privacy. A prominent hero pairs the existing promotional art with the headline “Pull. Launch. Last one standing.” and a short factual description of a single-player 3D arcade brawler on floating arenas.

Follow with an explanation of attract and repulse, a gallery of actual gameplay, and a section describing the nine-stage campaign: opponents, arena difficulty, and AI challenge increase with progression. Highlight offline play, no account, no ads, and no in-app purchases as game characteristics grounded in existing game documentation. Finish with the configured platform availability and shared footer.

Do not imply online multiplayer, advertise the optional card feature, or present nonexistent downloads. Home copy is English for the initial release.

### Support `/support/`

Provide a concise introduction, a visible email contact using `thruthesky@gmail.com`, and useful answers covering touch controls, keyboard/mouse controls, training, stage unlocking, local progress, camera sensitivity, and troubleshooting. Source gameplay behavior from the game's README and check relevant current source when needed.

Ask players contacting support to include platform, game version, and a description of the problem. Do not promise response times or recovery of device-local saves. No contact form, uploads, or ticket service is introduced.

### Privacy `/privacy/`

Publish the existing English and Korean policy from `etc/deploy-playstore/store/privacy-policy.md`, retaining its game-specific scope, publisher Withcenter, contact email, and October 7, 2026 update date. Clearly label languages and use appropriate language attributes.

Separate the game policy from a short website-specific hosting and email-contact notice. Do not claim that Vercel collects no technical request data. Verify hosting-related statements against official documentation before publishing. Describe support email information only to the extent justified by the email workflow; do not invent retention periods or legal guarantees. Preserve supplied policy text rather than introduce new legal conclusions.

### Missing page

Include a lightweight 404 page with a link home, using the shared visual language.

## Accessibility, metadata, and behavior

Use semantic landmarks, a skip link, logical headings, visible keyboard focus, sufficiently contrasting colors, and descriptive links. Keep navigation usable on small screens without relying on an inaccessible custom menu. Any gallery enhancement remains optional; screenshots and captions must be visible without it.

Each public page gets a unique title and description. Add favicon and social preview artwork. Generate canonical URLs, sitemap, and robots metadata from the actual configured deployment URL, not a guessed domain. Images below the fold load lazily; the main hero image is prioritized. Add a 404 route for unknown URLs and avoid external resources needed for basic rendering.

## GitHub and Vercel

Initialize the repository locally, ignore macOS metadata, dependencies, build output, local environment files, and Vercel local state. Use atomic feature commits and keep README and task_done.md current.

The active GitHub account is Withcenterdev24, but repository name, visibility, and Vercel account/team must be confirmed or discovered before creating external resources. Prefer a dedicated magnet-website repository over modifying the game repository. Document importing it into Vercel with the Astro framework preset, `npm run build`, and `dist` output. Verify current official Astro and Vercel instructions before implementation.

Do not add Vercel Analytics or another tracking service. Deployment remains static. No custom domain is assumed. Validate the deployed home, support, privacy, and missing-page behavior when deployment access is available. If access is unavailable, report the exact remaining setup step and provide a verified local build.

## Delivery sequence and verification

1. Establish a working shared layout and homepage, optimized branding, and local development/build commands.
2. Complete support as a separately reviewable feature.
3. Complete privacy with the supplied bilingual content and verified website hosting notice.
4. Complete metadata, 404 behavior, responsive and accessibility checks, deployment documentation, and hosting integration.

For each slice, run appropriate build/type checks and meaningful checks for routes, links, assets, and required content. Inspect rendered desktop and mobile pages in a browser, including keyboard navigation and horizontal overflow. Review the completed code and copy before delivery. Do not add tests that merely repeat static markup; focus on observable requirements and actual failure risks.

## Scope boundaries

This project includes marketing, support, privacy, essential metadata, and static hosting setup. It excludes gameplay changes, playable browser exports, accounts, analytics, ecommerce, signup forms, and an administrative CMS. Support contact and privacy publisher details come from the supplied game policy. Public store URLs and deployment ownership are operational facts to verify before publishing external links or resources.
