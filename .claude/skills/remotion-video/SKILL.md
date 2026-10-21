---
name: remotion-video
description: Build programmatic videos in React with Remotion — product promos, montages of clips/images, animated captions, data-driven variants. Use when the user asks to code/render a video, assemble clips into a montage, add animated text, or mentions Remotion.
---

# Remotion video

Remotion renders React components frame-by-frame into MP4/WebM. Official agent skills exist: `npx skills add remotion-dev/skills` (installs to `.agents/skills`; `remotion-best-practices` is the entry point, `remotion-docs` for live API lookup). Prefer them when installed; this file is the compact core.

## Setup
```bash
npx create-video@latest   # pick blank/TypeScript
npx remotion studio       # preview
npx remotion render <CompId> out/video.mp4
```

## Core rules (most common mistakes)
- **Everything is driven by `useCurrentFrame()`**. Never use CSS transitions/animations, `setTimeout`, or `requestAnimationFrame` — they don't render.
- Animate with `interpolate(frame, [in, out], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})` and `spring({frame, fps, config: {damping: 200}})`.
- Get `fps`, `width`, `height`, `durationInFrames` from `useVideoConfig()`; write times as `seconds * fps`.
- Media: `<Img>`, `<OffthreadVideo>` (or `<Video>`), `<Audio>` from `remotion`; local files in `public/` via `staticFile('x.mp4')`. Never plain `<img>`/`<video>`.
- Sequence shots with `<Series>` / `<Sequence from durationInFrames>`; frame numbers inside a Sequence restart at 0.
- Transitions: `@remotion/transitions` → `<TransitionSeries>` with `fade()`, `slide()`, `wipe()`.
- Fonts: `@remotion/google-fonts/<Font>` → `loadFont()`; for Arabic use Cairo/Tajawal and `direction: 'rtl'`.
- Async data: `delayRender()` / `continueRender()`, or `calculateMetadata` for dynamic duration.
- Parametrize with `defaultProps` + zod `schema` so one composition renders many product variants (`--props='{...}'`).

## Montage skeleton
```tsx
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';

const shots = ['s1.mp4', 's2.mp4', 's3.mp4'];
const SHOT = 90, T = 12; // frames @30fps

const Caption: React.FC<{text: string}> = ({text}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 8], [0, 1], {extrapolateRight: 'clamp'});
  const y = interpolate(f, [0, 8], [20, 0], {extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', bottom: '22%', width: '100%', textAlign: 'center',
    fontSize: 64, color: 'white', opacity: o, transform: `translateY(${y}px)`}}>{text}</div>;
};

export const Montage: React.FC<{captions: string[]}> = ({captions}) => (
  <TransitionSeries>
    {shots.flatMap((s, i) => [
      <TransitionSeries.Sequence key={s} durationInFrames={SHOT}>
        <AbsoluteFill><OffthreadVideo src={staticFile(s)} muted /><Caption text={captions[i]} /></AbsoluteFill>
      </TransitionSeries.Sequence>,
      i < shots.length - 1 && <TransitionSeries.Transition key={s + 't'} presentation={fade()} timing={linearTiming({durationInFrames: T})} />,
    ])}
  </TransitionSeries>
);
// Register in Root.tsx: <Composition id="Montage" component={Montage} durationInFrames={shots.length*SHOT-(shots.length-1)*T} fps={30} width={1080} height={1920} defaultProps={{captions: ['', '', '']}} />
```
Transitions overlap shots, so total = Σshots − Σtransitions.

## Pairing with Higgsfield
Generate shots in Higgsfield (see `higgsfield-montage`), drop them in `public/`, map the shot table to `shots`/`captions`, render. Check API details with the `remotion-docs` skill or remotion.dev/docs before using anything not listed here.
