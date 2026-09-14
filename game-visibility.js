/* Dashboard card visibility is independent from calendar filters. */
(function (root) {
  const KEY = 'gacha-tracker:hidden-games:v1';
  const validGameId = id => typeof id === 'string' && /^[a-z0-9-]{1,24}$/i.test(id);

  function decode(raw) {
    if (raw === null) return new Set();
    const value = JSON.parse(raw);
    if (!Array.isArray(value) || !value.every(validGameId)) throw new Error('Invalid hidden games');
    return new Set(value);
  }

  function create(storage) {
    let hidden = new Set(), warning = '';
    try { hidden = decode(storage.getItem(KEY)); }
    catch { warning = 'Saved hidden games could not be read. Changes will try to save a new list in this browser.'; }

    const save = () => {
      try { storage.setItem(KEY, JSON.stringify([...hidden])); warning = ''; }
      catch { warning = 'Hidden-game changes are only available in this tab: browser storage is unavailable.'; }
    };

    return {
      get hidden() { return hidden; },
      get warning() { return warning; },
      has(id) { return hidden.has(id); },
      hide(id) { if (validGameId(id)) { hidden.add(id); save(); } },
      show(id) { if (validGameId(id)) { hidden.delete(id); save(); } },
      showAll() { hidden.clear(); save(); },
      reload() {
        try { hidden = decode(storage.getItem(KEY)); warning = ''; }
        catch { warning = 'Saved hidden games could not be read. Keeping this tab\u2019s choices.'; }
      }
    };
  }

  root.GachaGameVisibility = { KEY, create, decode };
})(typeof window === 'undefined' ? globalThis : window);
