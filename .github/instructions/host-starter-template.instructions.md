---
description: 'Instruction for host starter template structure and development using Kokimoki SDK'
applyTo: '**'
---

# Instructions for @kokimoki/host-starter

## Project overview

This project is based on a host starter template using [Kokimoki SDK](./kokimoki-sdk.instructions.md)
The template provides the following functionality:

- Players can communicate in real time by using [globalStore](../../src/state/stores/global-store.ts)
- Players can be aware of each others' presence using [globalAwareness](../../src/state/stores/global-awareness.ts)
- Each player has a local state that is not synced to the server [playerStore](../../src/state/stores/player-store.ts)

## Spec-driven development

The project is developed in a spec-driven manner

- The specification is defined in `spec.md` file
- When asked to implement something, always check the specification first and make sure that the implementation follows the spec
- Create or update the specification as needed when the implementation deviates from the spec or when new features are added
- Do not hesitate to ask for clarifications if the spec is not clear

## General guidelines

- Follow React and TypeScript [best practices](./reactjs.instructions.md)
- **ALWAYS** use [@kokimoki/shared](./kokimoki-shared.instructions.md) components **FIRST** if they exist before creating new UI components
- Prefer [DaisyUI class names](./daisyui.instructions.md) for common UI components over writing custom CSS or Tailwind utility classes
- **IMPORTANT!** Do not modify `src/kit/` directory
- Add reusable UI components in `src/components/`. Consider creating components when:
  - Used in multiple places
  - Contains complex logic
  - Improves readability of parent component
