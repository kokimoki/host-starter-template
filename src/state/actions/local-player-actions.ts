import { kmClient } from '@/services/km-client';
import {
	localPlayerStore,
	type LocalPlayerState
} from '../stores/local-player-store';
import { playersStore } from '../stores/players-store';

/**
 * Actions for local player mutations.
 * Handles current player's state changes.
 * Some actions may affect shared stores (e.g., player registration).
 *
 * Note: Uses `kmClient.id` to identify current player in shared stores.
 */
export const localPlayerActions = {
	/** Change current player's view/navigation state */
	async setCurrentView(view: LocalPlayerState['currentView']) {
		await kmClient.transact([localPlayerStore], ([localPlayerState]) => {
			localPlayerState.currentView = view;
		});
	},

	/**
	 * Set player name - updates both local store and shared players registry.
	 * This is an example of a multi-store transaction.
	 */
	async setPlayerName(name: string) {
		await kmClient.transact(
			[localPlayerStore, playersStore],
			([localPlayerState, playersState]) => {
				localPlayerState.name = name;
				playersState.players[kmClient.id] = { name };
			}
		);
	}
};
