import { kmClient } from '@/services/km-client';

export interface GlobalState {
	controllerConnectionId: string;
	started: boolean;
	startTimestamp: number;
}

const initialState: GlobalState = {
	controllerConnectionId: '',
	started: false,
	startTimestamp: 0
};

export const globalStore = kmClient.store<GlobalState>('global', initialState);
