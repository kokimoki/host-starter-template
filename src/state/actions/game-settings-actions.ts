import { kmClient } from '@/services/km-client';
import { gameConfigStore } from '../stores/game-config-store';

/**
 * Actions for game settings mutations.
 *
 * Typically used by host to configure game parameters.
 */
export const gameConfigActions = {
	/** Change game duration in minutes */
	async changeGameDuration(duration: number) {
		await kmClient.transact([gameConfigStore], ([gameConfigState]) => {
			gameConfigState.gameDuration = duration;
		});
	}
};
