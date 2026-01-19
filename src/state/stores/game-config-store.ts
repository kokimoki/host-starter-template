import { kmClient } from '@/services/km-client';

export interface GameConfigState {
	/** Duration of the game in minutes */
	gameDuration: number;
}

const initialState: GameConfigState = {
	gameDuration: 10
};

/**
 * Domain: Game Configuration
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
 * Note: This is different from static `config` from `src/config/schema.ts` which is read-only and set at app build time. Game config store state is dynamic and can change during game.
 *
 * @see gameConfigActions for mutations
 */

export const gameConfigStore = kmClient.store<GameConfigState>(
	'game-config',
	initialState
);
