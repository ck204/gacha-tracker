// Offline consistency/evidence gate, not an internet fact checker.
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const eligible = new Set(['GI', 'HSR', 'ZZZ', 'NTE', 'AKE']);
const officialHosts = {
  GI: ['genshin.hoyoverse.com'], HSR: ['hsr.hoyoverse.com'],
  ZZZ: ['zenless.hoyoverse.com'], NTE: ['nte.perfectworld.com', 'nevernesstoeverness.com'],
  AKE: ['endfield.gryphline.com']
};
const text = value => typeof value === 'string' && value.trim().length > 0;
const date = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const url = value => { try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password; } catch { return false; } };
const normalize = value => String(value).normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
function read(source) {
  const match = source.match(/window\.GACHA_DATA\s*=\s*([\s\S]*?)\s*;?\s*$/);
  if (!match) throw Error('Missing GACHA_DATA assignment');
  return JSON.parse(match[1]); // Do not execute incoming data as JavaScript.
}
function validate(data, baseline = { games: [] }) {
  const errors = [];
  const check = (ok, message) => { if (!ok) errors.push(message); };
  check(date(data.lastUpdated), 'lastUpdated: invalid date');
  for (const game of data.games) {
    const prefix = game.short;
    const old = baseline.games.find(g => g.short === prefix) || {};
    const leaks = game.leaks || [];
    if (!eligible.has(prefix)) { check(!leaks.length, `${prefix}: leaks are excluded`); continue; }
    const catalog = game.characters || {};
    const records = game.characterChecks || {};
    const confirmed = new Set([...(game.banners || []), ...(game.upcoming || [])].flatMap(e => e.characterIds || []));
    const historical = new Set([...(old.banners || []), ...(old.upcoming || [])].flatMap(e => e.characterIds || []));
    const identities = new Map();
    for (const [id, name] of Object.entries(catalog)) {
      check(id.startsWith(prefix.toLowerCase() + ':') && text(name), `${prefix}/${id}: invalid identity`);
      const record = records[id];
      check(record && ['review', 'unannounced', 'announced', 'released'].includes(record.status), `${id}: missing/invalid character status`);
      if (!record) continue;
      check(record.region === 'Global', `${id}: review must target Global`);
      check(Array.isArray(record.aliases) && record.aliases.every(text), `${id}: aliases must be a string list`);
      for (const alias of [name, ...(Array.isArray(record.aliases) ? record.aliases : [])]) {
        const key = normalize(alias);
        check(!identities.has(key) || identities.get(key) === id, `${id}: duplicate character name/alias ${alias}`);
        identities.set(key, id);
      }
      const previous = old.characterChecks?.[id];
      if (previous?.priorPlacement && previous.priorPlacement !== 'leaks') {
        check(record.priorPlacement === previous.priorPlacement, `${id}: preserve historical placement`);
      }
      if (previous?.status === 'released') check(record.status === 'released', `${id}: released status cannot regress`);
      if (previous?.status === 'announced') check(['announced', 'released'].includes(record.status), `${id}: announced status cannot regress`);
      if (historical.has(id) || confirmed.has(id) || ['banners', 'upcoming'].includes(record.priorPlacement)) {
        check(record.status !== 'unannounced', `${id}: previously current/upcoming character cannot become a leak`);
      }
      if (record.status === 'review') check(text(record.reviewReason), `${id}: review needs a reason`);
      if (['announced', 'released'].includes(record.status)) {
        check(validOfficial(record.evidence, game, data.lastUpdated) && date(record.evidence?.publishedAt) &&
          record.evidence?.outcome === record.status, `${id}: status needs dated official evidence with matching outcome`);
      }
    }
    // Keep history even after a banner is removed; aliases cannot be reset to evade checks.
    for (const id of Object.keys(old.characters || {})) {
      check(Object.hasOwn(catalog, id), `${id}: preserve permanent character ID`);
      for (const alias of old.characterChecks?.[id]?.aliases || []) {
        check(records[id]?.aliases?.includes(alias), `${id}: preserve known alias ${alias}`);
      }
      if (catalog[id] && catalog[id] !== old.characters[id]) {
        check(records[id]?.aliases?.includes(old.characters[id]), `${id}: retain previous display name as alias`);
      }
    }
    const seen = new Set();
    for (const leak of leaks) {
      const label = `${prefix}/${leak.title}`;
      const ids = leak.characterIds || [];
      check(ids.length > 0 && new Set(ids).size === ids.length, `${label}: needs unique character IDs`);
      check(leak.title === ids.map(id => catalog[id]).join(' + '), `${label}: title must contain only the referenced character names`);
      check(date(leak.checkedAt) && leak.checkedAt === data.lastUpdated, `${label}: recheck retained leaks on this refresh date`);
      check(url(leak.sourceUrl), `${label}: missing source URL`);
      check(['low', 'medium', 'high'].includes(leak.confidence) && text(leak.confidenceReason), `${label}: missing confidence assessment`);
      const review = leak.sourceReview;
      check(review?.access === 'full' && review?.checkedAt === leak.checkedAt && date(review?.publishedAt) && review.publishedAt <= leak.checkedAt &&
        text(review?.claim) && text(review?.corrections) && url(review?.originalSourceUrl) && typeof review?.originalInspected === 'boolean',
        `${label}: requires full-post review, publication date, original attribution and correction check`);
      if (leak.confidence === 'high') check(review?.originalInspected === true, `${label}: high confidence requires inspected original`);
      for (const id of ids) {
        check(!seen.has(id), `${id}: duplicate leak entry`); seen.add(id);
        check(!confirmed.has(id) && !historical.has(id), `${id}: overlaps current/upcoming or historical banner`);
        const r = records[id];
        check(r?.status === 'unannounced' && r?.newPlayable === true && text(r?.identityReason), `${id}: new unannounced playable identity not established`);
        for (const [field, outcome] of [['officialChecks', 'no-playable-announcement-found'], ['releaseChecks', 'not-released']]) {
          check(Array.isArray(r?.[field]) && r[field].length > 0 && r[field].every(e =>
            validOfficial(e, game, leak.checkedAt) && e.checkedAt === leak.checkedAt && e.outcome === outcome), `${id}: missing fresh ${field}`);
        }
      }
    }
    for (const pending of game.leakReview || []) {
      check(text(pending.reviewReason) && pending.characterIds?.length > 0, `${prefix}: pending leak needs identities and reason`);
      for (const id of pending.characterIds || []) {
        check(Object.hasOwn(catalog, id), `${id}: pending identity missing`);
        check(!seen.has(id), `${id}: cannot be both pending and published leak`);
        check(!confirmed.has(id), `${id}: remove confirmed character from pending leaks`);
      }
    }
  }
  for (const old of baseline.games) check(data.games.some(g => g.short === old.short), `${old.short}: game removed`);
  return errors;
}
function validOfficial(e, game, checkedAt) {
  if (!e || !url(e.url) || !date(e.checkedAt) || e.checkedAt > checkedAt || !text(e.finding) || e.region !== 'Global') return false;
  // A review of a roster/news index may have no publication date. Say so explicitly.
  if (!(e.publishedAt === null || (date(e.publishedAt) && e.publishedAt <= e.checkedAt))) return false;
  const hosts = officialHosts[game.short] || [];
  if (hosts.includes(new URL(e.url).hostname)) return true;
  // Social/video accounts must have been reached through an official website link.
  return url(e.accountLinkedFrom) && hosts.includes(new URL(e.accountLinkedFrom).hostname) &&
    url(e.officialAccountUrl) && new URL(e.url).hostname === new URL(e.officialAccountUrl).hostname &&
    text(e.accountVerification);
}
if (require.main === module) {
  try {
    const root = path.resolve(__dirname, '..');
    const args = process.argv.slice(2);
    if (args.length && (args.length !== 2 || args[0] !== '--baseline')) throw Error('Usage: node scripts/validate-leaks.cjs [--baseline <git-ref>]');
    const data = read(fs.readFileSync(path.join(root, 'data.js'), 'utf8'));
    const baseline = args.length ? read(cp.execFileSync('git', ['show', `${args[1]}:data.js`], { cwd: root, encoding: 'utf8' })) : undefined;
    const errors = validate(data, baseline);
    if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
    else console.log(`PASS: leak evidence and identity checks (${data.games.reduce((n, g) => n + (g.leakReview || []).length, 0)} claims held for review).`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { read, validate };
