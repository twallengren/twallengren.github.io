# Refresh verification — 17 September 2026

The review build is a static homepage: typed repository content → Astro HTML and optimised images → browser, with an independent canvas enhancement. No backend or external data service is required to read the content.

## Local results

| Check | Result |
| --- | --- |
| Clean `npm ci` | Passed; 286 packages installed |
| `npm audit` | Zero vulnerabilities after a compatible picomatch patch |
| `npm run check` | Zero errors, warnings, or hints |
| `npm test` | Six simulation tests passed |
| `npm run build` | One static page built successfully |
| `npm run test:browser` | 25 passed; three intentional skips for the mobile-only touch gesture |
| Accessibility | No axe WCAG A/AA violations in the four browser configurations |
| Browser errors | No page errors, console errors, or failed local assets in page checks |
| Output inspection | No React/Emotion runtime dependencies, no original portrait, no asset over 500 KB |
| `git diff --check` | Passed |

The final combined run used `ASTRO_TELEMETRY_DISABLED=1 npm run verify` on Node 24.13.1. Tests serve the production output on a dedicated port with `--ignore-lock`, keeping Astro's preview in the foreground even when an agent launches it.

Browser checks cover Chromium desktop (1440px), tablet (820px), mobile (Pixel 7), and desktop WebKit. They exercise hash navigation, image loading and dimensions, device-pixel sizing, keyboard skip/focus and pause controls, local pointer coordinates after scrolling, pause/resume, reduced motion, preference changes, offscreen suspension, visibility suspension, disconnect/reconnect cleanup, JavaScript-disabled content, and native touch scrolling. The visibility test injects the browser visibility signal; it does not claim to reproduce an operating-system tab switch. Safari on macOS uses Option+Tab for link navigation.

Visual screenshots were inspected at 320, 390, 820, and 1440px. A portrait/name overlap at the narrowest width was corrected. The navigation, introductory text, and primary links fit in the initial view at the tested sizes. No horizontal overflow was found. Text remains readable against the light content and dark hero backgrounds.

## Output size

- Original portrait: 11,547,679 bytes. Retained source: 470,787 bytes.
- Responsive WebP derivatives: 36,882 / 73,002 / 120,514 / 234,216 bytes. A visitor downloads the appropriate derivative, not all four.
- Social-sharing JPEG: 243,093 bytes.
- Browser JavaScript: 3,254 bytes, inlined by Astro; CSS: 9,493 bytes.

The original publication image, oversized icon, unused icon variants, CRA assets, placeholder tests, telemetry scaffold, and manual publishing scripts were removed.

## External destinations

Checked with public HTTP GET requests on 17 September 2026:

| Destination | Result |
| --- | --- |
| [GitHub profile](https://github.com/twallengren) | 200 |
| [path-planning-ode repository](https://github.com/twallengren/path-planning-ode) | 200 |
| [Path playground](https://twallengren.github.io/path-planning-ode/) | 200; correct deployed page title and app assets referenced |
| [calendar-project repository](https://github.com/twallengren/calendar-project) | 200 |
| [field-sim repository](https://github.com/twallengren/field-sim) | 200 |
| [nBodyProblem repository](https://github.com/twallengren/nBodyProblem) | 200 |
| [arXiv preprint](https://arxiv.org/abs/1806.07046) | 200; title and author verified |
| [LinkedIn](https://www.linkedin.com/in/torenwallengren/) | URL confirmed by the owner; automated request blocked with LinkedIn's HTTP 999 |

The candidate `https://twallengren.github.io/nBodyProblem/` returned 404 and is **not included**. Only the verified path-planning destination has a demo link. Other projects link to their repositories. The homepage does not embed or load any project simulation.

## Review and publication boundary

The supplied dates are incorporated for recent Addepar and PassiveLogic roles. Earlier Addepar operations/analytics dates remain unspecified because none were supplied. The research link is explicitly labelled as a preprint; physics is described as educational background alongside the Mathematics BS.

No push, merge, deployment, or Pages settings change was performed. The prepared workflow uses the repository's verified default branch, `master`, and gates deployment on a successful build and browser checks. Actual GitHub-hosted CI and deployment remain to be exercised after review. Follow the production-switch steps in the README, then check the published homepage and separate path-planning site.
