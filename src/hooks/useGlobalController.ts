import { kmClient } from '@/services/km-client';
import { globalAwareness } from '@/state/stores/global-awareness';
import { globalStore } from '@/state/stores/global-store';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useServerTimer } from './useServerTime';

export function useGlobalController() {
	const { controllerConnectionId } = useSnapshot(globalStore.proxy);
	const connections = useSnapshot(globalAwareness.proxy);
	const isGlobalController = controllerConnectionId === kmClient.connectionId;
	const serverTime = useServerTimer(1000); // tick every second

	// Maintain connection that is assigned to be the global controller
	useEffect(() => {
		// Check if global controller is online
		if (connections[controllerConnectionId]) {
			return;
		}

		// Select new host, sorting by connection id
		kmClient
			.transact(
				[globalStore, globalAwareness],
				([globalState, awarenessState]) => {
					const connectionIds = Object.keys(awarenessState);
					connectionIds.sort();
					globalState.controllerConnectionId = connectionIds[0] || '';
				}
			)
			.then(() => {})
			.catch(() => {});
	}, [connections, controllerConnectionId]);

	// Run global controller-specific logic
	useEffect(() => {
		if (!isGlobalController) {
			return;
		}

		// Global controller-specific logic goes here
		// For example, a time-based event that modifies the global state
		// All global controller logic does not need to be time-based
	}, [isGlobalController, serverTime]);

	return isGlobalController;
}
