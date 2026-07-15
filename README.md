# MERAQUI — 3D Interactive Homepage

"Crafted with intention." A golden-hour 3D experience: a standalone hero with a
close-up marble statue stage-left over a terrace photograph and a centred title
stack; scrolling fades the hero through an ivory curtain into a sunlit colonnaded
hall past Hestia, Hephaestus and Athena, ends face to face with Apollo, then a
private enquiry page.

## Run it
Needs a local server (3D files won't load from file://):

    cd olympus
    python3 -m http.server 8080     # or: npx serve

Open http://localhost:8080 — first load needs internet (three.js + fonts via CDN).

## Interactions
- Mouse — the hero statue turns to meet your cursor (gentle sway on touch devices); photo parallax
- Scroll — hero crossfades into the hall (separate sections, no shared camera flight visible)
- "Discover our philosophy" — scrolls to the first chapter
- Hover a god — it breaks into suspended stone fragments; leave and it reassembles (tap toggles on touch)
- Drag — orbit the statue you're facing (springs back)
- Roman numerals — chapter jumps · Enquiry form at the end (front-end only)

The hero is a sealed scene: only the terrace photo and the statue — nothing from
the hall can appear in it. Gold areas of every model self-illuminate with a slow
breathing pulse (driven by their metallic maps).

## Customize (all in index.html)
- Copy — hero block + .chapter blocks near the top
- Colors — :root CSS variables
- Hero framing — first two KEYS entries (camera) + placeHero position/rotation
- Transition — the light-pass lives in the tick loop: `away` (photo swell/blur) and `curt` (centre 0.09); statue profile pose is heroTurn.base (1.25)
- Lighting — sun/hemisphere + studioRig values
- Shatter feel — `rawH * 0.125` radius, speeds 2.0 / 1.35
- Gold glow — goldGlow(mat, strength) calls; statue turn — the 0.42 factor in the heroStatue block

## Assets (~12.7 MB, from ~200 MB of sources)
hero.glb (close-up statue) · hero-bg.jpg (terrace backdrop) ·
hestia/hephaestus/athena/apollo.glb · pillar.glb (instanced 28×) ·
index-dark-backup.html — earlier midnight version, for reference
