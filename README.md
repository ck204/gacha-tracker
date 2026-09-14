# Gacha Tracker

A small project for organizing selected game-related information.

## Character wishlist

Star individual characters on current, upcoming, or unconfirmed entries. The wishlist
panel sorts selections by arrival: live banners first, upcoming dates next, and Date TBA
last. Live, Soon, and TBA tabs show compact game clusters pairing each game icon and
abbreviation with its character chips. The view defaults to Live on every page load and
keeps the user's chosen tab through wishlist changes. Hover a chip for schedule details.
Matching entries and calendar bars are highlighted.
“Wishlisted only” filters game cards and calendar bars, alongside the calendar game filters.

Selections stay after a banner ends and match reruns using permanent character IDs.
Unconfirmed entries remain labelled and never enter the calendar. The wishlist stores
only selected IDs in this browser's localStorage, under `gacha-tracker:wishlist:v1`.
It does not sync to GitHub, other PCs, browser profiles, or a different site address/port.
Clearing site data removes it. If storage is blocked, the page reports that changes last
only for the current tab. Serve this folder at a stable localhost address for reliable
local persistence; file URL storage behavior depends on the browser.

## Dashboard card visibility

Use the eye-slash button beside a game name to hide its card from the dashboard. An Undo
message appears briefly, and the **Hidden games** menu above the grid can restore one game
or all games later. This preference is stored only in the current browser under
`gacha-tracker:hidden-games:v1`. It does not affect calendar entries or calendar filters.

Validation: `node scripts/test-date-tba.cjs`, `node scripts/test-wishlist.cjs`, and
`node scripts/test-game-visibility.cjs`.
