# Artwork refresh contract

The overview reads each game's optional `artwork` object from `data.js`. It rotates
GI, HSR, ZZZ, AKE, and GFL2 every eight seconds. FGO is excluded even if it later
has artwork metadata. The next scheduled banner text is independent of rotation.

```json
{
  "url": "https://pbs.twimg.com/profile_banners/1072404907230060544/1790131350/1500x500",
  "sourceUrl": "https://x.com/GenshinImpact",
  "checkedAt": "2026-09-30",
  "fallback": "assets/splash/genshin-impact.jpg",
  "position": "right center",
  "mobilePosition": "68% center"
}
```

`url` is the latest verified header image. `sourceUrl` identifies the official X
profile to check. `checkedAt` is the most recent successful header verification,
independent of banner `lastUpdated`. The other fields preserve the approved local
backup and display crop. The initial metadata comes from the headers verified and
approved on 2026-09-30; it does not represent a new check of those accounts.

## Daily repository mirror

Direct X access is blocked in the scheduled cloud environment. The existing daily
GitHub Actions mirror workflow runs `node scripts/mirror-artwork.cjs` and commits
`mirrors/artwork-headers.json` alongside the GFL2 mirrors. This runs independently
of the user's PC, at the existing 21:07 Asia/Singapore mirror time.

The script queries FxEmbed's public profile API for the five configured handles:
[provider documentation](https://docs.fxembed.com/api/twitter/operations/2profilehandle/).
FxEmbed is a third-party lookup service, not X. It needs no credentials. The script
matches the returned handle and stable numeric account ID to the saved official
account, accepts only X CDN `profile_banners` URLs, rejects older header versions,
and verifies the actual 1500x500 JPEG/PNG on `pbs.twimg.com`. Only JSON metadata is
written; image bytes are used for validation and hashing, not saved as new assets.

Each mirror record has `status`, `attemptedAt`, `verifiedAt`, `sourceUrl`,
`providerUrl`, `accountId`, `url`, `imageSha256`, and image dimensions/type/size.
On failure, `status` becomes `error`; the previous success URL/timestamp remains
for diagnostics. A failed latest attempt cannot count as new verified evidence.
FGO is never looked up. Timeouts and response-size limits bound network requests.

## Scheduled cloud refresh rules

1. Read the mirror through GitHub from the same starting commit as banner data.
   Do not request X, FxEmbed, or the CDN from the blocked cloud task, and do not
   trigger or modify the workflow during a banner refresh.
2. Require mirror version 1, the expected provider, an `ok` latest attempt,
   matching official source/provider/account IDs, and valid ordered timestamps.
   Verification must be no older than 26 hours and no more than five minutes in
   the future. The eight-day GFL2 banner freshness limit does not apply to art.
3. Require the exact `https://pbs.twimg.com/profile_banners/<id>/<version>/1500x500`
   format without query/fragment, a SHA-256 hash, 1500x500 dimensions, JPEG/PNG
   content type, and positive image size at most 2 MiB. Do not regress the numeric
   header version or the saved artwork check date.
4. Update only `artwork.url` and `artwork.checkedAt`. Derive the check date from
   the mirror's `verifiedAt` in Asia/Singapore; reading it today is not a new
   verification. Preserve official source URL, local fallback, and crop settings.
5. For missing configuration or failed, stale, malformed, unavailable, or
   mismatched evidence, keep the entire artwork object unchanged and report the
   reason. Continue independently valid banner-data publication.
6. Skip FGO entirely. The cloud refresh still writes only `data.js` in its one
   final validated publication. It must not edit mirrors, workflows, scripts,
   documentation, UI, image assets, or the scheduled task itself.

The daily mirror commit is separate from the cloud task's single data commit,
just as it already is for GFL2. Publishing the workflow changes enables the new
mirror; replacing the user's cloud prompt enables consumption of its records.

## Display and failure behavior

The dashboard displays its approved local backup immediately while loading the
verified remote header in the background, then switches to that header on success.
If remote loading fails, it keeps the backup. It skips an unavailable image if both fail. The local
backup remains the originally approved snapshot; it is not automatically replaced
when the remote URL changes. All five images preload for a 700 ms crossfade while
the left-edge fade remains. Hover, pause/resume, tab visibility, and reduced-motion
preferences control rotation. No browser-side scraping of X is performed.

Run `node scripts/test-artwork.cjs` alongside the existing rendering regression
checks before publishing artwork metadata changes.
