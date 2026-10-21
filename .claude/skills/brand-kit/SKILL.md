---
name: brand-kit
description: The store's visual identity (perfume & cosmetics, luxury plum + gold, Arabic RTL) — colors, fonts, logo/motion rules, caption style. Apply to every video, ad, image, or UI piece; use with after-effects, remotion-video, higgsfield-montage, ad-copywriting.
---

# Brand kit — perfume & cosmetics store

Source of truth: CSS variables in `index.html` (`--pr`, `--gold`, …) and `manifest.json`. If they change, update this file.

## Colors
| Role | Hex | Use |
|---|---|---|
| Plum (primary) | `#4a1f3d` | backgrounds, buttons, end card |
| Deep plum | `#2e0f26` / `#3a1530` | video backgrounds, gradients |
| Gold (accent) | `#b08a4f` (dark bg: `#d2ad74`) | highlight word, price, lines, logo |
| Champagne | `#efe3cf` | soft panels, light gradients |
| Ivory | `#f6f1ea` / `#fffdf9` | light backgrounds, text on plum |
| Ink | `#2b1f25` | text on light |
Rules: plum + gold + ivory only; **one** gold highlight per frame; gradient `#2e0f26 → #4a1f3d` for backgrounds; no pure black/white.

## Typography
- Arabic display: **Reem Kufi** 700 (already used in the app). Arabic body/captions: **Tajawal** or **Cairo** 700.
- English: **Playfair Display** (headlines, luxury) + **Montserrat** 600 (captions/prices).
- Captions 9:16: 64–80 px, white/ivory with 6 % plum shadow or plum pill background; key word in gold.

## Motion personality: "luxury, calm, confident"
- Slow, smooth ease-out (expo); no aggressive shakes or glitch effects.
- Gold light sweeps across bottles/logo; soft particles/bokeh; slow push-ins & orbits on the product.
- Transitions: soft zoom, gold line wipe, cross-dissolve — 8–12 frames.
- Music: elegant (oud + soft beat, or deep house/lofi); SFX: shimmer, soft whoosh.

## Shots that fit perfume & cosmetics
Spray mist backlit, liquid splash, petals/ingredients (rose, oud, vanilla), texture swatch of cream/lipstick, hand unboxing on silk/marble, gift wrap.

## End card (2–3 s)
Plum gradient bg → product center → name (Reem Kufi, ivory) → price/offer in gold → CTA ("اطلب الآن" / "Order now") → logo (`icon-512.png`).

## Don'ts
Neon colors, comic fonts, more than 2 fonts per video, text over the product label, stretched logo.
