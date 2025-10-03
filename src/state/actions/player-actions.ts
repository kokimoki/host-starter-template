import { kmClient } from '@/services/km-client';
import { generateLobbyCode } from '@/utils/lobby-code';
import { playerStore, type PlayerState } from '../stores/player-store';

export const playerActions = {
	async createNewLobby() {
		const formattedCode = generateLobbyCode();

		await kmClient.upsertLeaderboardEntry(formattedCode, 'desc', 0, {}, {});

		return formattedCode;
	},

	async joinLobby(code: string) {
		const formattedCode = code.trim().toUpperCase();

		if (!/^([A-Z]{3}-\d{3})$/.test(formattedCode)) {
			throw new Error('Invalid code format. Use e.g. ABC-123');
		}

		// If the lobby exists there will be at least one leaderboard entry
		const lobbyLeaderboard = await kmClient.listLeaderboardEntries(
			formattedCode,
			'desc'
		);

		if (!lobbyLeaderboard.total) {
			throw new Error('Lobby not found.');
		}

		// Update player's lobby id
		await kmClient.transact([playerStore], ([playerState]) => {
			playerState.lobbyId = formattedCode;
		});
	},

	async leaveLobby() {
		await kmClient.transact([playerStore], ([playerState]) => {
			playerState.lobbyId = null;
		});
	},

	async setCurrentView(view: PlayerState['currentView']) {
		await kmClient.transact([playerStore], ([playerState]) => {
			playerState.currentView = view;
		});
	}
};
