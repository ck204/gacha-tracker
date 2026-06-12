# Gacha Banner Tracker

One-glance dashboard for current and upcoming banners across the games I play.

**Live site:** https://ck204.github.io/gacha-tracker/ (GitHub Pages, repo
`ck204/gacha-tracker`). Updates go live ~a minute after `git push`.
`discord.config.json` (webhook secret) and `calendar.png` are git-ignored —
keep it that way.

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
- `index.html` loads `data.js` via a small `document.write` loader with a
  `?v=<timestamp>` query. This is deliberate — it defeats browser heuristic
  caching when the page is served over HTTP (plain `python -m http.server`
  sends no cache headers, so an F5 could otherwise show stale data). Do not
  "simplify" it back to a plain `<script src>` tag. It's a no-op on `file://`.

### Dev preview note

`.claude/launch.json` serves the page for Claude Code's preview panel via
`python -m http.server` — it needs Python on PATH (any 3.x). The page itself
never needs a server; double-clicking `index.html` always works.

## Discord live dashboard

`post-discord.ps1` mirrors the dashboard into a Discord channel as ONE webhook
message that gets edited in place. Countdowns use Discord dynamic timestamps,
so they stay accurate between runs without edits.

**One-time setup:**

1. In Discord: channel → ⚙ Edit Channel → Integrations → Webhooks →
   New Webhook → Copy Webhook URL.
2. Paste it into `discord.config.json` (`webhookUrl`). Treat the URL like a
   password — anyone holding it can post to the channel.
3. Run `.\post-discord.ps1` once — it posts the dashboard and prints the
   message id. **Pin that message** in Discord.
4. Schedule a daily run (e.g. 09:00) via Task Scheduler so banner-transition
   edits and "ending soon" alerts go out automatically.

**Timeline calendar:** every run, `make-calendar.ps1` renders `calendar.png`
(a 5-week Gantt timeline of all banners, drawn with System.Drawing — no
dependencies) and the script attaches it as the last embed of the dashboard
message. It can also be run standalone to regenerate just the image.

**Behavior:**

- Subsequent runs PATCH the same message (id stored in `discord.config.json`).
  If the message was deleted, a fresh one is posted automatically.
- Banners ending within `alertHoursBefore` (default 48 h) trigger one separate
  alert message each, prefixed with `alertMention` (default `@here`; set to
  `""` for no ping). Already-sent alerts are tracked in `alertedKeys`.
- `.\post-discord.ps1 -DryRun` prints the payload without sending anything.
- The script parses `data.js`, so the part after `window.GACHA_DATA =` must
  stay **strict JSON** (quoted keys, no trailing commas).

After every data refresh, run `post-discord.ps1` so the pinned message matches.

## Refreshing the data

Open Claude Code in this folder and say:

> Refresh the gacha dashboard data

Claude should then, for each game in `data.js`:

1. Web-search the current + upcoming banners (Game8 pages per game are the
   primary source; they can't be fetched directly — use web search snippets).
2. Update only `data.js`: banner titles, `start`/`end` dates (YYYY-MM-DD),
   `version`, `upcoming` list, `notes`, and set `lastUpdated` to today.
3. Do **not** edit `index.html` — it renders whatever is in `data.js`.
4. Run `post-discord.ps1` (updates the pinned Discord message), then
   `git commit` data.js and `git push` (updates the live site).

### Games tracked & primary sources

| Game | Source |
|---|---|
| Genshin Impact | game8.co/games/Genshin-Impact/archives/305012 |
| Honkai: Star Rail | game8.co/games/Honkai-Star-Rail/archives/408381 |
| Zenless Zone Zero | game8.co/games/Zenless-Zone-Zero/archives/435687 |
| Persona 5: The Phantom X | **Direct data feed:** `https://lufel.net/apps/schedule/data.js` (plain JS, fetchable — see below) |
| Neverness to Everness | game8.co/games/Neverness-to-Everness/archives/597944 |
| Arknights: Endfield | game8.co/games/Arknights-Endfield/archives/524215 |
| Girls' Frontline 2: Exilium | gfl2.help/en/banners (primary — fetchable via WebFetch with a verbatim-quote prompt; direct Invoke-WebRequest gets 403-blocked after one request). **CAUTION:** the page lists Global AND CN sections and WebFetch summaries have swapped the server headings before — always ask for the verbatim heading-to-content pairing and sanity-check (user plays GLOBAL; Global dates use UTC-4). Global does NOT follow CN's banner order/timeline (confirmed by user) — never infer a Global `upcoming` entry from CN banners; CN info belongs in `notes` only. Do NOT use Dexerto or IOP Wiki — confirmed unreliable for this game. exilium.xyz is JS-rendered — needs a real browser (Chrome connector). No Game8 page. |

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
