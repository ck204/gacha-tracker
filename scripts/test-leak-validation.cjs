const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { validate, read } = require('./validate-leaks.cjs');
// Entirely synthetic evidence: tests schema/logic, not source truth.
const evidence = outcome => ({ url: 'https://genshin.hoyoverse.com/en/news', publishedAt: null,
  checkedAt: '2026-09-11', region: 'Global', outcome, finding: 'Synthetic inspected result' });
const fixture = () => ({ lastUpdated: '2026-09-11', games: [{short: 'GI',
  characters: {'gi:new': 'New Unit'}, banners: [], upcoming: [],
  characterChecks: {'gi:new': { status: 'unannounced', region: 'Global', aliases: ['Alias'], newPlayable: true,
    identityReason: 'Synthetic distinct playable identity', officialChecks: [evidence('no-playable-announcement-found')], releaseChecks: [evidence('not-released')] }},
  leaks: [{title: 'New Unit', characterIds: ['gi:new'], version: '7.2', confidence: 'low', confidenceReason: 'Synthetic',
    sourceUrl: 'https://www.reddit.com/r/example/comments/synthetic', checkedAt: '2026-09-11',
    sourceReview: {access: 'full', publishedAt: '2026-09-10', checkedAt: '2026-09-11', originalSourceUrl: 'https://example.com/original',
      originalInspected: false, claim: 'Synthetic claim', corrections: 'Synthetic check'} }]
}] });
assert.deepEqual(validate(fixture()), []);
let count = 0;
function rejects(name, mutate, pattern, baseline) {
  const data = fixture(); mutate(data.games[0], data);
  assert.match(validate(data, baseline).join('\n'), pattern, name); count++;
}
rejects('current overlap', g => g.banners.push({characterIds:['gi:new']}), /overlaps/);
rejects('announced overlap', g => g.upcoming.push({characterIds:['gi:new'],date:null}), /overlaps/);
rejects('released rerun', g => g.characterChecks['gi:new'].status='released', /new unannounced/);
rejects('announced leak', g => g.characterChecks['gi:new'].status='announced', /new unannounced/);
rejects('review leak', g => g.characterChecks['gi:new'].status='review', /new unannounced/);
rejects('missing metadata', g => delete g.characterChecks, /missing\/invalid/);
rejects('alias duplicate', g => {g.characters['gi:alias']='Alias';g.characterChecks['gi:alias']={status:'review',region:'Global',aliases:[],reviewReason:'Test'};}, /duplicate character/);
rejects('duplicate entry', g => g.leaks.push(structuredClone(g.leaks[0])), /duplicate leak/);
rejects('unlisted rerun in title', g => g.leaks[0].title+=' + Old Unit rerun', /title must/);
rejects('missing release evidence', g => delete g.characterChecks['gi:new'].releaseChecks, /releaseChecks/);
rejects('stale official check', g => g.characterChecks['gi:new'].officialChecks[0].checkedAt='2026-09-10', /officialChecks/);
rejects('unofficial source', g => g.characterChecks['gi:new'].officialChecks[0].url='https://reddit.com/r/test', /officialChecks/);
rejects('wrong region', g => g.characterChecks['gi:new'].releaseChecks[0].region='CN', /releaseChecks/);
rejects('snippet only', g => g.leaks[0].sourceReview.access='snippet', /full-post review/);
rejects('future publication', g => g.leaks[0].sourceReview.publishedAt='2026-09-12', /full-post review/);
rejects('invalid publication', g => g.leaks[0].sourceReview.publishedAt='2026-02-30', /full-post review/);
rejects('uninspected high confidence', g => g.leaks[0].confidence='high', /high confidence/);
rejects('stale claim check', g => g.leaks[0].checkedAt='2026-09-10', /recheck retained/);
rejects('pending and public', g => g.leakReview=[{characterIds:['gi:new'],reviewReason:'Test'}], /both pending/);
const old = fixture(); old.games[0].characterChecks['gi:new'].status='released';
rejects('released regression', () => {}, /cannot regress/, old);
old.games[0].characterChecks['gi:new'].status='announced';
rejects('announced regression', () => {}, /cannot regress/, old);
rejects('removed alias', g => g.characterChecks['gi:new'].aliases=[], /preserve known alias/, fixture());
rejects('renamed without alias', g => g.characters['gi:new']='New Name', /previous display name/, fixture());
const history = fixture(); history.games[0].banners=[{characterIds:['gi:new']}];
rejects('removed banner still remembered', () => {}, /historical banner/, history);
for (const short of ['P5X', 'GFL2', 'FGO']) rejects('excluded '+short, g => g.short=short, /excluded/);
const held=fixture();held.games[0].leaks=[];held.games[0].characterChecks['gi:new']={status:'review',region:'Global',aliases:[],reviewReason:'Unavailable'};
held.games[0].leakReview=[{characterIds:['gi:new'],reviewReason:'Post unavailable'}];
assert.deepEqual(validate(held), []);
const approved=fixture();approved.games[0].leaks=[];approved.games[0].characterChecks['gi:new'].status='announced';
approved.games[0].characterChecks['gi:new'].evidence={...evidence('announced'),publishedAt:'2026-09-10'};
approved.games[0].upcoming=[{characterIds:['gi:new'],date:null}];
assert.deepEqual(validate(approved), []);
assert.throws(() => read('window.GACHA_DATA = (() => { throw Error(); })();'));
const live=read(fs.readFileSync(path.join(__dirname,'..','data.js'),'utf8'));
assert.deepEqual(validate(live), []);
console.log(`PASS: ${count} invalid leak proposals rejected; eligible, pending and announced cases accepted; live schema validated.`);
