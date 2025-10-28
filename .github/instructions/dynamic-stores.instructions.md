---
description: 'Instructions for using useDynamicStore hook for room-based state management'
applyTo: '**/*.tsx,**/*.ts'
---

# Dynamic Stores

The `useDynamicStore` hook enables creation of isolated, room-based state management using Kokimoki stores. This is useful for scenarios where subsets of players need to share state without affecting the global store.

## When to Use Dynamic Stores

Use dynamic stores when you need:

- **Room-based isolation**: Chat rooms, team spaces, breakout rooms
- **Player grouping**: Teams, squads, parties that share private state
- **Multi-instance features**: Multiple parallel games or activities
- **Scoped collaboration**: Players working together on specific tasks

**Do NOT use for:**

- Global game state (use `globalStore` instead)
- Player-specific data (use `playerStore` instead)
- Single shared space for all players

## Basic Usage

```tsx
import { useDynamicStore } from '@/hooks/useDynamicStore';

interface RoomState {
  messages: string[];
  count: number;
}

const initialState: RoomState = {
  messages: [],
  count: 0
};

const MyComponent = ({ roomCode }: { roomCode: string }) => {
  const { store, isConnected } = useDynamicStore<RoomState>(
    `my-room-${roomCode}`,
    initialState
  );

  const roomState = useSnapshot(store.proxy);

  // Update state
  const addMessage = async (message: string) => {
    await kmClient.transact([store], ([state]) => {
      state.messages.push(message);
    });
  };

  if (!isConnected) {
    return <div>Connecting...</div>;
  }

  return <div>Messages: {roomState.messages.length}</div>;
};
```

## Hook API

### Parameters

- **roomName**: `string` - Unique identifier for the store (e.g., `"chat-room-abc123"`)
- **initialState**: `T` - Default state structure with initial values

### Return Values

- **store**: `KokimokiStore<T>` - The Kokimoki store instance
- **isConnected**: `boolean` - Whether successfully joined the store
- **isConnecting**: `boolean` - Whether currently joining the store

## Common Patterns

### Example: Team-based State

Players can be grouped into teams with private team state:

```tsx
interface TeamState {
  teamName: string;
  players: Record<string, { name: string; role: string }>;
  score: number;
  strategy: string;
}

const TeamView = ({ teamId }: { teamId: string }) => {
  const { name } = useSnapshot(playerStore.proxy);
  const { store: teamStore, isConnected } = useDynamicStore<TeamState>(
    `team-${teamId}`,
    {
      teamName: `Team ${teamId}`,
      players: {},
      score: 0,
      strategy: ''
    }
  );

  const teamState = useSnapshot(teamStore.proxy);

  // Join team
  React.useEffect(() => {
    if (isConnected) {
      kmClient.transact([teamStore], ([state]) => {
        state.players[kmClient.id] = { name, role: 'member' };
      });
    }
  }, [isConnected]);

  // Update team strategy
  const updateStrategy = async (strategy: string) => {
    await kmClient.transact([teamStore], ([state]) => {
      state.strategy = strategy;
    });
  };

  return (
    <div>
      <h2>{teamState.teamName}</h2>
      <p>Score: {teamState.score}</p>
      <p>Players: {Object.keys(teamState.players).length}</p>
    </div>
  );
};
```

### Example: Chat Rooms

Multiple independent chat rooms:

```tsx
interface ChatState {
  messages: Array<{
    id: string;
    clientId: string;
    text: string;
    timestamp: number;
  }>;
}

const ChatRoom = ({ roomCode }: { roomCode: string }) => {
  const { store, isConnected } = useDynamicStore<ChatState>(
    `chat-${roomCode}`,
    { messages: [] }
  );

  const { messages } = useSnapshot(store.proxy);

  const sendMessage = async (text: string) => {
    await kmClient.transact([store], ([state]) => {
      state.messages.push({
        id: `${kmClient.id}-${Date.now()}`,
        clientId: kmClient.id,
        text,
        timestamp: kmClient.serverTimestamp()
      });
    });
  };

  return <div>{messages.length} messages</div>;
};
```

### Example: Breakout Rooms

Small group discussions or activities:

