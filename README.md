# Sanrio Chinese Learning

A private, family-focused language learning web app for two children. It uses Japanese prompts to help them practice Chinese and English side by side with cute character-inspired visuals, short lessons, browser speech playback, and small games.

> This is a personal learning project. The character-inspired artwork and naming should be treated as private/family use unless the branding and assets are reviewed for public distribution.

## What It Includes

- 15 lesson units across three chapters
- Pinyin, Chinese words, English words, and short conversation practice
- Unit unlock progression for two learner profiles
- Clear learner spaces with separate local progress
- Missed-question review queue for targeted practice
- Mini games: memory, tone, puzzle, hunt, fill-in-the-blank, and word order
- Two-player challenge mode
- Parent progress page for checking both learners at once
- "My Room" progress dashboard, learned words, message board, and save/load
- Browser-based Mandarin, English, and Japanese speech playback
- Search indexing discouraged through page metadata for privacy

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React
- Oxlint

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local app:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run code checks:

```bash
npm run lint
```

Check lesson content completeness:

```bash
npm run content:check
```

Run the full local verification:

```bash
npm run verify
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  assets/          Character illustrations and app artwork
  components/      Shared UI pieces
  data/            Active lesson data
  hooks/           Profile and app state hooks
  pages/           Main app screens
  utils/           Storage and speech helpers
docs/              Maintenance notes
public/            Static deployment assets
```

Useful maintenance docs:

- [Project notes](docs/PROJECT_NOTES.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Repository checklist](docs/REPOSITORY_CHECKLIST.md)

## Progress And Data

The app has no backend. Learning progress is saved in the browser through `localStorage`.

Important local storage keys:

- `sanrio_profile`
- `sanrio_progress_sister9`
- `sanrio_progress_sister12`
- `sanrio_messageboard`
- `sanrio_speech_rate`

Each profile stores its own cleared units, stars, streak count, learned words, learned phrases, and review queue inside its profile-specific progress key.

The "My Room" page includes JSON save/load controls so progress can be backed up manually.

## Deployment Notes

The project builds to static files in `dist/`. It uses `HashRouter`, so routes work on simple static hosting without server-side rewrites.

`public/CNAME` currently points to:

```text
yunawithmay.site
```

DNS was checked on 2026-08-20:

- `yunawithmay.site` points to GitHub Pages.
- `www.yunawithmay.site` points to `moirakk.github.io`.
- The repository includes a GitHub Pages workflow at `.github/workflows/deploy.yml`.

## Maintenance Priorities

1. Keep lesson data clear and age-appropriate.
2. Verify unit unlock and progress behavior after game logic changes.
3. Test speech playback on the children's actual devices.
4. Keep public deployment branding and assets private-use appropriate.
5. Keep one-off generation or patch scripts out of the repository unless they become part of the normal maintenance flow.
