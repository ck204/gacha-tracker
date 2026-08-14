# Gacha Banner Tracker

One-glance dashboard for current and upcoming banners across the games I play.

**Live site:** https://ck204.github.io/gacha-tracker/

> Maintenance details — the data-refresh procedure, per-game sources, mirrors,
> architecture, and "don't simplify this" gotchas — live in [`CLAUDE.md`](CLAUDE.md).

## Usage

Open `index.html` in a browser (double-click works — no server needed). Pin it as a tab
or set it as your new-tab page.

- Countdown bars tick down automatically. A banner with no confirmed end displays
  **End date unknown** with an indeterminate striped bar instead of a guessed duration.
- Only **banner changes** need a data refresh (roughly every 2–3 weeks per game).
- The header shows a ⚠ warning when data is stale or a tracked banner has ended.

### Calendar overview (bottom of page)

- Single-month view with ‹ › arrows to flip months; opens on the current month.
- Running banners with known ends are drawn as duration bars in each game's accent colour.
  Unknown-end banners use a striped open-ended span through the current day; `↝` means the
  end is unknown, and `~` marks an approximate date.
- Hover a bar to see the game, full title, and known date range or “End date unknown”.
- Filter chips (**All** + one per game) are multi-select — click to toggle games on/off
  and the calendar shows the combined timelines. Empty selection falls back to All;
  selection persists while flipping months.

## Refreshing the data

Open Claude Code in this folder and say:

> Refresh the gacha dashboard data

Claude follows the full procedure and per-game source rules in [`CLAUDE.md`](CLAUDE.md).
The data lives in `data.js`; the page renders whatever is there.
