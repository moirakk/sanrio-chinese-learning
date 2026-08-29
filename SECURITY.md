# Security

This app is a static family learning site. It does not have user accounts, a database, or a backend API.

## Reporting

If you find a security or privacy issue, please do not open a public issue with sensitive details. Contact the repository owner privately first.

## Privacy Notes

The app stores progress in the browser through `localStorage`.

Stored data may include:

- selected profile
- cleared units
- learned words and phrases
- local message board entries
- speech speed preference

The app does not intentionally send this progress data to a server.

The production page asks search engines not to index or follow the site, but this is not access control. Keep the repository private if the app should be family-only.

## Safety Expectations

- Do not add analytics or third-party tracking without an explicit reason.
- Do not add remote data collection for children's progress without review.
- Keep save files as local JSON exports.
