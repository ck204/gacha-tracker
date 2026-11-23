// Gacha tracker data. Schema documented in CLAUDE.md.
// Keep everything after the '=' STRICT JSON (quoted keys, no trailing commas)
// so external tooling can parse this file without a JS engine.
window.GACHA_DATA =
{
  "lastUpdated": "2026-11-23",
  "games": [
    {
      "name": "Genshin Impact",
      "short": "GI",
      "characters": {"gi:mitya":"Mitya","gi:valeriy":"Valeriy","gi:tsaritsa":"Tsaritsa (Anastasya)","gi:danica":"Danica","gi:flins":"Flins","gi:ineffa":"Ineffa","gi:vesna":"Vesna","gi:vodyanitsa":"Vodyanitsa","gi:skirk":"Skirk","gi:escoffier":"Escoffier","gi:furina":"Furina","gi:zibai":"Zibai","gi:linnea":"Linnea","gi:varesa":"Varesa","gi:chasca":"Chasca","gi:xilonen":"Xilonen","gi:mualani":"Mualani","gi:kinich":"Kinich"},
      "version": "7.2 — Phase 1",
      "accent": "#4fc3f7",
      "icon": "icons/gi.jpg",
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1072404907230060544/1793760023/1500x500",
        "sourceUrl": "https://x.com/GenshinImpact",
        "checkedAt": "2026-11-23",
        "fallback": "assets/splash/genshin-impact.jpg",
        "position": "right center",
        "mobilePosition": "68% center"
      },
      "banners": [
        { "title": "v7.2 Phase 1 — Mitya (new 5★) + Furina rerun; Valeriy rate-up", "characterIds": ["gi:mitya","gi:furina","gi:valeriy"], "start": "2026-11-04", "end": "2026-11-24" }
      ],
      "upcoming": [
        { "title": "v7.2 Phase 2 — Zibai + Linnea reruns", "characterIds": ["gi:zibai","gi:linnea"], "date": "2026-11-24", "endDate": "2026-12-15" },
        { "title": "v7.2 Phase 2 — Natlan Chronicled Wish: Varesa + Chasca + Xilonen + Mualani + Kinich", "characterIds": ["gi:varesa","gi:chasca","gi:xilonen","gi:mualani","gi:kinich"], "date": "2026-11-24", "endDate": "2026-12-15" },
        { "title": "Anastasya (Tsaritsa) + Danica — officially introduced playable characters", "characterIds": ["gi:tsaritsa","gi:danica"], "date": null }
      ],
      "notes": "Version 7.2 Phase 1 is live Nov 4–24 with Mitya + Furina and Valeriy rate-up, followed by Zibai + Linnea reruns and the Natlan Chronicled Wish (Varesa, Chasca, Xilonen, Mualani, Kinich) through Dec 15. Anastasya and Danica have official playable-character introductions; their version, phase, and banner dates remain unconfirmed.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Genshin-Impact/archives/305012" },
        { "label": "Official news", "url": "https://genshin.hoyoverse.com/en/news" }
      ]
    },
    {
      "name": "Honkai: Star Rail",
      "short": "HSR",
      "characters": {"hsr:nihilux":"Aeon ★ Aha","hsr:robin-summeretto":"Robin Summeretto","hsr:hyacine":"Hyacine","hsr:rin-tohsaka":"Rin Tohsaka","hsr:gilgamesh":"Gilgamesh","hsr:aventurine-waveflair":"Aventurine Waveflair","hsr:ashveil":"Ashveil","hsr:pearl":"Pearl","hsr:evanescia":"Evanescia","hsr:mortenax-blade":"Mortenax Blade","hsr:ellen-joe":"Ellen Joe","hsr:astra-yao":"Astra Yao","hsr:silver-wolf-lv999":"Silver Wolf LV.999","hsr:sparxie":"Sparxie","hsr:yao-guang":"Yao Guang","hsr:acheron":"Acheron","hsr:dan-heng-imbibitor-lunae":"Dan Heng • Imbibitor Lunae","hsr:jing-yuan":"Jing Yuan"},
      "version": "4.7 — Phase 1",
      "accent": "#b39ddb",
      "icon": "icons/hsr.jpg",
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1412998764701249542/1794362654/1500x500",
        "sourceUrl": "https://x.com/honkaistarrail",
        "checkedAt": "2026-11-23",
        "fallback": "assets/splash/honkai-star-rail.jpg",
        "position": "right center",
        "mobilePosition": "52% center"
      },
      "banners": [
        { "title": "Fate/stay Night collab Part 2 — Rin Tohsaka + Gilgamesh (no fixed end)", "characterIds": ["hsr:rin-tohsaka","hsr:gilgamesh"], "collab": true, "start": "2026-07-24", "end": null },
        { "title": "v4.7 — Aeon ★ Aha (new 5★ Quantum Elation; whole version)", "characterIds": ["hsr:nihilux"], "start": "2026-11-11", "end": "2026-12-22" },
        { "title": "v4.7 Phase 1 reruns — Silver Wolf LV.999 + Sparxie + Yao Guang", "characterIds": ["hsr:silver-wolf-lv999","hsr:sparxie","hsr:yao-guang"], "start": "2026-11-11", "end": "2026-12-02" }
      ],
      "upcoming": [
        { "title": "v4.7 Phase 2 reruns — Acheron + Dan Heng • Imbibitor Lunae + Jing Yuan", "characterIds": ["hsr:acheron","hsr:dan-heng-imbibitor-lunae","hsr:jing-yuan"], "date": "2026-12-02", "endDate": "2026-12-22" },
        { "title": "v4.8 — Ellen Joe (announced ZZZ collaboration character)", "characterIds": ["hsr:ellen-joe"], "collab": true, "date": null },
        { "title": "v4.8 — Astra Yao (announced ZZZ collaboration character)", "characterIds": ["hsr:astra-yao"], "collab": true, "date": null }
      ],
      "notes": "Version 4.7 is live from Nov 11. Aeon ★ Aha runs for the whole version through Dec 22; Phase 1 reruns Silver Wolf LV.999 + Sparxie + Yao Guang run through Dec 2, followed by Acheron + Dan Heng • Imbibitor Lunae + Jing Yuan through Dec 22. Fate/stay Night collab Part 2 remains open-ended. Ellen Joe and Astra Yao remain announced for Version 4.8 with exact acquisition timing unknown.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Honkai-Star-Rail/archives/408381" },
        { "label": "Official news", "url": "https://hsr.hoyoverse.com/en-us/news" }
      ]
    },
    {
      "name": "Zenless Zone Zero",
      "short": "ZZZ",
      "characters": {"zzz:severian":"Severian Lowell","zzz:pheony":"Phoenix Reffaella","zzz:claret-flint":"Claret Flint","zzz:nangong-yu":"Nangong Yu","zzz:roxy-ifrita-pryce":"Roxy Ifrita Pryce","zzz:promeia":"Promeia","zzz:velina":"Velina","zzz:norma":"Norma","zzz:robin":"Robin","zzz:kafka":"Kafka","zzz:sunbringer":"Sunbringer"},
      "version": "3.3 — Phase 2",
      "accent": "#f57c00",
      "icon": "icons/zzz.jpg",
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1508387670208270343/1792546330/1500x500",
        "sourceUrl": "https://x.com/ZZZ_EN",
        "checkedAt": "2026-11-23",
        "fallback": "assets/splash/zenless-zone-zero.jpg",
        "position": "right center",
        "mobilePosition": "72% center"
      },
      "banners": [
        { "title": "v3.3 Phase 2 — Severian Lowell + Norma rerun", "characterIds": ["zzz:severian","zzz:norma"], "start": "2026-11-11", "end": "2026-12-01" }
      ],
      "upcoming": [
        { "title": "v3.4 — Sunbringer (new Void Hunter; Signal Search)", "characterIds": ["zzz:sunbringer"], "date": "2026-12-02" },
        { "title": "v3.4 — Robin (Honkai: Star Rail collaboration; free login reward and Signal Search)", "characterIds": ["zzz:robin"], "collab": true, "date": "2026-12-02" },
        { "title": "v3.4 — Kafka (Honkai: Star Rail collaboration; limited Signal Search after Jan 1)", "characterIds": ["zzz:kafka"], "collab": true, "date": null }
      ],
      "notes": "Version 3.3 Phase 2 is live Nov 11–Dec 1 with Severian Lowell + Norma rerun. Phoenix retains her existing character ID (previously leaked as Pheony). Version 3.4, The Finality of the Day, launches Dec 2: Sunbringer and Robin become available from launch, with Robin also granted as a login reward. Kafka joins the limited Signal Search after Jan 1; her exact start date remains unconfirmed.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Zenless-Zone-Zero/archives/435687" },
        { "label": "Official news", "url": "https://zenless.hoyoverse.com/m/en-us/news" }
      ]
    },
    {
      "name": "Arknights: Endfield",
      "short": "AKE",
      "characters": {"ake:si":"Si","ake:ye-minghui":"Ye Minghui","ake:argent-flow":"Argent Flow","ake:typhoeus":"Typhoeus","ake:yvonne":"Yvonne","ake:tangtang":"Tangtang","ake:kay":"Kay","ake:gilberta":"Gilberta","ake:rossi":"Rossi"},
      "version": "Sanctuary of Ink",
      "accent": "#ffd54f",
      "icon": "icons/ake.jpg",
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1501126821727059969/1795260910/1500x500",
        "sourceUrl": "https://x.com/AKEndfield",
        "checkedAt": "2026-11-23",
        "fallback": "assets/splash/arknights-endfield.jpg",
        "position": "right center",
        "mobilePosition": "38% center"
      },
      "banners": [
        { "title": "v1.6 — The Hearth Fire Beckons the Starry Flow — Argent Flow (new 6★ Electric Guard)", "characterIds": ["ake:argent-flow"], "start": "2026-11-05", "end": "2026-11-25" }
      ],
      "upcoming": [
        { "title": "Meeting You in the World o'Shrooms — Anvil, Backpack, Plus A Pot o'Honey — Kay (new 6★ Nature Vanguard)", "characterIds": ["ake:kay"], "date": "2026-11-25", "endDate": "2026-12-23" },
        { "title": "Meeting You in the World o'Shrooms — To Every Wish Adrift RE-Factor #1 — Gilberta rerun", "characterIds": ["ake:gilberta"], "date": "2026-11-25", "endDate": "2026-12-16" },
        { "title": "Meeting You in the World o'Shrooms — Precious Scarlet RE-Factor #1 — Rossi rerun", "characterIds": ["ake:rossi"], "date": "2026-12-16", "endDate": "2027-01-07" }
      ],
      "notes": "Sanctuary of Ink remains live through the Nov 25 version maintenance, when Argent Flow ends. Meeting You in the World o'Shrooms launches Nov 25 with Kay and a Gilberta rerun; Rossi's rerun begins Dec 16. Kay runs through Dec 23, Gilberta through Dec 16, and Rossi through Jan 7. Mimino is a free event reward rather than a Headhunting banner.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Arknights-Endfield/archives/524215" },
        { "label": "Official site", "url": "https://endfield.gryphline.com/" }
      ]
    },
    {
      "name": "Girls' Frontline 2: Exilium",
      "short": "GFL2",
      "characters": {"gfl2:ots-14":"OTs-14","gfl2:basti":"Basti","gfl2:voymastina":"Voymastina","gfl2:soppo":"Soppo","gfl2:loreley":"Loreley","gfl2:alva":"Alva","gfl2:mityl":"Mityl","gfl2:cheyanne":"Cheyanne","gfl2:liushih":"Liushih","gfl2:faelynn":"Faelynn","gfl2:welrod":"Welrod","gfl2:sextans":"Sextans","gfl2:phaetusa":"Phaetusa","gfl2:koleda":"Koleda","gfl2:nikketa":"Nikketa","gfl2:asteria":"Asteria"},
      "version": "ILIAD",
      "accent": "#90a4ae",
      "icon": "icons/gfl2.jpg",
      "artwork": {
        "url": "https://pbs.twimg.com/profile_banners/1801169021758517248/1795091494/1500x500",
        "sourceUrl": "https://x.com/GFL2EXILIUM_EN",
        "checkedAt": "2026-11-23",
        "fallback": "assets/splash/girls-frontline-2.jpg",
        "position": "right center",
        "mobilePosition": "62% center"
      },
      "banners": [
        { "title": "Koleda + OTs-14 + Nikketa", "characterIds": ["gfl2:koleda","gfl2:ots-14","gfl2:nikketa"], "start": "2026-11-19", "end": "2026-12-09" }
      ],
      "upcoming": [
        { "title": "Asteria + Soppo + third rate-up Doll TBA", "characterIds": ["gfl2:asteria","gfl2:soppo"], "date": "2026-12-10", "endDate": "2026-12-30" }
      ],
      "notes": "The healthy Global mirror and official Nov 19 Steam update confirm Koleda + OTs-14 + Nikketa are live Nov 19–Dec 9 in the ILIAD update. The mirror lists Asteria + Soppo + an unresolved third rate-up Doll for Dec 10–30; only the two named Dolls are recorded, and no CN ordering or identities were used.",
      "links": [
        { "label": "GFL2.help banners", "url": "https://gfl2.help/en/banners" }
      ]
    },
    {
      "name": "Fate/Grand Order (NA)",
      "short": "FGO",
      "characters": {"fgo:kazuradrop":"Kazuradrop","fgo:tutankhamun":"Tutankhamun","fgo:louhi":"Louhi","fgo:phantasmoon":"Phantasmoon","fgo:biscione":"Biscione","fgo:kurohime":"Kurohime"},
      "version": "NA / Global",
      "accent": "#c0a062",
      "icon": "icons/fgo.jpg",
      "banners": [
        { "title": "Smash! Mystery House Crafters — Tutankhamun", "characterIds": ["fgo:tutankhamun"], "start": "2026-11-13", "end": "2026-12-03" }
      ],
      "upcoming": [
        { "title": "Louhi", "characterIds": ["fgo:louhi"], "date": "2026-12-11", "approx": true },
        { "title": "Phantasmoon", "characterIds": ["fgo:phantasmoon"], "date": "2026-12-25", "approx": true },
        { "title": "Biscione & Kurohime", "characterIds": ["fgo:biscione", "fgo:kurohime"], "date": "2027-01-15", "approx": true }
      ],
      "notes": "NA server; new-Servant debuts only. Tutankhamun's first NA Pickup runs Nov 13–Dec 3 (PST). The next three predicted debut banners feature Louhi, Phantasmoon, and Biscione with Kurohime; dates are approximate JP-schedule anchors. Richard I already debuted on NA in February 2026. Checked Nov 19, 2026.",
      "links": [
        { "label": "GamePress NA campaigns", "url": "https://grandorder.gamepress.gg/p/campaign-list" },
        { "label": "Official NA site", "url": "https://fate-go.us/" }
      ]
    }
  ]
}
;
