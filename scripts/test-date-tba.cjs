// Run with: node scripts/test-date-tba.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const source = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(match => match[1]).find(script => script.includes('const pickBanner'));
// Exercise the actual card rendering and calendar input construction, stopping
// before calendar layout (which needs a browser).
const script = source.replace('  const fmtD =',
  '  window.result = { pickBanner, calItems }; return;\n  const fmtD =');
function render(games) {
  const cards = [];
  const node = () => ({ style: { setProperty() {} }, appendChild(card) { cards.push(card); } });
  const window = { GACHA_DATA: { lastUpdated: '2026-09-08', games } };
  const document = { getElementById: node, createElement: node };
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : ['2026-09-08T12:00:00'])); }
  }
  vm.runInNewContext(script, { window, document, Date: Clock });
  return { ...window.result, cards };
}
const game = {
  name: 'Test', banners: [{ title: 'Current', start: '2026-09-01', end: '2026-09-12' }],
  upcoming: [
    { title: 'Unknown start', date: null },
    { title: 'Missing start' },
    { title: 'Future', date: '2026-09-15', approx: true },
    { title: 'Started', date: '2026-09-07' }
  ]
};
const mixed = render([game]);
assert.equal(mixed.pickBanner(game).title, 'Started');
assert.equal(mixed.pickBanner(game).end, null);
assert.equal((mixed.cards[0].innerHTML.match(/Date TBA/g) || []).length, 2);
assert.match(mixed.cards[0].innerHTML, /in 7d/);
assert.doesNotMatch(mixed.cards[0].innerHTML, /NaN|Invalid Date/);
assert.equal(mixed.calItems.length, 3);
assert.ok(mixed.calItems.every(item => Number.isFinite(item.start.getTime())));
const undated = { name: 'TBA only', upcoming: [{ title: 'Announced', date: null }] };
const only = render([undated]);
assert.equal(only.pickBanner(undated), null);
assert.equal(only.calItems.length, 0);
assert.match(only.cards[0].innerHTML, /Announced/);
assert.match(only.cards[0].innerHTML, /Date TBA/);
assert.doesNotMatch(only.cards[0].innerHTML, /class="banner"/);
const confirmed = { name: 'Date added', upcoming: [{ title: 'Announced', date: '2026-09-08' }] };
const promoted = render([confirmed]);
assert.equal(promoted.pickBanner(confirmed).title, 'Announced');
assert.equal(promoted.calItems.length, 1);
assert.doesNotMatch(promoted.cards[0].innerHTML, /Date TBA|<h3>Upcoming/);
const dataContext = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), dataContext);
const live = render(dataContext.window.GACHA_DATA.games);
assert.equal(live.cards.length, 8);
const expectedTbaCount = dataContext.window.GACHA_DATA.games
  .flatMap(game => game.upcoming || []).filter(entry => !entry.date).length;
assert.equal(live.cards.reduce((count, card) =>
  count + (card.innerHTML.match(/Date TBA/g) || []).length, 0), expectedTbaCount);
assert.ok(live.cards.every(card => !/NaN|Invalid Date/.test(card.innerHTML)));
const games = dataContext.window.GACHA_DATA.games;
const numericVersion = value => {
  const match = String(value).match(/(\d+)\.(\d+)/);
  return match ? { major: Number(match[1]), minor: Number(match[2]) } : null;
};
assert.equal(live.cards.filter(card => card.innerHTML.includes('class="leaks"')).length, 5);
assert.ok(live.cards.every(card => !card.innerHTML.includes('class="notes"')));
for (const [index, game] of games.entries()) {
  if (['P5X', 'GFL2', 'FGO'].includes(game.short)) {
    assert.ok(!game.leaks?.length);
    assert.doesNotMatch(live.cards[index].innerHTML, /Leaked \/ Unconfirmed/);
  }
  for (const leak of game.leaks || []) {
    const currentVersion = numericVersion(game.version);
    const leakVersion = numericVersion(leak.version);
    assert.ok(['low', 'medium', 'high'].includes(leak.confidence));
    assert.ok(leak.confidenceReason && leak.version && leak.title);
    assert.doesNotMatch(leak.title, /\breruns?\b/i);
    if (currentVersion && leakVersion && currentVersion.major === leakVersion.major) {
      assert.ok(leakVersion.minor > currentVersion.minor);
      assert.ok(leakVersion.minor <= currentVersion.minor + 3);
    }
    assert.equal(new URL(leak.sourceUrl).protocol, 'https:');
    assert.match(leak.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(live.cards[index].innerHTML, /Rumoured for/);
  }
  const withoutLeaks = { ...game, leaks: [] };
  const baseline = render([withoutLeaks]);
  assert.equal(JSON.stringify(live.pickBanner(game)), JSON.stringify(baseline.pickBanner(withoutLeaks)));
  assert.equal(JSON.stringify(live.calItems.filter(item => item.name === game.name)), JSON.stringify(baseline.calItems));
}
const rumorOnly = { name: 'Rumor only', short: 'GI', notes: 'Hidden note', leaks: games[0].leaks };
const rumorResult = render([rumorOnly]);
assert.equal(rumorResult.pickBanner(rumorOnly), null);
assert.equal(rumorResult.calItems.length, 0);
assert.match(rumorResult.cards[0].innerHTML, /Leaked \/ Unconfirmed/);
assert.doesNotMatch(rumorResult.cards[0].innerHTML, /Hidden note/);
for (const short of ['P5X', 'GFL2', 'FGO']) {
  const excluded = render([{ ...rumorOnly, short }]);
  assert.doesNotMatch(excluded.cards[0].innerHTML, /Leaked \/ Unconfirmed/);
}
console.log('PASS: TBA rendering, promotion, leak isolation, excluded games, hidden notes, and all eight cards.');
