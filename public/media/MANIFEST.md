# Explainer video manifest — mbai-group

Tracks every `VideoSlot` placement on the marketing site that doesn't have a
real clip yet. Each entry is a brief for Higgsfield (or any generation tool
following the same doctrine): physical metaphors only, no on-screen text,
letters, numbers, UI, screens, logos, captions, or watermarks — camera,
lighting, palette, and loop behaviour are all specified so the output can
drop straight into the named path with zero code changes.

Brand palette to match: gold `#e3a83f`, cyan `#22d3ee`, copper `#d9784f`,
rust `#c2703d`, background near-black `#0b1022`.

---

## 1. `/media/benefit-ship.mp4`

- **Section**: Benefits, row 1 — "From idea to shipped product in weeks, not months"
- **Recommended duration**: 6–8s, seamless loop
- **Prompt**: A single ember of warm gold light drifts slowly down a dark tunnel lined with faintly glowing archways of cyan light. Each archway ignites brighter as the ember passes through, and the ember steadily gains size and mass until it condenses into a smooth, solid glowing sphere of gold-copper light at the tunnel's end. Slow dolly-in camera, soft volumetric fog, shallow depth of field, deep navy-black background (#0b1022), warm gold (#e3a83f) and cyan (#22d3ee) light accents, cinematic and futuristic. Seamless loop. No text, no letters, no numbers, no UI, no screens, no logos, no captions, no watermarks.

## 2. `/media/benefit-arabic.mp4`

- **Section**: Benefits, row 2 — "Speak to your Arabic-speaking customers the way they actually talk"
- **Recommended duration**: 6–8s, seamless loop
- **Prompt**: Two luminous ribbons of light — one flowing left to right in cyan, one flowing right to left in warm gold — swirl and interweave in slow motion against a deep navy background, braiding into a single glowing copper-gold strand that pulses gently, evoking calligraphic brushstrokes without any legible characters. Camera slowly orbits the braid, soft bokeh particles drifting past, warm cinematic lighting. Seamless loop. No text, no letters, no numbers, no UI, no screens, no logos, no captions, no watermarks.

## 3. `/media/benefit-ecosystem.mp4`

- **Section**: Benefits, row 3 — "One AI gateway powers every product you own"
- **Recommended duration**: 6–8s, seamless loop
- **Prompt**: A single glowing gold-cyan core sphere floats at the center of frame, pulsing gently. Thin luminous filaments extend outward from it to four smaller orbiting spheres in varying warm tones (copper, amber, cyan, rust), each lighting up in a slow, synchronized pulse as energy travels outward along the filaments from the core. Deep navy-black background, soft volumetric glow, slow gentle rotation of the whole structure, cinematic macro-lens feel. Seamless loop. No text, no letters, no numbers, no UI, no screens, no logos, no captions, no watermarks.

## 4. `/media/how-it-works.mp4`

- **Section**: How We Work — explainer card beneath the 4-step grid
- **Recommended duration**: 8–10s, seamless loop
- **Prompt**: A rough, dim chunk of stone-like light drifts along a slow-moving conveyor of glowing light rails, passing through four distinct, softly-lit stations. At each station it is reshaped and polished, growing increasingly refined, until it emerges as a smooth, brilliant faceted gem glowing in gold and cyan light. Steady lateral tracking camera, warm rim lighting, dark navy-black backdrop (#0b1022), gold (#e3a83f) and cyan (#22d3ee) accent lighting at each station, cinematic depth of field. Seamless loop. No text, no letters, no numbers, no UI, no screens, no logos, no captions, no watermarks.

---

## Already wired (not placeholders)

- `/media/hero.mp4` — original hero brand film (Cairo skyline), source asset.
- `/media/hero-web.mp4` — compressed web delivery version (`ffmpeg -vcodec libx264 -crf 30 -preset slow -an`), what the site actually serves.
- `/media/hero-poster.jpg` — first-frame poster, shown before the hero video loads.
