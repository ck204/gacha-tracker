// Exercise the actual calendar renderer, filters, navigation, and tooltips.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.match(html, /src="schedule-data\.js\?v=/, 'manual dates use the cache-busted loader');
const source = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(match => match[1]).find(script => script.includes('const pickBanner'));
const script = source.replace('  function refreshWishlist() {',
  '  window.calendarTest = { calItems, renderCal, calEnd }; return;\n  function refreshWishlist() {');
const scheduleText = fs.readFileSync(path.join(root, 'schedule-data.js'), 'utf8');
const schedule = JSON.parse(scheduleText.split('window.GACHA_SCHEDULE =')[1]);
assert.equal(new Set(schedule.events.map(event => event.id)).size, schedule.events.length);
assert.deepEqual(schedule.events.map(({ game, region, date }) => [game, region, date]), [
  ['Azur Promelia', 'CN/KR/JP', '2026-11-26'],
  ['Petit Planet', 'Global', '2026-12-04'],
  ['Silver Palace', 'Global', '2026-12-14'],
  ['Ananta', 'Global', '2027-01-15']
]);

function fixture(now = '2026-11-02T12:00:00', events = schedule.events) {
  function node() {
    return { innerHTML: '', textContent: '', hidden: false, checked: false,
      style: { setProperty() {} }, children: [], events: {}, offsetHeight: 200,
      offsetWidth: 200, appendChild(child) { this.children.push(child); },
      addEventListener(name, callback) { this.events[name] = callback; },
      querySelectorAll() { return []; } };
  }
  const nodes = new Map();
  const get = id => { if (!nodes.has(id)) nodes.set(id, node()); return nodes.get(id); };
  const document = { getElementById: get, createElement: node };
  const window = { innerWidth: 1000, innerHeight: 800, GACHA_SCHEDULE: { events },
    GACHA_DATA: { lastUpdated: '2026-11-02', games: [{ name: 'Existing game', short: 'T',
      banners: [{ title: 'Regular banner', start: '2026-11-01', end: null }], upcoming: [] }] } };
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
  }
  for (const file of ['wishlist.js', 'game-visibility.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), { window });
  }
  vm.runInNewContext(script, { window, document, Date: Clock });
  return { ...window.calendarTest, get,
    next() { get('cal-next').events.click(); },
    select(game) { get('cal-filters').events.click({ target: {
      closest: () => ({ dataset: game ? { game } : {} }) } }); } };
}

const previousTimezone = process.env.TZ;
try {
  for (const timezone of ['UTC', 'America/Los_Angeles', 'Asia/Singapore']) {
    process.env.TZ = timezone;
    const calendar = fixture();
    const list = calendar.get('cal-launches');
    assert.equal(calendar.get('grid').children.length, 1, 'launches create no empty game cards');
    assert.equal(calendar.calItems.filter(item => item.type === 'launch').length, 4);
    assert.match(calendar.get('cal-filters').innerHTML, /Launches<\/button>/);
    assert.match(list.innerHTML, /Azur Promelia/);
    assert.doesNotMatch(list.innerHTML, /Petit Planet|Silver Palace|Ananta/);
    assert.match(list.innerHTML, /CN\/KR\/JP release · All day/);
    for (const item of calendar.calItems.filter(item => item.type === 'launch')) {
      assert.equal(item.start.getDate(), Number(item.date.slice(-2)), 'all-day dates do not shift');
      assert.equal(calendar.calEnd(item).getTime(), item.start.getTime());
    }
    const launches = calendar.calItems.filter(item => item.type === 'launch');
    const azurIndex = calendar.calItems.indexOf(launches[0]);
    const azurBar = calendar.get('cal-weeks').innerHTML.match(
      new RegExp(`<div class="([^"]+)" data-i="${azurIndex}"[^>]+grid-column:(\\d+)/(\\d+)[^>]*>`));
    assert.ok(azurBar);
    assert.match(azurBar[1], /cal-launch/);
    assert.doesNotMatch(azurBar[1], /unknown-end/);
    assert.equal(Number(azurBar[3]) - Number(azurBar[2]), 1, 'launch spans exactly one day');
    calendar.get('wish-only').checked = true;
    calendar.renderCal();
    assert.match(list.innerHTML, /Azur Promelia/, 'wishlist filter preserves launches');
    assert.doesNotMatch(calendar.get('cal-weeks').innerHTML, /Regular banner/);
    calendar.get('wish-only').checked = false;
    calendar.select('Existing game');
    assert.equal(list.hidden, true);
    assert.doesNotMatch(calendar.get('cal-weeks').innerHTML, /cal-launch/);
    calendar.select('__launches__');
    assert.equal(list.hidden, false, 'game filters and Launches combine');
    calendar.select('Existing game');
    assert.doesNotMatch(calendar.get('cal-weeks').innerHTML, /Regular banner/);
    assert.match(calendar.get('cal-weeks').innerHTML, /Azur Promelia/);
    calendar.next();
    assert.match(list.innerHTML, /Petit Planet/);
    assert.match(list.innerHTML, /Silver Palace/);
    assert.doesNotMatch(list.innerHTML, /Azur Promelia|Ananta/);
    calendar.next();
    assert.match(calendar.get('cal-title').textContent, /2027/);
    assert.match(list.innerHTML, /Ananta/);
    assert.doesNotMatch(list.innerHTML, /Petit Planet|Silver Palace/);
    const anantaIndex = calendar.calItems.indexOf(launches[3]);
    calendar.get('cal-weeks').events.focusin({ target: { closest: () => ({
      dataset: { i: String(anantaIndex) },
      getBoundingClientRect: () => ({ left: 100, width: 100, top: 300, bottom: 320 }) }) } });
    assert.match(calendar.get('cal-tooltip').innerHTML, /2027.*All-day launch/);
    assert.match(calendar.get('cal-tooltip').innerHTML, /Global release/);
    calendar.next();
    assert.equal(list.hidden, true, 'month with no launches hides the list');
    assert.equal(calendar.get('cal-tooltip').style.display, 'none');
    const past = fixture('2027-02-02T12:00:00');
    assert.ok(past.calItems.filter(item => item.type === 'launch').every(item =>
      past.calEnd(item).getTime() === item.start.getTime()), 'past launches never grow into bars');
  }
} finally {
  if (previousTimezone === undefined) delete process.env.TZ;
  else process.env.TZ = previousTimezone;
}
const empty = fixture('2026-11-02T12:00:00', []);
assert.equal(empty.get('cal-launches').hidden, true);
assert.equal(empty.calItems.length, 1, 'existing banners work without manual events');
console.log('PASS: launch dates/regions, single-day rendering, month/year navigation, combined filters, wishlist independence, keyboard details, and three timezones.');
