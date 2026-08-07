# Gacha Banner Tracker — Claude instructions

Static, single-page dashboard of current and upcoming gacha banners for the games the
user plays. Pure front-end: `index.html` renders everything from `data.js` at load.
Hosted on GitHub Pages. Human-facing usage lives in `README.md`.

## Architecture / layout

- **`index.html`** — all rendering logic; reads `data.js` at load. **Never edit it during
  a data refresh** — it renders whatever is in `data.js`.
- **`data.js`** — the data, and the *only* file a routine data refresh edits (schema below).
- **`icons/`** — official app icons (iTunes Search API, 512px JPEG); referenced per game.
- **`mirrors/`** — committed copies of sources the Claude cloud sandbox can't fetch live.
- **`.github/workflows/mirror-sources.yml`** — refreshes `mirrors/` on GitHub runners.
- **`.claude/launch.json`** — serves the page for Claude Code's preview panel via
  `python -m http.server` (needs Python 3.x on PATH). The page itself never needs a
  server; double-clicking `index.html` always works.

## Deploy & git

- GitHub Pages serves the `main` branch root of repo `ck204/gacha-tracker`; the live site
  https://ck204.github.io/gacha-tracker/ updates ~1 min after `git push`.
- Git identity is **repo-local**: `ck204 <ck204@users.noreply.github.com>`. Pushes
  authenticate via the `gh` CLI (installed via winget).
- **Always ask the user before `git commit` / `git push`** in interactive sessions
  (standing rule). The cloud routine's pushes are pre-authorized — that exception applies
  to the scheduled run only.

## Refreshing the data

Trigger phrase: **"Refresh the gacha dashboard data"**. For each game in `data.js`:

