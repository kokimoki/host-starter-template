import { kmClient } from '@/services/km-client';

export interface GlobalState {
	controllerConnectionId: string;
	started: boolean;
	startTimestamp: number;
	players: Record<string, { name: string }>;
	showPresenterQr: boolean;
	showHelpForAll: boolean;
}

const initialState: GlobalState = {
	controllerConnectionId: '',
	started: false,
	startTimestamp: 0,
	players: {},
	showPresenterQr: true,
	showHelpForAll: false
};

export const globalStore = kmClient.store<GlobalState>('global', initialState);
