import { kmClient } from '@/services/km-client';
import { globalStore } from '../stores/global-store';

export const globalActions = {
	async startGame() {
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.started = true;
			globalState.startTimestamp = kmClient.serverTimestamp();
		});
	},

	async stopGame() {
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.started = false;
			globalState.startTimestamp = 0;
			globalState.numberOfButtonPresses = 0;
		});
	},

	async incrementNumberOfButtonPresses() {
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.numberOfButtonPresses += 1;
		});
	},

	async decrementNumberOfButtonPresses() {
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.numberOfButtonPresses -= 1;
		});
	}
};
