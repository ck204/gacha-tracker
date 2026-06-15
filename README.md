# Gacha Banner Tracker

One-glance dashboard for current and upcoming banners across the games I play.

**Live site:** https://ck204.github.io/gacha-tracker/ (GitHub Pages serving
the `main` branch root of repo `ck204/gacha-tracker`). Updates go live
~a minute after `git push`. Git identity is repo-local
(`ck204 <ck204@users.noreply.github.com>`); pushes authenticate via the
`gh` CLI (installed via winget).

## Usage

Open `index.html` in a browser (double-click works — no server needed).
Pin it as a tab or set it as your new-tab page.

- Countdown bars tick down automatically — the page is always date-accurate.
- Only **banner changes** need a data refresh (roughly every 2–3 weeks per game).
- The header shows a ⚠ warning when data is stale or a tracked banner has ended.

### Calendar overview (bottom of page)

- Single-month view with ‹ › arrows to flip months; opens on the current month.
- Running banners are drawn as duration bars (Game8-style) in each game's
  accent colour; `upcoming` entries appear as one-day bars (`~` = approx date).
- Hovering a bar shows game, full title, and exact date range/length.
- Filter chips (**All** + one per game, by `short` code) are **multi-select**:
  clicking game chips toggles them on/off and the calendar shows the combined
  timelines. Empty selection falls back to All. Selection persists while
  flipping months.
- The calendar holds a **fixed size**: each week reserves lane height for the
  unfiltered bar count (filtering never shifts the layout), and the weeks area
  locks to the current month's height at load (flipping to a sparser month
  doesn't collapse the card; busier months can still grow).
- Everything is rendered from `data.js` at load — no separate calendar data.
- A game's `accent` colour drives its card border, calendar bars, and filter
  chip dot. Bar label text auto-switches black/white based on accent luminance.
  (ZZZ uses dark orange `#f57c00` so it doesn't blend with Endfield's yellow.)

### Implementation notes

- Game cards show each game's official app icon (from `icons/`, see schema)
  to the right of the name; a missing icon file degrades gracefully.
- All game cards render at **equal height**: the grid uses
  `grid-auto-rows: 1fr` (every row matches the tallest card) and each card is
  a flex column with the links row pinned to the bottom via
  `.links { margin-top: auto }` — content-light cards absorb spare space
  mid-card instead of leaving links floating. Don't "simplify" the auto
  margin back to a fixed one.
- `index.html` loads `data.js` via a small `document.write` loader with a
  `?v=<timestamp>` query. This is deliberate — it defeats browser heuristic
  caching when the page is served over HTTP (plain `python -m http.server`
  sends no cache headers, so an F5 could otherwise show stale data). Do not
  "simplify" it back to a plain `<script src>` tag. It's a no-op on `file://`.

### Dev preview note

`.claude/launch.json` serves the page for Claude Code's preview panel via
`python -m http.server` — it needs Python on PATH (any 3.x). The page itself
never needs a server; double-clicking `index.html` always works.

## Discord (removed June 2026)

A Discord webhook integration (edited-in-place pinned dashboard message +
ending-soon alerts + Gantt timeline image) existed briefly and was removed at
the user's request — scripts, config, and the daily scheduled task are all
gone. If it's ever wanted again, see git history before commit removing
`post-discord.ps1` / `make-calendar.ps1`; a new channel webhook URL would
need to be created in Discord (the old one lived only in the deleted
`discord.config.json`).

## Automated weekly refresh (Claude cloud routine)

A scheduled Claude cloud agent (configured on claude.ai/code under the user's
account — not stored in this repo) refreshes the data **every Monday 07:00
GMT+8**, fully independent of the user's PC:

1. **06:30** — the `mirror-sources.yml` Actions workflow refreshes `mirrors/`
   (see "Source mirrors" below).
2. **07:00** — the routine runs: it reads this README and follows the
   "Refreshing the data" procedure and source rules, updates `data.js`,
   sanity-checks, then commits via PR and **merges it itself**. Its pushes are
   pre-authorized; the ask-before-push rule below applies to interactive
   sessions only. The repo has `delete_branch_on_merge` enabled, so its
   working branches clean up automatically.
3. **~07:05** — GitHub Pages rebuilds the live site.

A healthy Monday leaves two commits: "Mirror source data (automated)" then
"Weekly banner data refresh (automated)". Note for cloud runs: the sandbox
cannot fetch arbitrary URLs (403 on WebFetch *and* shell curl) — use web
search and the `mirrors/` files only.

## Refreshing the data

Open Claude Code in this folder and say:

> Refresh the gacha dashboard data

Claude should then, for each game in `data.js`:

1. Web-search the current + upcoming banners (Game8 pages per game are the
   primary source; they can't be fetched directly — use web search snippets).
2. Update only `data.js`: banner titles, `start`/`end` dates (YYYY-MM-DD),
   `version`, `upcoming` list, `notes`, and set `lastUpdated` to today.
3. Do **not** edit `index.html` — it renders whatever is in `data.js`.
4. `git commit` data.js and `git push` to update the live site — but **ask
   the user before committing/pushing** (standing rule).

### Games tracked & primary sources

| Game | Source |
|---|---|
| Genshin Impact | game8.co/games/Genshin-Impact/archives/305012 |
| Honkai: Star Rail | game8.co/games/Honkai-Star-Rail/archives/408381 |
| Zenless Zone Zero | game8.co/games/Zenless-Zone-Zero/archives/435687 |
| Persona 5: The Phantom X | **Direct data feed:** `https://lufel.net/apps/schedule/data.js` (plain JS, fetchable — see below). **Cloud runs CANNOT fetch this (sandbox blocks all outbound fetches — WebFetch and shell curl both 403). Read the repo mirrors instead:** `mirrors/p5x-lufel-data.js` (same format as the live feed) and `mirrors/gfl2-steam-news.json` / `mirrors/p5x-steam-news.json` (official Steam update posts: banner character + exact end datetime in UTC, posted on release day; no future schedule). Check `mirrors/status.json` for each mirror's HTTP code + fetch timestamp — if stale (>8 days) or non-200, fall back to web search, then keep-and-flag. |
| Neverness to Everness | game8.co/games/Neverness-to-Everness/archives/597944 |
| Arknights: Endfield | game8.co/games/Arknights-Endfield/archives/524215 |
| Girls' Frontline 2: Exilium | gfl2.help/en/banners (primary — fetchable via WebFetch with a verbatim-quote prompt; direct Invoke-WebRequest gets 403-blocked after one request). **CAUTION:** the page lists Global AND CN sections and WebFetch summaries have swapped the server headings before — always ask for the verbatim heading-to-content pairing and sanity-check (user plays GLOBAL; Global dates use UTC-4). Global does NOT follow CN's banner order/timeline (confirmed by user) — never infer a Global `upcoming` entry from CN banners; CN info belongs in `notes` only. Do NOT use Dexerto or IOP Wiki — confirmed unreliable for this game. exilium.xyz is JS-rendered — needs a real browser (Chrome connector). No Game8 page. **Cloud runs: read the repo mirrors** (see P5X row): `mirrors/gfl2-help-banners.html` if its status is 200, else `mirrors/gfl2-steam-news.json` (official "Update Contents" posts list the Rate Up Event lineup, e.g. "drop rate for Elite Doll [Basti] ... [Voymastina] ... increased", with start datetime in UTC-4; banners run ~3 weeks — confirm end via the next update post or search). |

### Source mirrors (GitHub Actions)

`.github/workflows/mirror-sources.yml` runs on GitHub's runners every Monday
22:30 UTC Sunday (06:30 GMT+8, 30 min before the cloud refresh routine) and commits
fresh copies of the P5X/GFL2 sources into `mirrors/` — because the Claude
cloud sandbox cannot fetch them directly. `mirrors/status.json` records each
fetch's HTTP code and timestamp. The workflow can also be triggered manually
(`gh workflow run mirror-sources.yml` or the Actions tab). A failed fetch
keeps the previous mirror file; status.json shows the failure code.

### P5X data feed notes

`https://lufel.net/apps/schedule/data.js` returns `window.ReleaseScheduleData`
with `manualReleases` + `autoGenerateCharacters` (version, `date`, `characters`,
`days` = interval to next release). Character names are **Korean** — translate
(e.g. 사나다 = Akihiko Sanada, 유카리 = Yukari Takeba, 유키 마코토 = Makoto Yuki).
Entries are global-server releases; banner length ≈ the `days` interval.
**User plays on the GLOBAL server: use the listed dates as-is — no shift.**
(Do not apply the site's SEA checkbox rule of +7 days; that was used briefly
and reverted in June 2026.)
Fetch it with PowerShell `Invoke-WebRequest` (WebFetch also works — it's plain JS).

### data.js schema

```js
window.GACHA_DATA = {
  lastUpdated: "YYYY-MM-DD",
  games: [{
    name, short, version, accent,      // accent = card colour
    icon: "icons/xx.jpg",              // optional card-header icon (official app
                                       // icons via iTunes Search API, 512px JPEG)
    needsCheck: true,                  // optional: shows "check manually" box
    banners:  [{ title, start, end }], // currently running
    upcoming: [{ title, date, approx }],
    notes: "",                         // optional caveat line
    links: [{ label, url }]
  }]
}
```
