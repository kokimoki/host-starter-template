---
description: Instructions for the Kokimoki SDK
applyTo: '**/*.tsx,**/*.ts'
---

# Kokimoki SDK

Development toolkit for building real-time collaborative game applications

## General guidelines

- `kmClient` - main entry point in Kokimoki SDK (defined in `src/services/km-client.ts`)
- `kmClient.id` - unique player identifier (persistent across connections)
- `kmClient.store(name, initialState)` - create global store (shared for players)
- `kmClient.localStore(name, initialState)` - create local store (device-only)
- `kmClient.transact([stores], callback)` - atomic state updates
- `kmClient.serverTimestamp()` - synchronized server time (Unix epoch)
- `useSnapshot(store.proxy)` - reactive state in React components (from `valtio`)
- **ALWAYS** use `kmClient.transact()` for global store updates
- **ALWAYS** use `useSnapshot(store.proxy)` hook in components to get reactive store changes
- Use `useSnapshot(store.connections)` for tracking active connections
- Use `kmClient.storage` methods to handle files
- Use `kmClient.ai` methods to use AI capabilities
- Use `kmClient.leaderboard` methods to manage leaderboards

## Stores

- Defined stores in `src/state/stores/`

### When to Use

- **Global store**: Real-time shared state (players, game state)
- **Local store**: Device-specific data (settings, draft inputs, UI state)

### State Updates

- Defined actions in `src/state/actions/`
- Transactions are atomic and ensure consistency
- Prefer `Record<string, T>` over arrays for collections

## Connections

- Track online players via `store.connections`
- `store.connections.clientIds` - `Set<string>` of online client IDs
- Use `useSnapshot(store.connections)` for reactive connections updates

## Storage

- Use for media files (images, audio, video), large JSON data, files not suitable for real-time stores
- File upload/management via `kmClient.storage`
- No setup required

### API Methods

#### upload

Upload a file to storage

```
kmClient.storage.upload(
  name: string,
  blob: Blob,
  tags?: string[]
): Promise<Upload>
```

#### listUploads

Query uploaded files with filtering and pagination

```
kmClient.storage.listUploads(
  filter?: { clientId?: string; mimeTypes?: string[]; tags?: string[] },
  skip?: number,
  limit?: number
): Promise<Paginated<Upload>>
```

#### updateUpload

Update file tags

```
kmClient.storage.updateUpload(
  id: string,
  update: { tags?: string[] }
): Promise<Upload>
```

#### deleteUpload

Permanently delete a file

```
kmClient.storage.deleteUpload(
  id: string
): Promise<{ acknowledged: boolean; deletedCount: number }>
```

## AI Integration

- AI text/image generation via `kmClient.ai`
- No API keys required

### When to Use

- **ai.chat** - free-form text responses (stories, explanations, conversations)
- **ai.generateJson** - structured data (quiz questions, game content, configs)
- **ai.modifyImage** - image transformations (style transfer, edits)

### API Methods

#### chat

Generate text response

```
kmClient.ai.chat(req: {
  model?: string,
  systemPrompt?: string,
  userPrompt?: string,
  temperature?: number,
  maxTokens?: number
}): Promise<{ content: string }>
```

#### generateJson

Generate structured JSON (auto-parsed)

```
kmClient.ai.generateJson<T>(req: {
  model?: string,
  systemPrompt?: string,
  userPrompt?: string,
  temperature?: number,
  maxTokens?: number
}): Promise<T>
```

#### modifyImage

Transform image with AI

```
kmClient.ai.modifyImage(
  baseImageUrl: string,
  prompt: string,
  tags?: string[]
): Promise<Upload>
```

## Leaderboard

- Leaderboard system via `kmClient.leaderboard`
- No setup required
- Long-term persistent storage for large number of players

### When to Use

- **Leaderboard API**: Large player counts (100+), persistent scores, efficient pagination
- **Global Store**: Small player counts (<100), real-time updates, session-based

### API Methods

#### insertEntry

Add new entry (creates new each time, keeps history)

```
kmClient.leaderboard.insertEntry<M, PM>(
  name: string,
  sortDir: "asc" | "desc",
  score: number,
  metadata: M,
  privateMetadata: PM
): Promise<{ rank: number }>
```

#### upsertEntry

Add or update latest entry per client (replaces previous)

```
kmClient.leaderboard.upsertEntry<M, PM>(
  name: string,
  sortDir: "asc" | "desc",
  score: number,
  metadata: M,
  privateMetadata: PM
): Promise<{ rank: number }>
```

#### listEntries

List entries with pagination

```
kmClient.leaderboard.listEntries<M>(
  name: string,
  sortDir: "asc" | "desc",
  skip?: number,
  limit?: number
): Promise<Paginated<{ rank: number; score: number; metadata: M }>>
```

#### getBestEntry

Get best entry for a client

```
kmClient.leaderboard.getBestEntry<M>(
  name: string,
  sortDir: "asc" | "desc",
  clientId?: string
): Promise<{ rank: number; score: number; metadata: M }>
```

## Full Documentation

**IMPORTANT:** Refer to [`@kokimoki/app/dist/llms.txt`](../../../node_modules/@kokimoki/app/dist/llms.txt) for detailed examples and complete API reference.
