// Exercise the actual artwork controller with deterministic time and image loading.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const dataText = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
const data = JSON.parse(dataText.split('window.GACHA_DATA =')[1].trim().replace(/;$/, ''));
const eligible = data.games.filter(game => game.short !== 'FGO' && game.artwork);
assert.deepEqual(eligible.map(game => game.short), ['GI', 'HSR', 'ZZZ', 'AKE', 'GFL2']);
for (const { artwork } of eligible) {
  assert.match(artwork.url, /^https:\/\/pbs\.twimg\.com\/profile_banners\/\d+\/\d+\/1500x500$/);
  assert.match(artwork.sourceUrl, /^https:\/\/x\.com\/[A-Za-z0-9_]+$/);
  assert.match(artwork.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(fs.existsSync(path.join(root, artwork.fallback)));
  assert.equal(typeof artwork.position, 'string');
  assert.equal(typeof artwork.mobilePosition, 'string');
}
const source = fs.readFileSync(path.join(root, 'dashboard-ui.js'), 'utf8');
const controller = source.slice(source.indexOf('  const rotationGames ='),
  source.indexOf("  const summary = document.getElementById('hero-summary');"));
assert.ok(controller.startsWith('  const rotationGames ='));
function fixture(games = data.games, reduced = false, nextGame = 'GI') {
  function element() {
    const classes = new Set();
    const events = {};
    const attrs = {};
    return {
      dataset: {}, style: { setProperty() {} }, complete: true, naturalWidth: 1500,
      classList: {
        toggle(name, on) { on ? classes.add(name) : classes.delete(name); },
        add(name) { classes.add(name); }, remove(name) { classes.delete(name); },
        contains(name) { return classes.has(name); }
      },
      cloneNode() { return element(); }, removeAttribute(name) { delete attrs[name]; },
      setAttribute(name, value) { attrs[name] = value; }, getAttribute(name) { return attrs[name]; },
      addEventListener(name, fn) { events[name] = fn; }, emit(name, event = {}) { events[name]?.(event); }
    };
  }
  const images = [element()];
  const hero = element();
  let button;
  hero.append = el => el.type === 'button' ? button = el : images.push(el);
  const document = element();
  document.hidden = false;
  document.querySelector = () => hero;
  document.getElementById = () => images[0];
  document.createElement = () => element();
  const media = element();
  media.matches = reduced;
  const timers = new Map();
  const remoteImages = [];
  let timerId = 0;
  const window = {
    matchMedia: () => media,
    setTimeout(fn, delay) { assert.equal(delay, 8000); timers.set(++timerId, fn); return timerId; },
    clearTimeout(id) { timers.delete(id); }
  };
  function Image() { const image = element(); remoteImages.push(image); return image; }
  vm.runInNewContext(controller, { window, document, Image, data: { games }, future: [{ game: { short: nextGame } }] });
  return {
    images, remoteImages, hero, document, media, button, timers,
    active: () => images.find(el => el.classList.contains('is-active'))?.dataset.artGame,
    tick() { assert.equal(timers.size, 1); const [id, fn] = [...timers][0]; timers.delete(id); fn(); }
  };
}
const f = fixture([...eligible, { short: 'FGO', artwork: eligible[0].artwork }]);
assert.deepEqual(f.images.map(el => el.dataset.artGame), ['GI', 'HSR', 'ZZZ', 'AKE', 'GFL2']);
for (let i = 0; i < eligible.length; i++) {
  assert.equal(f.images[i].src, eligible[i].artwork.fallback);
  assert.equal(f.remoteImages[i].src, eligible[i].artwork.url);
  f.remoteImages[i].onload();
  assert.equal(f.images[i].src, eligible[i].artwork.url);
}
for (const expected of ['HSR', 'ZZZ', 'AKE', 'GFL2', 'GI']) { f.tick(); assert.equal(f.active(), expected); }
f.hero.emit('mouseenter'); assert.equal(f.timers.size, 0);
f.hero.emit('mouseleave'); assert.equal(f.timers.size, 1);
f.button.emit('pointerdown'); f.hero.emit('focusin'); f.button.emit('click');
assert.equal(f.timers.size, 0);
assert.equal(f.button.getAttribute('aria-label'), 'Resume artwork rotation');
f.button.emit('click'); assert.equal(f.timers.size, 1);
f.document.hidden = true; f.document.emit('visibilitychange'); assert.equal(f.timers.size, 0);
f.document.hidden = false; f.document.emit('visibilitychange'); assert.equal(f.timers.size, 1);
f.images[1].emit('error'); assert.equal(f.images[1].src, eligible[1].artwork.fallback);
f.images[1].naturalWidth = 0; f.images[1].emit('error'); assert.equal(f.images[1].hidden, true);
f.tick(); assert.equal(f.active(), 'ZZZ');
f.media.emit('change', { matches: true }); assert.equal(f.timers.size, 0);
assert.equal(fixture(data.games, true).timers.size, 0);
const changed = JSON.parse(JSON.stringify(eligible));
changed[0].artwork.url = 'https://pbs.twimg.com/profile_banners/1/2/1500x500';
assert.equal(fixture(changed).remoteImages[0].src, changed[0].artwork.url);
assert.equal(fixture(data.games, false, 'FGO').active(), 'GI');
const empty = fixture([]); assert.equal(empty.timers.size, 0); assert.equal(empty.button.hidden, true);
const single = fixture([eligible[0]]); assert.equal(single.timers.size, 0); assert.equal(single.button.hidden, true);
console.log('PASS: artwork metadata, data-driven URL updates, 8-second rotation, FGO exclusion, fallback failures, pause controls, visibility, reduced motion, and empty/single artwork.');
