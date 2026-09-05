// Gacha tracker data. Schema documented in CLAUDE.md.
// Keep everything after the '=' STRICT JSON (quoted keys, no trailing commas)
// so external tooling can parse this file without a JS engine.
window.GACHA_DATA =
{
  "lastUpdated": "2026-09-04",
  "games": [
    {
      "name": "Genshin Impact",
      "short": "GI",
      "version": "7.0 — Phase 2",
      "accent": "#4fc3f7",
      "icon": "icons/gi.jpg",
      "banners": [
        { "title": "v7.0 Phase 2 — Flins + Ineffa reruns", "start": "2026-09-01", "end": "2026-09-22" }
      ],
      "upcoming": [],
      "notes": "Version 7.0 Phase 2 is now live Sep 1–22 with Flins and Ineffa reruns. HoYoverse has revealed Vesna and Vodyanitsa as upcoming playable characters, but no exact Version 7.1 banner phase/date is stored until an authoritative schedule is published.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Genshin-Impact/archives/305012" },
        { "label": "Official news", "url": "https://genshin.hoyoverse.com/en/news" }
      ]
    },
    {
      "name": "Honkai: Star Rail",
      "short": "HSR",
      "version": "4.5 — Phase 1",
      "accent": "#b39ddb",
      "icon": "icons/hsr.jpg",
      "banners": [
        { "title": "v4.5 Phase 1 — Robin Summeretto (new 5★, Wind Remembrance) + Hyacine rerun", "start": "2026-08-26", "end": "2026-09-12" },
        { "title": "Fate/stay Night collab Part 2 — Rin Tohsaka + Gilgamesh (no fixed end)", "start": "2026-07-24", "end": null }
      ],
      "upcoming": [
        { "title": "v4.5 Phase 2 — Aventurine Waveflair (new 5★, Quantum Elation) + Ashveil rerun", "date": "2026-09-12" }
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
      "version": "3.1 — Phase 2",
      "accent": "#f57c00",
      "icon": "icons/zzz.jpg",
      "banners": [
        { "title": "Remielle Dan (new 5★, Lumiflux Anomaly; full-version banner)", "start": "2026-07-29", "end": "2026-09-08" },
        { "title": "Sigrid (new 5★, Ice Attack) + selectable Dialyn / Ukinami Yuzuha / Asaba Harumasa rerun channel", "start": "2026-08-19", "end": "2026-09-08" }
      ],
      "upcoming": [
        { "title": "v3.2 Phase 1 — Claret Flint (new S-Rank, Electric Armorer) + Nangong Yu rerun", "date": "2026-09-09", "endDate": "2026-09-30" },
        { "title": "v3.2 Phase 2 — Roxy Ifrita Pryce (new S-Rank, Wind Stun) + Promeia rerun", "date": "2026-09-30" }
      ],
      "notes": "v3.1 Phase 2 remains current through Sep 8. Version 3.2 launches Sep 9 with Claret Flint + Nangong Yu in Phase 1 through Sep 30, followed by Roxy Ifrita Pryce + Promeia from Sep 30. The exact Phase 2 end date is not stored because it was not verified to the required confidence.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Zenless-Zone-Zero/archives/435687" },
        { "label": "Official news", "url": "https://zenless.hoyoverse.com/m/en-us/news" }
      ]
    },
    {
      "name": "Persona 5: The Phantom X",
      "short": "P5X",
      "version": "4.8 (4.4)",
      "accent": "#ef5350",
      "icon": "icons/p5x.jpg",
      "banners": [
        { "title": "Kumi Katayama", "start": "2026-08-27", "end": "2026-09-10" }
      ],
      "upcoming": [
        { "title": "YUI Stella + main story 5-3", "date": "2026-09-10", "endDate": "2026-09-24" },
        { "title": "Mitsuru", "date": "2026-09-24", "endDate": "2026-10-08" },
        { "title": "Fuuka", "date": "2026-10-08", "endDate": "2026-10-22" }
      ],
      "notes": "The lufel.net mirror places Kumi Katayama on Aug 27, followed by YUI Stella on Sep 10, Mitsuru on Sep 24, and Fuuka on Oct 8. The official Steam digest confirms Kumi Katayama is live and its event window runs through Sep 9 UTC. Dashboard phase boundaries follow the verified Global release schedule; the Lufel days interval is not treated as independent evidence for an unsupported final banner end.",
      "links": [
        { "label": "Lufelnet schedule", "url": "https://lufel.net/en/schedule/" },
        { "label": "Game8 banners", "url": "https://game8.co/games/Persona-5-Phantom-X/archives/532248" }
      ]
    },
    {
      "name": "Neverness to Everness",
      "short": "NTE",
      "version": "1.3 — Phase 1",
      "accent": "#66bb6a",
      "icon": "icons/nte.jpg",
      "banners": [
        { "title": "Zankou (new 5★) + Nanally rerun", "start": "2026-08-19", "end": "2026-09-09" }
      ],
      "upcoming": [
        { "title": "v1.3 Phase 2 — Linko (new 5★) + Hotori rerun", "date": "2026-09-09", "endDate": "2026-09-30" }
      ],
      "notes": "Version 1.3 Phase 1 runs Aug 19–Sep 9 with Zankou and a concurrent Nanally rerun. Phase 2 runs Sep 9–30 with Linko and a concurrent Hotori rerun. These exact windows are confirmed by the published Version 1.3 schedule.",
      "links": [
        { "label": "Game8 banners", "url": "https://game8.co/games/Neverness-to-Everness/archives/597944" },
        { "label": "NTEbuild banners", "url": "https://www.ntebuild.com/banners" }
      ]
    },
    {
      "name": "Arknights: Endfield",
      "short": "AKE",
      "version": "Dreamscape of Wind and Snow",
      "accent": "#ffd54f",
      "icon": "icons/ake.jpg",
      "banners": [
        { "title": "Winter Hunt — Typhoeus (new 6★, Nature Striker)", "start": "2026-09-02", "end": "2026-09-30" }
      ],
      "upcoming": [
        { "title": "Resplendent Spectrum RE-Factor Headhunting #1 — Yvonne rate-up", "date": "2026-09-24" }
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
      "version": "Moonshroud Requiem",
      "accent": "#90a4ae",
      "icon": "icons/gfl2.jpg",
      "banners": [
        { "title": "OTs-14 + Basti + Voymastina (Targeted Procurement)", "start": "2026-08-27", "end": "2026-09-16" }
      ],
      "upcoming": [
        { "title": "Soppo + Loreley (third Targeted Procurement doll not yet listed)", "date": "2026-09-17", "endDate": "2026-10-07" }
      ],
      "notes": "The gfl2.help Global mirror confirms OTs-14 + Basti + Voymastina are live Aug 27–Sep 16, followed by Soppo + Loreley Sep 17–Oct 7; the third doll in the latter lineup is still not identified by the source. The official Steam digest independently confirms OTs-14 as a new Doll. CN ordering was not used.",
      "links": [
        { "label": "GFL2.help banners", "url": "https://gfl2.help/en/banners" }
      ]
    },
    {
      "name": "Fate/Grand Order (NA)",
      "short": "FGO",
      "version": "NA / Global",
      "accent": "#c0a062",
      "icon": "icons/fgo.jpg",
      "banners": [
        { "title": "BB Presents☆Celeb Summer Experience! — Mysterious Executor C.I.E.L.", "start": "2026-07-15", "end": "2026-09-01" },
        { "title": "Ordeal Call III: Archetype Inception — BB (Dubai)", "start": "2026-07-29", "end": "2026-09-08" }
      ],
      "upcoming": [
        { "title": "Kazuradrop", "date": "2026-09-15", "endDate": "2026-10-06", "approx": true },
        { "title": "Tutankhamun", "date": "2026-10-13", "endDate": "2026-11-03", "approx": true },
        { "title": "Louhi", "date": "2026-11-11", "endDate": "2026-11-24", "approx": true }
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
