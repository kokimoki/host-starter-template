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
- ALWAYS use [@kokimoki/shared](./kokimoki-shared.instructions.md) components FIRST if they exist before creating new UI components
- Prefer [DaisyUI class names](./daisyui.instructions.md) for common UI components over writing custom CSS or Tailwind utility classes
- IMPORTANT! Do not modify `src/kit/` directory
- Use utility functions from `src/utils/`
- Keep configuration files (`src/config/`, `vite.config.ts`, `tsconfig*.json`) up to date and consistent
- For time-sensitive game logic, always use `kmClient.serverTimestamp()` instead of local timestamps to maintain synchronization between all players
- Prefer `lucide-react` icons instead of custom SVGs

## Modes

The app has three modes: host, player, and presenter. The mode is provided by the server and can be accessed using `kmClient.clientContext.mode`. Based on the mode, one of the following files is used as the root component:

- Host mode: [app.host.tsx](../../src/modes/app.host.tsx)
- Player mode: [app.player.tsx](../../src/modes/app.player.tsx)
- Presenter mode: [app.presenter.tsx](../../src/modes/app.presenter.tsx)

## Game state management

### Player store

- The local [playerStore](../../src/state/stores/player-store.ts) contains data only stored on the player device
- The player state actions should be defined in [player-actions.ts](../../src/state/actions/player-actions.ts)

#### Example

The `currentView` value is used for routing (switching between views)

```typescript
// Update player state
await kmClient.transact([playerStore], ([playerState]) => {
	playerState.currentView = 'view-name';
});

// Get reactive snapshot of player state in a React component
const playerState = useSnapshot(playerStore.proxy);
```

### Global Store

- The [globalStore](../../src/state/stores/global-store.ts) contains data shared among all players in the game
- The global state actions should be defined in [global-actions.ts](../../src/state/actions/global-actions.ts)

#### Example

```typescript
// Update global state
await kmClient.transact([globalStore], ([globalState]) => {
	globalState.someValue = 'new-value';
});

// Get reactive snapshot of global state in a React component
const globalState = useSnapshot(globalStore.proxy);
```

### Client ID

- Each player has a unique `clientId` accessible as `kmClient.id`
- The `clientId` is persistent across sessions
- Use `clientId` to identify players in the global store

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

- Prefer to update stores (`playerStore`, `globalStore`) in a single transaction
- Create such actions in [global-actions.ts](../../src/state/actions/global-actions.ts)

### Global Awareness

- Use [globalAwareness](../../src/state/stores/global-awareness.ts) to track players connected to the global state
- ALWAYS when working with global connections, group by `clientId` because each player can open multiple tabs
- Use `Object.entries(globalClients).length` for the number of unique players.

#### Example

```typescript
const globalConnections = useSnapshot(globalAwareness.proxy);
const globalClients = Object.values(globalConnections).reduce<
	Record<
		string,
		{ lastPing: number; clientId: string; data: GlobalAwarenessData }
	>
>((acc, connection) => {
	if (!acc[connection.clientId]) {
		acc[connection.clientId] = connection;
	}
	return acc;
}, {});
```

## Using timers

- Store `kmClient.serverTimestamp()` in the global store to create a timestamp accessible to all players
- Use [useServerTimer.ts](../../src/hooks/useServerTime.ts) to create timers that are synced across all players

## Configuration

- For parameters that should be configurable, use the [schema.ts](../../src/config/schema.ts) and `zod/v4` to manage a configuration
- Run `npm run build` after modifying the schema to generate the yaml schema specification
- ALWAYS provide default values for all parameters
- Actual default configuration should be in [default.config.yaml](../../default.config.yaml) following the schema
- Check existing configuration before adding new values to `schema.ts`
- Keep `schema.ts` minimal - only short, valid defaults
- ALWAYS use quotes for strings in `YAML` files
- Use `Md` suffix (e.g. `welcomeMessageMd`) for fields containing Markdown
- Render Markdown using `react-markdown` with `prose` class from Tailwind CSS

## Global controller

- The [useGlobalController.ts](../../src/hooks/useGlobalController.ts) ALWAYS maintains a single connection that is the global state controller
- This connection can run logic that would not make sense to run on multiple devices (e.g. affecting global state after a timeout is reached)
