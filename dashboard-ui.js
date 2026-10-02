/* Dashboard presentation, filters, and sidebar preference; preserves data and wishlist storage. */
(() => {
  'use strict';
  const sidebar = document.getElementById('dashboard-sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarKey = 'gacha-tracker:sidebar-collapsed:v1';
  let sidebarCollapsed = false;
  try { sidebarCollapsed = window.localStorage.getItem(sidebarKey) === 'true'; } catch {}
  function updateSidebar() {
    document.body.classList.toggle('sidebar-collapsed', sidebarCollapsed);
    sidebar.inert = sidebarCollapsed;
    sidebar.setAttribute('aria-hidden', String(sidebarCollapsed));
    sidebarToggle.setAttribute('aria-expanded', String(!sidebarCollapsed));
    const label = sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar';
    sidebarToggle.setAttribute('aria-label', label);
    sidebarToggle.title = label;
  }
  sidebarToggle.addEventListener('click', () => {
    sidebarCollapsed = !sidebarCollapsed;
    updateSidebar();
    try { window.localStorage.setItem(sidebarKey, String(sidebarCollapsed)); } catch {}
  });
  updateSidebar();
  const data = window.GACHA_DATA;
  const now = new Date();
  const DAY = 86400000;
  const parse = value => new Date(value + 'T00:00:00');
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const spans = game => [...(game.banners || []).map(b => ({...b, start:b.start, end:b.end})), ...(game.upcoming || []).filter(b => b.date).map(b => ({...b, start:b.date, end:b.endDate}))];
  const live = banner => parse(banner.start) <= now && (!banner.end || now < new Date(parse(banner.end).getTime() + DAY));
  const remaining = banner => banner.end ? Math.ceil((parse(banner.end).getTime() + DAY - now) / DAY) : null;
  const all = data.games.flatMap(game => spans(game).map(banner => ({game, banner})));
  const distinct = rows => rows.filter((row, i) => rows.findIndex(other => other.game.short === row.game.short && other.banner.title === row.banner.title && other.banner.start === row.banner.start) === i);
  const active = distinct(all.filter(({banner}) => live(banner)));
  const ending = active.filter(({banner}) => remaining(banner) !== null && remaining(banner) <= 7);
  // Use the normal banner start time: 12:00 noon in Singapore.
  const scheduledBanners = distinct(all).map(row => ({
    ...row, startTime: new Date(row.banner.start + 'T12:00:00+08:00').getTime()
  })).filter(row => Number.isFinite(row.startTime)).sort((a,b) => a.startTime - b.startTime);
  const future = scheduledBanners.filter(({startTime}) => startTime > now.getTime());
  const undated = data.games.flatMap(game => game.upcoming || []).filter(banner => !banner.date);
  document.getElementById('pulse-strip').innerHTML = [
    [data.games.length, 'Games tracked', 'Dashboard coverage'],
    [active.length, 'Live banners', 'Across all tracked games'],
    [ending.length, 'Closing soon', 'Within the next 7 days'],
    [undated.length, 'Awaiting a date', 'Announced · schedule TBA']
  ].map(([count,label,note]) => `<div class="pulse-metric"><span class="metric-number">${count.toString().padStart(2,'0')}</span><span class="metric-label">${label}</span><span class="metric-note">${note}</span></div>`).join('');
  // Artwork sources and crop settings travel with banner data. FGO stays excluded.
  const rotationGames = data.games.filter(game => game.short !== 'FGO' && game.artwork?.url);
  const next = future[0];
  const hero = document.querySelector('.hero');
  const artwork = document.getElementById('hero-art');
  const artworkGames = rotationGames.map(game => game.short);
  const ARTWORK_DELAY = 8000;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let artworkIndex = Math.max(0, artworkGames.indexOf(next?.game.short));
  let artworkPaused = reducedMotion.matches;
  let artworkHovered = false;
  let artworkTimer;
  // Load every header once and blend between layers without a blank frame.
  const artworkLayers = artworkGames.map((short, index) => {
    const image = index === 0 ? artwork : artwork.cloneNode(false);
    if (index !== 0) { image.removeAttribute('id'); hero.append(image); }
    const art = rotationGames[index].artwork;
    image.hidden = false;
    image.dataset.artGame = short;
    image.style.objectPosition = art.position || 'right center';
    image.style.setProperty('--art-mobile-position', art.mobilePosition || art.position || 'center');
    let usingFallback = false;
    image.addEventListener('error', () => {
      if (!usingFallback && art.fallback) {
        usingFallback = true;
        image.src = art.fallback;
      } else {
        image.hidden = true;
      }
    });
    // Show the approved local snapshot immediately while the remote header loads.
    image.src = art.fallback || art.url;
    if (art.fallback) {
      const remote = new Image();
      remote.onload = () => { image.hidden = false; image.src = art.url; };
      remote.src = art.url;
    }
    image.classList.toggle('is-active', index === artworkIndex);
    return image;
  });
  const artworkToggle = document.createElement('button');
  artworkToggle.type = 'button';
  artworkToggle.className = 'artwork-toggle';
  artworkToggle.hidden = artworkLayers.length < 2;
  hero.append(artworkToggle);
  function updateArtworkToggle() {
    const label = artworkPaused ? 'Resume artwork rotation' : 'Pause artwork rotation';
    artworkToggle.setAttribute('aria-label', label);
    artworkToggle.title = label;
    artworkToggle.innerHTML = artworkPaused
      ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 9 6-9 6Z" fill="currentColor"/></svg>'
      : '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4v12M14 4v12" stroke="currentColor" stroke-width="3"/></svg>';
  }
  function scheduleArtwork() {
    window.clearTimeout(artworkTimer);
    if (artworkLayers.length < 2 || artworkPaused || artworkHovered || document.hidden) return;
    artworkTimer = window.setTimeout(() => {
      // Skip unavailable headers; keep the last image visible while others load.
      for (let step = 1; step < artworkLayers.length; step++) {
        const index = (artworkIndex + step) % artworkLayers.length;
        const image = artworkLayers[index];
        if (!image.complete || !image.naturalWidth) continue;
        artworkLayers[artworkIndex].classList.remove('is-active');
        image.classList.add('is-active');
        artworkIndex = index;
        break;
      }
      scheduleArtwork();
    }, ARTWORK_DELAY);
  }
  let artworkPointerState = null;
  artworkToggle.addEventListener('pointerdown', () => { artworkPointerState = artworkPaused; });
  artworkToggle.addEventListener('pointercancel', () => { artworkPointerState = null; });
  artworkToggle.addEventListener('click', () => {
    artworkPaused = !(artworkPointerState ?? artworkPaused);
    artworkPointerState = null;
    updateArtworkToggle(); scheduleArtwork();
  });
  hero.addEventListener('mouseenter', () => { artworkHovered = true; scheduleArtwork(); });
  hero.addEventListener('mouseleave', () => { artworkHovered = false; scheduleArtwork(); });
  hero.addEventListener('focusin', () => {
    artworkPaused = true;
    updateArtworkToggle(); scheduleArtwork();
  });
  document.addEventListener('visibilitychange', scheduleArtwork);
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { artworkPaused = true; updateArtworkToggle(); scheduleArtwork(); }
  });
  updateArtworkToggle(); scheduleArtwork();

  const summary = document.getElementById('hero-summary');
  let displayedNext;
  let countdownValue;
  let countdownTimer;
  function updateNextBanner() {
    const currentTime = Date.now();
    const upcoming = scheduledBanners.find(({startTime}) => startTime > currentTime);
    if (upcoming !== displayedNext || !summary.hasChildNodes()) {
      displayedNext = upcoming;
      if (upcoming) {
        const { game, banner, startTime } = upcoming;
        const characters = (banner.characterIds || []).map(id => game.characters?.[id]).filter(Boolean);
        const date = new Date(startTime).toLocaleDateString(undefined, {timeZone:'Asia/Singapore', month:'short', day:'numeric'});
        summary.innerHTML = `<h1 class="eyebrow" id="next-banner-label">NEXT SCHEDULED BANNER</h1><div class="next-game">${game.icon ? `<img src="${esc(game.icon)}" alt="">` : ''}${esc(game.name)}</div><div class="next-title">${esc(characters.length ? characters.join(' + ') : banner.title)}</div><div class="next-date">${banner.approx ? 'Around ' : ''}${date}</div><div class="next-countdown" role="timer" aria-live="off">${banner.approx ? 'Estimated in' : 'Starts in'} <span class="countdown-value"></span></div>`;
        countdownValue = summary.querySelector('.countdown-value');
      } else {
        summary.innerHTML = '<h1 class="eyebrow" id="next-banner-label">UPCOMING SCHEDULE</h1><div class="next-title">No upcoming banners scheduled.</div><div class="next-countdown">Undated announcements appear on game cards.</div>';
        countdownValue = null;
      }
    }
    if (!upcoming) return;
    const seconds = Math.ceil((upcoming.startTime - currentTime) / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = String(Math.floor(seconds % 86400 / 3600)).padStart(2, '0');
    const minutes = String(Math.floor(seconds % 3600 / 60)).padStart(2, '0');
    const remainder = String(seconds % 60).padStart(2, '0');
    countdownValue.textContent = `${days}d ${hours}h ${minutes}m ${remainder}s`;
  }
  function scheduleCountdown() {
    window.clearTimeout(countdownTimer);
    updateNextBanner();
    if (!document.hidden && displayedNext) countdownTimer = window.setTimeout(scheduleCountdown, 1000);
  }
  document.addEventListener('visibilitychange', scheduleCountdown);
  window.addEventListener('pageshow', scheduleCountdown);
  scheduleCountdown();
  const cards = [...document.querySelectorAll('#grid > .card')];
  const gameNav = document.getElementById('universe-nav');
  gameNav.innerHTML = data.games.map(game => `<a href="#game-${esc(game.short)}">${game.icon ? `<img src="${esc(game.icon)}" alt="">` : ''}<span>${esc(game.name.replace('Honkai: ', '').replace('Arknights: ', '').replace("Girls' Frontline 2: Exilium", 'Girls’ Frontline 2').replace('Fate/Grand Order (NA)', 'Fate/Grand Order'))}</span></a>`).join('');
  cards.forEach((card, index) => {
    const game = data.games[index];
    card.id = `game-${game.short}`;
    const selected = spans(game).filter(live).sort((a,b) => parse(b.start) - parse(a.start))[0];
    const label = document.createElement('div');
    label.className = 'card-status';
    label.textContent = selected ? 'CURRENT BANNER' : 'BANNER INTEL';
    if (!selected) { label.classList.add('ended'); label.textContent = 'CHECK SCHEDULE'; }
    card.querySelector('h2').after(label);
    const otherClosing = distinct(spans(game).filter(b => live(b) && remaining(b) !== null && remaining(b) <= 7 && b !== selected && !(b.title === selected?.title && b.start === selected?.start)).map(banner => ({game, banner})));
    if (otherClosing.length) {
      const callout = document.createElement('div');
      callout.className = 'closing-callout';
      callout.innerHTML = '<span class="closing-label">ALSO ENDING SOON</span>' + otherClosing.map(({banner}) => {
        const names = (banner.characterIds || []).map(id => game.characters?.[id]).filter(Boolean);
        return `<div>${esc(names.length ? names.join(' + ') : banner.title)} <span>${banner.approx ? '~' : ''}${remaining(banner)}d left</span></div>`;
      }).join('');
      card.querySelector('.banner')?.after(callout);
    }
  });
  let filter = 'all';
  const search = document.getElementById('game-search');
  function updateFilters() {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    cards.forEach((card, i) => {
      const game = data.games[i];
      const haystack = [game.name,game.short,...Object.values(game.characters || {}),...(game.banners || []).map(b=>b.title),...(game.upcoming || []).map(b=>b.title),...(game.leaks || []).map(b=>b.title)].join(' ').toLocaleLowerCase();
      const current = spans(game).filter(live);
      const match = (!query || haystack.includes(query)) && (filter === 'all' || (filter === 'soon' && current.some(b => remaining(b) !== null && remaining(b) <= 7)));
      card.classList.toggle('ui-filtered', !match);
      if (match && !card.hidden) visible++;
    });
    document.getElementById('visible-game-count').textContent = `${visible} / ${data.games.length}`;
    document.getElementById('search-empty').hidden = visible > 0 || !document.getElementById('wish-empty').hidden;
  }
  search.addEventListener('input', updateFilters);
  document.querySelectorAll('[data-lineup]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.lineup;
    document.querySelectorAll('[data-lineup]').forEach(item => {
      const selected = item.dataset.lineup === filter;
      item.classList.toggle('active',selected);
      item.setAttribute('aria-pressed',String(selected));
    });
    updateFilters();
  }));
  document.addEventListener('keydown', event => {
    const editing = event.target.closest('input,textarea,select,[contenteditable]');
    if (event.key === '/' && !editing && !event.ctrlKey && !event.metaKey && !event.altKey) { event.preventDefault(); search.focus(); }
    if (event.key === 'Escape' && event.target === search) { search.value = ''; updateFilters(); }
  });
  gameNav.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    filter = 'all'; search.value = '';
    document.querySelector('[data-lineup="all"]').click();
    const target = document.getElementById(link.hash.slice(1));
    if (target?.hidden) {
      // An explicit game jump restores its card and resets wishlist-only filtering.
      document.getElementById('wish-only').checked = false;
      document.getElementById('wish-only').dispatchEvent(new Event('change', {bubbles:true}));
      document.getElementById('hidden-games-toggle').click();
      document.querySelector(`[data-show-game="${target.id.slice(5)}"]`)?.click();
    }
  });
  const observer = new MutationObserver(updateFilters);
  cards.forEach(card => observer.observe(card, {attributes:true,attributeFilter:['hidden']}));
  updateFilters();
  const nav = [...document.querySelectorAll('.side-nav a')];
  const sections = ['dashboard','banners','calendar'].map(id => document.getElementById(id));
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      const current = [...sections].reverse().find(section => section.getBoundingClientRect().top <= 150) || sections[0];
      const sectionId = current.id;
      nav.forEach(link => { const selected = link.hash === `#${sectionId}`; link.classList.toggle('active',selected); if(selected)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current'); });
      scheduled = false;
    });
  }, {passive:true});
})();
