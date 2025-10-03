import { kmClient } from '@/services/km-client';
import type { ClientContext } from '@/types';

export interface GlobalAwarenessData {
	mode: ClientContext['mode'];
	name: string;
}

export const globalAwareness = kmClient.awareness<GlobalAwarenessData>(
	'global',
	{
		mode: kmClient.clientContext.mode,
		name: ''
	}
);
