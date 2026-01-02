import { kmClient } from '@/services/km-client';

export interface PlayerState {
	name: string;
	health: number;
	currentView:
		| 'lobby'
		| 'shared-state'
		| 'connections'
		| 'round'
		| 'victory'
		| 'game-over'
		| 'reward';
}

const initialState: PlayerState = {
	name: '',
	health: 100,
	currentView: 'lobby'
};

export const playerStore = kmClient.localStore<PlayerState>(
	'player',
	initialState
);
