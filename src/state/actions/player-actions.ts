import { kmClient } from '@/services/km-client';
import { globalAwareness } from '../stores/global-awareness';
import { playerStore, type PlayerState } from '../stores/player-store';

export const playerActions = {
	async setCurrentView(view: PlayerState['currentView']) {
		await kmClient.transact([playerStore], ([playerState]) => {
			playerState.currentView = view;
		});
	},

	async setPlayerName(name: string) {
		await kmClient.transact([playerStore], ([playerState]) => {
			playerState.name = name;
		});

		// Publish name to global awareness state
		await globalAwareness.setData({
			mode: kmClient.clientContext.mode,
			name
		});
	}
};
