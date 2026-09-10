const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'wishlist.js'), 'utf8'), context);
vm.runInNewContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), context);
const { create, decode } = context.window.GachaWishlist;
let saved = null;
const storage = { getItem: () => saved, setItem: (_, value) => { saved = value; } };
const list = create(storage);
list.toggle('gi:flins');
assert.equal(create(storage).selected.has('gi:flins'), true, 'survives reload');
assert.equal(list.has({ characterIds: ['gi:ineffa', 'gi:flins'] }), true, 'multi-character banner');
assert.equal(list.has({ characterIds: ['hsr:flins'] }), false, 'game identities are separate');
assert.equal(list.has({ title: 'Flins rerun' }), false, 'no title guessing');
assert.equal(list.has({ characterIds: ['gi:flins'], end: '2020-01-01' }), true, 'ending does not unstar');
assert.equal(list.has({ characterIds: ['gi:flins'], start: '2030-01-01' }), true, 'future rerun matches');
assert.equal(create(storage).selected.size, 1, 'no dependency on current catalog');
list.toggle('gi:flins');
assert.equal(create(storage).selected.size, 0, 'removal persists');
saved = 'invalid json';
assert.ok(create(storage).warning);
assert.throws(() => decode('{}'));
assert.throws(() => decode('[null]'));
assert.equal(decode('["gi:flins","gi:flins"]').size, 1);
const unavailable = create({ getItem() { throw Error(); }, setItem() { throw Error(); } });
unavailable.toggle('gi:flins');
assert.equal(unavailable.selected.has('gi:flins'), true);
assert.match(unavailable.warning, /only available in this tab/);
saved = '["gi:ineffa"]'; list.reload();
assert.equal(list.selected.has('gi:ineffa'), true, 'another tab changes selection');
saved = null; list.reload(); assert.equal(list.selected.size, 0);
const data = context.window.GACHA_DATA;
for (const game of data.games) {
  for (const entry of [...game.banners, ...game.upcoming, ...(game.leaks || [])]) {
    assert.ok(entry.characterIds.length, entry.title);
    for (const id of entry.characterIds) {
      assert.ok(id.startsWith(game.short.toLowerCase() + ':'));
      assert.ok(game.characters[id], `missing name: ${id}`);
    }
  }
}
const p5x = data.games.find(g => g.short === 'P5X');
assert.equal(p5x.upcoming[0].characterIds.length, 1, 'story is not a character');
assert.equal(p5x.upcoming.at(-1).characterIds.length, 1, 'alias is not a second character');
console.log('PASS: wishlist persistence, reruns, identity, removal, invalid/blocked storage, cross-tab reload, and all character references.');

// Date ordering and status are independent of wishlist insertion order.
const { timeline } = context.window.GachaWishlist;
const fixture = [{ characters: { 'gi:live':'Live', 'gi:soon':'Soon', 'gi:later':'Later', 'gi:tba':'TBA', 'gi:expired':'Expired', 'gi:leak':'Leak' },
 banners: [{characterIds:['gi:live'],start:'2026-09-01',end:'2026-09-10'}, {characterIds:['gi:expired'],start:'2026-08-01',end:'2026-08-31'}],
 upcoming: [{characterIds:['gi:later'],date:'2026-09-30'}, {characterIds:['gi:soon'],date:'2026-09-11',approx:true}, {characterIds:['gi:tba'],date:null}],
 leaks: [{characterIds:['gi:leak'],date:'2026-09-01'}] }];
const rows=timeline(fixture,new Set(['gi:tba','gi:later','gi:expired','gi:soon','gi:live','gi:leak']),new Date('2026-09-10T23:59:00'));
assert.equal(rows[0].id,'gi:live');
assert.equal(rows[1].id,'gi:soon');
assert.equal(rows[1].days,1);
assert.equal(rows[1].approx,true);
assert.equal(rows[2].id,'gi:later');
assert.equal(rows[2].days,20);
assert.ok(rows.slice(3).every(row=>row.rank===2));
assert.ok(rows.find(row=>row.id==='gi:leak').leak);
assert.equal(timeline(fixture,new Set(['gi:live']),new Date('2026-09-11T00:00:00'))[0].rank,2);
fixture[0].upcoming.push({characterIds:['gi:expired'],date:'2026-10-01'});
assert.equal(timeline(fixture,new Set(['gi:expired']),new Date('2026-09-10'))[0].date,'2026-10-01');
assert.equal(timeline([],new Set(['gi:missing']))[0].rank,2);
console.log('PASS: live/future/TBA sorting, end boundaries, calendar day counts, estimated dates, reruns, missing characters, and leak isolation.');
