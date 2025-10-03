import { kmClient } from '@/services/km-client';

export interface PlayerState {
	name: string;
	currentView: 'welcome-message' | 'connections' | 'shared-state';
}

const initialState: PlayerState = {
	name: '',
	currentView: 'welcome-message'
};

export const playerStore = kmClient.localStore<PlayerState>(
	'player',
	initialState
);
