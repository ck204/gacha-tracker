// Gacha tracker data. Schema documented in CLAUDE.md.
// Keep everything after the '=' STRICT JSON (quoted keys, no trailing commas)
// so external tooling can parse this file without a JS engine.
window.GACHA_DATA =
{
  "lastUpdated": "2026-09-09",
  "games": [
    {
      "name": "Genshin Impact",
      "short": "GI",
      "characters": {"gi:mitya":"Mitya","gi:valeriy":"Valeriy","gi:tsaritsa":"Tsaritsa (Anastasya)","gi:danica":"Danica","gi:flins":"Flins","gi:ineffa":"Ineffa","gi:vesna":"Vesna","gi:vodyanitsa":"Vodyanitsa"},
      "characterChecks": {
        "gi:mitya": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "leaks",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "gi:valeriy": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "leaks",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "gi:tsaritsa": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "leaks",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "gi:danica": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "leaks",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "gi:flins": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "banners",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "gi:ineffa": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "banners",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "gi:vesna": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "upcoming",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "gi:vodyanitsa": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "upcoming",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        }
      },
      "version": "7.0 — Phase 2",
      "accent": "#4fc3f7",
      "icon": "icons/gi.jpg",
      "leaks": [],
      "leakReview": [
        {
          "title": "Mitya + Valeriy",
          "characterIds": [
            "gi:mitya",
            "gi:valeriy"
          ],
          "version": "7.2",
          "confidence": "low",
          "confidenceReason": "An FSC/HxG-attributed roadmap paired both new units in Version 7.2, but a newer Hongyu-attributed banner report names Mitya without confirming Valeriy; timing remains disputed.",
          "sourceUrl": "https://www.reddit.com/r/Genshin_Impact_Leaks/comments/1uug2jh/character_release_order_via_fsc_hxg/",
          "checkedAt": "2026-09-08",
          "reviewReason": "Held for verification under the new leak policy: check original claim, corrections, playable identity, release history and official announcements before republishing."
        },
        {
          "title": "Tsaritsa (Anastasya) + Danica",
          "characterIds": [
            "gi:tsaritsa",
            "gi:danica"
          ],
          "version": "7.3",
          "confidence": "low",
          "confidenceReason": "Several roadmap reposts agree on this pair, but the recent source post was removed and the claim is still far ahead of beta confirmation.",
          "sourceUrl": "https://gamesandchill.com/en/leaks/genshin-impact-7x-character-release-leaks-reveal-alleged-roadmap-from-mitya-to-dainsleif/",
          "checkedAt": "2026-09-08",
          "reviewReason": "Held for verification under the new leak policy: check original claim, corrections, playable identity, release history and official announcements before republishing."
        }
      ],
      "banners": [
        { "title": "v7.0 Phase 2 — Flins + Ineffa reruns", "characterIds": ["gi:flins","gi:ineffa"], "start": "2026-09-01", "end": "2026-09-22" }
      ],
      "upcoming": [
        { "title": "Vesna (announced character)", "characterIds": ["gi:vesna"], "date": null },
        { "title": "Vodyanitsa (announced character)", "characterIds": ["gi:vodyanitsa"], "date": null }
      ],
      "notes": "Version 7.0 Phase 2 is now live Sep 1–22 with Flins and Ineffa reruns. HoYoverse has revealed Vesna and Vodyanitsa as upcoming playable characters. The leak section tracks only new playable units through Version 7.3, three version increments beyond the current Version 7.0 banner.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Genshin-Impact/archives/305012" },
        { "label": "Official news", "url": "https://genshin.hoyoverse.com/en/news" }
      ]
    },
    {
      "name": "Honkai: Star Rail",
      "short": "HSR",
      "characters": {"hsr:nihilux":"Nihilux","hsr:robin-summeretto":"Robin Summeretto","hsr:hyacine":"Hyacine","hsr:rin-tohsaka":"Rin Tohsaka","hsr:gilgamesh":"Gilgamesh","hsr:aventurine-waveflair":"Aventurine Waveflair","hsr:ashveil":"Ashveil","hsr:pearl":"Pearl"},
      "characterChecks": {
        "hsr:nihilux": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "leaks",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "hsr:robin-summeretto": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "banners",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "hsr:hyacine": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "banners",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "hsr:rin-tohsaka": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "banners",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "hsr:gilgamesh": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "banners",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "hsr:aventurine-waveflair": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "upcoming",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "hsr:ashveil": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "upcoming",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "hsr:pearl": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "upcoming",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        }
      },
      "version": "4.5 — Phase 1",
      "accent": "#b39ddb",
      "icon": "icons/hsr.jpg",
      "leaks": [],
      "leakReview": [
        {
          "title": "Nihilux",
          "characterIds": [
            "hsr:nihilux"
          ],
          "version": "4.7",
          "confidence": "low",
          "confidenceReason": "Dim-attributed repost labelled very subject to change; original publication not verified.",
          "sourceUrl": "https://www.reddit.com/r/HonkaiStarailItalia/comments/1w0hqgk/47_nihilux_kit_stc_5_quantum_elation/",
          "checkedAt": "2026-09-08",
          "reviewReason": "Held for verification under the new leak policy: check original claim, corrections, playable identity, release history and official announcements before republishing."
        }
      ],
      "banners": [
        { "title": "v4.5 Phase 1 — Robin Summeretto (new 5★, Wind Remembrance) + Hyacine rerun", "characterIds": ["hsr:robin-summeretto","hsr:hyacine"], "start": "2026-08-26", "end": "2026-09-12" },
        { "title": "Fate/stay Night collab Part 2 — Rin Tohsaka + Gilgamesh (no fixed end)", "characterIds": ["hsr:rin-tohsaka","hsr:gilgamesh"], "start": "2026-07-24", "end": null }
      ],
      "upcoming": [
        { "title": "v4.5 Phase 2 — Aventurine Waveflair (new 5★, Quantum Elation) + Ashveil rerun", "characterIds": ["hsr:aventurine-waveflair","hsr:ashveil"], "date": "2026-09-12" },
        { "title": "Pearl (announced character)", "characterIds": ["hsr:pearl"], "date": null }
      ],
      "notes": "Version 4.5 launched Aug 26. Robin Summeretto + Hyacine are current in Phase 1 through Sep 12; Aventurine Waveflair + Ashveil begin Sep 12 in Phase 2. Fate/stay Night collab Part 2 (Rin Tohsaka + Gilgamesh) remains open-ended. No Phase 2 endDate was added because an exact version-end date was not verified.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Honkai-Star-Rail/archives/408381" },
        { "label": "Official news", "url": "https://hsr.hoyoverse.com/en-us/news" }
      ]
    },
    {
      "name": "Zenless Zone Zero",
      "short": "ZZZ",
      "characters": {"zzz:severian":"Severian","zzz:pheony":"Pheony","zzz:claret-flint":"Claret Flint","zzz:nangong-yu":"Nangong Yu","zzz:roxy-ifrita-pryce":"Roxy Ifrita Pryce","zzz:promeia":"Promeia"},
      "characterChecks": {
        "zzz:severian": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "leaks",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "zzz:pheony": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "leaks",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "zzz:claret-flint": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "banners",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "zzz:nangong-yu": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "banners",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "zzz:roxy-ifrita-pryce": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "upcoming",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "zzz:promeia": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "upcoming",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        }
      },
      "version": "3.2 — Phase 1",
      "accent": "#f57c00",
      "icon": "icons/zzz.jpg",
      "leaks": [],
      "leakReview": [
        {
          "title": "Severian + Pheony",
          "characterIds": [
            "zzz:severian",
            "zzz:pheony"
          ],
          "version": "3.3",
          "confidence": "medium",
          "confidenceReason": "Nanoka-attributed September 5 report marked datamined; no banner details or reruns supplied. Names follow the report.",
          "sourceUrl": "https://www.reddit.com/r/Zenlesszonezeroleaks_/comments/1w7qak6/33_agents_via_nanoka/",
          "checkedAt": "2026-09-08",
          "reviewReason": "Held for verification under the new leak policy: check original claim, corrections, playable identity, release history and official announcements before republishing."
        }
      ],
      "banners": [
        { "title": "v3.2 Phase 1 — Claret Flint (new S-Rank, Electric Armorer) + Nangong Yu rerun", "characterIds": ["zzz:claret-flint","zzz:nangong-yu"], "start": "2026-09-09", "end": "2026-09-30" }
      ],
      "upcoming": [
        { "title": "v3.2 Phase 2 — Roxy Ifrita Pryce (new S-Rank, Wind Stun) + Promeia rerun", "characterIds": ["zzz:roxy-ifrita-pryce","zzz:promeia"], "date": "2026-09-30", "endDate": "2026-10-20" }
      ],
      "notes": "Version 3.2 launched Sep 9. Claret Flint + Nangong Yu are current in Phase 1 through Sep 30, followed by Roxy Ifrita Pryce + Promeia Sep 30–Oct 20. The Phase 2 end date is corroborated by current Version 3.2 schedule coverage.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Zenless-Zone-Zero/archives/435687" },
        { "label": "Official news", "url": "https://zenless.hoyoverse.com/m/en-us/news" }
      ]
    },
    {
      "name": "Persona 5: The Phantom X",
      "short": "P5X",
      "characters": {"p5x:kumi-katayama":"Kumi Katayama","p5x:yui-stella":"YUI Stella","p5x:mitsuru":"Mitsuru","p5x:fuuka":"Fuuka","p5x:kotone-shiomi":"Kotone Shiomi"},
      "version": "4.8 (4.4)",
      "accent": "#ef5350",
      "icon": "icons/p5x.jpg",
      "banners": [
        { "title": "Kumi Katayama", "characterIds": ["p5x:kumi-katayama"], "start": "2026-08-27", "end": "2026-09-10" }
      ],
      "upcoming": [
        { "title": "YUI Stella + main story 5-3", "characterIds": ["p5x:yui-stella"], "date": "2026-09-10", "endDate": "2026-09-24" },
        { "title": "Mitsuru", "characterIds": ["p5x:mitsuru"], "date": "2026-09-24", "endDate": "2026-10-08" },
        { "title": "Fuuka", "characterIds": ["p5x:fuuka"], "date": "2026-10-08", "endDate": "2026-10-22" },
        { "title": "Kotone Shiomi / FeMC (announced playable character)", "characterIds": ["p5x:kotone-shiomi"], "date": null }
      ],
      "notes": "The lufel.net mirror places Kumi Katayama on Aug 27, followed by YUI Stella on Sep 10, Mitsuru on Sep 24, and Fuuka on Oct 8. The official Steam digest confirms Kumi Katayama is live and its event window runs through Sep 9 UTC. Dashboard phase boundaries follow the verified Global release schedule; the Lufel days interval is not treated as independent evidence for an unsupported final banner end.",
      "links": [
        { "label": "Lufelnet schedule", "url": "https://lufel.net/en/schedule/" },
        { "label": "Game8 banners", "url": "https://game8.co/games/Persona-5-Phantom-X/archives/532248" },
        { "label": "Kotone announcement coverage", "url": "https://www.siliconera.com/persona-3-portable-female-protagonist-joins-persona-5-the-phantom-x/" }
      ]
    },
    {
      "name": "Neverness to Everness",
      "short": "NTE",
      "characters": {"nte:exe":"Exe","nte:elyms":"Elyms","nte:linko":"Linko","nte:hotori":"Hotori","nte:blackbird":"Blackbird","nte:akane-rin":"Akane Rin"},
      "characterChecks": {
        "nte:exe": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "leaks",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "nte:elyms": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "leaks",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "nte:linko": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "banners",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "nte:hotori": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "banners",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "nte:blackbird": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "upcoming",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "nte:akane-rin": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "upcoming",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        }
      },
      "version": "1.3 — Phase 2",
      "accent": "#66bb6a",
      "icon": "icons/nte.jpg",
      "leaks": [],
      "leakReview": [
        {
          "title": "Exe + Elyms",
          "characterIds": [
            "nte:exe",
            "nte:elyms"
          ],
          "version": "1.5",
          "confidence": "low",
          "confidenceReason": "Recent coverage and Seele-attributed reposts agree on the pair, but the original leak has not been verified.",
          "sourceUrl": "https://vortexgaming.io/en/postdetail/1262292",
          "checkedAt": "2026-09-08",
          "reviewReason": "Held for verification under the new leak policy: check original claim, corrections, playable identity, release history and official announcements before republishing."
        }
      ],
      "banners": [
        { "title": "v1.3 Phase 2 — Linko (new 5★) + Hotori rerun", "characterIds": ["nte:linko","nte:hotori"], "start": "2026-09-09", "end": "2026-09-30" }
      ],
      "upcoming": [
        { "title": "Blackbird (announced character)", "characterIds": ["nte:blackbird"], "date": null },
        { "title": "Akane Rin (announced character)", "characterIds": ["nte:akane-rin"], "date": null }
      ],
      "notes": "Version 1.3 Phase 2 is now live Sep 9–30 with Linko and a concurrent Hotori rerun. Blackbird and Akane Rin remain announced with no confirmed banner dates.",
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
      "characterChecks": {
        "ake:si": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "leaks",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "ake:ye-minghui": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "leaks",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "ake:typhoeus": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "banners",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        },
        "ake:yvonne": {
          "status": "review",
          "region": "Global",
          "aliases": [],
          "priorPlacement": "upcoming",
          "reviewReason": "Imported from existing dashboard placement; primary-source identity and status verification pending. This is not a verified status."
        }
      },
      "version": "Dreamscape of Wind and Snow",
      "accent": "#ffd54f",
      "icon": "icons/ake.jpg",
      "leaks": [],
      "leakReview": [
        {
          "title": "Si + Ye Minghui",
          "characterIds": [
            "ake:si",
            "ake:ye-minghui"
          ],
          "version": "1.6",
          "confidence": "low",
          "confidenceReason": "Secondary coverage names the pair; earlier reports disagree on timing and elements. Playable banners remain unconfirmed.",
          "sourceUrl": "https://www.topuplive.com/news/arknights-endfield-1-6.html",
          "checkedAt": "2026-09-08",
          "reviewReason": "Held for verification under the new leak policy: check original claim, corrections, playable identity, release history and official announcements before republishing."
        }
      ],
      "banners": [
        { "title": "Winter Hunt — Typhoeus (new 6★, Nature Striker)", "characterIds": ["ake:typhoeus"], "start": "2026-09-02", "end": "2026-09-30" }
      ],
      "upcoming": [
        { "title": "Resplendent Spectrum RE-Factor Headhunting #1 — Yvonne rate-up", "characterIds": ["ake:yvonne"], "date": "2026-09-24" }
      ],
      "notes": "Dreamscape of Wind and Snow launched Sep 2. GRYPHLINE confirms Winter Hunt features Typhoeus from the version release through Sep 30, and Resplendent Spectrum RE-Factor Headhunting #1 opens Sep 24 with Yvonne rate-up. Yvonne's exact end date is not stored because the official notice only ties it to the next version maintenance.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Arknights-Endfield/archives/524215" },
        { "label": "Official site", "url": "https://endfield.gryphline.com/" }
      ]
    },
    {
      "name": "Girls' Frontline 2: Exilium",
      "short": "GFL2",
      "characters": {"gfl2:ots-14":"OTs-14","gfl2:basti":"Basti","gfl2:voymastina":"Voymastina","gfl2:soppo":"Soppo","gfl2:loreley":"Loreley"},
      "version": "Moonshroud Requiem",
      "accent": "#90a4ae",
      "icon": "icons/gfl2.jpg",
      "banners": [
        { "title": "OTs-14 + Basti + Voymastina (Targeted Procurement)", "characterIds": ["gfl2:ots-14","gfl2:basti","gfl2:voymastina"], "start": "2026-08-27", "end": "2026-09-16" }
      ],
      "upcoming": [
        { "title": "Soppo + Loreley (third Targeted Procurement doll not yet listed)", "characterIds": ["gfl2:soppo","gfl2:loreley"], "date": "2026-09-17", "endDate": "2026-10-07" }
      ],
      "notes": "The gfl2.help Global mirror confirms OTs-14 + Basti + Voymastina are live Aug 27–Sep 16, followed by Soppo + Loreley Sep 17–Oct 7; the third doll in the latter lineup is still not identified by the source. The official Steam digest independently confirms OTs-14 as a new Doll. CN ordering was not used.",
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