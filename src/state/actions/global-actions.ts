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
		});
	},

	async togglePresenterQr() {
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.showPresenterQr = !globalState.showPresenterQr;
		});
	},

	async showHelpForAll() {
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.showHelpForAll = true;
		});
	},

	async hideHelpForAll() {
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.showHelpForAll = false;
		});
	}
};
