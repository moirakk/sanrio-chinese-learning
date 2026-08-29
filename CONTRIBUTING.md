# Contributing

This is a private family project, so changes should stay focused on making the app clearer, safer, and more useful for May and Yuna.

## Before Changing Code

- Keep the app simple enough for children to use without instructions.
- Avoid adding accounts, tracking, ads, or external services unless there is a clear family need.
- Treat lesson data as part of the product, not throwaway sample content.
- Keep public/commercial branding risks in mind when touching character-inspired assets or names.

## Local Checks

Before opening a pull request or merging changes, run:

```bash
npm run verify
```

For lesson-only edits, `npm run content:check` is the fastest first check.

## Manual QA

After gameplay changes, check:

- A fresh browser can open Unit 1.
- Completing a unit updates progress.
- The next unit unlocks.
- May and Yuna keep separate progress.
- Speech buttons work on the intended device.
- Save/load still works in "My Room".

## Content Guidelines

- Use short, child-friendly sentences.
- Keep Japanese explanations warm and direct.
- Keep Mandarin examples practical for daily use.
- Keep English phrases aligned with the Chinese lesson theme.
- Prefer small additions over large rewrites.
