# Project Notes

## Product Intent

This project is a private Mandarin learning app for May and Yuna. It should prioritize a warm daily practice loop over broad product complexity.

The app should stay:

- simple enough for children to use without help
- reliable on phones, tablets, and laptops
- easy for a parent to update with new lesson content
- safe to use without accounts or a backend

## Current Architecture

The app is fully client-side:

- React renders all screens.
- Lesson data lives in TypeScript files under `src/data`.
- Progress, messages, and speech speed live in browser `localStorage`.
- Browser speech synthesis handles pronunciation playback.
- Hash-based routing keeps static hosting simple.

## Content Model

Each unit includes:

- pinyin practice
- hanzi practice
- conversation lines
- a game type
- chapter and difficulty metadata

Chapter test units use prior units as their review scope.

## Maintenance Approach

Lesson and app changes should be made directly in the source files that the app uses. Historical one-off patch and generation scripts are intentionally not kept in the repository because they are not part of the normal maintenance flow.

If a future script becomes useful enough to keep, document:

1. what it changes
2. when to run it
3. how to verify the result
4. whether it is safe to run more than once

## Manual QA Checklist

Before sharing a new version with the children:

- Home page loads and shows all chapters.
- May/Yuna profile switch changes progress separately.
- Unit 1 can be opened from a fresh browser.
- A normal unit can be completed and unlocks the next unit.
- A test unit requires the intended pass rate.
- "My Room" shows learned kanji and phrases after clearing a unit.
- Save and load work with a downloaded JSON file.
- Two-player challenge starts and reaches a result screen.
- Speech buttons play Mandarin on the target device.

## Known Constraints

- Progress is device/browser-specific unless manually exported.
- Speech quality depends on installed browser/system voices.
- There is no automated browser test suite yet.
- Sanrio-inspired branding is suitable for private family use, but should be reviewed before any public/commercial use.
