// Gacha tracker data. Schema documented in CLAUDE.md.
// Keep everything after the '=' STRICT JSON (quoted keys, no trailing commas)
// so external tooling can parse this file without a JS engine.
window.GACHA_DATA =
{
  "lastUpdated": "2026-10-26",
  "games": [
    {
      "name": "Genshin Impact",
      "short": "GI",
      "characters": {"gi:mitya":"Mitya","gi:valeriy":"Valeriy","gi:tsaritsa":"Tsaritsa (Anastasya)","gi:danica":"Danica","gi:flins":"Flins","gi:ineffa":"Ineffa","gi:vesna":"Vesna","gi:vodyanitsa":"Vodyanitsa","gi:skirk":"Skirk","gi:escoffier":"Escoffier","gi:furina":"Furina","gi:zibai":"Zibai","gi:linnea":"Linnea"},
      "version": "7.1 — Phase 2",
      "accent": "#4fc3f7",
      "icon": "icons/gi.jpg",
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1072404907230060544/1792760556/1500x500",
        "sourceUrl": "https://x.com/GenshinImpact",
        "checkedAt": "2026-10-26",
        "fallback": "assets/splash/genshin-impact.jpg",
        "position": "right center",
        "mobilePosition": "68% center"
      },
      "leaks": [
        { "title": "Tsaritsa (Anastasya) + Danica", "characterIds": ["gi:tsaritsa","gi:danica"], "version": "7.3", "confidence": "low", "confidenceReason": "Recent deep-beta and kit reports continue to pair both new characters in Version 7.3, but the evidence remains unofficial, indirect, and earlier than the public beta cycle.", "sourceUrl": "https://gamesandchill.com/en/leaks/genshin-impact-7x-character-release-leaks-reveal-alleged-roadmap-from-mitya-to-dainsleif/", "checkedAt": "2026-10-03" }
      ],
      "banners": [
        { "title": "v7.1 Phase 2 — Skirk + Escoffier reruns", "characterIds": ["gi:skirk","gi:escoffier"], "start": "2026-10-13", "end": "2026-11-03" }
      ],
      "upcoming": [
        { "title": "v7.2 Phase 1 — Mitya (new 5★) + Furina rerun; Valeriy rate-up", "characterIds": ["gi:mitya","gi:furina","gi:valeriy"], "date": "2026-11-04", "endDate": "2026-11-24" },
        { "title": "v7.2 Phase 2 — Zibai + Linnea reruns", "characterIds": ["gi:zibai","gi:linnea"], "date": "2026-11-24", "endDate": "2026-12-15" }
      ],
      "notes": "Version 7.1 Phase 2 remains live Oct 13–Nov 3 with Skirk + Escoffier reruns. The Oct 23 Version 7.2 Special Program confirmed Hour of Ruin for Nov 4: Phase 1 features Mitya + Furina with Valeriy rate-up through Nov 24, followed by Zibai + Linnea reruns through Dec 15. The Version 7.3 Tsaritsa + Danica pairing remains a low-confidence leak.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Genshin-Impact/archives/305012" },
        { "label": "Official news", "url": "https://genshin.hoyoverse.com/en/news" }
      ]
    },
    {
      "name": "Honkai: Star Rail",
      "short": "HSR",
      "characters": {"hsr:nihilux":"Aeon ★ Aha","hsr:robin-summeretto":"Robin Summeretto","hsr:hyacine":"Hyacine","hsr:rin-tohsaka":"Rin Tohsaka","hsr:gilgamesh":"Gilgamesh","hsr:aventurine-waveflair":"Aventurine Waveflair","hsr:ashveil":"Ashveil","hsr:pearl":"Pearl","hsr:evanescia":"Evanescia","hsr:mortenax-blade":"Mortenax Blade","hsr:ellen-joe":"Ellen Joe","hsr:astra-yao":"Astra Yao"},
      "version": "4.6 — Phase 2",
      "accent": "#b39ddb",
      "icon": "icons/hsr.jpg",
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1412998764701249542/1790560682/1500x500",
        "sourceUrl": "https://x.com/honkaistarrail",
        "checkedAt": "2026-10-26",
        "fallback": "assets/splash/honkai-star-rail.jpg",
        "position": "right center",
        "mobilePosition": "52% center"
      },
      "banners": [
        { "title": "Fate/stay Night collab Part 2 — Rin Tohsaka + Gilgamesh (no fixed end)", "characterIds": ["hsr:rin-tohsaka","hsr:gilgamesh"], "start": "2026-07-24", "end": null },
        { "title": "v4.6 — Pearl (new 5★, Ice Elation; whole version)", "characterIds": ["hsr:pearl"], "start": "2026-09-28", "end": "2026-11-11" },
        { "title": "v4.6 Phase 2 — Mortenax Blade rerun", "characterIds": ["hsr:mortenax-blade"], "start": "2026-10-21", "end": "2026-11-11" }
      ],
      "upcoming": [
        { "title": "v4.7 — Aeon ★ Aha (new 5★ Quantum Elation; previously known as Nihilux)", "characterIds": ["hsr:nihilux"], "date": null },
        { "title": "v4.8 — Ellen Joe (announced ZZZ collaboration character)", "characterIds": ["hsr:ellen-joe"], "date": null },
        { "title": "v4.8 — Astra Yao (announced ZZZ collaboration character)", "characterIds": ["hsr:astra-yao"], "date": null }
      ],
      "notes": "Version 4.6 is live from Sep 28: Pearl remains rate-up through the version end on Nov 11 (Asia/Singapore), and Mortenax Blade is the current Phase 2 rerun from Oct 21 through Nov 11. Fate/stay Night collab Part 2 remains open-ended. Aeon ★ Aha is officially announced for Version 4.7, but her exact banner date is not yet confirmed. Ellen Joe and Astra Yao are officially announced playable characters for the Version 4.8 ZZZ collaboration; exact dates, banner availability, and acquisition methods remain unconfirmed.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Honkai-Star-Rail/archives/408381" },
        { "label": "Official news", "url": "https://hsr.hoyoverse.com/en-us/news" }
      ]
    },
    {
      "name": "Zenless Zone Zero",
      "short": "ZZZ",
      "characters": {"zzz:severian":"Severian Lowell","zzz:pheony":"Phoenix Reffaella","zzz:claret-flint":"Claret Flint","zzz:nangong-yu":"Nangong Yu","zzz:roxy-ifrita-pryce":"Roxy Ifrita Pryce","zzz:promeia":"Promeia","zzz:velina":"Velina","zzz:norma":"Norma","zzz:robin":"Robin","zzz:kafka":"Kafka"},
      "version": "3.3 — Phase 1",
      "accent": "#f57c00",
      "icon": "icons/zzz.jpg",
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1508387670208270343/1792546330/1500x500",
        "sourceUrl": "https://x.com/ZZZ_EN",
        "checkedAt": "2026-10-26",
        "fallback": "assets/splash/zenless-zone-zero.jpg",
        "position": "right center",
        "mobilePosition": "72% center"
      },
      "banners": [
        { "title": "v3.3 Phase 1 — Phoenix Reffaella + Velina rerun", "characterIds": ["zzz:pheony","zzz:velina"], "start": "2026-10-21", "end": "2026-11-11" }
      ],
      "upcoming": [
        { "title": "v3.3 Phase 2 — Severian Lowell + Norma rerun", "characterIds": ["zzz:severian","zzz:norma"], "date": "2026-11-11", "endDate": "2026-12-01" },
        { "title": "v3.4 — Robin (announced Honkai: Star Rail collaboration character)", "characterIds": ["zzz:robin"], "date": null },
        { "title": "v3.4 — Kafka (announced Honkai: Star Rail collaboration character)", "characterIds": ["zzz:kafka"], "date": null }
      ],
      "notes": "Version 3.3 Phase 1 is live Oct 21–Nov 11 with Phoenix Reffaella + Velina rerun. The Oct 9 Special Program confirmed Severian Lowell + Norma rerun for Phase 2 from Nov 11–Dec 1, as documented in coverage of the program's banner slides. Phoenix retains her existing character ID (previously leaked as Pheony). Robin and Kafka are announced playable collaboration characters for Version 3.4; exact dates, banner availability, and acquisition methods remain unconfirmed.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Zenless-Zone-Zero/archives/435687" },
        { "label": "Official news", "url": "https://zenless.hoyoverse.com/m/en-us/news" }
      ]
    },
    {
      "name": "Arknights: Endfield",
      "short": "AKE",
      "characters": {"ake:si":"Si","ake:ye-minghui":"Ye Minghui","ake:argent-flow":"Argent Flow","ake:typhoeus":"Typhoeus","ake:yvonne":"Yvonne","ake:tangtang":"Tangtang"},
      "version": "Sanctuary of Ink",
      "accent": "#ffd54f",
      "icon": "icons/ake.jpg",
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1501126821727059969/1791286608/1500x500",
        "sourceUrl": "https://x.com/AKEndfield",
        "checkedAt": "2026-10-26",
        "fallback": "assets/splash/arknights-endfield.jpg",
        "position": "right center",
        "mobilePosition": "38% center"
      },
      "banners": [
        { "title": "v1.6 — Rejuvenation — Si (new 6★ Cryo Supporter)", "characterIds": ["ake:si"], "start": "2026-10-15", "end": "2026-11-05" }
      ],
      "upcoming": [
        { "title": "v1.6 — Ancestral Spring Flows Anew RE-Factor Headhunting #1 — Tangtang rerun", "characterIds": ["ake:tangtang"], "date": "2026-10-29", "endDate": "2026-11-19" },
        { "title": "v1.6 — The Hearth Fire Beckons the Starry Flow — Argent Flow (new 6★ Electric Guard)", "characterIds": ["ake:argent-flow"], "date": "2026-11-05" }
      ],
      "notes": "Sanctuary of Ink is live after the Oct 15 Asia-server update. Si is featured on Rejuvenation from Oct 15 through Nov 5 at 11:59 server time, replacing Yvonne's prior RE-Factor banner. Tangtang returns on Ancestral Spring Flows Anew Oct 29–Nov 19. Argent Flow follows on The Hearth Fire Beckons the Starry Flow from Nov 5 at 12:00 until the next version maintenance; no exact banner end is assumed.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Arknights-Endfield/archives/524215" },
        { "label": "Official site", "url": "https://endfield.gryphline.com/" }
      ]
    },
    {
      "name": "Girls' Frontline 2: Exilium",
      "short": "GFL2",
      "characters": {"gfl2:ots-14":"OTs-14","gfl2:basti":"Basti","gfl2:voymastina":"Voymastina","gfl2:soppo":"Soppo","gfl2:loreley":"Loreley","gfl2:alva":"Alva","gfl2:mityl":"Mityl","gfl2:cheyanne":"Cheyanne","gfl2:liushih":"Liushih","gfl2:faelynn":"Faelynn","gfl2:welrod":"Welrod","gfl2:sextans":"Sextans","gfl2:phaetusa":"Phaetusa"},
      "version": "Amber Reel of Moonlight",
      "accent": "#90a4ae",
      "icon": "icons/gfl2.jpg",
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1801169021758517248/1791464398/1500x500",
        "sourceUrl": "https://x.com/GFL2EXILIUM_EN",
        "checkedAt": "2026-10-26",
        "fallback": "assets/splash/girls-frontline-2.jpg",
        "position": "right center",
        "mobilePosition": "62% center"
      },
      "banners": [
        { "title": "Mityl + Cheyanne + Liushih", "characterIds": ["gfl2:mityl","gfl2:cheyanne","gfl2:liushih"], "start": "2026-10-08", "end": "2026-10-28" }
      ],
      "upcoming": [
        { "title": "Faelynn + Welrod + Sextans + Phaetusa", "characterIds": ["gfl2:faelynn","gfl2:welrod","gfl2:sextans","gfl2:phaetusa"], "date": "2026-10-29", "endDate": "2026-11-18" }
      ],
      "notes": "The healthy Oct 25 gfl2.help Global mirror confirms Mityl + Cheyanne + Liushih remain live Oct 8–28 and identifies Faelynn + Welrod + Sextans + Phaetusa as the next Global lineup for Oct 29–Nov 18. The official Steam digest dated Oct 7 identifies the current event as Amber Reel of Moonlight and Mityl as its new Doll. No CN ordering or dates were used.",
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
      "banners": [],
      "upcoming": [
        { "title": "Tutankhamun", "characterIds": ["fgo:tutankhamun"], "date": "2026-11-13", "approx": true },
        { "title": "Louhi", "characterIds": ["fgo:louhi"], "date": "2026-12-11", "approx": true },
        { "title": "Phantasmoon", "characterIds": ["fgo:phantasmoon"], "date": "2026-12-25", "approx": true }
      ],
      "notes": "NA server; new-Servant debuts only (reruns/support hidden). Kazuradrop ended Oct 15; the current GUDAGUDA revival features previously released Servants, so no current debut banner is listed. The next three predicted debuts are Tutankhamun (roughly mid-November), Louhi (roughly mid-December), and Phantasmoon (roughly late December), based on GamePress's current NA release-month estimates and JP debut order. Calendar dates are approximate anchors using the JP day of month, not confirmed NA starts; end dates remain unknown. Checked Oct 18, 2026.",
      "links": [
        { "label": "GamePress NA campaigns", "url": "https://grandorder.gamepress.gg/p/campaign-list" },
        { "label": "Official NA site", "url": "https://fate-go.us/" }
      ]
    }
  ]
}
;
