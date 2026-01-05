import { kmClient } from '@/services/km-client';

type HexColor = `#${string}`;

export interface TeamStats {
	name: string;
	color: HexColor;
	health: number;
	baseArmor: number;
	armor: number;
	maxHealth: number;
	strength: number;
	dexterity: number;
	baseDamage: number;
	damage: number;
}

export interface EnemyStats {
	name: string;
	color: HexColor;
	health: number;
	armor: number;
	maxHealth: number;
	strength: number;
	dexterity: number;
	damage: number;
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
		maxHealth: 100,
		health: 100,
		baseArmor: 15,
		armor: 0,
		strength: 0,
		dexterity: 0,
		baseDamage: 10,
		damage: 10
	},
	round: 1,
	enemy: {
		name: 'AI Boss',
		color: '#FB2C36',
		health: 100,
		armor: 0,
		maxHealth: 100,
		strength: 0,
		dexterity: 0,
		damage: 15
	}
};

export const globalStore = kmClient.store<GlobalState>('global', initialState);
