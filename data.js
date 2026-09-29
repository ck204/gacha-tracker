// Gacha tracker data. Schema documented in CLAUDE.md.
// Keep everything after the '=' STRICT JSON (quoted keys, no trailing commas)
// so external tooling can parse this file without a JS engine.
window.GACHA_DATA =
{
  "lastUpdated": "2026-09-28",
  "games": [
    {
      "name": "Genshin Impact",
      "short": "GI",
      "characters": {"gi:mitya":"Mitya","gi:valeriy":"Valeriy","gi:tsaritsa":"Tsaritsa (Anastasya)","gi:danica":"Danica","gi:flins":"Flins","gi:ineffa":"Ineffa","gi:vesna":"Vesna","gi:vodyanitsa":"Vodyanitsa","gi:skirk":"Skirk","gi:escoffier":"Escoffier"},
      "version": "7.1 — Phase 1",
      "accent": "#4fc3f7",
      "icon": "icons/gi.jpg",
      "leaks": [
        { "title": "Mitya + Valeriy", "characterIds": ["gi:mitya","gi:valeriy"], "version": "7.2", "confidence": "low", "confidenceReason": "An FSC/HxG-attributed roadmap paired both new units in Version 7.2, but a newer Hongyu-attributed banner report names Mitya without confirming Valeriy; timing remains disputed.", "sourceUrl": "https://www.reddit.com/r/Genshin_Impact_Leaks/comments/1uug2jh/character_release_order_via_fsc_hxg/", "checkedAt": "2026-09-08" },
        { "title": "Tsaritsa (Anastasya) + Danica", "characterIds": ["gi:tsaritsa","gi:danica"], "version": "7.3", "confidence": "low", "confidenceReason": "Several roadmap reposts agree on this pair, but the recent source post was removed and the claim is still far ahead of beta confirmation.", "sourceUrl": "https://gamesandchill.com/en/leaks/genshin-impact-7x-character-release-leaks-reveal-alleged-roadmap-from-mitya-to-dainsleif/", "checkedAt": "2026-09-08" }
      ],
      "banners": [
        { "title": "v7.1 Phase 1 — Vesna + Vodyanitsa", "characterIds": ["gi:vesna","gi:vodyanitsa"], "start": "2026-09-23", "end": "2026-10-13" }
      ],
      "upcoming": [
        { "title": "v7.1 Phase 2 — Skirk + Escoffier reruns", "characterIds": ["gi:skirk","gi:escoffier"], "date": "2026-10-13", "endDate": "2026-11-03" }
      ],
      "notes": "Version 7.1 Phase 1 is live from Sep 23 with Vesna + Vodyanitsa, followed by Skirk + Escoffier reruns in Phase 2. The leak section tracks only new playable units through Version 7.3, two version increments beyond the current Version 7.1 banner.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Genshin-Impact/archives/305012" },
        { "label": "Official news", "url": "https://genshin.hoyoverse.com/en/news" }
      ]
    },
    {
      "name": "Honkai: Star Rail",
      "short": "HSR",
      "characters": {"hsr:nihilux":"Aeon ★ Aha","hsr:robin-summeretto":"Robin Summeretto","hsr:hyacine":"Hyacine","hsr:rin-tohsaka":"Rin Tohsaka","hsr:gilgamesh":"Gilgamesh","hsr:aventurine-waveflair":"Aventurine Waveflair","hsr:ashveil":"Ashveil","hsr:pearl":"Pearl","hsr:evanescia":"Evanescia","hsr:mortenax-blade":"Mortenax Blade"},
      "version": "4.6 — Phase 1",
      "accent": "#b39ddb",
      "icon": "icons/hsr.jpg",
      "banners": [
        { "title": "Fate/stay Night collab Part 2 — Rin Tohsaka + Gilgamesh (no fixed end)", "characterIds": ["hsr:rin-tohsaka","hsr:gilgamesh"], "start": "2026-07-24", "end": null },
        { "title": "v4.6 — Pearl (new 5★, Ice Elation; whole version)", "characterIds": ["hsr:pearl"], "start": "2026-09-28", "end": "2026-11-10" },
        { "title": "v4.6 Phase 1 — Evanescia rerun", "characterIds": ["hsr:evanescia"], "start": "2026-09-28", "end": "2026-10-21" }
      ],
      "upcoming": [
        { "title": "v4.6 Phase 2 — Mortenax Blade rerun", "characterIds": ["hsr:mortenax-blade"], "date": "2026-10-21", "endDate": "2026-11-10" },
        { "title": "Aeon ★ Aha (announced playable character; previously known as Nihilux)", "characterIds": ["hsr:nihilux"], "date": null }
      ],
      "notes": "Version 4.6 is live from Sep 28: Pearl is rate-up throughout the version, Evanescia reruns in current Phase 1 through Oct 21, and Mortenax Blade reruns in Phase 2 through Nov 10. Fate/stay Night collab Part 2 remains open-ended. Aeon ★ Aha is officially announced without a confirmed banner date.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Honkai-Star-Rail/archives/408381" },
        { "label": "Official news", "url": "https://hsr.hoyoverse.com/en-us/news" }
      ]
    },
    {
      "name": "Zenless Zone Zero",
      "short": "ZZZ",
      "characters": {"zzz:severian":"Severian Lowell","zzz:pheony":"Phoenix Reffaella","zzz:claret-flint":"Claret Flint","zzz:nangong-yu":"Nangong Yu","zzz:roxy-ifrita-pryce":"Roxy Ifrita Pryce","zzz:promeia":"Promeia"},
      "version": "3.2 — Phase 1",
      "accent": "#f57c00",
      "icon": "icons/zzz.jpg",
      "banners": [
        { "title": "v3.2 Phase 1 — Claret Flint (new S-Rank, Electric Armorer) + Nangong Yu rerun", "characterIds": ["zzz:claret-flint","zzz:nangong-yu"], "start": "2026-09-09", "end": "2026-09-30" }
      ],
      "upcoming": [
        { "title": "v3.2 Phase 2 — Roxy Ifrita Pryce (new S-Rank, Wind Stun) + Promeia rerun", "characterIds": ["zzz:roxy-ifrita-pryce","zzz:promeia"], "date": "2026-09-30", "endDate": "2026-10-20" },
        { "title": "Phoenix Reffaella (announced S-Rank Fire Anomaly Agent)", "characterIds": ["zzz:pheony"], "date": null },
        { "title": "Severian Lowell (announced S-Rank Wind Attack Agent)", "characterIds": ["zzz:severian"], "date": null }
      ],
      "notes": "Version 3.2 launched Sep 9. Claret Flint + Nangong Yu are current in Phase 1 through Sep 30, followed by Roxy Ifrita Pryce + Promeia Sep 30–Oct 20. HoYoverse has officially revealed Phoenix Reffaella (previously leaked as Pheony) and Severian Lowell as upcoming S-Rank Agents, but their banner dates and phase order remain unconfirmed.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Zenless-Zone-Zero/archives/435687" },
        { "label": "Official news", "url": "https://zenless.hoyoverse.com/m/en-us/news" }
      ]
    },
    {
      "name": "Arknights: Endfield",
      "short": "AKE",
      "characters": {"ake:si":"Si","ake:ye-minghui":"Ye Minghui","ake:typhoeus":"Typhoeus","ake:yvonne":"Yvonne"},
      "version": "Dreamscape of Wind and Snow",
      "accent": "#ffd54f",
      "icon": "icons/ake.jpg",
      "leaks": [
        { "title": "Si + Ye Minghui", "characterIds": ["ake:si","ake:ye-minghui"], "version": "1.6", "confidence": "low", "confidenceReason": "Secondary coverage names the pair; earlier reports disagree on timing and elements. Playable banners remain unconfirmed.", "sourceUrl": "https://www.topuplive.com/news/arknights-endfield-1-6.html", "checkedAt": "2026-09-08" }
      ],
      "banners": [
        { "title": "Winter Hunt — Typhoeus (new 6★, Nature Striker)", "characterIds": ["ake:typhoeus"], "start": "2026-09-02", "end": "2026-09-30" },
        { "title": "Resplendent Spectrum RE-Factor Headhunting #1 — Yvonne rate-up", "characterIds": ["ake:yvonne"], "start": "2026-09-24", "end": null }
      ],
      "upcoming": [],
      "notes": "Dreamscape of Wind and Snow launched Sep 2. Winter Hunt features Typhoeus through Sep 30. Resplendent Spectrum RE-Factor Headhunting #1 opened Sep 24 with Yvonne rate-up; its active end is explicitly unknown because the official notice only ties it to the next version update and maintenance.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Arknights-Endfield/archives/524215" },
        { "label": "Official site", "url": "https://endfield.gryphline.com/" }
      ]
    },
    {
      "name": "Girls' Frontline 2: Exilium",
      "short": "GFL2",
      "characters": {"gfl2:ots-14":"OTs-14","gfl2:basti":"Basti","gfl2:voymastina":"Voymastina","gfl2:soppo":"Soppo","gfl2:loreley":"Loreley","gfl2:alva":"Alva"},
      "version": "Moonshroud Requiem",
      "accent": "#90a4ae",
      "icon": "icons/gfl2.jpg",
      "banners": [
        { "title": "Soppo + Loreley + Alva (Targeted Procurement)", "characterIds": ["gfl2:soppo","gfl2:loreley","gfl2:alva"], "start": "2026-09-17", "end": "2026-10-07" }
      ],
      "upcoming": [],
      "notes": "The healthy gfl2.help Global mirror confirms Soppo + Loreley + Alva are live Sep 17–Oct 7. The official Steam digest independently confirms Soppo as the new Doll in the Sep 17 update. No later Global banner is stored without reliable Global evidence; CN ordering was not used.",
      "links": [
        { "label": "GFL2.help banners", "url": "https://gfl2.help/en/banners" }
      ]
    },
    {
      "name": "Fate/Grand Order (NA)",
      "short": "FGO",
      "characters": {"fgo:kazuradrop":"Kazuradrop","fgo:tutankhamun":"Tutankhamun","fgo:louhi":"Louhi"},
      "version": "NA / Global",
      "accent": "#c0a062",
      "icon": "icons/fgo.jpg",
      "banners": [],
      "upcoming": [
        { "title": "Kazuradrop", "characterIds": ["fgo:kazuradrop"], "date": "2026-09-15", "endDate": "2026-10-06", "approx": true },
        { "title": "Tutankhamun", "characterIds": ["fgo:tutankhamun"], "date": "2026-10-13", "endDate": "2026-11-03", "approx": true },
        { "title": "Louhi", "characterIds": ["fgo:louhi"], "date": "2026-11-11", "endDate": "2026-11-24", "approx": true }
      ],
      "notes": "NA server. Shows new-Servant debuts only (reruns/support hidden). Upcoming dates are estimates from the JP schedule (NA trails JP ~23 months) — not yet officially announced.",
      "links": [
        { "label": "GamePress NA campaigns", "url": "https://grandorder.gamepress.gg/p/campaign-list" },
        { "label": "Official NA site", "url": "https://fate-go.us/" }
      ]
    }
  ]
}
;
