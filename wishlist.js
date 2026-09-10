/* Character identity is explicit data: never infer it from a banner title. */
(function (root) {
  const KEY = 'gacha-tracker:wishlist:v1';
  const validId = id => typeof id === 'string' && /^[a-z0-9-]+:[a-z0-9-]+$/.test(id);
  function decode(raw) {
    if (raw === null) return new Set();
    const value = JSON.parse(raw);
    if (!Array.isArray(value) || !value.every(validId)) throw new Error('Invalid wishlist');
    return new Set(value);
  }
  function create(storage) {
    let selected = new Set(), warning = '';
    try { selected = decode(storage.getItem(KEY)); }
    catch { warning = 'Saved wishlist could not be read. Changes will try to save a new list in this browser.'; }
    return {
      get selected() { return selected; },
      get warning() { return warning; },
      has(entry) { return (entry.characterIds || []).some(id => selected.has(id)); },
      toggle(id) {
        if (!validId(id)) return;
        if (selected.has(id)) selected.delete(id); else selected.add(id);
        try { storage.setItem(KEY, JSON.stringify([...selected])); warning = ''; }
        catch { warning = 'Wishlist changes are only available in this tab: browser storage is unavailable.'; }
      },
      reload() {
        try { selected = decode(storage.getItem(KEY)); warning = ''; }
        catch { warning = 'Saved wishlist could not be read. Keeping this tab’s selections.'; }
      }
    };
  }
  function timeline(games, selected, now = new Date()) {
    const day = date => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    const today = day(now);
    const parseDay = value => value ? day(new Date(value + 'T00:00:00')) : NaN;
    return [...selected].map(id => {
      const game = games.find(g => Object.hasOwn(g.characters || {}, id)) || {};
      const entries = [...(game.banners || []), ...(game.upcoming || [])]
        .filter(e => e.characterIds?.includes(id));
      const dated = entries.map(e => ({ entry: e, start: parseDay(e.start || e.date), end: parseDay(e.end || e.endDate) }));
      const live = dated.find(e => e.start <= today && (!Number.isFinite(e.end) || e.end >= today));
      const next = dated.filter(e => e.start > today).sort((a, b) => a.start - b.start)[0];
      const leak = !entries.length && (game.leaks || []).some(e => e.characterIds?.includes(id));
      return { id, game, name: game.characters?.[id] || id,
        rank: live ? 0 : next ? 1 : 2,
        start: next?.start ?? Infinity,
        date: next ? next.entry.start || next.entry.date : null,
        days: next ? Math.round((next.start - today) / 86400000) : null,
        approx: Boolean((live || next)?.entry.approx), leak };
    }).sort((a, b) => a.rank - b.rank || (a.rank === 1 ? a.start - b.start : 0) || a.name.localeCompare(b.name) || a.id.localeCompare(b.id));
  }
  root.GachaWishlist = { KEY, create, decode, timeline };
})(typeof window === 'undefined' ? globalThis : window);
