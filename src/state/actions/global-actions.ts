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

	async dealDamage(damage: number) {
		await kmClient.transact([globalStore], ([globalState]) => {
			const player = globalState.players[kmClient.id];
			if (!player) return;

			const oppositeTeam = player.team === 0 ? 1 : 0;
			const team = globalState.teams[oppositeTeam];

			// Armor acts as additional HP - deplete armor first, then health
			let remainingDamage = damage;

			if (team.armor > 0) {
				const armorDamage = Math.min(team.armor, remainingDamage);
				team.armor -= armorDamage;
				remainingDamage -= armorDamage;
			}

			if (remainingDamage > 0) {
				team.health = Math.max(0, team.health - remainingDamage);
			}
		});
	}
};
