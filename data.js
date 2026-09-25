// Gacha tracker data. Schema documented in CLAUDE.md.
// Keep everything after the '=' STRICT JSON (quoted keys, no trailing commas)
// so external tooling can parse this file without a JS engine.
window.GACHA_DATA =
{
  "lastUpdated": "2026-09-25",
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
      "version": "4.5 — Phase 2",
      "accent": "#b39ddb",
      "icon": "icons/hsr.jpg",
      "banners": [
        { "title": "v4.5 Phase 2 — Aventurine Waveflair (new 5★, Quantum Elation) + Ashveil rerun", "characterIds": ["hsr:aventurine-waveflair","hsr:ashveil"], "start": "2026-09-12", "end": "2026-09-28" },
        { "title": "Fate/stay Night collab Part 2 — Rin Tohsaka + Gilgamesh (no fixed end)", "characterIds": ["hsr:rin-tohsaka","hsr:gilgamesh"], "start": "2026-07-24", "end": null }
      ],
      "upcoming": [
        { "title": "v4.6 — Pearl (new 5★, Ice Elation; whole version)", "characterIds": ["hsr:pearl"], "date": "2026-09-28", "endDate": "2026-11-10" },
        { "title": "v4.6 Phase 1 — Evanescia rerun", "characterIds": ["hsr:evanescia"], "date": "2026-09-28", "endDate": "2026-10-21" },
        { "title": "v4.6 Phase 2 — Mortenax Blade rerun", "characterIds": ["hsr:mortenax-blade"], "date": "2026-10-21", "endDate": "2026-11-10" },
        { "title": "Aeon ★ Aha (announced playable character; previously known as Nihilux)", "characterIds": ["hsr:nihilux"], "date": null }
      ],
      "notes": "Version 4.5 Phase 2 remains live through Sep 28. Version 4.6 launches Sep 28: Pearl is rate-up throughout the version, Evanescia reruns in Phase 1 through Oct 21, and Mortenax Blade reruns in Phase 2 through Nov 10. Fate/stay Night collab Part 2 remains open-ended. Aeon ★ Aha is officially announced without a confirmed banner date.",
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
      "name": "Persona 5: The Phantom X",
      "short": "P5X",
      "characters": {"p5x:kumi-katayama":"Kumi Katayama","p5x:yui-stella":"YUI Stella","p5x:mitsuru":"Mitsuru","p5x:fuuka":"Fuuka","p5x:kotone-shiomi":"Kotone Shiomi"},
      "version": "4.10 (5.4.1)",
      "accent": "#ef5350",
      "icon": "icons/p5x.jpg",
      "banners": [
        { "title": "YUI Stella", "characterIds": ["p5x:yui-stella"], "start": "2026-09-10", "end": "2026-10-15" },
        { "title": "Kotone Shiomi / FeMC — P3P collaboration", "characterIds": ["p5x:kotone-shiomi"], "start": "2026-09-24", "end": "2026-11-12" }
      ],
      "upcoming": [
        { "title": "Mitsuru", "characterIds": ["p5x:mitsuru"], "date": "2026-10-15" },
        { "title": "Fuuka", "characterIds": ["p5x:fuuka"], "date": null }
      ],
      "notes": "Ver. 4.10 launched Sep 24 with Kotone Shiomi; the official Global notice confirms her contract through Nov 12 at 1:59 AM UTC. The healthy Lufel Global mirror explicitly dates Mitsuru for Oct 15. Fuuka remains in the mirrored future release order, but her exact date is not stored until independently confirmed. Cosmic Yui remains active through Oct 15.",
      "links": [
        { "label": "Lufelnet schedule", "url": "https://lufel.net/en/schedule/" },
        { "label": "Game8 banners", "url": "https://game8.co/games/Persona-5-Phantom-X/archives/532248" },
        { "label": "Kotone announcement coverage", "url": "https://www.siliconera.com/persona-5-the-phantom-x-persona-3-heroine-kotone-shiomi-release-date-set/" }
      ]
    },
    {
      "name": "Neverness to Everness",
      "short": "NTE",
      "characters": {"nte:exe":"Exe","nte:elyms":"Elyms","nte:linko":"Linko","nte:hotori":"Hotori","nte:blackbird":"Blackbird","nte:akane-rin":"Akane Rin","nte:lacrimosa":"Lacrimosa"},
      "version": "1.3 — Phase 2",
      "accent": "#66bb6a",
      "icon": "icons/nte.jpg",
      "leaks": [
        { "title": "Exe + Elyms", "characterIds": ["nte:exe","nte:elyms"], "version": "1.5", "confidence": "low", "confidenceReason": "Recent coverage and Seele-attributed reposts agree on the pair, but the original leak has not been verified.", "sourceUrl": "https://vortexgaming.io/en/postdetail/1262292", "checkedAt": "2026-09-08" }
      ],
      "banners": [
        { "title": "v1.3 Phase 2 — Linko (new 5★) + Hotori rerun", "characterIds": ["nte:linko","nte:hotori"], "start": "2026-09-09", "end": "2026-09-30" }
      ],
      "upcoming": [
        { "title": "v1.4 Phase 1 — Blackbird + Lacrimosa rerun", "characterIds": ["nte:blackbird","nte:lacrimosa"], "date": "2026-09-30", "endDate": "2026-10-21" },
        { "title": "v1.4 Phase 2 — Akane Rin", "characterIds": ["nte:akane-rin"], "date": "2026-10-21", "endDate": "2026-11-11" }
      ],
      "notes": "Version 1.3 Phase 2 remains live Sep 9–30 with Linko and a concurrent Hotori rerun. The Version 1.4 Preview Special Program confirms the Sep 30 Global launch, Blackbird's Foretold Finale and Lacrimosa's Fading Reverie in Phase 1, followed by Akane Rin's Dazzling Star from Oct 21; the announced program windows establish the Oct 21 phase boundary and Nov 11 end.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Neverness-to-Everness/archives/597944" },
        { "label": "NTEbuild banners", "url": "https://www.ntebuild.com/banners" },
        { "label": "Blackbird announcement coverage", "url": "https://gamemarket.gg/news/neverness-to-everness/nte-confirms-blackbird-as-s-class-what-s-known-and-what-isn-t" },
        { "label": "Akane Rin announcement", "url": "https://www.reddit.com/r/NevernessToEverness/comments/1vwqy98/hethereau_special_bulletin%E4%B8%A8akane_rin/" }
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