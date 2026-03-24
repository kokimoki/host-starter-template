# AGENTS.md

## Project Overview

Uses Kokimoki SDK with three display modes:

- **Host** (`src/modes/app.host.tsx`) - Desktop control panel for game management
- **Player** (`src/modes/app.player.tsx`) - Mobile-first interactive gameplay
- **Presenter** (`src/modes/app.presenter.tsx`) - Large screen display (TV/projector)

Kokimoki SDK docs:

- [@kokimoki/app](node_modules/@kokimoki/app/llms.txt) — core SDK docs
- [@kokimoki/kit](node_modules/@kokimoki/kit/llms.txt) — Vite plugin & dev tools
- [@kokimoki/react-components](node_modules/@kokimoki/react-components/dist/llms.txt) — UI components

## Commands

- `npm install` - Install dependencies (Node v22+)
- `npm run dev` - Development server with HMR
- `npm run build` - TypeScript check + production build
- `npm run lint` - ESLint
- `npm run format` - Prettier

## Code Style

- **Named exports only** - `export const Component` or `export function hook`
- **Use `@/` path alias** - `import { View } from '@/views/view'`
- **Filenames**: `kebab-case` everywhere except `src/utils/` and `src/hooks/` (use `camelCase`)
- **Always check `@kokimoki/react-components`** for existing UI components before creating new ones
- **Prefer `lucide-react`** icons over custom SVGs

## Project Structure

```
src/
  components/     # Reusable UI components
  hooks/          # Custom React hooks
  i18n/           # Translation files (add ALL user-facing text here)
  layouts/        # PlayerLayout, HostPresenterLayout compound components
  modes/          # Entry points: app.host.tsx, app.player.tsx, app.presenter.tsx
  services/       # kmClient instance
  state/
    actions/      # Store mutation functions
    schemas/      # Zod schemas for stores
    stores/       # Kokimoki stores (global + local)
  views/          # Page-level components
  types/          # TypeScript interfaces
  utils/          # Utility functions
  constants/      # Static constants and configuration data (e.g., languages.ts)
```

## State Management

### Stores

- **Global stores** (`kmClient.store`) - Synced across all clients
- **Local stores** (`kmClient.localStore`) - Device-only, not synced
- **Dynamic stores** (`useDynamicStore` hook) - Room-based isolated state

### Key Files

- `src/state/stores/` - Store definitions with JSDoc
- `src/state/actions/` - Mutation functions
- `src/state/schemas/` - Zod schemas (import `z` from `@kokimoki/app`)
- `kokimoki.config.ts` - Register stores with schemas

### Transactions

```typescript
// Single store
await kmClient.transact([gameSessionStore], ([state]) => {
  state.started = true;
  state.startTimestamp = kmClient.serverTimestamp();
});

// Multi-store atomic update
await kmClient.transact(
  [localPlayerStore, playersStore],
  ([local, players]) => {
    local.name = name;
    players.players[kmClient.id] = { name };
  }
);
```

## Modes & Layouts

Modes defined in `kokimoki.config.ts` via `deployCodes`. Access via `kmClient.clientContext.mode`.

- **Player**: Mobile-first → `PlayerLayout` compound component
- **Host**: Desktop control → `HostPresenterLayout` compound component
- **Presenter**: Large screen → `HostPresenterLayout` compound component

## Translations (i18n)

**CRITICAL:** Never hardcode text. Use domain-driven namespaces in `src/i18n/en/`.

### Namespaces

| Namespace   | File             | Purpose                                                        |
| ----------- | ---------------- | -------------------------------------------------------------- |
| `common`    | `common.json`    | Shared UI labels: buttons, status indicators, form labels      |
| `host`      | `host.json`      | Host dashboard: game config, link labels, confirmation dialogs |
| `player`    | `player.json`    | Player flows: profile creation, menu/help content, lobby       |
| `presenter` | `presenter.json` | Presenter screen: connections, shared state descriptions       |
| `meta`      | `meta.json`      | App metadata: title, description, OG tags                      |

```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

// Common namespace
t('common:startButton');
t('common:loading');

// Domain-specific namespaces
t('host:gameTitleLabel');
t('player:createProfileMd');
t('presenter:connectionsMd');
t('meta:title');
```

- The namespaces above are defaults — create additional namespaces as needed (e.g., `quiz.json`, `leaderboard.json`) for distinct feature domains
- Use `Md` suffix for Markdown content (e.g., `gameLobbyMd`)
- Render Markdown with `react-markdown` + `prose` class
- Place keys in the namespace matching the mode/domain that uses them

## Timers & Links

```tsx
// Synced timer
const serverTime = useServerTimer();

// Game timer (composes server time via useServerTimer + stores)
const { remainingMs, elapsedMs, totalMs, isRunning } = useGameTimer();

// Generate join links
const playerLink = kmClient.generateLink(kmClient.clientContext.playerCode, { mode: 'player' });

// UI components from @kokimoki/react-components
<KmTimeCountdown ms={remainingMs} display="ms" partClassName="tabular-nums" />
<KmProgressBar currentValue={elapsedMs} maxValue={totalMs} />
<KmQrCode data={playerLink} />
<KmSelect options={languages} value={currentLang} onValueChange={changeLanguage} loading={isTranslating} />
```

## Global Controller

`useGlobalController()` hook maintains a single controller for logic that should run on ONE device only (timers, role assignment, physics). See `src/hooks/useGlobalController.ts`.

## Common Patterns

```tsx
// Wait for game start
const { started } = useSnapshot(gameSessionStore.proxy);
if (!started) return <WaitingView />;

// Player name entry flow
const { name } = useSnapshot(localPlayerStore.proxy);
if (!name) return <CreateProfileView />;

// Host-only UI
const isHost = kmClient.clientContext.mode === 'host';
{
  isHost && <button onClick={gameSessionActions.startGame}>Start</button>;
}

// Player view routing via local store
const { currentView } = useSnapshot(localPlayerStore.proxy);
{
  currentView === 'lobby' && <LobbyView />;
}
{
  currentView === 'game-state' && <GameStateView />;
}
```

## Styling

Tailwind CSS with theme customization in `src/global.css`:

```css
@theme {
  --color-brand-primary: #3b82f6;
}
```

Use `cn()` from `@kokimoki/react-components/utils` utility for conditional classes.

## Skills

Use relevant skills located in `.claude/skills/` directory for common tasks.
