import { kmClient } from '@/services/km-client';

export interface GameState {
	started: boolean;
	startTimestamp: number;
}

/**
 * Store version - increment when schema changes to reset state.
 * This avoids conflicts with old data structure.
 */
const VERSION = 1;
const STORE_KEY = `game/${VERSION}`;

const initialState: GameState = {
	started: false,
	startTimestamp: 0
};

/**
 * Domain: Game Runtime
 *
 * Global store for game runtime state - current status of the game session.
 *
 * Synced across all clients.
 *
 * Use this store for:
 * - Game lifecycle
 * - Current game state (round/phase)
 * - Active timers
 * - Any dynamic data that reflects the game progress and needs to be synced globally
 *
 * @see gameActions for state mutations
 */
export const gameStore = kmClient.store<GameState>(STORE_KEY, initialState);
