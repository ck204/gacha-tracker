const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'game-visibility.js'), 'utf8'), context);
const { KEY, create, decode } = context.window.GachaGameVisibility;

let saved = null;
const storage = {
  getItem(key) { assert.equal(key, KEY); return saved; },
  setItem(key, value) { assert.equal(key, KEY); saved = value; }
};
const visibility = create(storage);
visibility.hide('GI');
assert.equal(visibility.has('GI'), true);
assert.equal(create(storage).has('GI'), true, 'hidden game survives reload');
visibility.hide('HSR');
assert.equal(visibility.hidden.size, 2);
visibility.show('GI');
assert.equal(visibility.has('GI'), false);
visibility.showAll();
assert.equal(visibility.hidden.size, 0);
assert.deepEqual([...decode('["GI","GI"]')], ['GI']);
assert.throws(() => decode('{}'));
assert.throws(() => decode('[null]'));
assert.throws(() => decode('["bad id"]'));

const unavailable = create({ getItem() { throw Error(); }, setItem() { throw Error(); } });
unavailable.hide('ZZZ');
assert.equal(unavailable.has('ZZZ'), true);
assert.match(unavailable.warning, /only available in this tab/);

saved = '["P5X"]';
visibility.reload();
assert.equal(visibility.has('P5X'), true, 'another tab changes hidden games');
const calendarSource = html.slice(html.indexOf('// ---- Calendar overview ----'), html.indexOf('function refreshWishlist'));
assert.doesNotMatch(calendarSource, /gameVisibility|hidden-games/, 'card visibility must not affect the calendar path');
console.log('PASS: game-card visibility persistence, restore, validation, blocked storage, and cross-tab reload.');
