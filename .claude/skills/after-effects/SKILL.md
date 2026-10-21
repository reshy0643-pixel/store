---
name: after-effects
description: Expert Adobe After Effects motion design — easing/graph editor, text animators, kinetic typography, expressions (wiggle, loopOut, inertial bounce), shape layers, transitions, Arabic text, TikTok/Reels specs, render settings, and ExtendScript (.jsx) automation. Use when the user mentions After Effects, AE, "افتر افيكت", motion graphics, expressions, .aep/.jsx/.mogrt, or wants pro-level animation (and translate AE techniques to Remotion when the video is code-rendered).
---

# After Effects

I can't click inside AE, so I deliver what an expert hands over: a **layer/keyframe plan**, **expressions to paste**, **.jsx scripts that build the comp automatically** (File → Scripts → Run Script File), and render settings. When the video is code-rendered, port the same technique to Remotion (table at the end).

## Comp specs (TikTok / Reels / Shorts)
- 1080×1920, 30 fps (60 for fast motion), duration 15–30 s, square pixels.
- Safe zone: keep text/logo out of the top ~15 % and bottom ~20 % and the right ~12 % (UI buttons).
- Render: Composition → Add to Adobe Media Encoder Queue → H.264, Match Source – High Bitrate, VBR 2-pass ~16–20 Mbps, AAC 320 kbps 48 kHz. (Render Queue: QuickTime/ProRes 422 master, then encode.)

## What makes motion look professional
1. **Never linear.** Select keys → F9 (Easy Ease), then Graph Editor → Speed Graph, pull influence to 70–90 % for snappy "expo" moves (fast out, long settle).
2. **Overshoot & settle** on entrances (scale 0 → 110 → 100 or the bounce expression below).
3. **Stagger, don't sync:** offset layers 2–4 frames (Sequence Layers, or Text Animator offset).
4. **Motion blur on** (layer switch + comp toggle), shutter 180°.
5. **Anticipation:** tiny opposite move (3–5 frames) before a big one.
6. **Hierarchy & rhythm:** one focal element per beat; cut/animate on the music beat (add markers with `*` on numpad while audio plays).
7. **Restraint:** 2 fonts max, 1 accent color, consistent easing curve across the whole piece.
8. Parent to Nulls for camera-like moves; use 3D layers + a 2-node camera with depth of field for depth.

## Text
- Text Animators: Animate → Position/Scale/Opacity + Range Selector (Offset 0→100 %, Based On: Characters/Words), Advanced → Shape: Ramp Up, Ease High 100. Gives the classic per-word pop.
- Kinetic captions for TikTok: 1–3 words per beat, highlight the key word (color/scale), center-lower third.
- **Arabic:** Preferences → Type → **South Asian and Middle Eastern** text engine, restart AE; Paragraph panel → RTL. Animate **by Words**, not Characters (letters are joined). Fonts: Cairo, Tajawal, IBM Plex Sans Arabic, Almarai.

## Expressions (paste on property, Alt/Option-click stopwatch)
```js
// Organic shake (freq/sec, amount px)
wiggle(2, 15)

// Loop keyframes forever
loopOut("cycle")            // or "pingpong"

// Inertial bounce after last keyframe
amp = .06; freq = 2.5; decay = 6;
n = 0; if (numKeys > 0){ n = nearestKey(time).index; if (key(n).time > time) n--; }
if (n == 0) value else {
  t = time - key(n).time; v = velocityAtTime(key(n).time - thisComp.frameDuration/10);
  value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);
}

// Auto-fit a box behind text (Shape > Rectangle Size), text layer named "TXT"
r = thisComp.layer("TXT").sourceRectAtTime(time); [r.width + 60, r.height + 30]

// Typewriter: on Source Text
txt = value; n = Math.floor((time - inPoint) * 20); txt.substr(0, n)

// Counter (price/sales): on Source Text, Slider on same layer
"$" + Math.round(effect("Slider Control")("Slider"))
```

## Signature techniques
- **Smooth zoom transition:** Adjustment layer, Transform scale 100→250 with expo ease, + Directional Blur / Motion Tile (mirror edges) on the next clip scaling in from 40 %.
- **Whip/slide transition:** Motion Tile (Mirror Edges, output 300 %) + position slide 8–10 frames + motion blur.
- **Product hero:** 3D product layer, camera orbit with Null, light sweep (gradient solid in Add mode, masked & moved), soft shadow.
- **Glow/neon:** Deep Glow or Effect → Stylize → Glow ×2 (tight + wide).
- **Shape reveals:** Trim Paths 0→100 % with stroke; Repeater for bursts; Offset Paths for outlines.
- **Track text to footage:** Tracker → Track Motion → apply to a Null, parent text to it. Remove objects: Content-Aware Fill.
- **Pro finish:** subtle grain (Add Grain/Noise 2–4 %), color pass with Lumetri, vignette, sound design (whoosh on every transition, pop on every text hit).

## Voice-over workflow (Arabic/English)
Record or TTS each language as separate tracks → import → markers on each sentence → time captions to markers. Make one comp per language sharing the same visuals (duplicate comp, swap text + audio); render both.

## ExtendScript starter (.jsx) — builds a TikTok comp with an animated title
```js
app.beginUndoGroup("TikTok Title");
var c = app.project.items.addComp("TikTok", 1080, 1920, 1, 15, 30);
c.layers.addSolid([0.06,0.06,0.08], "BG", 1080, 1920, 1);
var t = c.layers.addText("عرض خاص"); var d = t.property("Source Text").value;
d.fontSize = 140; d.fillColor = [1,1,1]; d.justification = ParagraphJustification.CENTER_JUSTIFY;
t.property("Source Text").setValue(d);
var p = t.property("Transform").property("Position"), s = t.property("Transform").property("Scale");
p.setValueAtTime(0, [540, 1100]); p.setValueAtTime(0.5, [540, 900]);
s.setValueAtTime(0, [0,0]); s.setValueAtTime(0.4, [110,110]); s.setValueAtTime(0.6, [100,100]);
var e = new KeyframeEase(0, 85);
for (var i = 1; i <= p.numKeys; i++) p.setTemporalEaseAtKey(i, [e], [e]);
t.motionBlur = true; c.motionBlur = true; c.openInViewer();
app.endUndoGroup();
```
(Set fonts via `d.font = "Cairo-Bold"` — use the PostScript name installed on the machine.)

## AE → Remotion equivalents
| AE | Remotion |
|---|---|
| Easy Ease / Graph Editor | `interpolate(..., {easing: Easing.bezier(.16,1,.3,1)})` |
| Overshoot / bounce | `spring({frame, fps, config:{damping: 10, stiffness: 120}})` |
| wiggle() | `noise2D` from `@remotion/noise` |
| loopOut | `<Loop durationInFrames>` |
| Text Animator per word | split words, delay each by `i*3` frames |
| Precomp | component / `<Sequence>` |
| Motion blur | `@remotion/motion-blur` `<CameraMotionBlur>` |
| Trim Paths | `@remotion/paths` `evolvePath()` |
| Render to H.264 | `npx remotion render ... --codec h264` |

Deliver: shot/beat table → per-layer plan (properties, timing, easing) → expressions/.jsx → render settings. Keep it to what the user will paste or run.
