import { kmClient } from '@/services/km-client';
import { globalStore } from '../stores/global-store';

export const globalActions = {
	async startGame() {
		const timestamp = kmClient.serverTimestamp();
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.started = true;
			globalState.startTimestamp = timestamp;
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

	async dealDamage(damage: number) {
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.enemy.health = Math.max(globalState.enemy.health - damage, 0);

			// Set roundEndTimestamp when enemy dies
			if (globalState.enemy.health <= 0 && !globalState.roundEndTimestamp) {
				globalState.roundEndTimestamp = kmClient.serverTimestamp();
			}
		});
	},

	async dealDamageToPlayer(damage: number) {
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.team.health = Math.max(globalState.team.health - damage, 0);
		});
		if (globalStore.proxy.team.health <= 0) {
			console.log('team dead');
		}
	},

	async healPlayer(amount: number) {
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.team.health = Math.min(globalState.team.health + amount, 100);
		});
	},

	async nextRound() {
		const timestamp = kmClient.serverTimestamp();
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.round += 1;
			globalState.startTimestamp = timestamp;
			globalState.roundEndTimestamp = 0;
			globalState.enemy.health = globalState.enemy.maxHealth;
			globalState.enemy.armor = globalState.enemy.maxArmor;
		});
	}
};
