import { kmClient } from '@/services/km-client';

export interface PlayersState {
	players: Record<string, { name: string }>;
}

/**
 * Store version - increment when schema changes to reset state.
 * This avoids conflicts with old data structure.
 */
const VERSION = 1;
const STORE_KEY = `players/${VERSION}`;

const initialState: PlayersState = {
	players: {}
};

/**
 * Domain: Players Registry
 *
 * Shared store for all players data - the central registry of who's playing.
 * Synced across all clients.
 *
 * Use this store for:
 * - Player profiles (name, avatar, team)
 * - Player scores/stats
 * - Any players data that needs to be shared
 *
 *
 * @see playersActions for state mutations
 * @see localPlayerActions.setPlayerName for player registration
 */
export const playersStore = kmClient.store<PlayersState>(
	STORE_KEY,
	initialState
);
