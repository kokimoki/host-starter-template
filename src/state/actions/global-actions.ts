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

	async calculateDamage() {
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.team.damage =
				globalState.team.baseDamage + globalState.team.strength;
		});
	},

	async calculateArmor() {
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.team.armor =
				globalState.team.baseArmor + globalState.team.dexterity;
		});
	},

	async dealDamage() {
		await kmClient.transact([globalStore], ([globalState]) => {
			const damage = globalState.team.damage;
			const currentArmor = globalState.enemy.armor;

			if (currentArmor >= damage) {
				// Armor absorbs all damage
				globalState.enemy.armor = currentArmor - damage;
			} else {
				// Armor absorbs what it can, health takes the rest
				globalState.enemy.armor = 0;
				const remainingDamage = damage - currentArmor;
				globalState.enemy.health = Math.max(
					globalState.enemy.health - remainingDamage,
					0
				);
			}

			// Set roundEndTimestamp when enemy dies
			if (globalState.enemy.health <= 0 && !globalState.roundEndTimestamp) {
				globalState.roundEndTimestamp = kmClient.serverTimestamp();
			}
		});
	},

	async dealDamageToPlayer(damage: number) {
		await kmClient.transact([globalStore], ([globalState]) => {
			const currentArmor = globalState.team.armor;

			if (currentArmor >= damage) {
				// Armor absorbs all damage
				globalState.team.armor = currentArmor - damage;
			} else {
				// Armor absorbs what it can, health takes the rest
				globalState.team.armor = 0;
				const remainingDamage = damage - currentArmor;
				globalState.team.health = Math.max(
					globalState.team.health - remainingDamage,
					0
				);
			}
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

	async increaseFortitude() {
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.team.dexterity += 5;
		});
	},

	async increaseStrength() {
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.team.strength += 5;
		});
		await this.calculateDamage();
	},

	async increaseBlock() {
		await kmClient.transact([globalStore], ([globalState]) => {
			// Add baseArmor + dexterity bonus to current armor
			const armorGain = globalState.team.baseArmor + globalState.team.dexterity;
			globalState.team.armor += armorGain;
		});
	},

	async nextRound() {
		const timestamp = kmClient.serverTimestamp();
		await kmClient.transact([globalStore], ([globalState]) => {
			globalState.round += 1;
			globalState.startTimestamp = timestamp;
			globalState.roundEndTimestamp = 0;
			globalState.team.armor = 0;
			globalState.team.baseArmor = 15;
			globalState.team.strength = 0;
			globalState.team.dexterity = 0;
			globalState.team.damage = globalState.team.baseDamage;

			globalState.team.health = Math.min(
				globalState.team.health + 5,
				globalState.team.maxHealth
			);

			globalState.enemy.armor = 0;
			globalState.enemy.strength = 0;
			globalState.enemy.dexterity = 0;
			globalState.enemy.damage = 15 + globalState.round;
		
		const newMaxHealth = globalState.enemy.maxHealth + globalState.round * 12;
		globalState.enemy.maxHealth = newMaxHealth;
		globalState.enemy.health = newMaxHealth;
		});
	}
};
