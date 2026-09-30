// Gacha tracker data. Schema documented in CLAUDE.md.
// Keep everything after the '=' STRICT JSON (quoted keys, no trailing commas)
// so external tooling can parse this file without a JS engine.
window.GACHA_DATA =
{
  "lastUpdated": "2026-09-30",
  "games": [
    {
      "name": "Genshin Impact",
      "short": "GI",
      "characters": {"gi:mitya":"Mitya","gi:valeriy":"Valeriy","gi:tsaritsa":"Tsaritsa (Anastasya)","gi:danica":"Danica","gi:flins":"Flins","gi:ineffa":"Ineffa","gi:vesna":"Vesna","gi:vodyanitsa":"Vodyanitsa","gi:skirk":"Skirk","gi:escoffier":"Escoffier"},
      "version": "7.1 — Phase 1",
      "accent": "#4fc3f7",
      "icon": "icons/gi.jpg",
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1072404907230060544/1790131350/1500x500",
        "sourceUrl": "https://x.com/GenshinImpact",
        "checkedAt": "2026-09-30",
        "fallback": "assets/splash/genshin-impact.jpg",
        "position": "right center",
        "mobilePosition": "68% center"
      },
      "leaks": [
        { "title": "Tsaritsa (Anastasya) + Danica", "characterIds": ["gi:tsaritsa","gi:danica"], "version": "7.3", "confidence": "low", "confidenceReason": "Recent deep-beta and kit reports continue to pair both new characters in Version 7.3, but the evidence remains unofficial, indirect, and earlier than the public beta cycle.", "sourceUrl": "https://gamesandchill.com/en/leaks/genshin-impact-7x-character-release-leaks-reveal-alleged-roadmap-from-mitya-to-dainsleif/", "checkedAt": "2026-09-29" }
      ],
      "banners": [
        { "title": "v7.1 Phase 1 — Vesna + Vodyanitsa", "characterIds": ["gi:vesna","gi:vodyanitsa"], "start": "2026-09-23", "end": "2026-10-13" }
      ],
      "upcoming": [
        { "title": "v7.1 Phase 2 — Skirk + Escoffier reruns", "characterIds": ["gi:skirk","gi:escoffier"], "date": "2026-10-13", "endDate": "2026-11-03" },
        { "title": "v7.2 — Mitya (announced playable character)", "characterIds": ["gi:mitya"], "date": null },
        { "title": "v7.2 — Valeriy (announced playable character)", "characterIds": ["gi:valeriy"], "date": null }
      ],
      "notes": "Version 7.1 Phase 1 is live from Sep 23 with Vesna + Vodyanitsa, followed by Skirk + Escoffier reruns in Phase 2. Mitya and Valeriy are officially announced playable characters for Version 7.2; exact banner dates and phase order remain unconfirmed. The Version 7.3 Tsaritsa + Danica pairing remains a low-confidence leak.",
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
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1412998764701249542/1790560682/1500x500",
        "sourceUrl": "https://x.com/honkaistarrail",
        "checkedAt": "2026-09-30",
        "fallback": "assets/splash/honkai-star-rail.jpg",
        "position": "right center",
        "mobilePosition": "52% center"
      },
      "banners": [
        { "title": "Fate/stay Night collab Part 2 — Rin Tohsaka + Gilgamesh (no fixed end)", "characterIds": ["hsr:rin-tohsaka","hsr:gilgamesh"], "start": "2026-07-24", "end": null },
        { "title": "v4.6 — Pearl (new 5★, Ice Elation; whole version)", "characterIds": ["hsr:pearl"], "start": "2026-09-28", "end": "2026-11-11" },
        { "title": "v4.6 Phase 1 — Evanescia rerun", "characterIds": ["hsr:evanescia"], "start": "2026-09-28", "end": "2026-10-21" }
      ],
      "upcoming": [
        { "title": "v4.6 Phase 2 — Mortenax Blade rerun", "characterIds": ["hsr:mortenax-blade"], "date": "2026-10-21", "endDate": "2026-11-11" },
        { "title": "v4.7 — Aeon ★ Aha (new 5★ Quantum Elation; previously known as Nihilux)", "characterIds": ["hsr:nihilux"], "date": null }
      ],
      "notes": "Version 4.6 is live from Sep 28: Pearl is rate-up through the version end on Nov 11 (Asia/Singapore), Evanescia reruns in current Phase 1 through Oct 21, and Mortenax Blade reruns in Phase 2 through Nov 11. Fate/stay Night collab Part 2 remains open-ended. Aeon ★ Aha is officially announced for Version 4.7, but her exact banner date is not yet confirmed.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Honkai-Star-Rail/archives/408381" },
        { "label": "Official news", "url": "https://hsr.hoyoverse.com/en-us/news" }
      ]
    },
    {
      "name": "Zenless Zone Zero",
      "short": "ZZZ",
      "characters": {"zzz:severian":"Severian Lowell","zzz:pheony":"Phoenix Reffaella","zzz:claret-flint":"Claret Flint","zzz:nangong-yu":"Nangong Yu","zzz:roxy-ifrita-pryce":"Roxy Ifrita Pryce","zzz:promeia":"Promeia"},
      "version": "3.2 — Phase 2",
      "accent": "#f57c00",
      "icon": "icons/zzz.jpg",
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1508387670208270343/1788862502/1500x500",
        "sourceUrl": "https://x.com/ZZZ_EN",
        "checkedAt": "2026-09-30",
        "fallback": "assets/splash/zenless-zone-zero.jpg",
        "position": "right center",
        "mobilePosition": "72% center"
      },
      "banners": [
        { "title": "v3.2 Phase 2 — Roxy Ifrita Pryce (new S-Rank, Wind Stun) + Promeia rerun", "characterIds": ["zzz:roxy-ifrita-pryce","zzz:promeia"], "start": "2026-09-30", "end": "2026-10-20" }
      ],
      "upcoming": [
        { "title": "v3.3 — Phoenix Reffaella (announced S-Rank Fire Anomaly Agent)", "characterIds": ["zzz:pheony"], "date": null },
        { "title": "v3.3 — Severian Lowell (announced S-Rank Wind Attack Agent)", "characterIds": ["zzz:severian"], "date": null }
      ],
      "notes": "Version 3.2 Phase 2 is live Sep 30–Oct 20 with Roxy Ifrita Pryce + Promeia. HoYoverse's Agent Records associate Phoenix Reffaella (previously leaked as Pheony) and Severian Lowell with Version 3.3, but their exact banner dates and phase order remain unconfirmed. A low-reliability Version 3.4 Eldreda rumor was reviewed but not stored because it does not clearly establish a pull-banner debut.",
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
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1501126821727059969/1787312056/1500x500",
        "sourceUrl": "https://x.com/AKEndfield",
        "checkedAt": "2026-09-30",
        "fallback": "assets/splash/arknights-endfield.jpg",
        "position": "right center",
        "mobilePosition": "38% center"
      },
      "leaks": [
        { "title": "Si + Ye Minghui", "characterIds": ["ake:si","ake:ye-minghui"], "version": "1.6", "confidence": "low", "confidenceReason": "Recent secondary coverage still places both previewed characters in Version 1.6, but the version assignment, banner order, Ye Minghui name, and playable details remain leak-sourced rather than officially announced.", "sourceUrl": "https://www.gamsgo.com/blog/arknights-endfield-1-6-banners", "checkedAt": "2026-09-29" }
      ],
      "banners": [
        { "title": "Resplendent Spectrum RE-Factor Headhunting #1 — Yvonne rate-up", "characterIds": ["ake:yvonne"], "start": "2026-09-24", "end": "2026-10-15" }
      ],
      "upcoming": [],
      "notes": "Dreamscape of Wind and Snow continues with Resplendent Spectrum RE-Factor Headhunting #1: Yvonne is active from Sep 24 through Oct 15 at 05:59 on the Asia server. Winter Hunt / Typhoeus ended Sep 30. Si + Ye Minghui remain low-confidence Version 1.6 leak coverage pending the official preview.",
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
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1801169021758517248/1789650015/1500x500",
        "sourceUrl": "https://x.com/GFL2EXILIUM_EN",
        "checkedAt": "2026-09-30",
        "fallback": "assets/splash/girls-frontline-2.jpg",
        "position": "right center",
        "mobilePosition": "62% center"
      },
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
