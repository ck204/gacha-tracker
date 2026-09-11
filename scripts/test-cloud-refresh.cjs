const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const cp = require('node:child_process');
const { safeRead, validateCandidate, prepare, publish } = require('./cloud-refresh.cjs');
const baseline = { lastUpdated: '2026-09-10', games: [
  {short:'GI',version:'7.0',banners:[],upcoming:[]},
  {short:'FGO',version:'NA',banners:[],upcoming:[]}
] };
const candidate = {...structuredClone(baseline),lastUpdated:'2026-09-11'};
validateCandidate(candidate, baseline, '2026-09-11');
assert.throws(()=>validateCandidate(candidate,baseline,'2026-09-12'),/today/);
const altered=structuredClone(candidate); altered.games[1].upcoming.push({title:'Changed'});
assert.throws(()=>validateCandidate(altered,baseline,'2026-09-11'),/FGO/);
altered.games[1].upcoming=[];altered.games[0].version='6.9';
assert.throws(()=>validateCandidate(altered,baseline,'2026-09-11'),/regression/);
altered.games[0].version='7.0';altered.games[0].banners=[{start:'2026-02-30',end:null}];
assert.throws(()=>validateCandidate(altered,baseline,'2026-09-11'),/invalid start/);
const encode = data => '// Test data\nwindow.GACHA_DATA = '+JSON.stringify(data)+';\n';
assert.deepEqual(safeRead(encode(baseline)),baseline);
assert.throws(()=>safeRead('process.exit();\n'+encode(baseline)),/preamble/);
assert.throws(()=>safeRead('window.GACHA_DATA = (() => ({}))();'));
const cwd=process.cwd(), temp=fs.mkdtempSync(path.join(os.tmpdir(),'gacha-cloud-test-'));
const git=(...args)=>cp.execFileSync('git',args,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
try {
  process.chdir(temp);
  git('init');git('config','user.name','Test');git('config','user.email','test@example.invalid');
  fs.writeFileSync('data.js',encode(baseline));git('add','.');git('commit','-m','baseline');
  const base=git('rev-parse','HEAD');
  fs.writeFileSync('data.js',encode(candidate));git('add','.');git('commit','-m','candidate');
  const sha=git('rev-parse','HEAD');git('checkout','--detach',base);
  const state=prepare({candidateSha:sha,dryRun:true,today:'2026-09-11'});
  assert.equal(state.changed,true);assert.equal(fs.readFileSync('data.js','utf8'),encode(candidate));
  publish();assert.equal(git('rev-parse','HEAD'),base,'Dry-run must not publish');
  fs.appendFileSync('data.js','\n');assert.throws(()=>publish(),/bytes changed/);
  git('checkout','--','data.js');
  fs.writeFileSync('data.js',encode({...baseline,lastUpdated:'2026-09-09'}));git('add','.');git('commit','-m','new main data');
  assert.throws(()=>prepare({candidateSha:sha,today:'2026-09-11'}),/Stale candidate/);
  git('checkout','--detach',base);fs.writeFileSync('not-data.txt','test');git('add','.');git('commit','-m','wrong file');
  const bad=git('rev-parse','HEAD');git('checkout','--detach',base);
  assert.throws(()=>prepare({candidateSha:bad,today:'2026-09-11'}),/only data.js/);
  prepare({audit:true,today:'2026-09-11'});publish();assert.equal(git('rev-parse','HEAD'),base);
} finally {
  process.chdir(cwd);
  // Only this test's newly-created directory is removed; never a user checkout.
  fs.rmSync(temp,{recursive:true,force:true});
}
console.log('PASS: cloud staging, dry-run, exact bytes, stale candidates, data-only scope, strict JSON, dates and FGO preservation.');
