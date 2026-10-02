// Exercise the hero's real schedule selection and timer with a controlled clock.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'dashboard-ui.js'), 'utf8');
const setup = source.slice(source.indexOf('  const data ='), source.indexOf('  const undated ='));
const controller = source.slice(source.indexOf("  const summary = document.getElementById('hero-summary');"), source.indexOf('  const cards ='));

function fixture(games, initialTime) {
  let currentTime = Date.parse(initialTime);
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : [currentTime])); }
    static now() { return currentTime; }
  }
  let html = '';
  let renders = 0;
  const value = { textContent: '' };
  const summary = {
    get innerHTML() { return html; },
    set innerHTML(next) { html = next; renders++; value.textContent = ''; },
    hasChildNodes() { return Boolean(html); },
    querySelector(selector) { assert.equal(selector, '.countdown-value'); return value; }
  };
  const documentEvents = {};
  const windowEvents = {};
  const timers = new Map();
  let timerId = 0;
  const document = {
    hidden: false,
    getElementById(id) { assert.equal(id, 'hero-summary'); return summary; },
    addEventListener(name, callback) { documentEvents[name] = callback; }
  };
  const window = {
    GACHA_DATA: { games },
    setTimeout(callback, delay) { assert.equal(delay, 1000); timers.set(++timerId, callback); return timerId; },
    clearTimeout(id) { timers.delete(id); },
    addEventListener(name, callback) { windowEvents[name] = callback; }
  };
  vm.runInNewContext(setup + controller, { window, document, Date: Clock });
  return {
    summary, value, timers,
    get renders() { return renders; },
    setTime(time) { currentTime = Date.parse(time); },
    tick() {
      assert.equal(timers.size, 1);
      const [id, callback] = [...timers][0];
      timers.delete(id); callback();
    },
    visibility(hidden) { document.hidden = hidden; documentEvents.visibilitychange(); },
    pageshow() { windowEvents.pageshow(); }
  };
}

// Run from two browser timezones; the target must remain Singapore noon.
for (const timezone of ['UTC', 'America/Los_Angeles']) {
  process.env.TZ = timezone;
  const games = [{
    name: 'Test game', short: 'T', characters: { 't:hero': 'Hero & Friend' },
    banners: [{ title: 'Past banner', start: '2026-09-01', end: '2026-09-20' }],
    upcoming: [
      { title: 'Later', date: '2026-10-05', approx: true },
      { title: 'First', date: '2026-10-04', characterIds: ['t:hero'] },
      { title: 'Same start', date: '2026-10-04' },
      { title: 'Undated', date: null },
      { title: 'Missing date' },
      { title: 'Invalid date', date: 'invalid' }
    ],
    leaks: [{ title: 'Leak', date: '2026-10-03' }]
  }];
  const f = fixture(games, '2026-10-02T12:34:56+08:00');
  assert.match(f.summary.innerHTML, /Hero &amp; Friend/);
  assert.match(f.summary.innerHTML, /Oct 4/);
  assert.match(f.summary.innerHTML, /Starts in/);
  assert.doesNotMatch(f.summary.innerHTML, /countdown-note|Launch time TBA|midnight SGT/);
  assert.match(f.summary.innerHTML, /role="timer" aria-live="off"/);
  assert.equal(f.value.textContent, '1d 23h 25m 04s');
  f.setTime('2026-10-02T12:34:57+08:00'); f.tick();
  assert.equal(f.value.textContent, '1d 23h 25m 03s');
  assert.equal(f.renders, 1, 'only the digits update on each tick');

  f.setTime('2026-10-04T00:00:00+08:00'); f.tick();
  assert.equal(f.value.textContent, '0d 12h 00m 00s');
  assert.equal(f.renders, 1, 'the banner remains upcoming until noon, not midnight');
  f.setTime('2026-10-04T11:59:59.500+08:00'); f.tick();
  assert.equal(f.value.textContent, '0d 00h 00m 01s');
  f.setTime('2026-10-04T12:00:00+08:00'); f.tick();
  assert.match(f.summary.innerHTML, /Later/);
  assert.match(f.summary.innerHTML, /Around Oct 5/);
  assert.match(f.summary.innerHTML, /Estimated in/);
  assert.doesNotMatch(f.summary.innerHTML, /countdown-note|Estimated date|midnight SGT/);
  assert.equal(f.value.textContent, '1d 00h 00m 00s');
  assert.equal(f.renders, 2, 'skip all banners whose noon start time has been reached');

  f.visibility(true); assert.equal(f.timers.size, 0);
  f.setTime('2026-10-05T11:59:58+08:00'); f.visibility(false);
  assert.equal(f.value.textContent, '0d 00h 00m 02s');
  assert.equal(f.timers.size, 1);
  f.pageshow(); assert.equal(f.timers.size, 1, 'resume without duplicating timers');
  f.setTime('2026-10-05T12:00:00+08:00'); f.tick();
  assert.match(f.summary.innerHTML, /No upcoming banners scheduled/);
  assert.equal(f.timers.size, 0);
  assert.doesNotMatch(f.summary.innerHTML, /NaN|Invalid Date|-1d/);

  const undated = fixture([{ short: 'U', upcoming: [{ title: 'TBA', date: null }], leaks: [{ title: 'Rumor', date: '2026-10-06' }] }], '2026-10-02T00:00:00+08:00');
  assert.match(undated.summary.innerHTML, /No upcoming banners scheduled/);
  assert.equal(undated.timers.size, 0);
  const empty = fixture([], '2026-10-02T00:00:00+08:00');
  assert.match(empty.summary.innerHTML, /No upcoming banners scheduled/);
  assert.equal(empty.timers.size, 0);
}
console.log('PASS: second-by-second countdown, Singapore timezone, rollover, estimates, sleep/resume, no duplicate timers, TBA/leak exclusion, and empty schedule.');
