# Project Notes

## Product Intent

This project is a private Chinese and English learning app for two children. Japanese is the guidance language, and the Chinese and English lesson content should stay aligned by theme.

The app should stay:

- simple enough for children to use without help
- reliable on phones, tablets, and laptops
- easy for a parent to update with new lesson content
- safe to use without accounts or a backend

## Current Architecture

The app is fully client-side:

- React renders all screens.
- Active lesson data lives in `src/data/units.ts`.
- Progress, messages, and speech speed live in browser `localStorage`.
- Missed questions are stored in each learner's local progress as a review queue.
- Browser speech synthesis handles Mandarin, English, and Japanese playback.
- Hash-based routing keeps static hosting simple.

## Content Model

Each unit includes:

- pinyin practice
- Chinese and English word practice with Japanese meanings
- paired Chinese and English conversation lines
- a game type
- chapter and difficulty metadata

Chapter test units use prior units as their review scope.

## Maintenance Approach

Lesson and app changes should be made directly in the source files that the app uses. Run `npm run content:check` after lesson edits to confirm every unit still has Japanese guidance, Chinese content, and English content.

Historical one-off patch and generation scripts are intentionally not kept in the repository because they are not part of the normal maintenance flow.

If a future script becomes useful enough to keep, document:

1. what it changes
2. when to run it
3. how to verify the result
4. whether it is safe to run more than once

## Manual QA Checklist

Before sharing a new version with the children:

- Home page loads and shows all chapters.
- Profile switch changes progress separately.
- Unit 1 can be opened from a fresh browser.
- A normal unit can be completed and unlocks the next unit.
- A test unit requires the intended pass rate.
- "My Room" shows learned words and phrases after clearing a unit.
- Save and load work with a downloaded JSON file.
- Two-player challenge starts and reaches a result screen.
- Missed questions appear on the review page and are removed after a correct review answer.
- The parent page shows both profiles separately.
- Speech buttons play Mandarin and English on the target device.

## Known Constraints

- Progress is device/browser-specific unless manually exported.
- Speech quality depends on installed browser/system voices.
- There is no automated browser test suite yet.
- Sanrio-inspired branding is suitable for private family use, but should be reviewed before any public/commercial use.
