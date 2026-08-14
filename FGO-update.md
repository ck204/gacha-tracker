# FGO manual update runbook

Step-by-step for refreshing the **Fate/Grand Order (NA)** card in `data.js`.
FGO is **manual only** — the scheduled cloud routine must never touch it (its source
needs raw-HTML parsing the sandbox can't do, and the data is easy to mis-order).

**Trigger:** user says something like "run FGO-update" / "update the FGO card".

---

## 0. Ground rules

- **Server: NA/Global only.** Ignore JP dates except as the ordering key.
- **Edit only the FGO entry in `data.js`.** Don't touch other games or `index.html`.
- **Ask before `git commit` / `git push`** (standing project rule).

## 1. Fetch the source (raw, not WebFetch)

Primary source: `https://grandorder.gamepress.gg/summon-banner-list`

The page defaults to JP and is JS-heavy; the WebFetch tool only surfaces the JP
top-chunk. Fetch the **raw HTML** and parse it instead:

```powershell
$r = Invoke-WebRequest -Uri "https://grandorder.gamepress.gg/summon-banner-list" -UseBasicParsing -TimeoutSec 40
$t = ($r.Content -replace '<[^>]+>',' ') -replace '&amp;','&' -replace '&#x27;|&#039;',"'" -replace '\s+',' '
```

Each banner row contains: a name, `Period Japan: <start> to <end>`, optionally
`NA: <start> to <end>`, then `Single <rate-up units>` (and sometimes `Shared ...`).

## 2. Identify NA banners (the JP/NA rule)

- **JP date only, no `NA:`** → future NA banner (not yet scheduled). Use for prediction only.
- **Has both `Japan:` and `NA:`** → current or past NA banner. Use the `NA:` dates.
- A banner is **current** if its `NA:` window contains today.
- **Order NA banners by JP start date ascending** — the page lists newest-JP first,
  and short support banners interleave, so never trust document order.
- **Stop scanning** once you've passed 2 *past* NA banners (NA end < today).

## 3. Read the rate-up units

The featured units are on the `Single:` line, e.g.
`Single Abigail Williams (Summer) , Jeanne d'Arc (Archer)`.
**Check every `Single:` line, including daily / "Participation Support" / "Clear
Support" pickups** — these are real banners with generic names and are the ones most
often missed (Abigail support and the Tamamo/Altria support both hide here).

## 3.5 New vs rerun (the word "Pickup" does NOT tell you)

Both new-Servant and rerun banners are called "... Pickup Summon". To tell them apart,
**check the featured Servant's NA-banner history on this same page**:

- **New Servant (NA debut):** the current banner is the Servant's *earliest/only*
  NA-dated appearance. Apart from this event they appear only in JP-only/future rows.
- **Rerun:** the Servant also appears in **earlier NA-dated banners** (often years back).
- Standalone reruns are usually also titled **`Revival:`** in the banner name.

Quick check — count a Servant's NA-dated appearances (rerun if any predate this event):

```powershell
# $t = tag-stripped page text from step 1
$name = 'Zhuge Liang (El-Melloi II)'
$i=0; $dates=@()
while(($i=$t.IndexOf($name,$i)) -ge 0){
  $w=$t.Substring([Math]::Max(0,$i-160),320)
  foreach($m in [regex]::Matches($w,'NA:\s*(\d{4}-\d{2}-\d{2})')){ $dates+=$m.Groups[1].Value }
  $i+=$name.Length
}
($dates | Sort-Object -Unique)   # only this event's dates => new; older dates => rerun
```

Verified examples (June 2026): Hibiki & Chikagi → NA only 2026-06 = **new**;
Zhuge Liang → NA back to 2017 = **rerun**; Sei Shōnagon → back to 2022 = **rerun**.

## 4. What goes on the card (conventions)

- **KEEP only banners that debut a NEW Servant** (NA debut, per §3.5).
- **DROP every rerun banner** — numbered secondary pickups ("Pickup 2/3"), `Revival:`
  banners, AND support / participation / "clear support" banners. If a banner's featured
  Servant(s) all have prior NA history (per §3.5), it's a rerun — drop it.
- If a banner co-features a new Servant *and* a rerun, keep it but title it with the
  **new** Servant only.
- **Always verify with the §3.5 NA-history check — do not assume from the name.**
  Swimsuit/class-change Servants are a classic trap (e.g. "Tamamo-no-Mae (Lancer)" looks
  like a new unit but has NA history back to 2018 = rerun).
- Use the new Servant's name as the title, e.g. `Dancing Dragon Castle — Hibiki & Chikagi`.
  Example from this event: keep **only** Hibiki & Chikagi; drop Zhuge Liang, Sei Shōnagon
  (rerun pickups) **and** the Abigail Williams (Summer) / Jeanne d'Arc support banner
  (both reruns).
- **`upcoming`: top 2 only**, units only (no banner names), in soonest→later order
  by JP date. Mark `"approx": true` and use estimated NA dates.
  - **Estimating NA dates:** NA trails JP by ~23 months, but the offset is NOT
    constant (measured ~702–716 days; support banners get repositioned). Treat
    estimates as "early/mid month", not precise.
- Keep a short **`notes`** line: NA server, debuts-only (reruns/support hidden),
  upcoming dates are JP-schedule estimates (NA ~23mo behind, not yet announced).
- Keep `version: "NA / Global"`, `accent: "#c0a062"`, `icon: "icons/fgo.jpg"`,
  and the two links (GamePress campaigns + official NA site).

## 5. Predicting upcoming (for the 2 `upcoming` entries)

List up to the **next 3 NEW-Servant debuts** (units, no banner names), soonest→later.
Walk the JP-only entries with the smallest JP start date after the current event
(sorted JP ascending), read their `Single:` units, and **run the §3.5 NA-history check on
each — skip any whose units are all reruns.** Keep going until you have 3 new debuts.
(Example for this event: Tamamo-no-Mae (Lancer)/Altria (Archer) and Karna/Percival are
reruns and skipped; the next three new debuts are Space Ereshkigal, Mysterious Executor
C.I.E.L., then BB (Dubai).)

Helper to list the next NA rate-ups by JP order (adjust the date window):

```powershell
$pat = 'Period\s+Japan:\s*(?<js>\d{4}-\d{2}-\d{2})\s*to\s*(?<je>\d{4}-\d{2}-\d{2})\s+(?<na>NA:[^S]*?)?Single\s+(?<units>[^|]{3,140}?)(?:\s+Shared| Period | Daily|$)'
# Filter to matches WITHOUT the NA group, JP start just after the current event, sort by JP asc.
```

(The regex bleeds on support banners — verify each hit by searching the raw text
around the unit name, e.g. `$t.IndexOf('Tamamo-no-Mae (Lancer)')`.)

## 6. Apply, verify, deliver

1. Edit only the FGO `banners` / `upcoming` in `data.js`; set `lastUpdated` to today (GMT+8).
2. Validate JSON parses (strip `// ...` lines, drop `window.GACHA_DATA =` and trailing `;`,
   `ConvertFrom-Json`). Confirm 8 games present.
3. Preview (`python -m http.server` via `.claude/launch.json`) and confirm the FGO card
   shows the intended bars + 2 upcoming.
4. **Ask the user**, then `git commit` + `git push` (live site updates ~1 min later).
