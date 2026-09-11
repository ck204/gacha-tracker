# Gacha Tracker

A small project for organizing selected game-related information.

## Character wishlist

Star individual characters on current, upcoming, or unconfirmed entries. The wishlist
panel sorts selections by arrival: live banners first, upcoming dates next, and Date TBA
last. Live banners have a scrolling label (static with reduced motion enabled); upcoming
entries show dates and day counts. Matching entries and calendar bars are highlighted.
“Wishlisted only” filters game cards and calendar bars, alongside the calendar game filters.

Selections stay after a banner ends and match reruns using permanent character IDs.
Unconfirmed entries remain labelled and never enter the calendar. The wishlist stores
only selected IDs in this browser's localStorage, under `gacha-tracker:wishlist:v1`.
It does not sync to GitHub, other PCs, browser profiles, or a different site address/port.
Clearing site data removes it. If storage is blocked, the page reports that changes last
only for the current tab. Serve this folder at a stable localhost address for reliable
local persistence; file URL storage behavior depends on the browser.

Validation: `node scripts/test-date-tba.cjs` and `node scripts/test-wishlist.cjs`.

## Refresh verification

The scheduled refresher must follow [the leak-verification runbook](docs/leak-verification.md)
and submit data through [the cloud publication workflow](docs/cloud-refresh.md).
GitHub-hosted runners validate before updating main; the research chat needs no local
Node runtime and this PC can remain offline.
Character status, aliases, official checks and original-claim reviews are retained in
data.js. Unverified claims are held in the hidden `leakReview` queue, preserving names
and wishlist IDs. The initial migration holds existing leaks until their evidence is
reviewed; it does not claim that the characters were researched or disproven.

Run `node scripts/test-leak-validation.cjs` for rejection/acceptance cases. GitHub
Actions validates candidate branches and publishes only passing data. The separate
main/PR check remains a backstop. Refreshes must not write main directly.