```tsx
interface BreakoutRoomState {
  topic: string;
  participants: string[];
  responses: Record<string, string>;
  completed: boolean;
}

const BreakoutRoom = ({ roomId }: { roomId: string }) => {
  const { store, isConnected } = useDynamicStore<BreakoutRoomState>(
    `breakout-${roomId}`,
    {
      topic: '',
      participants: [],
      responses: {},
      completed: false
    }
  );

  const roomState = useSnapshot(store.proxy);

  // Join room
  React.useEffect(() => {
    if (isConnected) {
      kmClient.transact([store], ([state]) => {
        if (!state.participants.includes(kmClient.id)) {
          state.participants.push(kmClient.id);
        }
      });
    }
  }, [isConnected]);

  const submitResponse = async (response: string) => {
    await kmClient.transact([store], ([state]) => {
      state.responses[kmClient.id] = response;
    });
  };

  return (
    <div>
      <h3>{roomState.topic}</h3>
      <p>Participants: {roomState.participants.length}</p>
    </div>
  );
};
```

## Key Behaviors

### Store Lifecycle

- Stores are **created on first use** and **cached** globally
- Multiple components using the same `roomName` share the same store instance
- Reference counting ensures cleanup only when all components unmount

### State Synchronization

- State syncs in real-time across all clients joined to the same room
- Use transactions to update state atomically

### Connection Management

- Component automatically joins the store on mount
- Component automatically leaves the store on unmount
- `isConnected` indicates successful join
- `isConnecting` indicates join in progress

## Best Practices

### File Organization

**ALWAYS** organize dynamic store code using the standard store/actions pattern:

**State definition** (`src/state/chat-store.ts`):

```typescript
// Export state interface
export interface ChatState {
  messages: Array<{
    id: string;
    clientId: string;
    playerName: string;
    message: string;
    timestamp: number;
  }>;
}

// Export function to generate initial state
export function createChatState(): ChatState {
  return {
    messages: []
  };
}
```

**Actions** (`src/state/actions/chat-actions.ts`):

```typescript
import type { KokimokiStore } from '@kokimoki/app';
import { kmClient } from '@/services/km-client';
import type { ChatState } from '../chat-store';

export const chatActions = {
  async sendMessage(
    store: KokimokiStore<ChatState>,
    playerName: string,
    message: string
  ) {
    await kmClient.transact([store], ([state]) => {
      state.messages.push({
        id: `${kmClient.id}-${Date.now()}`,
        clientId: kmClient.id,
        playerName,
        message,
        timestamp: kmClient.serverTimestamp()
      });
    });
  }
};
```

**Usage in component** (`src/views/chat-view.tsx`):

```tsx
import { useDynamicStore } from '@/hooks/useDynamicStore';
import { createChatState, type ChatState } from '@/state/chat-store';
import { chatActions } from '@/state/actions/chat-actions';

const ChatRoom = ({ roomCode }: { roomCode: string }) => {
  const { store, isConnected } = useDynamicStore<ChatState>(
    `chat-${roomCode}`,
    createChatState()
  );

  const { messages } = useSnapshot(store.proxy);

  const handleSend = async (message: string) => {
    await chatActions.sendMessage(store, playerName, message);
  };

  return <div>{messages.length} messages</div>;
};
```

### General Best Practices

1. **Unique room names**: Use descriptive prefixes (e.g., `"chat-room-"`, `"team-"`)
2. **Key remounting**: Use `key={roomCode}` to force remount when switching rooms
3. **Check isConnected**: Wait for connection before showing/updating content
4. **Cleanup on leave**: Remove player-specific data when leaving a room
5. **Use actions**: Never inline `kmClient.transact` calls in components

## Guidelines

- **ALWAYS** organize dynamic stores in `src/state/*-store.ts` files
- **ALWAYS** export state interface and initial state creator function
- **ALWAYS** define actions in `src/state/actions/*-actions.ts` files
- **ALWAYS** pass store instance to action functions
- **ALWAYS** use `useSnapshot` to get reactive state updates
- **ALWAYS** use `kmClient.transact` for state updates (within actions)
- Use `isConnected` before displaying or modifying state
- Consider using `kmClient.id` as keys for player-specific data in rooms
