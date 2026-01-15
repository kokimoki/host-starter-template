import { kmClient } from '@/services/km-client';

export interface GameSettingsState {
	/** Duration of the game in minutes */
	gameDuration: number;
}

/**
 * Store version - increment when schema changes to reset state.
 * This avoids conflicts with old data structure.
 */
const VERSION = 1;
const STORE_KEY = `game-settings/${VERSION}`;

const initialState: GameSettingsState = {
	gameDuration: 10
};

/**
 * Domain: Game Settings
 *
 * Global store for game configuration - parameters that define HOW the game plays.
 * Synced across all clients. Typically modified by host before or during game.
 *
 * Use this store for:
 * - Game duration, round count
 * - Game settings/options changed by host
 * - Team configurations
 * - Dynamic questions/content for the game
 * - Any settings that affect dynamic game rules/setup and need to be shared
 *
 * Note: This is different from static `config` which is read-only and set at app build time. Settings are dynamic and can change during game.
 *
 * @see gameSettingsActions for mutations
 */

export const gameSettingsStore = kmClient.store<GameSettingsState>(
	STORE_KEY,
	initialState
);
