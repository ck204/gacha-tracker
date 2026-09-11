# Leak verification and publication gate

This workflow applies to GI, HSR, ZZZ, NTE and AKE, on Global. P5X, GFL2 and
FGO remain excluded from leak tracking. Do not change FGO during routine refreshes.

## Research before classification

1. Resolve the named character against `characters` and `characterChecks.aliases`.
   Reuse the permanent ID. Alternate spellings, translations and renamed characters
   are aliases, not new IDs. A distinct playable variant needs an explicit identity
   explanation; a costume, NPC appearance or rerun is not a new playable variant.
2. Check release history in the tracked region using official roster/release notices.
   Existing current/upcoming placement is a conservative exclusion from leaks, even
   while its original evidence still needs auditing. Do not reset history to get a
   character through the gate. Stop and flag an incorrectly classified identity for
   manual correction. A released character never becomes unannounced again.
3. Check official news, character introductions and official social/video accounts
   for a playable reveal. Reach social accounts through links on the official game
   website, not a badge or a similar account name. Inspect the original post/video;
   record the relevant wording as a short paraphrase, or a timestamp for video.
   Trailer/story/artwork appearances alone do not establish playable status.
4. Officially revealed playable characters go into Upcoming, `date: null` until an
   official banner start is established. Remove their IDs AND names from grouped
   leaks/review claims. Preserve IDs and names for wishlist continuity. Released units
   can have rerun banners but cannot appear in Leaked.
5. Only a positively identified NEW playable candidate with an inspected unofficial
   claim and completed official/roster checks can be classified `unannounced`.
   “No announcement found” is a dated research conclusion, not proof of absence.
   Inaccessible, incomplete or ambiguous checks mean `review`, not `unannounced`.

## Reddit and unofficial-source retrieval

- Search relevant game leak communities by name, aliases and version. Open the full
  post, its images/video and links. Search snippets and titles are discovery aids only;
  the general snippet fallback for banner research does NOT establish leak eligibility.
- Record post publication date, permalink and original claim attribution. Read edits,
  moderator/pinned corrections and newer posts superseding the claim. Record what was
  checked, including no correction found; never invent a successful review.
- Trace reposts to the original leaker/datamine where possible. Multiple reposts of
  one claim are one source. Upvotes, flair and community popularity are not verification.
- If the original is inaccessible but a full attributed repost can be inspected,
  record `originalInspected: false`, explain the limitation, and never use high confidence.
  If the post/image itself is unavailable, hold the claim. Never reconstruct it from
  a search snippet, deleted title or comments describing an unseen image.
- Check each member of a multi-character report separately. Publish only eligible
  characters, with `title` exactly their catalog names joined by ` + `. Keep other
  timing/context in `confidenceReason`, not extra character names in the title.

## Persistent data fields (all inside data.js)

`characters` remains the existing ID-to-name dictionary. Add a sibling
`characterChecks` keyed by the same IDs. Each record contains:

```json
{
  "status": "review",
  "region": "Global",
  "aliases": [],
  "reviewReason": "Specific unresolved question or unavailable source"
}
```

Statuses are `review`, `unannounced`, `announced`, `released`. Announced/released
records require `evidence` with a matching `outcome`. Retain these verified records
and sources across refreshes; do not research released identities from scratch.
The initial migration deliberately uses `review`, not invented verified statuses.
Its `priorPlacement` records existing `banners`, `upcoming` or `leaks` placement;
preserve current/upcoming history even after the banner disappears.

For an eligible `unannounced` record, also supply `newPlayable: true`, a specific
`identityReason`, and nonempty `officialChecks` and `releaseChecks` arrays. Their
outcomes must respectively be `no-playable-announcement-found` and `not-released`.
Every evidence/check object uses this shape:

```json
{
  "url": "https://genshin.hoyoverse.com/en/news",
  "publishedAt": null,
  "checkedAt": "YYYY-MM-DD",
  "region": "Global",
  "outcome": "no-playable-announcement-found",
  "finding": "Describe the actual inspected content, scope and character aliases checked"
}
```

This is a schema example, NOT evidence. Publication date can be null only for an
undated index/roster check; announced/released evidence needs its publication date.
For social/video URLs also provide `officialAccountUrl`, `accountLinkedFrom` (a game
website URL), and `accountVerification` describing the inspected linking evidence.
The validator has an explicit official-host list. Verify a new official domain before
changing that list interactively; never mark an arbitrary source official to pass.
NTE roots were checked against its [official site](https://nte.perfectworld.com/intermed/mktkol/en/index.html)
and [current official landing page](https://nevernesstoeverness.com/).

Each published leak also needs `sourceReview`:

```json
{
  "access": "full",
  "publishedAt": "YYYY-MM-DD",
  "checkedAt": "YYYY-MM-DD",
  "originalSourceUrl": "https://example.com/original-claim",
  "originalInspected": false,
  "claim": "Paraphrase the actual new-playable-character claim",
  "corrections": "What edits, moderator notes and newer corrections were checked"
}
```

Keep existing `sourceUrl`, `version`, `confidence`, `confidenceReason`, `checkedAt`,
and `characterIds`. Inspect every retained leak and its unannounced/release checks on
the refresh date (`lastUpdated`); do not advance checked dates without research.
An empty Leaked section is valid. Never fill it with guesses to meet a quota.

`leakReview` is a hidden queue retaining the original claim fields plus a specific
`reviewReason`. It never renders, becomes current, or enters the calendar. During
each refresh, revisit this queue along with published leaks. Keep unresolved claims
there; promote only eligible IDs to `leaks`, move announced units to Upcoming, and
remove disproven claims with the reason recorded in refresh notes. Retain character
catalogs and saved IDs. Do not leave a character both pending and published/confirmed.

## Required validation before the single remote write

Fetch latest remote main, build the complete local candidate, then run:

```text
node scripts/test-leak-validation.cjs
node scripts/test-date-tba.cjs
node scripts/test-wishlist.cjs
node scripts/validate-leaks.cjs --baseline origin/main
git diff --check
```

The validator parses strict JSON without executing data.js. It checks identity/alias
collisions, history/status regression, current/upcoming overlap, per-character evidence,
review freshness, source access, excluded games and pending/public separation. It does
not retrieve sources or prove that a finding is true. Research and full-diff review are
still mandatory. Existing version-window/date/FGO rules in CLAUDE.md also still apply.

If tools/sources are unavailable, hold uncertain claims and validate the remainder.
If validation cannot run or fails, publish nothing. Do not bypass checks or issue a
second cleanup commit. Report held claim count and unresolved reasons in the run result.
GitHub Actions repeats these checks after pushes and on PRs as a backstop; a direct-main
push has already happened by then, so CI is not a substitute for this pre-write gate.

The existing external scheduled task must read the latest CLAUDE.md and this runbook
each run. No new schedule or runtime web scraper is introduced by these changes.
