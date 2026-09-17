# Toren Wallengren

A personal website built with Astro, TypeScript, and plain CSS. Content is rendered to static HTML; the only browser JavaScript is an independent, interactive canvas. Hosted at <https://twallengren.github.io/>.

## Local development

Use Node 24 (`nvm use`) and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro (normally `http://localhost:4321`). To inspect the production output:

```sh
npm run build
npm run preview
```

In restricted environments, set `ASTRO_TELEMETRY_DISABLED=1` before running Astro so its CLI does not try to write preferences outside the repository. The site has no analytics or telemetry.

## Content and images

Edit the typed, local files in `src/data/`:

- `profile.ts`: introduction, biography, education, interests, LinkedIn/GitHub links.
- `experience.ts`: career entries and selected contributions. Use explicit month/year dates, never copied LinkedIn duration counters.
- `projects.ts`: the manually curated project order, summaries, technologies, repository URLs, and optional `demo` / `image` fields.
- `publication.ts`: research summary, contribution, and preprint link.

The owner's supplied LinkedIn text and refresh plan are the source of biography claims. Earlier Addepar operations/analytics dates were not supplied, so this entry intentionally has no date. Add confirmed dates when available. The roughly 50× improvement applies to **one core return calculation**.

Project images use `{ src: importedImage, alt: 'Meaningful description' }`, not external image URLs. Keep originals outside `public/`; Astro generates optimised, responsive derivatives from `src/assets/`. The retained portrait has been resized and stripped of unnecessary metadata; it is not served directly. Only `public/` assets are copied unchanged. The favicon retains the existing personal icon.

`src/styles/global.css` owns shared colours, spacing, typography, and responsive styles. Components live in `src/components/`; `src/pages/index.astro` defines the page and sharing metadata. Update the `site` value in `astro.config.mjs` if the canonical domain changes. This is a user Pages repository, so no repository-name base path is needed.

## Canvas and future visualisations

`LifeCanvas.astro` registers a custom element through an [Astro component script](https://docs.astro.build/en/guides/client-side-scripts/). It can be placed inside any container marked `data-life-surface`. Keep that container positioned and give it dimensions; its links and controls remain native HTML.

- `simulation.ts`: browser-independent cell state, input activation, and stepping.
- `life-renderer.ts`: draws the state at the container's dimensions.
- `life-canvas.ts`: pointer input, device-pixel scaling, observers, animation scheduling, and lifecycle cleanup.

The simulation preserves the old site's outlined cells, 100 ms updates, 150 ms lifetime, and inactive neighbour cells. It deliberately is not strict Conway Life. Each step now uses a consistent snapshot instead of depending on Map iteration order. Simulation time advances only while visible and running, avoiding a time jump on resume.

The pause button freezes both stepping and pointer activation. Reduced-motion visitors start with a still composition and may opt in with Resume. Going offscreen or hiding the tab suspends scheduling. Removing the element cancels the animation, disconnects observers, and removes listeners; reconnecting safely mounts a fresh instance. Passive pointer listeners preserve native touch scrolling. A CSS grid remains visible without JavaScript, and all biography/project content is static HTML.

For another interactive component, add an independent browser module and a small Astro component, with its own controls and connect/disconnect cleanup. Keep calculation code separate for testing. Do not turn the whole page into a client application or embed the project simulations here.

## Verification

```sh
npx playwright install chromium webkit
npm run verify
```

On Linux CI, install system dependencies with `npx playwright install --with-deps chromium webkit`. `verify` runs Astro/TypeScript checks, six simulation tests, a production build, and Playwright against the production preview. Browser coverage includes desktop, tablet, mobile, and WebKit; navigation, keyboard controls, responsive overflow, images, pixel density, WCAG accessibility checks, pause/resume, reduced motion, offscreen/hidden suspension, disconnect/reconnect, no-JavaScript content, and a real mobile touch-scroll gesture. Hidden-tab tests inject the visibility signal because headless tabs do not reliably background one another.

Tests use no external services. Recheck external links manually when editing content; a passing local suite does not guarantee a third-party destination stays available. A verification record is in `docs/verification.md`.

## GitHub Pages and review

`.github/workflows/pages.yml` follows the [official Astro Pages workflow](https://docs.astro.build/en/guides/deploy/github/) with the Astro action and Pages deployment action. Pull requests run a clean install, checks, unit tests, production build, and browser tests. Only a successful build on the default branch, `master`, can deploy; PRs never deploy. The workflow also allows manual runs, with deployment still restricted to `master`.

The refresh is prepared for review locally. No production setting, branch, or deployment has been changed as part of implementation. For the production switch after review:

1. In repository **Settings → Pages**, choose **GitHub Actions** as the build source.
2. Merge the reviewed changes into `master` (or run the workflow there).
3. Check the completed deployment's homepage, `/#about`, `/#projects`, and research/contact links.
4. Open the path-planning project site from its card and confirm it still loads; project deployments are separate from this homepage.

The old manual `gh-pages` npm scripts are removed. There is no backend, runtime GitHub/LinkedIn API, CMS, or secret configuration. To roll back after publication, revert the refresh commit on `master` and restore the previous Pages publishing configuration if reverting to the old build process.
