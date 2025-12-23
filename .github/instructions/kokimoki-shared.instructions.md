---
description: Documentation for the @kokimoki/shared library components and hooks.
applyTo: '**/*.tsx'
---

# Shared Components Library: @kokimoki/shared

A React components library providing reusable UI components and hooks for Kokimoki applications.

## General guidelines

- Import components or hooks from the shared library `@kokimoki/shared`
- Components like `KmAudioButton` require their provider (`KmAudioProvider`) to be wrapped at app root
- Use `playAudio` for playing background music, `playSound` for one-shot effects

## Providers

Wrap at app root, order doesn't matter

### KmAudioProvider

Use for background music, sound effects, audio preloading

- `<KmAudioProvider preloadAudioUrls={['/audio/bg.mp3']}><App /></KmAudioProvider>`
- Props:
  - `preloadAudioUrls?: (string | string[])[]` - URLs to preload on mount
- Hook: `useKmAudioContext()`

#### Background Audio (music, ambient sounds)

```
playAudio(src: string | string[], volume?: number): void
stopAudio(fadeOutMs?: number): void
pauseAudio(fadeOutMs?: number): void
resumeAudio(volume?: number, fadeInMs?: number): void
```

State: `isPaused: boolean`, `isActive: boolean`, `activeSrc: string[]`

#### Sound Effects (one-shot sounds)

```
playSound(src: string | string[], volume?: number): number
stopSound(soundId: number): void
```

### KmConfettiProvider

Use for celebrations, achievements, game endings

- `<KmConfettiProvider><App /></KmConfettiProvider>`
- Hook: `useKmConfettiContext()`
  - `triggerConfetti(options?: { preset?: 'standard' | 'massive' }): void`
  - `stopConfetti(): void`
  - `isActive: boolean`

### KmModalProvider

Use for dialogs, confirmation prompts, bottom sheets

- `<KmModalProvider><App /></KmModalProvider>`
- Hook: `useKmModal()`

```
openDialog(props: {
  title: string,
  content: ReactNode,
  showCloseButton?: boolean
}): void

openDrawer(props: {
  content: ReactNode,
  showHandle?: boolean
}): void

openAlertDialog(props: {
  title: string,
  description?: string,
  onConfirm: () => void,
  onCancel?: () => void,
  confirmText?: string,
  cancelText?: string
}): void

closeModal(): void
```

State: `isOpen: boolean`

## Components

### KmAudioButton

Use for user-controlled background audio toggle
Play/pause toggle (requires `KmAudioProvider`)

- `<KmAudioButton getCurrentAudio={() => '/audio/file.mp3'} />`
- Props:
  - `getCurrentAudio: () => string` (required)
  - `className?: string`

### KmCopyButton

Use for sharing links, copying codes/IDs

Copy to clipboard with visual feedback

- `<KmCopyButton data="text to copy" copyText="Copy" copiedText="Copied!" />`
- Props:
  - `data: string` (required) - text to copy
  - `copyText?: string` - default state text (default: "Copy")
  - `copiedText?: string` - success state text (default: "Copied!")
  - `className?: string`, `copiedClassName?: string`
  - `onCopied?: () => void`

### KmQrCode

Use for game join links, sharing URLs on presenter screen
Interactive QR code with resize/copy controls

- `<KmQrCode data="https://example.com" size={250} />`
- Props:
  - `data: string` (required) - data to encode
  - `size?: number` - initial size 150-450px (default: 250)
  - `interactive?: boolean` - enable resize/copy controls (default: false)
  - `open?: boolean` - visibility state (default: true)
  - `onOpenChange?: (open: boolean) => void`
  - `className?: string`, `containerClassName?: string`, `btnClassName?: string`

### KmPodiumTable

Use for game results, leaderboards, winner displays
Top 3 ranked entries display (auto-sorted by points)

- `<KmPodiumTable entries={[{ id: '1', name: 'Alice', points: 100 }]} />`
- Props:
  - `entries: { id: string; name: string; points: number }[]` (required)
  - `pointsLabel?: string` (default: "Points")
  - `podiumSettings?: Record<'0'|'1'|'2', { label: string; className?: string }>`
  - `className?: string`

### KmTimeCountdown

Use for round timers, countdowns, time displays
Time display in various formats

- `<KmTimeCountdown ms={60000} display="ms" />` → "1:00"
- Props:
  - `ms: number` (required) - time in milliseconds
  - `display?: 's' | 'ms' | 'hms'` - format (default: "hms")
  - `className?: string`

### KmTimeProgress

Use for round progress, time remaining visualization
Progress bar for time tracking

- `<KmTimeProgress value={30} limit={60} />` → 50% progress
- Props:
  - `value: number` (required) - current progress
  - `limit: number` (required) - maximum value
  - `className?: string`, `containerClassName?: string`

## Hooks

### useKmAnimatedValue

Use for score animations, counter effects, smooth number transitions
Animate numeric values with smooth DOM updates

```
const { ref, controls } = useKmAnimatedValue<HTMLSpanElement>(
  targetValue: number,
  initialValue?: number,
  options?: {
    formatter?: (value: number) => string,
    duration?: number,
    ease?: string | number[]
  }
)
```

- Attach `ref` to element: `<span ref={ref} />`
- Returns:
  - `ref: React.RefObject<T>` - attach to display element
  - `controls: AnimationPlaybackControlsWithThen | null` - manual animation control

## Full Documentation

**IMPORTANT:** Refer to [`@kokimoki/shared/dist/docs/llms.txt`](../../../node_modules/@kokimoki/shared/dist/docs/llms.txt) for detailed props, examples, and API reference.
