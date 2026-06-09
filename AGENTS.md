# Repository Guidelines

## Kokimoki Docs

Always check the Kokimoki SDK documentation before changing SDK usage. Start with the relevant package `llms.txt` file:

- `node_modules/@kokimoki/app/llms.txt` — runtime SDK: client, stores, transactions, snapshots, dynamic stores, server time, AI, storage, i18n, leaderboard.
- `node_modules/@kokimoki/kit/llms.txt` — Vite plugin, deploy codes, dev view, store schemas, i18n config.
- `node_modules/@kokimoki/react-components/llms.txt` — `Km*` UI components, providers, hooks, and utilities.

Use the detailed `docs/` files referenced by each `llms.txt` when implementing or changing that area.

## Project Structure

This Kokimoki app has three display modes:

- `src/modes/app.host.tsx` — desktop host control panel.
- `src/modes/app.player.tsx` — mobile-first player experience.
- `src/modes/app.presenter.tsx` — large-screen presenter display.

```
src/
  components/     # Reusable UI components
  hooks/          # Custom React hooks
  i18n/           # Translation files; add all user-facing text here
  layouts/        # PlayerLayout, HostPresenterLayout compound components
  modes/          # Entry points: app.host.tsx, app.player.tsx, app.presenter.tsx
  services/       # kmClient instance
  state/
    actions/      # Store mutation functions
    schemas/      # Zod schemas for stores
    stores/       # Kokimoki stores: global, local, and dynamic patterns
  views/          # Page-level components
  types/          # TypeScript interfaces
  utils/          # Utility functions
  constants/      # Static constants and configuration data
```

## Development Commands

Use scripts from `package.json`:

- `npm install` — install dependencies; Node 22+ required.
- `npm run dev` — start Vite dev server with Kokimoki dev view.
- `npm run build` — run lint, typecheck, and production build.
- `npm run lint` — run ESLint.
- `npm run format` — run Prettier.

Before handoff, run `npm run build` when code changes are substantial. For focused edits, at least run the relevant check if feasible.

## Coding Rules

- Use named exports only: `export const Component` or `export function hook`.
- Use the `@/` path alias for source imports.
- Use `kebab-case` filenames except in `src/hooks/` and `src/utils/`, where `camelCase` is allowed.
- Check `@kokimoki/react-components` before creating custom UI components.
- Prefer `lucide-react` icons over custom SVGs.
- Use `cn()` from `@kokimoki/react-components/utils` for conditional classes.
- Tailwind CSS theme customization lives in `src/global.css`.
- Keep unrelated refactors out of feature changes.

## State & Actions

- Use `kmClient.store()` for synced global state.
- Use `kmClient.localStore()` for device-only state such as current player profile, UI preferences, and draft inputs.
- Use the `useDynamicStore` hook with `kmClient.join()` / `kmClient.leave()` for room, team, or group isolation.
- Register store schemas in `kokimoki.config.ts`.
- Put mutation logic in `src/state/actions/`.
- Use `kmClient.transact()` for all store writes.
- Use `useSnapshot(store.proxy)` in React components.
- Use `snapshot(store.proxy)` outside components; do not read `store.proxy.field` directly in actions or handlers.
- Use `kmClient.serverTimestamp()` for timers, scoring, and ordering logic.

## Global Controller

Use `useGlobalController()` for logic that should run on one device only, such as timers, role assignment, physics, or other singleton coordination. See `src/hooks/useGlobalController.ts`.

## Modes & Layouts

Modes are defined in `kokimoki.config.ts` via `deployCodes`. Read the active mode from `kmClient.clientContext.mode`.

- Player mode should use `PlayerLayout`.
- Host and presenter modes should use `HostPresenterLayout`.
- Generate player and presenter links with `kmClient.generateLink()` from the relevant deploy code in `clientContext`.

## Timers & Links

- Use `kmClient.serverTimestamp()` when storing start times or event times that must be consistent across clients.
- Use `useServerTimer()` for synced ticking time, and `useGameTimer()` for game countdown/progress state.
- Use `kmClient.generateLink()` with `clientContext.playerCode` / `clientContext.presenterCode` for mode links, and use `KmQrCode` for join QR codes.

## Translations (i18n)

Do not hardcode user-facing text. Use domain-driven namespaces in `src/i18n/en/`, and keep namespaces small enough that each file has a clear owner and purpose.

| Namespace   | File             | Purpose                                                        |
| ----------- | ---------------- | -------------------------------------------------------------- |
| `common`    | `common.json`    | Shared UI labels: buttons, status indicators, form labels      |
| `host`      | `host.json`      | Host dashboard: game config, link labels, confirmation dialogs |
| `player`    | `player.json`    | Player flows: profile creation, menu/help content, lobby       |
| `presenter` | `presenter.json` | Presenter screen: connections, shared state descriptions       |
| `meta`      | `meta.json`      | App metadata: title, description, OG tags                      |

Create additional domain namespaces when a feature grows beyond these defaults.

Use an `Md` suffix for Markdown translation keys and render them with `react-markdown`.

## Skills

Use relevant skills located in `.agents/skills/`.
