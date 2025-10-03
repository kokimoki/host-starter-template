---
description: 'Instruction for Lobby starter template structure and development using Kokimoki SDK'
applyTo: '**'
---

# Instructions for @kokimoki/lobby-starter

## Project overview

This project is based on a lobby starter template using [Kokimoki SDK](./kokimoki-sdk.instructions.md)
The template provides the following functionality:

- Lobby management - create or join a [lobby](../../src/views/create-or-join-lobby.tsx)
- Players in the same lobby can communicate in real time by using [lobbyStore](../../src/state/stores/lobby-store.ts)
- Players in the same lobby can be aware of each others' presence using `lobbyAwareness` from [LobbyProvider](../../src/components/lobby/provider.tsx)
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
- Use [LobbyProvider](../../src/components/lobby/provider.tsx) for lobby state and awareness
- IMPORTANT! Do not modify `src/kit/` directory
- Use utility functions from `src/utils/`
- Keep configuration files (`src/config/`, `vite.config.ts`, `tsconfig*.json`) up to date and consistent
- For time-sensitive game logic, always use `kmClient.serverTimestamp()` instead of local timestamps to maintain synchronization between all players
- Prefer `lucide-react` icons instead of custom SVGs

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

### Lobby Store

- The [lobbyStore](../../src/state/stores/lobby-store.ts) contains data shared among all players in a lobby
- The lobby store instance itself is created by [lobby/provider.tsx](../../src/components/lobby/provider.tsx)
- The lobby state actions should be defined in [lobby-actions.ts](../../src/state/actions/lobby-actions.ts)

#### Example

```typescript
// Update lobby state
await kmClient.transact([lobbyStore], ([lobbyState]) => {
	lobbyState.name = 'My Lobby';
});

// Get reactive snapshot of lobby state in a React component
const { lobbyConnected, lobbyAwareness, lobbyStore } = useLobbyContext();
const lobbyState = useSnapshot(lobbyStore.proxy);
```

### Client ID

- Each player has a unique `clientId` accessible as `kmClient.id`
- The `clientId` is persistent across sessions
- Use `clientId` to identify players in the lobby store

#### Example

Modify data by player in the lobby store

```typescript
interface LobbyStore {
	players: Record<
		string, // clientId
		{ score: number }
	>;
}

// Update player score in the lobby store
await kmClient.transact([lobbyStore], ([lobbyState]) => {
	if (!lobbyState.players[kmClient.id]) {
		lobbyState.players[kmClient.id] = { score: 0 };
	}
	lobbyState.players[kmClient.id].score += 1;
});
```

### Combining Stores

- Prefer to update stores (`playerStore`, `lobbyStore`) in a single transaction
- Create such actions in [lobby-actions.ts](../../src/state/actions/lobby-actions.ts)

### Lobby Awareness

- Use `lobbyAwareness` from [LobbyProvider](../../src/components/lobby/provider.tsx) to track players connected to the lobby
- ALWAYS when working with lobby connections, group by `clientId` because each player can open multiple tabs
- Use `Object.entries(lobbyClients).length` for the number of unique players.

#### Example

```typescript
const { lobbyConnected, lobbyAwareness, lobbyStore } = useLobbyContext();
const lobbyConnections = useSnapshot(lobbyAwareness.proxy);
const lobbyClients = Object.values(lobbyConnections).reduce<
	Record<string, { lastPing: number; clientId: string }>
>((acc, connection) => {
	if (!acc[connection.clientId]) {
		acc[connection.clientId] = connection;
	}
	return acc;
}, {});
```

## Using timers

- Store `kmClient.serverTimestamp()` in the lobby store to create a timestamp accessible to all players
- Use [useServerTimer.ts](../../src/hooks/useServerTime.ts) to create timers that are synced across all players in a lobby

## Configuration

- For parameters that should be configurable, use the [schema.ts](../../src/config/schema.ts) and `zod/v4` to manage a configuration
- ALWAYS provide default values for all parameters
- Actual default configuration should be in [default.config.yaml](../../default.config.yaml) following the schema
- Check existing configuration before adding new values to `schema.ts`
- Keep `schema.ts` minimal - only short, valid defaults
- ALWAYS use quotes for strings in `YAML` files
- Use `Md` suffix (e.g. `welcomeMessageMd`) for fields containing Markdown
- Render Markdown using `react-markdown` with `prose` class from Tailwind CSS

## Host controller

- The [useHostController.ts](../../src/hooks/useHostController.ts) ALWAYS maintains a single connection that is the host
- This connection can run logic that would not make sense to run on multiple devices (e.g. affecting lobby state after a timeout is reached)
