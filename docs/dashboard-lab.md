# Dashboard testing branch

The UI experiment lives on `ui/dashboard-lab`. It started at `8ab9b17` on
2026-09-30. `main` remains the production branch. The local tag
`ui-baseline-2026-09-30` identifies the exact version before this redesign.

The presentation lives in `dashboard-ui.css` and `dashboard-ui.js`, with small
shell changes to `index.html`. Banner data, wishlist storage, and hidden-game
storage retain their existing formats. No production push is part of this work.

## Preview

Open `index.html`, or serve this folder over HTTP at a stable local address.
The current testing preview is `http://127.0.0.1:4173/`. Its address has separate
browser storage from the production GitHub Pages site.

The dashboard adds game/character search (press `/` to focus, Escape to clear),
the closing-soon filter, the next scheduled arrival, schedule totals, game
navigation, and a calendar Today button. Totals cover all tracked banners,
including simultaneous banners; each game card keeps the original renderer's
primary-banner selection. The closing-soon filter includes games with any live
banner ending within seven days. Approximate arrivals keep their estimate label;
undated announcements and leaks never enter dated countdowns.

The button beside the top breadcrumb collapses or restores the sidebar. Its
preference is stored under `gacha-tracker:sidebar-collapsed:v1` in this browser;
if storage is unavailable, the toggle still works for the current page.

## Overview artwork

The hero rotates the five approved official X headers using artwork metadata in
`data.js`. It starts with the next scheduled game when included, otherwise Genshin
Impact. The next scheduled banner details stay on the left, independent of the
artwork; the art aligns right and fades along its left edge.

Rotation uses an eight-second interval and a 700 ms crossfade. All five images
preload. Pause/resume, hover, tab visibility, and reduced-motion preferences control
rotation. FGO's original local image remains on disk but is excluded. Temporary
testing controls remain removed.

The browser displays each approved local snapshot immediately, then switches to
the verified remote header once loaded. Failed remote requests keep the snapshot. Source accounts, artwork check dates, backup paths, and crops
are stored in `data.js`. `assets/splash/sources.json` documents the original local
snapshots. The [artwork refresh contract](artwork-refresh.md) explains metadata and
rules for the repository artwork mirror and the cloud schedule prompt. Automatic
checks require publishing the mirror workflow and replacing the saved cloud prompt.

## Return to the original dashboard

After the redesign has been committed locally and the working tree is clean:

```sh
git switch main
```

Return to testing with `git switch ui/dashboard-lab`. For the exact original
snapshot, use `git switch --detach ui-baseline-2026-09-30`, then switch back to a
branch before making further edits.

If the redesign is still uncommitted, preserve it first (including its new files):

```sh
git stash push --include-untracked -m "dashboard-lab testing snapshot"
git switch main
```

To restore that snapshot, switch back to `ui/dashboard-lab`, inspect `git stash
list`, and apply the matching stash with `git stash apply stash@{N}`. In
PowerShell, quote the stash reference, for example `'stash@{0}'`. Keep the stash
until the restored files have been verified.

## Bring in the next upstream update

First commit or stash local work so the working tree is clean. Then:

```sh
git switch main
git pull --ff-only origin main
git switch ui/dashboard-lab
git merge main
```

This preserves the UI experiment and incorporates the latest banner data. Git
may require manual resolution if upstream also changes the same `index.html`
lines. Use `git merge --abort` to return to the state before a conflicting merge.
After merging, rerun the checks below and review the preview. Never reset the
testing branch to `origin/main` to update it; that would discard UI commits.

## Adopt the tested UI later

After approval, with a clean working tree and the testing branch synchronized
with the latest main:

```sh
git switch main
git merge --ff-only ui/dashboard-lab
```

Review and test before pushing. A push to `main` publishes through GitHub Pages
and requires separate approval under this repository's interactive-session rule.
If the UI is later published and must be rolled back, revert the UI commit on
the latest `main`; do not reset `main` to the baseline tag, since that would also
discard subsequent banner-data updates.

## Validation

```sh
node scripts/test-date-tba.cjs
node scripts/test-wishlist.cjs
node scripts/test-game-visibility.cjs
node scripts/test-artwork.cjs
node scripts/test-artwork-mirror.cjs
node --check dashboard-ui.js
git diff --check
```

Browser checks: desktop and narrow mobile layout; search and empty results;
filter combinations; wishlist selection and storage; hiding/restoring games;
calendar navigation, filters, and Today; no horizontal page overflow.
