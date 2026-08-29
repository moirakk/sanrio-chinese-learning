# Deployment

This app is set up for GitHub Pages.

## Domain

Production domain:

```text
yunawithmay.site
```

The app also has `www.yunawithmay.site` configured through DNS.

Checked on 2026-08-20:

- `yunawithmay.site` resolves to GitHub Pages IP addresses.
- `www.yunawithmay.site` resolves through `moirakk.github.io`.
- `public/CNAME` contains `yunawithmay.site`.

## GitHub Pages Workflow

The workflow lives at:

```text
.github/workflows/deploy.yml
```

It runs on pushes to `main` and manual workflow dispatch. The workflow:

1. checks out the repository
2. installs dependencies with Node.js 24 and `npm ci`
3. builds the app with `npm run build`
4. uploads `dist`
5. deploys to GitHub Pages

The workflow uses Node.js 24-compatible GitHub Actions.

## Before Deploying

Run:

```bash
npm run verify
```

Then manually check:

- Home page opens.
- Unit 1 starts from a fresh browser.
- Completing a unit updates progress.
- The next unit unlocks.
- Mandarin and English speech playback works on the intended device.
- Save/load still works from "My Room".

## After Deploying

Open:

```text
https://yunawithmay.site
```

If the page is stale, wait a few minutes for GitHub Pages and browser cache to update.
