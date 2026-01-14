import { kmClient } from '@/services/km-client';
import { gameStore } from '../stores/game-store';

/**
 * Actions for game runtime state mutations.
 *
 * Controls game lifecycle. Uses `kmClient.serverTimestamp()`
 * for synchronized time across all clients.
 */
export const gameActions = {
	/** Start the game and record server timestamp for countdown */
	async startGame() {
		await kmClient.transact([gameStore], ([gameState]) => {
			gameState.started = true;
			gameState.startTimestamp = kmClient.serverTimestamp();
		});
	},

	/** Stop the game and reset timestamp */
	async stopGame() {
		await kmClient.transact([gameStore], ([gameState]) => {
			gameState.started = false;
			gameState.startTimestamp = 0;
		});
	}
};
