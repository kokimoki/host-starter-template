---
description: Documentation for the @kokimoki/shared library components and hooks.
applyTo: '**/*.tsx'
---

# Shared Components Library: @kokimoki/shared v1.0.7

> A React components library that provides reusable UI components and hooks for Kokimoki applications

## Quick Start

Import the CSS styles in app root:

```tsx
import '@kokimoki/shared/styles.css';
```

## Table of Contents

- [KmAudioButton](#kmaudiobutton)
- [KmConfettiProvider](#kmconfettiprovider)
- [KmCopyButton](#kmcopybutton)
- [KmModalProvider](#kmmodalprovider)
- [KmPodiumTable](#kmpodiumtable)
- [KmQrCode](#kmqrcode)
- [KmTimeCountdown](#kmtimecountdown)
- [KmTimeProgress](#kmtimeprogress)
- [useKmAnimatedValue](#usekmanimatedvalue)

## KmAudioButton

Audio control button with play/pause functionality and animated icons

### Features

- Play/pause/resume audio control
- Requires `KmAudioProvider` context

### Example

```tsx
import { KmAudioProvider, KmAudioButton } from '@kokimoki/shared';

function App() {
 return (
  <KmAudioProvider>
   <KmAudioButton
    getCurrentAudio={() => '/path/to/audio.mp3'}
    className="custom-styles"
   />
  </KmAudioProvider>
 );
}
```

### Props

- getCurrentAudio: `() => string` (required)
  - Returns audio URL to play
- className: `string` (optional)
  - Custom CSS classes for button styling

## KmConfettiProvider

React context provider for managing confetti effects with customization options

### Features

- Full customization with `react-confetti` options
- Built-in presets: `standard` and `massive`
- Requires `KmConfettiProvider` context

### Example

```tsx
import { KmConfettiProvider, useKmConfettiContext } from '@kokimoki/shared';

const App = () => (
 <KmConfettiProvider>
  <Component />
 </KmConfettiProvider>
);

const Component = () => {
 const { triggerConfetti, stopConfetti, isActive } = useKmConfettiContext();

 return (
  <div>
   <button onClick={() => triggerConfetti()}>Standard</button>
   <button onClick={() => triggerConfetti({ preset: 'massive' })}>
    Massive
   </button>
  </div>
 );
};
```

### Hook Methods

- triggerConfetti: `(options?: ConfettiOptions) => void`
  - Triggers confetti with customization options
- stopConfetti: `() => void`
  - Manually stops active confetti animation
- isActive: `boolean`
  - Indicates if confetti animation is currently active

## KmCopyButton

Copy-to-clipboard button with customizable text and visual feedback

### Features

- Customizable text and styling
- Visual feedback on successful copy (copied state change)

### Example

```tsx
import { KmCopyButton } from '@kokimoki/shared';

function Component() {
 return (
  <KmCopyButton
   data="https://example.com"
   copyText="Copy Link"
   copiedText="Link Copied!"
   onCopied={() => alert('Link copied successfully')}
  />
 );
}
```

### Props

- data: `string` (required)
  - Text content to copy to clipboard
- copyText: `string` (optional)
  - Button text in default state (default: "Copy")
- copiedText: `string` (optional)
  - Button text after successful copy (default: "Copied!")
- className: `string` (optional)
  - Custom CSS classes
- copiedClassName: `string` (optional)
  - Custom CSS classes when in copied state
- onCopied: `() => void` (optional)
  - Callback after successful copy

## KmModalProvider

React context provider for managing Dialog, Drawer, and AlertDialog modals

### Features

- Requires `KmModalProvider` context

### Example

```tsx
import { KmModalProvider, useKmModal } from '@kokimoki/shared';

function App() {
 return (
  <KmModalProvider>
   <Component />
  </KmModalProvider>
 );
}

function Component() {
 const { openDialog, openDrawer, openAlertDialog } = useKmModal();

 return (
  <div>
   <button
    onClick={() => openDialog({ title: 'Title', content: <p>Content</p> })}
   >
    Open Dialog
   </button>
  </div>
 );
}
```

### Hook Methods

- openDialog: `(props: DialogProps) => void`
  - Opens a dialog modal with title, content, and close options
- openDrawer: `(props: DrawerProps) => void`
  - Opens a drawer modal with handle and close options
- openAlertDialog: `(props: AlertDialogProps) => void`
  - Opens an alert dialog with confirm/cancel actions
- closeModal: `() => void`
  - Closes the currently open modal
- isOpen: `boolean`
  - Indicates if any modal is currently open

## KmPodiumTable

Podium table component for displaying top 3 ranked entries with animations

### Features

- Automatic ranking by points
- Classic podium layout (2nd, 1st, 3rd)
- Customizable labels and styles for podium positions

### Example

```tsx
import { KmPodiumTable } from '@kokimoki/shared';

const entries = [
 { id: '1', name: 'Alice', points: 150, color: '#FFD700' },
 { id: '2', name: 'Bob', points: 120, color: '#C0C0C0' },
 { id: '3', name: 'Charlie', points: 100, color: '#CD7F32' }
];

function Leaderboard() {
 return (
  <KmPodiumTable
   entries={entries}
   pointsLabel="Score"
   podiumSettings={{
    '0': { label: '🥇', className: 'bg-yellow-400' },
    '1': { label: '🥈', className: 'bg-gray-300' },
    '2': { label: '🥉', className: 'bg-amber-600' }
   }}
  />
 );
}
```

### Props

- entries: `KmPodiumEntry[]` (required)
  - Array of entries with id, name, points, and color
- pointsLabel: `string` (optional)
  - Label for points display (default: "Points")
- podiumSettings: `KmPodiumSettings` (default: defaultPodiumSettings)
  - Custom labels and styles for podium positions
- className: `string` (optional)
  - Custom CSS classes for styling

## KmQrCode

Interactive QR code component with resize controls and copy functionality

### Features

- Dynamic QR code generation from string data
- Show/hide toggle
- Built-in copy-to-clipboard
- Can be static or interactive
- Customizable styling

### Example

```tsx
import { KmQrCode } from '@kokimoki/shared';

function ShareDialog() {
 const url = 'https://mywebsite.com';

 return (
  <div className="relative">
   <KmQrCode data={url} size={300} className="fixed top-4 right-4 z-50" />
  </div>
 );
}
```

### Props

- data: `string` (required)
  - Data to encode in QR code (URLs, text, contact info, etc.)
- size: `number` (optional)
  - Initial size in pixels, range 150-450px (default: 250)
- interactive: `boolean` (default: true)
  - Enable resize controls and copy button on hover (default: true)
- open: `boolean` (optional)
  - Initial visibility state (default: true)
- onOpenChange: `(open: boolean) => void` (optional)
  - Callback when visibility changes
- containerClassName: `string` (optional)
  - Custom CSS classes for container styling
- btnClassName: `string` (optional)
  - Custom CSS classes for show/hide QR code button styling
- className: `string` (optional)
  - Custom CSS classes for QR code styling

## KmTimeCountdown

Time countdown component with multiple display formats based on DaisyUI `countdown` component

### Features

- Customizable styling

### Example

```tsx
import { KmTimeCountdown } from '@kokimoki/shared';

const Component = () => {
 const oneHourInMs = 60 * 60 * 1000; // 1 hour in milliseconds

 return <KmTimeCountdown ms={oneHourInMs} display="hms" />;
};
```

### Props

- ms: `number` (required)
  - Time in milliseconds to display
- display: `'s' | 'ms' | 'hms'` (optional)
  - Display format: 's' (seconds), 'ms' (minutes:seconds), 'hms' (hours:minutes:seconds) (default: "hms")
- className: `string` (optional)
  - Custom CSS classes for styling

## KmTimeProgress

Progress indicator component for tracking time-based progress with live updates

### Features

- Automatic percentage calculation
- Customizable styling

### Example

```tsx
import { KmTimeProgress } from '@kokimoki/shared';
import { useState, useEffect } from 'react';

function GameTimer() {
 const [elapsed, setElapsed] = useState(0);
 const timeLimit = 60; // 60 seconds

 useEffect(() => {
  const interval = setInterval(() => {
   setElapsed((prev) => prev + 1);
  }, 1000);

  return () => clearInterval(interval);
 }, []);

 return (
  <KmTimeProgress
   value={elapsed}
   limit={timeLimit}
   className="w-full max-w-md"
  />
 );
}
```

### Props

- value: `number` (required)
  - Current progress value (elapsed time or completed duration)
- limit: `number` (required)
  - Maximum value representing total time limit
- containerClassName: `string` (optional)
  - Custom CSS classes for container styling
- className: `string` (optional)
  - Custom CSS classes for indicator styling

## useKmAnimatedValue

React hook for animating numeric values with smooth transitions and automatic DOM updates

### Features

- Custom formatting support

### Example

```tsx
import { useKmAnimatedValue } from '@kokimoki/shared';
import { useState } from 'react';

function Counter() {
 const [target, setTarget] = useState(0);
 const { ref, controls } = useKmAnimatedValue<HTMLSpanElement>(target);

 return (
  <div>
   <span ref={ref} className="text-4xl font-bold" />
   <button onClick={() => setTarget(100)}>Animate to 100</button>
  </div>
 );
}
```

### Parameters

- targetValue: `number` (required)
  - Target numeric value to animate towards
- initialValue: `number` (optional)
  - Initial value to start animation from (default: 0)
- options: `KmAnimatedValueOptions` (optional)
  - Animation configuration with duration, easing, and formatter options
