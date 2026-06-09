---
name: concept-review
description: Review Kokimoki apps codebases against a required scalability, state-management, synchronization, and performance checklist. Use when a developer asks to review, audit, validate, or QA a Kokimoki app, game, host/player/presenter implementation, store design, leaderboard usage, transactions, dynamic stores, AI jobs, uploads, timers, reconnection behavior, or high-connection-count readiness; produce a REVIEW.md report in the project root.
---

# Concept Review

Review the current Kokimoki app codebase and save the report to `REVIEW.md` in the project root.

## Workflow

1. Inspect the codebase before judging anything. Read `package.json`, `kokimoki.config.ts`, relevant files under `src/`, existing stores, actions, hooks, modes, views, and layouts.
2. Check every item in the checklist below against actual code. Mark an item as skip (`—`) only when the app has no applicable surface for that check.
3. Use specific file paths and line numbers for every fail (`❌`) and warn (`⚠️`). Include concise evidence, not speculation.
4. Do not invent issues. Pass items that are implemented correctly. Warn only for plausible risks visible in the code.
5. Save the final report to `REVIEW.md` in the project root using the exact report structure below.
6. Include recommendations ordered by impact. Keep them actionable and tied to findings.

## Report Format

Use this exact structure:

```markdown
# Kokimoki Review Report

**Date:** YYYY-MM-DD
**Project:** [project name from package.json]

## Summary

| Result  | Count |
| ------- | ----- |
| ✅ Pass | N     |
| ❌ Fail | N     |
| ⚠️ Warn | N     |
| — Skip  | N     |

## Findings

### [Section Name]

- ✅ **Check title** — brief explanation of what was found
- ❌ **Check title** — what's wrong and where (include file paths and line numbers)
- ⚠️ **Check title** — potential concern, with suggestion
- — **Check title** — not applicable (explain why, e.g., "no AI usage in this app")

[repeat for each section]

## Recommendations

[Numbered list of the most impactful changes, ordered by priority]
```

## Checklist

### Store Design

- [ ] **No single mega-store** — state is split into focused stores by feature (e.g., `game-state`, `player-list`, `chat`) rather than one global store holding everything
- [ ] **Collections use `Record<string, T>`, not arrays** — arrays have poor CRDT sync performance with many concurrent writers, Records avoid merge conflicts and provide ~30% better sync
- [ ] **Dynamic stores used for room/team/group isolation** — if the app has groups, teams, or sub-rooms, use `kmClient.join(store)` / `kmClient.leave(store)` so each group only syncs its own state
- [ ] **Store state is minimal** — no derived/computed fields stored in synced state; compute them in the UI layer instead
- [ ] **No large blobs in stores** — media (images, audio, video) stored via the Storage API (`kmClient.storage.upload()`), not embedded in store state

### Local Stores

- [ ] **Local stores used for client-only state** — `kmClient.localStore()` for UI preferences, draft inputs, and per-player state that doesn't need to be shared with everyone. This avoids adding to the synced state that all 100s of connections must download
- [ ] **Local stores used to reduce sync traffic** — state that each client computes or fetches independently (e.g., the current player's own settings, cached results) belongs in a local store, not a global one
- [ ] **Duplicating data across local and shared stores is OK when appropriate** — it's fine to keep a copy of player-specific identity data (e.g., player name, avatar, preferences) in a local store so it persists even if the host clears or resets the shared game state. Avoid duplicating volatile game data like scores — those should live in the shared store or leaderboard as the single source of truth

### Leaderboard vs Store

- [ ] **Leaderboard API used for rankings with 100+ entries** — `kmClient.leaderboard.listEntries()` is database-backed and paginated; storing 100s of scores in a global store does not scale
- [ ] **Pagination used** — calls to `listEntries` use `skip` and `limit` parameters, never fetching all entries at once

### Transactions & State Mutations

- [ ] **All state mutations use `kmClient.transact()`** — never mutate `store.proxy` directly outside a transaction
- [ ] **Transactions are in action files, not inline in components** — keeps mutation logic testable and prevents accidental re-renders triggering writes
- [ ] **No unnecessary high-frequency transactions** — e.g., avoid writing to a store on every mouse move or keystroke when 100s of clients would each be producing those writes; debounce or throttle where appropriate
- [ ] **Multi-store updates use a single `transact()` call** — `kmClient.transact([store1, store2], ...)` ensures atomicity and reduces message count

### Reactive Reading

- [ ] **`useSnapshot(store.proxy)` used in components** — not direct proxy access
- [ ] **`snapshot(store.proxy)` used outside components** — immutable reads in actions/handlers, never `store.proxy.field` directly
- [ ] **Snapshot subscriptions are granular** — components subscribe only to the slice of state they need, not the entire store, to avoid unnecessary re-renders across 100s of connection updates

### Connection Tracking & Presence

- [ ] **Connection presence reads are efficient** — `useSnapshot(store.connections).clientIds` used for online checks, which is a `Set` (O(1) lookup), not iterated unnecessarily
- [ ] **No heavy rendering per connection** — if rendering a list of 100s of players, virtualization or pagination is used; don't render an unbounded list of DOM elements
- [ ] **`isConnecting` state handled** — components using dynamic stores gate rendering on connection state before accessing store data

### Dynamic Store Lifecycle

- [ ] **Stores are joined and left correctly** — `kmClient.join(store)` on mount, `kmClient.leave(store)` on unmount; no leaked subscriptions
- [ ] **Reference counting works correctly** — if multiple components share a dynamic store via the same `roomName`, verify only one subscription is created and cleanup happens when the last consumer unmounts
- [ ] **No unbounded store creation** — app doesn't create a new dynamic store per player (which would mean 100s of stores); use shared team/group stores instead

### AI & Async Jobs

- [ ] **AI job IDs persisted to store** — `jobId` stored in synced state so jobs survive page reloads and don't get re-triggered
- [ ] **No duplicate AI requests** — with 100s of clients, ensure only one client (e.g., the "host" or a specific role) triggers AI generation, not every connected client independently
- [ ] **Job results shared via store, not re-fetched per client** — once one client gets the result, it's written to the store for everyone

### Storage & Uploads

- [ ] **Uploads use the Storage API** — `kmClient.storage.upload()` with CDN URL stored in state, not raw file data
- [ ] **Upload listing is paginated** — `listUploads(filter, skip, limit)` used rather than unbounded queries

### Time & Synchronization

- [ ] **`kmClient.serverTimestamp()` used for all time-sensitive logic** — timers, countdowns, scoring, event ordering; never `Date.now()` which varies per client
- [ ] **Record keys use server timestamps** — ensures consistent ordering across all 100s of clients

### Network & Reconnection

- [ ] **App handles reconnection gracefully** — UI accounts for temporary disconnection states; no crashes or inconsistent UI when a client reconnects (SDK handles reconnection with exponential backoff automatically)
- [ ] **No assumption of connection order** — with 100s of clients connecting/disconnecting, the app doesn't depend on a specific join order or a "first connected" client having special state

### General Performance

- [ ] **No unbounded data growth** — old entries (messages, events, scores) are pruned or paginated; a store that grows without bound will slow sync for every new connection that must download the full state. For scores and rankings, use the Leaderboard API instead of accumulating entries in a store
- [ ] **Initial state kept small** — new connections receive the full Y.js document state on subscribe; if the store has accumulated large history, sync payload is heavy for every new joiner
- [ ] **Component re-renders minimized** — with 100s of clients triggering state changes, excessive re-renders can freeze the UI; use granular snapshots, `React.memo`, and avoid subscribing to rapidly-changing state in expensive components
