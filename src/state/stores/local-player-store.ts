import { kmClient } from '@/services/km-client';

export interface LocalPlayerState {
	/** Player's display name (also registered in playersStore) */
	name: string;
	currentView: 'lobby' | 'game-state';
}

/**
 * Store version - increment when schema changes to reset state.
 * This avoids conflicts with old data structure.
 */
const VERSION = 1;
const STORE_KEY = `local-player/${VERSION}`;

const initialState: LocalPlayerState = {
	name: '',
	currentView: 'lobby'
};

/**
 * Domain: Local Player
 *
 * Local store for current player's device state - NOT synced with other clients.
 *
 * Use this store for:
 * - Player's own profile data
 * - Current player UI view/navigation state
 * - Player preferences
 * - Any local data that shouldn't be shared with others
 *
 * Note: Uses `kmClient.localStore` for local-only storage.
 *
 * @see localPlayerActions for state mutations
 */
export const localPlayerStore = kmClient.localStore<LocalPlayerState>(
	STORE_KEY,
	initialState
);
