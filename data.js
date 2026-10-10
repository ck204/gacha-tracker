// Gacha tracker data. Schema documented in CLAUDE.md.
// Keep everything after the '=' STRICT JSON (quoted keys, no trailing commas)
// so external tooling can parse this file without a JS engine.
window.GACHA_DATA =
{
  "lastUpdated": "2026-10-10",
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
        "checkedAt": "2026-10-10",
        "fallback": "assets/splash/genshin-impact.jpg",
        "position": "right center",
        "mobilePosition": "68% center"
      },
      "leaks": [
        { "title": "Tsaritsa (Anastasya) + Danica", "characterIds": ["gi:tsaritsa","gi:danica"], "version": "7.3", "confidence": "low", "confidenceReason": "Recent deep-beta and kit reports continue to pair both new characters in Version 7.3, but the evidence remains unofficial, indirect, and earlier than the public beta cycle.", "sourceUrl": "https://gamesandchill.com/en/leaks/genshin-impact-7x-character-release-leaks-reveal-alleged-roadmap-from-mitya-to-dainsleif/", "checkedAt": "2026-10-03" }
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
      "characters": {"hsr:nihilux":"Aeon ★ Aha","hsr:robin-summeretto":"Robin Summeretto","hsr:hyacine":"Hyacine","hsr:rin-tohsaka":"Rin Tohsaka","hsr:gilgamesh":"Gilgamesh","hsr:aventurine-waveflair":"Aventurine Waveflair","hsr:ashveil":"Ashveil","hsr:pearl":"Pearl","hsr:evanescia":"Evanescia","hsr:mortenax-blade":"Mortenax Blade","hsr:ellen-joe":"Ellen Joe","hsr:astra-yao":"Astra Yao"},
      "version": "4.6 — Phase 1",
      "accent": "#b39ddb",
      "icon": "icons/hsr.jpg",
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1412998764701249542/1790560682/1500x500",
        "sourceUrl": "https://x.com/honkaistarrail",
        "checkedAt": "2026-10-10",
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
        { "title": "v4.7 — Aeon ★ Aha (new 5★ Quantum Elation; previously known as Nihilux)", "characterIds": ["hsr:nihilux"], "date": null },
        { "title": "v4.8 — Ellen Joe (announced ZZZ collaboration character)", "characterIds": ["hsr:ellen-joe"], "date": null },
        { "title": "v4.8 — Astra Yao (announced ZZZ collaboration character)", "characterIds": ["hsr:astra-yao"], "date": null }
      ],
      "notes": "Version 4.6 is live from Sep 28: Pearl is rate-up through the version end on Nov 11 (Asia/Singapore), Evanescia reruns in current Phase 1 through Oct 21, and Mortenax Blade reruns in Phase 2 through Nov 11. Fate/stay Night collab Part 2 remains open-ended. Aeon ★ Aha is officially announced for Version 4.7, but her exact banner date is not yet confirmed. Ellen Joe and Astra Yao are officially announced playable characters for the Version 4.8 ZZZ collaboration; exact dates, banner availability, and acquisition methods remain unconfirmed.",
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
        "checkedAt": "2026-10-10",
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
      "characters": {"ake:si":"Si","ake:ye-minghui":"Ye Minghui","ake:argent-flow":"Argent Flow","ake:typhoeus":"Typhoeus","ake:yvonne":"Yvonne","ake:tangtang":"Tangtang"},
      "version": "Dreamscape of Wind and Snow",
      "accent": "#ffd54f",
      "icon": "icons/ake.jpg",
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1501126821727059969/1791286608/1500x500",
        "sourceUrl": "https://x.com/AKEndfield",
        "checkedAt": "2026-10-10",
        "fallback": "assets/splash/arknights-endfield.jpg",
        "position": "right center",
        "mobilePosition": "38% center"
      },
      "banners": [
        { "title": "Resplendent Spectrum RE-Factor Headhunting #1 — Yvonne rate-up", "characterIds": ["ake:yvonne"], "start": "2026-09-24", "end": "2026-10-15" }
      ],
      "upcoming": [
        { "title": "v1.6 — Rejuvenation — Si (new 6★ Cryo Supporter)", "characterIds": ["ake:si"], "date": "2026-10-15", "endDate": "2026-11-05" },
        { "title": "v1.6 — Ancestral Spring Flows Anew RE-Factor Headhunting #1 — Tangtang rerun", "characterIds": ["ake:tangtang"], "date": "2026-10-29", "endDate": "2026-11-19" },
        { "title": "v1.6 — The Hearth Fire Beckons the Starry Flow — Argent Flow (new 6★ Electric Guard)", "characterIds": ["ake:argent-flow"], "date": "2026-11-05" }
      ],
      "notes": "Dreamscape of Wind and Snow continues with Yvonne through Oct 15. The Oct 6 Sanctuary of Ink Version 1.6 Special Program confirmed Si on Rejuvenation from the Oct 15 update through Nov 5 at 11:59 server time, followed by Argent Flow on The Hearth Fire Beckons the Starry Flow from Nov 5 at 12:00 until the next version maintenance. The earlier Si + Ye Minghui leak is superseded by the official lineup. The announced Ancestral Spring Flows Anew RE-Factor Headhunting #1 brings Tangtang back Oct 29–Nov 19; its dates were cross-checked against the Oct 7 program recap and version schedule.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Arknights-Endfield/archives/524215" },
        { "label": "Official site", "url": "https://endfield.gryphline.com/" }
      ]
    },
    {
      "name": "Girls' Frontline 2: Exilium",
      "short": "GFL2",
      "characters": {"gfl2:ots-14":"OTs-14","gfl2:basti":"Basti","gfl2:voymastina":"Voymastina","gfl2:soppo":"Soppo","gfl2:loreley":"Loreley","gfl2:alva":"Alva","gfl2:mityl":"Mityl","gfl2:cheyanne":"Cheyanne","gfl2:liushih":"Liushih"},
      "version": "Amber Reel of Moonlight",
      "accent": "#90a4ae",
      "icon": "icons/gfl2.jpg",
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1801169021758517248/1791464398/1500x500",
        "sourceUrl": "https://x.com/GFL2EXILIUM_EN",
        "checkedAt": "2026-10-10",
        "fallback": "assets/splash/girls-frontline-2.jpg",
        "position": "right center",
        "mobilePosition": "62% center"
      },
      "banners": [
        { "title": "Mityl + Cheyanne + Liushih", "characterIds": ["gfl2:mityl","gfl2:cheyanne","gfl2:liushih"], "start": "2026-10-08", "end": "2026-10-28" }
      ],
      "upcoming": [],
      "notes": "The healthy Oct 9 gfl2.help Global mirror confirms Mityl + Cheyanne + Liushih are now live Oct 8–28. The official Steam digest dated Oct 7 identifies the event as Amber Reel of Moonlight and Mityl as its new Doll. Expired Soppo + Loreley + Alva were removed from current banners; permanent character IDs were retained. CN ordering was not used.",
      "links": [
        { "label": "GFL2.help banners", "url": "https://gfl2.help/en/banners" }
      ]
    },
    {
      "name": "Fate/Grand Order (NA)",
      "short": "FGO",
      "characters": {"fgo:kazuradrop":"Kazuradrop","fgo:tutankhamun":"Tutankhamun","fgo:louhi":"Louhi","fgo:phantasmoon":"Phantasmoon"},
      "version": "NA / Global",
      "accent": "#c0a062",
      "icon": "icons/fgo.jpg",
      "banners": [
        { "title": "Faerie Sugoroku Insect Cage Game — Kazuradrop", "characterIds": ["fgo:kazuradrop"], "start": "2026-09-25", "end": "2026-10-15" }
      ],
      "upcoming": [
        { "title": "Tutankhamun", "characterIds": ["fgo:tutankhamun"], "date": "2026-10-13", "approx": true },
        { "title": "Louhi", "characterIds": ["fgo:louhi"], "date": "2026-11-11", "approx": true },
        { "title": "Phantasmoon", "characterIds": ["fgo:phantasmoon"], "date": "2026-11-25", "approx": true }
      ],
      "notes": "NA server; new-Servant debuts only (reruns/support hidden). Kazuradrop is confirmed for Sep 25–Oct 15. Upcoming dates are rough JP-schedule estimates (NA ~23mo behind), not announced NA dates; seasonal events may shift. Tutankhamun and Louhi retain their previous estimates; Phantasmoon uses the same method. Upcoming NA end dates are unconfirmed.",
      "links": [
        { "label": "GamePress NA campaigns", "url": "https://grandorder.gamepress.gg/p/campaign-list" },
        { "label": "Official NA site", "url": "https://fate-go.us/" }
      ]
    }
  ]
}
;
