---
description: Instructions for the Kokimoki SDK
applyTo: '**/*.tsx,**/*.ts'
---

# Kokimoki SDK

The Kokimoki SDK is a comprehensive development toolkit for building real-time collaborative game applications.

## General guidelines

- `kmClient` is the main entry point for Kokimoki SDK
- The `clientId` is a unique identifier for each client (player)
- Use `kmClient.store` for global stores and `kmClient.localStore` for local stores
- Use `kmClient.serverTimestamp()` for time-related matters as this will be synced among players.
- Use `kmClient.transact` for atomic state updates across single store or multiple stores
- Use `useSnapshot` hook to get reactive state inside React components

## Kokimoki Client

- The `kmClient` instance is created in [km-client.ts](../../src/services/km-client.ts)
- The `kmClient` provides the following key functionalities:
  - `kmClient.store` and `kmClient.localStore` for creating stores
  - `kmClient.transact` for atomic state updates
  - `kmClient.serverTimestamp()` for synchronized timestamps
  - `kmClient.id` for unique player identification
  - `kmClient.awareness` for user presence and awareness tracking

## Client ID

- Each client (player) has a unique `clientId` accessible as `kmClient.id`, stable identifier that represents a player across multiple connections
  (client sessions)
- The `clientId` is persistent across client sessions
- The `clientId` remains consistent after user reconnect or page reload
- Use `clientId` to identify players in global stores
- Each client (player) can have multiple connections, but all connections share the same `clientId`

## Kokimoki Store

Kokimoki Store powered by `valtio` and `valtio-yjs` for real-time state management in Kokimoki game applications

### Store initialization

- Stores should be defined in `src/state/stores/`
- Store can be created in two ways:
  - `kmClient.localStore` is used for data stored on the player device (local)
  - `kmClient.store` is used for data shared among all players in a game (global)

#### Example

```typescript
import { kmClient } from '@services/km-client';

interface State {
	title: string;
	count: number;
}

const initialState: State = {
	title: 'Store',
	count: 0
};

// Initialize global store with initial state
export const store = kmClient.store<PlayerState>('store-name', initialState);
```

### State management

- State actions are functions that modify the store state by performing transactions
- Actions should be defined in `/src/state/actions/`
- Use async/await for all state transactions by `kmClient.transact` function for global stores
- Transactions are atomic and ensure state consistency
- ALWAYS update store state inside `kmClient.transact()` within action function

#### Example

```typescript
import { store } from '../store';

// Update state
await kmClient.transact([store], ([state]) => {
	state.title = 'New store';
	state.count += 1;
});
```

### Combining Stores

- Multiple stores can be updated in a single transaction
- Prefer to update stores in a single transaction to ensure state consistency

#### Example

```typescript
// Update multiple stores in a single transaction
await kmClient.transact([store1, store2], ([state1, state2]) => {
	state1.name = 'My Store1';
	state2.name = 'My Store2';
});
```

### Reactive State in Components

- Use `useSnapshot` hook from `valtio` to get reactive state inside React components
- The component will re-render when the store state changes

#### Example

```tsx
import { useSnapshot } from 'valtio';
import { store } from '../store';

const Component = () => {
	// Get reactive snapshot of the store state
	const { title, count } = useSnapshot(store.proxy);

	return (
		<div>
			<h1>Title: {title}</h1>
			<p>Count: {count}</p>
		</div>
	);
};
```

## Server Time Synchronization

Kokimoki SDK implements a time synchronization system to ensure consistent timestamps across all connected clients, regardless of their local clock differences

- Use `kmClient.serverTimestamp()` to get the current server-synchronized timestamp
- The timestamp is a Epoch Unix Timestamp
- Use server timestamps for time-related matters like event scheduling, timeouts, timers, etc.

## Kokimoki Awareness

- The `kmClient.awareness` store is used to provide a real-time presence information of all connections in a game session
- Each connection has a unique `connectionId` identifier that represents a single connection

### Example

Create awareness store for tracking user presence

```typescript
import { kmClient } from '@services/km-client';

// Initialize awareness store
const awareness = kmClient.awareness('store-name', {
	// Custom presence data for this connection
});
```

### Example

The structure of `kmClient.awareness` store state

```typescript
interface AwarenessState {
	[connectionId: string]: {
		clientId: string;
		lastPing: number;
		// Custom presence data for this connection
		data: {};
	};
}
```
