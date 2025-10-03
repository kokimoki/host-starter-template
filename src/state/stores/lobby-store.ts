import { kmClient } from '@/services/km-client';
import type { KokimokiStore } from '@kokimoki/app';

export interface LobbyState {
	hostConnectionId: string;
	startTimestamp: number;
	numberOfButtonPresses: number;
}

export type LobbyStore = KokimokiStore<LobbyState>;

export function getInitialLobbyState(): LobbyState {
	return {
		hostConnectionId: '',
		numberOfButtonPresses: 0,
		startTimestamp: kmClient.serverTimestamp()
	};
}
