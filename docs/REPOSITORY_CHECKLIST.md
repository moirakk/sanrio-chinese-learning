# Repository Checklist

Use this checklist when preparing a meaningful update.

## Before Work

- Confirm the change is for this family learning app.
- Check whether lesson content, game logic, or deployment behavior is affected.
- Keep the scope small enough to review confidently.

## Before Commit

- Run `npm run verify`.
- Review changed files.
- Confirm no generated build output is staged.
- Confirm no local progress JSON files are staged.
- Confirm unused dependencies were removed from `package.json`.
- Update `CHANGELOG.md` for user-visible changes.

## Before Push

- Confirm `main` is stable.
- Prefer a feature branch for non-trivial changes.
- Open a draft PR for larger gameplay, content, or deployment updates.

## After Deploy

- Open `https://yunawithmay.site`.
- Check the home page.
- Check one lesson flow.
- Check the review flow after answering a question incorrectly.
- Check the parent page.
- Check "My Room".
- Check speech playback on the children's usual device.
