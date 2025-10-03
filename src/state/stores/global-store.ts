import { kmClient } from '@/services/km-client';

export interface GlobalState {
	controllerConnectionId: string;
	startTimestamp: number;
	started: boolean;
	numberOfButtonPresses: number;
}

const initialState: GlobalState = {
	controllerConnectionId: '',
	startTimestamp: 0,
	started: false,
	numberOfButtonPresses: 0
};

export const globalStore = kmClient.store<GlobalState>('global', initialState);
