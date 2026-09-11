// Run from the trusted main checkout. Never execute candidate-branch code.
const fs = require('node:fs');
const cp = require('node:child_process');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { read } = require('./validate-leaks.cjs');
const git = (...args) => cp.execFileSync('git', args, { encoding: 'utf8' }).trim();
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
function safeRead(source) {
  // Reject executable preambles too: the older parser only finds the assignment.
  assert.match(source, /^(?:\s|\/\/[^\n]*(?:\n|$))*window\.GACHA_DATA\s*=/, 'Candidate has an executable preamble');
  return read(source);
}
function validateCandidate(candidate, baseline, today) {
  assert.equal(candidate.lastUpdated, today, 'Candidate lastUpdated must be today in Asia/Singapore');
  assert.deepEqual(candidate.games.map(g => g.short), baseline.games.map(g => g.short), 'Preserve game identities/order');
  assert.deepEqual(candidate.games.find(g => g.short === 'FGO'), baseline.games.find(g => g.short === 'FGO'), 'FGO must remain untouched');
  const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  for (const game of candidate.games) {
    for (const entry of [...(game.banners || []), ...(game.upcoming || [])]) {
      const start = entry.start ?? entry.date;
      const end = entry.end ?? entry.endDate;
      if (start != null) assert.ok(validDate(start), `${game.short}: invalid start date`);
      if (end != null) assert.ok(validDate(end) && validDate(start) && start <= end, `${game.short}: invalid end date`);
    }
    const old = baseline.games.find(g => g.short === game.short);
    const version = text => String(text).match(/(\d+)\.(\d+)/)?.slice(1).map(Number);
    const a = version(old.version), b = version(game.version);
    if (a) assert.ok(b && (b[0] > a[0] || (b[0] === a[0] && b[1] >= a[1])), `${game.short}: version regression`);
  }
}
function prepare({ candidateSha, audit = false, dryRun = false, today }) {
  const main = git('rev-parse', 'HEAD');
  const baselineSource = cp.execFileSync('git', ['show', `${main}:data.js`], { encoding: 'utf8' });
  const baseline = safeRead(baselineSource);
  let source = baselineSource;
  if (!audit) {
    assert.match(candidateSha, /^[a-f0-9]{40}$/, 'A full immutable candidate SHA is required');
    const parents = git('rev-list', '--parents', '-n', '1', candidateSha).split(' ');
    assert.equal(parents.length, 2, 'Candidate must be a single-parent data-only commit');
    const parent = parents[1];
    git('merge-base', '--is-ancestor', parent, main);
    assert.equal(git('diff', '--name-only', parent, candidateSha), 'data.js', 'Candidate must change only data.js');
    source = cp.execFileSync('git', ['show', `${candidateSha}:data.js`], { encoding: 'utf8' });
    const candidate = safeRead(source);
    if (source !== baselineSource) {
      assert.equal(git('rev-parse', `${parent}:data.js`), git('rev-parse', `${main}:data.js`), 'Stale candidate: main data changed; research/rebase against latest main');
      validateCandidate(candidate, baseline, today);
    }
  }
  safeRead(source); // Must pass BEFORE the existing VM-based rendering tests run.
  fs.writeFileSync('data.js', source);
  const state = { main, candidateSha: candidateSha || main, hash: sha256(source), dryRun: audit || dryRun, changed: source !== baselineSource };
  fs.writeFileSync('.git/refresh-state.json', JSON.stringify(state));
  return state;
}
function publish() {
  const state = JSON.parse(fs.readFileSync('.git/refresh-state.json', 'utf8'));
  assert.equal(sha256(fs.readFileSync('data.js')), state.hash, 'Candidate bytes changed after validation');
  assert.equal(git('rev-parse', 'HEAD'), state.main, 'Local base changed after validation');
  if (state.dryRun) { console.log('Cloud validation passed. Dry run: main not changed.'); return; }
  git('fetch', 'origin', 'main');
  assert.equal(git('rev-parse', 'origin/main'), state.main, 'Main advanced during validation. Retry to validate against the new main; never force push.');
  if (state.changed) {
    git('add', '--', 'data.js');
    assert.equal(git('diff', '--cached', '--name-only'), 'data.js', 'Only data.js may be published');
    git('config', 'user.name', 'github-actions[bot]');
    git('config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com');
    git('commit', '-m', `Refresh verified banner data\n\nRefresh-Candidate: ${state.candidateSha}`);
    git('push', 'origin', 'HEAD:refs/heads/main'); // Ordinary push rejects a racing main update.
  }
  const published = git('rev-parse', 'HEAD');
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `published_sha=${published}\n`);
  console.log(`${state.changed ? 'Published' : 'Already current'}: ${published}`);
}
if (require.main === module) {
  try {
    if (process.argv[2] === 'prepare') {
      const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Singapore', year:'numeric', month:'2-digit', day:'2-digit' }).format(new Date());
      const audit = !process.env.CANDIDATE_SHA && process.env.DRY_RUN === 'true';
      prepare({ candidateSha: process.env.CANDIDATE_SHA, audit, dryRun: process.env.DRY_RUN === 'true', today });
    } else if (process.argv[2] === 'publish') publish();
    else throw Error('Usage: cloud-refresh.cjs prepare|publish');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { safeRead, validateCandidate, prepare, publish };
