import { kmClient } from '@/services/km-client';
import { gameSettingsStore } from '../stores/game-settings-store';

/**
 * Actions for game settings mutations.
 *
 * Typically used by host to configure game parameters.
 */
export const gameSettingsActions = {
	/** Change game duration in minutes */
	async changeGameDuration(duration: number) {
		await kmClient.transact([gameSettingsStore], ([gameSettingsState]) => {
			gameSettingsState.gameDuration = duration;
		});
	}
};
