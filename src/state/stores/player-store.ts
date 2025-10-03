import { kmClient } from '@/services/km-client';

export interface PlayerState {
	lobbyId: string | null;
	currentView: 'welcome-message' | 'connections' | 'shared-state';
}

const initialState: PlayerState = {
	lobbyId: null,
	currentView: 'welcome-message'
};

export const playerStore = kmClient.localStore<PlayerState>(
	'player',
	initialState
);