1. Web-search the current + upcoming banners (Game8 pages per game are the primary
   source; they can't be fetched directly — use web-search snippets).
2. Update **only `data.js`**: banner `title`s, `start`/`end` dates (YYYY-MM-DD),
   `version`, `upcoming` list, `notes`, and set `lastUpdated` to today.
   - For each `upcoming` entry, set the optional **`endDate`** (YYYY-MM-DD) when the
     end is known or structurally certain — i.e. it's stated in the source, or the
     entry is a phase that ends when the next contiguous phase starts (HoYo Phase 1
     ends on Phase 2's start; etc.). Omit `endDate` only when the end is genuinely
     unknown (e.g. "no fixed end", or the last phase in a chain). `endDate` makes the
     calendar draw a proper start→end bar instead of a single-day marker.
3. Do **not** edit `index.html`.
4. `git commit` data.js and `git push` to update the live site — **ask first**.

> **FGO is excluded from this procedure (and from the cloud routine).** It is
> manual-only — never auto-refresh or edit its `data.js` entry here. To update it,
> follow the dedicated runbook **[`FGO-update.md`](FGO-update.md)** when the user
> asks (e.g. "run FGO-update").

### Games tracked & primary sources

| Game | Source |
|---|---|
| Genshin Impact | game8.co/games/Genshin-Impact/archives/305012 |
| Honkai: Star Rail | game8.co/games/Honkai-Star-Rail/archives/408381 |
| Zenless Zone Zero | game8.co/games/Zenless-Zone-Zero/archives/435687 |
| Persona 5: The Phantom X | **Direct feed:** `https://lufel.net/apps/schedule/data.js` (plain JS, fetchable — see P5X notes below). **Cloud runs CANNOT fetch it** (sandbox blocks all outbound fetches — WebFetch *and* shell curl both 403); read repo mirrors instead: `mirrors/p5x-lufel-data.js` (same format as the live feed), plus the **digest** `mirrors/p5x-steam-digest.json` (official Steam posts: banner character + exact end datetime UTC, posted release day; no future schedule). **Read the digest, not the raw `*-steam-news.json` — the digests are ~10× smaller; only open a raw mirror if a digest is missing.** Check `mirrors/status.json` for each source's HTTP code + timestamp — if stale (>8 days) or non-200, fall back to web search, then keep-and-flag. |
| Neverness to Everness | game8.co/games/Neverness-to-Everness/archives/597944 |
| Arknights: Endfield | game8.co/games/Arknights-Endfield/archives/524215 |
| Fate/Grand Order (NA) | **MANUAL ONLY — the routine must SKIP this game entirely; never edit the FGO entry in `data.js` during an automated/routine refresh.** Maintained by hand via the runbook **[`FGO-update.md`](FGO-update.md)**. Source `grandorder.gamepress.gg/summon-banner-list` needs raw-HTML parsing (NA dates embedded per row) the sandbox can't do. Keep ONLY banners that debut a NEW Servant (verify via NA-banner history — the word "Pickup" doesn't distinguish new from rerun); DROP all reruns including "Pickup 2/3", `Revival:`, and support/participation banners. `upcoming` = up to the next 3 new-Servant debuts. Keep a short `notes` line (NA server; debuts-only; estimated dates). See the runbook for the full method. |
| Girls' Frontline 2: Exilium | gfl2.help/en/banners (primary — fetchable via WebFetch with a verbatim-quote prompt; direct Invoke-WebRequest 403s after one request). **CAUTION:** the page lists Global AND CN sections and WebFetch summaries have swapped the server headings before — always ask for the verbatim heading-to-content pairing and sanity-check (user plays GLOBAL; Global dates use UTC-4). Global does NOT follow CN's banner order/timeline (confirmed by user) — never infer a Global `upcoming` entry from CN banners; CN info belongs in `notes` only. Do NOT use Dexerto or IOP Wiki (confirmed unreliable for this game). exilium.xyz is JS-rendered — needs a real browser (Chrome connector). No Game8 page. **Cloud runs: read the repo digests** — `mirrors/gfl2-digest.txt` if `gfl2_help` status is 200 (tag-stripped banner list: "GLOBAL SERVER ... <date range> Now Live/Upcoming <3 dolls>"), else `mirrors/gfl2-steam-digest.json` (official "Update Contents" posts list the Rate Up Event lineup, e.g. "drop rate for Elite Doll [Basti] ... [Voymastina] ... increased", with start datetime in UTC-4; banners run ~3 weeks — confirm end via the next update post or search). **Read the digests, not the raw `gfl2-help-banners.html` / `gfl2-steam-news.json` (those are ~10–35× larger); only open a raw mirror if its digest is missing.** |

### Source mirrors (GitHub Actions)

`.github/workflows/mirror-sources.yml` runs on GitHub's runners every day at 13:07 UTC
(21:07 GMT+8) and commits fresh copies of the P5X/GFL2 sources into `mirrors/` — because
the Claude cloud sandbox cannot fetch them directly. The daily cadence keeps mirrors fresh
for both the weekly Sunday refresh and manual refreshes; the odd `:07` minute guards against
GitHub's scheduled-run delays and congested top/bottom-of-hour slots. `mirrors/status.json`
records each fetch's HTTP code and timestamp. The workflow can also be triggered manually
(`gh workflow run mirror-sources.yml` or the Actions tab). A failed fetch is retried once;
if it still fails, the previous mirror file is kept and status.json shows the failure code.

After fetching, the workflow runs `scripts/make-digests.py` to write compact
**digests** the routine reads instead of the bulky raw mirrors (cuts mirror read
cost from ~70K to ~2K tokens):
`mirrors/gfl2-digest.txt` (tag-stripped banner list), `mirrors/p5x-steam-digest.json`
and `mirrors/gfl2-steam-digest.json` (6 latest Steam posts, 400-char bodies). Raw
mirrors are kept for fallback/debugging. The routine should read digests; open a raw
mirror only if its digest is missing.

### P5X data feed notes

`https://lufel.net/apps/schedule/data.js` returns `window.ReleaseScheduleData` with
`manualReleases` + `autoGenerateCharacters` (version, `date`, `characters`, `days` =
interval to next release). Character names are **Korean** — translate (e.g. 사나다 =
Akihiko Sanada, 유카리 = Yukari Takeba, 유키 마코토 = Makoto Yuki). Entries are
global-server releases; banner length ≈ the `days` interval. **User plays on the GLOBAL
server: use the listed dates as-is — no shift.** (Do not apply the site's SEA checkbox rule
of +7 days; that was used briefly and reverted in June 2026.) Fetch it with PowerShell
`Invoke-WebRequest` (WebFetch also works — it's plain JS).

## Automated weekly refresh (ChatGPT cloud routine)

A scheduled ChatGPT cloud task (configured on chatgpt.com under the user's account —
not stored in this repo) refreshes the data **every Sunday at 22:00 GMT+8 with flexible
scheduling** (it may run within about an hour after that time), fully independent of the
user's PC:

1. **Daily 21:07** — the `mirror-sources.yml` Actions workflow refreshes `mirrors/` (see above).
   The Sunday run supplies a fresh snapshot shortly before the weekly refresh routine.
2. **Sunday 22:00 (flexible)** — the routine runs: it reads this file and follows the
   "Refreshing the data" procedure and source rules, updates `data.js`, sanity-checks, then
   commits via PR and **merges it itself**. Its pushes are pre-authorized; the ask-before-push
   rule applies to interactive sessions only. The repo has `delete_branch_on_merge` enabled,
   so its working branches clean up automatically.
3. **~1 min after the refresh commit** — GitHub Pages rebuilds the live site.

A healthy Sunday leaves a "Mirror source data (automated)" commit followed by a "Weekly
banner data refresh (automated)" commit. Other days normally leave only the daily mirror
commit. **Cloud-run constraint:** the sandbox cannot fetch arbitrary URLs (403 on WebFetch
*and* shell curl) — use web search and the `mirrors/` files only.

## Implementation gotchas — do NOT "simplify" these

- **Equal-height game cards:** the grid uses `grid-auto-rows: 1fr` (every row matches the
  tallest card) and each card is a flex column with the links row pinned to the bottom via
  `.links { margin-top: auto }` — content-light cards absorb spare space mid-card instead
  of leaving links floating. Don't revert the auto margin to a fixed one.
- **`data.js` cache-buster:** `index.html` loads `data.js` via a small `document.write`
  loader with a `?v=<timestamp>` query. This deliberately defeats browser heuristic caching
  when served over HTTP (plain `python -m http.server` sends no cache headers, so an F5
  could otherwise show stale data). Don't revert to a plain `<script src>` tag. No-op on
  `file://`.
- **Calendar fixed size:** each week reserves lane height for the *unfiltered* bar count
  (filtering never shifts the layout), and the weeks area locks to the current month's
  height at load (flipping to a sparser month doesn't collapse the card; busier months can
  still grow).
- **Accent colours:** a game's `accent` drives its card border, calendar bars, and filter
  chip dot; bar-label text auto-switches black/white based on accent luminance. ZZZ uses
  dark orange `#f57c00` so it doesn't blend with Endfield's yellow.
- **Icons:** game cards show each game's official app icon (from `icons/`) to the right of
  the name; a missing icon file degrades gracefully.

## data.js schema

```js
window.GACHA_DATA = {
  lastUpdated: "YYYY-MM-DD",
  games: [{
    name, short, version, accent,      // accent = card colour
    icon: "icons/xx.jpg",              // optional card-header icon (official app
                                       // icons via iTunes Search API, 512px JPEG)
    needsCheck: true,                  // optional: shows "check manually" box
    banners:  [{ title, start, end }], // currently running
    upcoming: [{ title, date, approx, endDate }],  // endDate optional (YYYY-MM-DD):
                                       // if set, the calendar draws a date→endDate bar
                                       // instead of a single-day marker

    notes: "",                         // optional caveat line
    links: [{ label, url }]
  }]
}
```

## History

- A Discord webhook integration (edited-in-place pinned dashboard message + ending-soon
  alerts + Gantt timeline image) existed briefly and was removed at the user's request
  (June 2026) — scripts, config, and the daily scheduled task are all gone. To revive it,
  see git history before the commit removing `post-discord.ps1` / `make-calendar.ps1`; a
  new channel webhook URL would need to be created in Discord (the old one lived only in
  the deleted `discord.config.json`).
