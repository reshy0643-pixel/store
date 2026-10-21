---
name: higgsfield-montage
description: Plan and prompt AI video shots in Higgsfield (camera-motion presets, image-to-video, short product clips) and cut them into a montage. Use when the user asks for a product video, ad, reel, TikTok, promo, "مونتاج", "فيديو منتج", "إعلان", or mentions Higgsfield.
---

# Higgsfield montage

Higgsfield is an AI video generator built around **named camera moves** (each maps to a real cinematography term) plus camera body / lens choices. Outputs are short clips (~2–5 s), so a video is always *many shots cut together*, never one long generation. Preset names change — confirm the current list on higgsfield.ai before promising a specific one.

## Workflow
1. **Brief (one line each):** product, audience, platform (9:16 Reels/TikTok, 1:1 feed, 16:9 YouTube), length (15/30 s), single message, CTA.
2. **Shot list:** length ÷ ~3 s = number of shots. Fill this table before generating anything:
   | # | Purpose | Source image | Camera move | Prompt | Dur |
   Arc: Hook (0–2 s) → Problem/desire → Product hero → Detail/benefit ×2 → Social proof/price → CTA + logo.
3. **Source stills:** use clean product photos (from the store's own images when available) — image-to-video keeps the product accurate; text-to-video invents details.
4. **Prompt formula:** `[subject + exact product look], [action], [setting], [lighting], [mood/style]` + pick the camera move in the UI, not in prose. One move per shot. Keep the product's colors/label wording identical across shots.
5. **Generate 2–3 variants per shot**, keep the best; regenerate only failed shots, not the whole set.
6. **Cut** (Remotion skill, CapCut, Premiere): see rules below.

## Camera move → when to use
- **Dolly In / Crash Zoom** – hook, reveal the product, emphasis.
- **Orbit / 360 / Bullet Time** – hero shot showing the whole product.
- **Crane Up / Down, Boom** – opening/closing, establish setting.
- **Tracking / FPV** – product in use, energy, lifestyle.
- **Whip Pan** – transition between two shots (end shot A and start shot B with it).
- **Snorricam / handheld** – UGC/selfie feel.
- **Static** – text-heavy frames (price, CTA) so captions stay readable.

## Montage rules
- First frame must hook: motion + product visible in < 1 s; no logo intro.
- Cut on motion and on the beat; 1.5–3 s per shot for short-form.
- Alternate move direction (in → out, left → right) to keep rhythm; never two orbits back-to-back.
- Burned-in captions (most viewers are muted); safe zone: keep text out of the top 15 % and bottom 20 % on 9:16.
- For Arabic text: RTL, a font with full Arabic glyphs (e.g. Cairo, Tajawal), larger size than Latin.
- End card 2–3 s: product, price/offer, CTA, logo.
- Music: royalty-free; drop to ~-18 dB under voice-over.

## Deliver
Shot table + prompts per shot + edit timeline (shot, in/out, transition, caption). Ask only for what's missing from the brief.