- Use utility functions from `src/utils/`
- Keep configuration files (`src/config/`, `vite.config.ts`, `tsconfig*.json`) up to date and consistent
- **ALWAYS** use `kmClient.serverTimestamp()` for time-sensitive game logic to maintain synchronization between all players
- Prefer `lucide-react` icons instead of custom SVGs
- Use [Media Uploads API methods](/.github/instructions/kokimoki-sdk.instructions.md#media-uploads) to leverage built-in media upload and management functionality
- Use [AI API methods](/.github/instructions/kokimoki-sdk.instructions.md#ai-integration) to integrate AI-powered functionality (chat with agent, AI image transform) in the app

## Imports and Exports

- **ALWAYS** use named exports: `export const Component` or `export function hook`
- **ALWAYS** use `@/` path aliases: `import { ViewComponent } from '@/views/component'`

## Modes

The app has three modes: `host`, `player`, and `presenter`. The mode is provided by the server and can be accessed using `kmClient.clientContext.mode`. Based on the mode, one of the following files is used as the root component:

- Host mode: [app.host.tsx](../../src/modes/app.host.tsx)
- Player mode: [app.player.tsx](../../src/modes/app.player.tsx)
- Presenter mode: [app.presenter.tsx](../../src/modes/app.presenter.tsx)

## Game state management

### Player store

- The local [playerStore](../../src/state/stores/player-store.ts) contains data only stored on the player device
- The player state actions should be defined in [player-actions.ts](../../src/state/actions/player-actions.ts)

#### Example: Update and read Player State

```typescript
// Update player state
await kmClient.transact([playerStore], ([playerState]) => {
 playerState.currentView = 'view-name';
});

// Get reactive snapshot of player state in a React component
const playerState = useSnapshot(playerStore.proxy);
```

#### Example: View Routing

Use `currentView` in [playerStore](../../src/state/stores/player-store.ts) for client-side navigation (switching between views)

```tsx
// Define a store state in playerStore
interface PlayerState {
 currentView: 'lobby' | 'game' | 'results';
}

// Navigate between views
await playerActions.setCurrentView('game');

// Render based on current view
const { currentView } = useSnapshot(playerStore.proxy);
return (
 <>
  {currentView === 'lobby' && <LobbyView />}
  {currentView === 'game' && <GameView />}
  {currentView === 'results' && <ResultsView />}
 </>
);
```

### Global Store

- The [globalStore](../../src/state/stores/global-store.ts) contains data shared among all players in the game
- The global state actions should be defined in [global-actions.ts](../../src/state/actions/global-actions.ts)

#### Example: Update and read Global State

```typescript
// Update global state
await kmClient.transact([globalStore], ([globalState]) => {
 globalState.value = 'new-value';
});

// Get reactive snapshot of global state in a React component
const { value } = useSnapshot(globalStore.proxy);
```

#### Example: Start/Stop Global Actions

```typescript
export const globalActions = {
 async startGame() {
  await kmClient.transact([globalStore], ([state]) => {
   state.started = true;
   state.startTimestamp = kmClient.serverTimestamp();
  });
 },

 async stopGame() {
  await kmClient.transact([globalStore], ([state]) => {
   state.started = false;
   state.startTimestamp = 0;
  });
 }
};
```

### Client ID

- Each player has a unique [`clientId`](/.github/instructions/kokimoki-sdk.instructions.md#client-id) accessible as `kmClient.id`
- Use `kmClient.id` to identify players in the global store

#### Example

Modify data by player in the global store

```typescript
interface GlobalStore {
 players: Record<
  string, // clientId
  { score: number }
 >;
}

// Update player score in the global store
await kmClient.transact([globalStore], ([globalState]) => {
 if (!globalState.players[kmClient.id]) {
  globalState.players[kmClient.id] = { score: 0 };
 }
 globalState.players[kmClient.id].score += 1;
});
```

### Combining Stores

- Update both `playerStore` and `globalStore` in a single transaction when needed
- Create combined actions in [global-actions.ts](../../src/state/actions/global-actions.ts)

#### Example

Update both player and global state

```typescript
// In global-actions.ts
await kmClient.transact(
 [playerStore, globalStore],
 ([playerState, globalState]) => {
  // Update player state
  playerState.hasAnswered = true;
  // Update global state with player's answer and timestamp
  if (!globalState.answers[kmClient.id]) {
   globalState.answers[kmClient.id] = {
    answer,
    timestamp: kmClient.serverTimestamp()
   };
  }
 }
);
```

### Global Awareness

- Use [globalAwareness](../../src/state/stores/global-awareness.ts) to track players connected to the global state
- **ALWAYS** when working with global connections, group by `kmClient.id` because each player can open multiple tabs

#### Example: Update Awareness Data

```typescript
// Set awareness data to track connected players with names
await globalAwareness.setData({ mode: kmClient.clientContext.mode, name });
```

#### Example: Read Awareness State

A list of connected players with names

```tsx
const globalConnections = useSnapshot(globalAwareness.proxy);

const globalClients = Object.values(globalConnections).reduce<
 Record<
  string,
  { lastPing: number; clientId: string; data: GlobalAwarenessData }
 >
>((acc, connection) => {
 // skip players without name as they have not joined yet
 if (!connection.data.name) {
  return acc;
 }

 // filter by mode to get only players
 if (connection.data.mode !== 'player') {
  return acc;
 }

 // group connections by client id to avoid duplicates
 if (!acc[connection.clientId]) {
  acc[connection.clientId] = connection;
 }

 return acc;
}, {});

const connectedPlayerCount = Object.entries(globalClients).length;

// Render player count and list of players
return (
 <>
  <span>Players: {connectedPlayerCount}</span>
  <ul>
   {Object.entries(globalClients).map(([clientId, connection]) => (
    <li key={clientId}>{connection.data.name}</li>
   ))}
  </ul>
 </>
);
```

## Using timers

- Store `kmClient.serverTimestamp()` in the global store to create a timestamp, accessible to all players
- Use [useServerTimer.ts](../../src/hooks/useServerTime.ts) to create timers that are synced across all players

### Example

```tsx
import { useServerTimer } from '@/hooks/useServerTime';
import { KmTimeCountdown } from '@kokimoki/shared';

const serverTime = useServerTimer(); // Update server time every 250ms
const { startTimestamp } = useSnapshot(globalStore.proxy);
const elapsedMs = serverTime - startTimestamp;

return <KmTimeCountdown ms={elapsedMs} />;
```

## Generate Links (Host/Presenter Mode)

- Use [generateLink](../../src/kit/generate-link.ts) to create player and presenter join links
- Only available in host/presenter mode

### Example

```tsx
import { generateLink } from '@/kit/generate-link';

const playerLink = generateLink(kmClient.clientContext.playerCode, {
  mode: 'player'
});

const presenterLink = generateLink(kmClient.clientContext.presenterCode, {
  mode: 'presenter',
  playerCode: kmClient.clientContext.playerCode
});

// Display links
<a href={playerLink}>Join as Player</a>
<a href={presenterLink}>Join as Presenter</a>
```

## Layouts

### Design Principles

**Target devices and purpose for each mode:**

- **Player**: Mobile-first responsive design (phones, tablets)
  - Primary focus: Game content and player interaction
  - UI patterns: Touch-friendly buttons, readable text size, mobile text mobile-friendly vertical layouts and navigation

- **Host**: Desktop-oriented design (laptops, desktops, tablets)
  - Primary focus: Game state control and management
  - UI patterns: Control panels, start/stop buttons, player lists, game links with QR codes

- **Presenter**: Large screen optimized design (TV/projector displays)
  - Primary focus: Read-only game state visualization, no user interaction
  - UI patterns: Large text, timers, scores, QR codes for joining

**Key differences:**

- Player = interactive gameplay display (mobile)
- Host = game management display (desktop)
- Presenter = spectator display (large screen)

### Player Layout

- Use [PlayerLayout](../../src/layouts/player.tsx) compound components for player UI
- Mobile-first with sticky header/footer and responsive main content area
- All layout components accept `className` prop for custom styling

```tsx
import { PlayerLayout } from '@/layouts/player';

<PlayerLayout.Root>
 <PlayerLayout.Header>{/* Menu button, title */}</PlayerLayout.Header>

 <PlayerLayout.Main>{/* Main game content */}</PlayerLayout.Main>

 <PlayerLayout.Footer>{/* Status bar, controls */}</PlayerLayout.Footer>
</PlayerLayout.Root>;
```

### Host/Presenter Layout

- Use [HostPresenterLayout](../../src/layouts/host-presenter.tsx) for desktop/large screens
- Provides consistent structure with title header and grid-based main content
- All layout components accept `className` prop for custom styling

```tsx
import { HostPresenterLayout } from '@/layouts/host-presenter';

<HostPresenterLayout.Root>
 <HostPresenterLayout.Header>
  {/* Additional header content */}
 </HostPresenterLayout.Header>

 <HostPresenterLayout.Main>
  {/* Game controls, links, views */}
 </HostPresenterLayout.Main>
</HostPresenterLayout.Root>;
```

## Configuration

### Structure

- [schema.ts](../../src/config/schema.ts) defines the configuration schema structure with default values using `zod/v4` and `.default()`
- [default.config.yaml](../../default.config.yaml) contains the actual configuration values

### Guidelines

- **MUST ALWAYS** add all user-facing text (buttons, labels, titles, messages) and configurable game parameters to [schema.ts](../../src/config/schema.ts) and [default.config.yaml](../../default.config.yaml)
- **NEVER** hardcode any text strings directly in components
- **ALWAYS** update both files when making changes in configuration
- **ALWAYS** run `npm run build` after modifying the `schema.ts` to generate the `YAML` schema specification
- Check existing configuration **BEFORE** adding new values to avoid duplication
- Keep `schema.ts` defaults minimal - only short, valid fallback values
- **ALWAYS** use quotes for strings in `YAML` files
- Use `Md` suffix (e.g. `welcomeMessageMd`) for fields containing Markdown
- Values naming should be descriptive and consistent (e.g. `startButton`, `stopButton`, `waitingMessageMd`)
- Render Markdown using `react-markdown` with `prose` class from Tailwind CSS

### Example: Using Config in Components

```tsx
import { config } from '@/config';

// ✅ CORRECT - text from config
export const Button = () => <button>{config.startButton}</button>;

// ❌ WRONG - hardcoded text
export const Button = () => <button>Start Game</button>;
```

## Global controller

- The [useGlobalController.ts](../../src/hooks/useGlobalController.ts) **ALWAYS** maintains a single connection that is the global state controller
- This connection can run logic that would not make sense to run on multiple devices (e.g. affecting global state after a timeout is reached)
- Add your time-based global controller logic inside the `useGlobalController` hook
- The hook provides `serverTime` (updates every second) and `isGlobalController` flag

### Example

Add time-based logic inside `useGlobalController` hook:

```tsx
// Inside useGlobalController.ts (lines 36-44)
useEffect(() => {
 if (!isGlobalController) {
  return;
 }

 // Example: Check if round time expired and start a new round
 const handleNewRound = async () => {
  await kmClient.transact([globalStore], ([state]) => {
   if (serverTime - state.roundStartTime > 30000) {
    state.currentRound += 1;
    state.roundStartTime = kmClient.serverTimestamp();
   }
  });
 };

 handleNewRound();
}, [isGlobalController, serverTime]);
```

## Other Template Patterns

### Example: Waiting for Game Start

If the game has not started yet, show a waiting view

```tsx
const { started } = useSnapshot(globalStore.proxy);

if (!started) {
 return <WaitingView />;
}

return <GameView />;
```

### Example: Force Player View

When the game starts, force the player to a specific view

```tsx
const { started } = useSnapshot(globalStore.proxy);

React.useEffect(() => {
 if (started) {
  playerActions.setCurrentView('shared-state');
 }
}, [started]);
```

### Example: Player Name Entry Flow

If the player does not enter a name yet, show the create profile view

```tsx
const { name } = useSnapshot(playerStore.proxy);

if (!name) {
 return <CreateProfileView />;
}

return <GameView />;
```

### Example: Host-Specific UI

If the current client mode is `host`, show host-specific UI elements

```tsx
const isHost = kmClient.clientContext.mode === 'host';

return (
 <>{isHost && <button onClick={globalActions.startGame}>Start Game</button>}</>
);
```
