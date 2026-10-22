# DAR SERA

A complete English-language concept website for a four-room courtyard guesthouse in Tetouan, Morocco. An independent project for **pfxamd**, with its own identity and source repository.

## Preview captures

[Homepage — desktop](docs/preview-home-desktop.webp) · [Homepage — mobile](docs/preview-home-mobile.webp) · [Suite](docs/preview-suite-desktop.webp) · [Stay planner](docs/preview-booking-desktop.webp)

## Run locally

Node **22.12 or newer** and npm are required.

```sh
npm ci
npm run dev
```

Open the local address printed by Astro. To build and inspect the production output:

```sh
npm run build
npm run preview
```

## Included

- Editorial homepage and dedicated House, Rooms, Your Stay, Tetouan, and Privacy pages.
- Four individual room pages, comparison table, and keyboard-accessible image galleries.
- Three-level schematic house explorer with linked rooms and accessible selection controls.
- Complete client-side demo stay planner: dates, room selection, computed nights/rate, contact fields, editable review, completion and safe summary copying.
- All **28 supplied image assets** preserved in GitHub and byte-identical on R2, with the existing responsive AVIF/WebP variants served from `https://media.pfxamd.com/pfxamd/concepts/dar-sera/`.
- Locally bundled Instrument Serif and Manrope fonts; custom responsive CSS; reduced-motion support.
- Static output and custom 404 page. No database, payment processing, tracking scripts, or external booking service.

Routes: `/`, `/the-house/`, `/rooms/`, `/rooms/courtyard-room/`, `/rooms/light-room/`, `/rooms/terrace-suite/`, `/rooms/twin-room/`, `/your-stay/`, `/tetouan/`, `/plan-your-stay/`, `/privacy/`.

## Checks

```sh
npm test
npx playwright install chromium
npm run build
npm run test:e2e
```

End-to-end checks cover all 11 main routes at 390, 768, 1440 and 1920 px, full image loading, overflow, runtime errors, house selection, gallery keyboard/focus behaviour, mobile navigation, booking validation/editing/completion, no persistent contact storage, no outgoing form POSTs, and essential content without JavaScript.

For an existing Chromium installation, optionally set `CHROMIUM_PATH` when running browser checks. Screenshots are written to the ignored `test-results/screenshots/` folder. The small test server in `scripts/serve.mjs` serves only the built output and is not intended as a production server.

## GitHub Pages

The site is configured for `https://pfxamd.github.io/dar-sera/`. All internal links, fonts, scripts, images and the favicon resolve under `/dar-sera/`.

In repository **Settings → Pages**, select **GitHub Actions** as the source. The `Publish DAR SERA` workflow builds the static site and deploys the `dist` artifact. It can also be run manually. No browser tests run during deployment; those are performed locally. The image transformation cache is reused across publishing runs.

For a different deployment path, change `site` and `base` in `astro.config.mjs` and update the browser-test mount accordingly.

## Content and image provenance

DAR SERA, its rooms, prices and policies are fictional demonstration content. Destination images are supplied generated illustrations, not verified documentary photographs. No real address, hotel identity, reviews, availability, payments or reservations are represented.

Actual supplied files are WebP, not PNG, and are approximately 1122–1672 px wide. They are preserved at their delivered resolution without artificial enlargement. The original brief’s larger target sizes and actual sizes are recorded separately in `docs/image-manifest.json`. The house diagram is schematic and not a measured reconstruction of generated photographs.

The form keeps contact details only in page memory. No contact fields are submitted, persisted, or copied into the clipboard summary. See `/privacy/` for visitor-facing details.

Destination context: [UNESCO](https://whc.unesco.org/en/list/837/) and the [Moroccan National Tourist Office](https://www.visitmorocco.com/en/travel/tetouan).

## Structure

```text
src/assets/images/   28 supplied source assets
src/components/      Photo, Explorer, Gallery
src/data.ts          Room records and image descriptions
src/layouts/         Guesthouse shell and navigation
src/lib/             Date-only booking calculations
src/pages/           Statically generated routes
src/styles/          Layered custom CSS
scripts/             Image manifest and built-site test server
tests/               Booking unit and browser tests
docs/                Manifest, validation and preview captures
```

Asset rights remain with their respective owners. Font licenses are distributed by the declared Fontsource packages. This repository does not assert third-party rights clearance beyond the user-supplied asset provenance.
