import { kmClient } from '@/services/km-client';

type HexColor = `#${string}`;

export interface TeamStats {
	name: string;
	color: HexColor;
	health: number;
	armor: number;
}

export interface EnemyStats {
	name: string;
	color: HexColor;
	health: number;
	armor: number;
	maxHealth: number;
	maxArmor: number;
}

export interface GlobalState {
	controllerConnectionId: string;
	started: boolean;
	startTimestamp: number;
	roundEndTimestamp?: number;
	players: Record<string, { name: string }>;
	showPresenterQr: boolean;
	team: TeamStats;
	round: number;
	enemy: EnemyStats;
}

const initialState: GlobalState = {
	controllerConnectionId: '',
	started: false,
	startTimestamp: 0,
	roundEndTimestamp: 0,
	players: {},
	showPresenterQr: true,
	team: {
		name: 'Players',
		color: '#FB2C36',
		health: 100,
		armor: 50
	},
	round: 1,
	enemy: {
		name: 'AI Boss',
		color: '#FB2C36',
		health: 100,
		armor: 80,
		maxHealth: 100,
		maxArmor: 80
	}
};

export const globalStore = kmClient.store<GlobalState>('global', initialState);
