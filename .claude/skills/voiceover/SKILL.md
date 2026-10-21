---
name: voiceover
description: Write, time, and generate Arabic and English voice-overs (TTS or human) for TikTok/Reels ads, then sync them with captions and music. Use when the user asks for تعليق صوتي, voice-over, narration, TTS, ElevenLabs, or a bilingual video.
---

# Voice-over (Arabic / English)

## 1. Script to fit time
- Speed: Arabic ≈ 2–2.3 words/s, English ≈ 2.5 words/s. 15 s ad ≈ 30 Arabic / 35 English words. Leave ~1 s silence at the end card.
- One idea per sentence, ≤ 8 words. Write the script *per shot* from the shot table (shot # → line).
- Arabic: choose dialect with the user (Gulf/Saudi for local reach, light MSA for wide reach); write numbers/prices as words when spoken ("تسعة وتسعين ريال"); add tashkeel only on words TTS mispronounces.
- English is not a literal translation — rewrite for the same beats and length.

## 2. Generate
- **ElevenLabs** (best Arabic quality): model `eleven_multilingual_v2` (or newer), Stability ~0.45, Similarity ~0.8, Style low. Same voice for both languages keeps brand consistency, or a matching male/female pair.
  `POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}` header `xi-api-key`, body `{"text": "...", "model_id": "eleven_multilingual_v2"}` → MP3. Key goes in env, never in the repo.
- Alternatives: OpenAI TTS, Azure Neural (`ar-SA-ZariyahNeural`, `ar-SA-HamedNeural`) with SSML `<break time="300ms"/>`, or CapCut's built-in TTS for quick drafts.
- Generate **one file per line**, so a line can be redone and retimed alone.
- Human VO: quiet room, phone 15 cm from mouth, record 3 takes per line.

## 3. Mix
- VO peak -6 dB, loudness ≈ -14 LUFS (TikTok/IG); music ducked to ~-18 dB under voice, back up in gaps; SFX at -12 dB.
- Light processing: high-pass 80 Hz, de-ess, gentle compression (3:1).

## 4. Sync
- Each line starts on a cut; captions = VO text (1–3 words per caption, key word in gold per `brand-kit`).
- Auto-captions: Whisper / `@remotion/install-whisper-cpp` → word timestamps (see `remotion-captions` skill); AE: markers per sentence.
- Bilingual: same visual edit, two renders (AR VO + AR captions, EN VO + EN captions). Optional: AR voice with EN subtitles for the wider audience.

## Remotion snippet
```tsx
<Sequence from={0}><Audio src={staticFile('music.mp3')} volume={(f) => (isVoiceAt(f) ? 0.15 : 0.5)} /></Sequence>
{lines.map((l) => <Sequence key={l.file} from={l.start}><Audio src={staticFile(l.file)} /></Sequence>)}
```
Deliver: timed script table (shot, time, AR line, EN line), TTS settings, mix levels.
