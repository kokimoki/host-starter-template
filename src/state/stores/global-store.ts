import { kmClient } from '@/services/km-client';

export interface TeamStats {
	name: string;
	health: number;
	armor: number;
}

export interface GlobalState {
	controllerConnectionId: string;
	started: boolean;
	startTimestamp: number;
	players: Record<string, { name: string; team: 0 | 1 }>;
	showPresenterQr: boolean;
	teams: [TeamStats, TeamStats]; // [team1, team2]
}

const initialState: GlobalState = {
	controllerConnectionId: '',
	started: false,
	startTimestamp: 0,
	players: {},
	showPresenterQr: true,
	teams: [
		{ name: 'Orcs', health: 100, armor: 10 },
		{ name: 'Demons', health: 100, armor: 0 }
	]
};

export const globalStore = kmClient.store<GlobalState>('global', initialState);
