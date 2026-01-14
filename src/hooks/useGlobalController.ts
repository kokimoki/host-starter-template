import { kmClient } from '@/services/km-client';
import { gameSettingsStore } from '@/state/stores/game-settings-store';
import { gameStore } from '@/state/stores/game-store';
import { hostStore } from '@/state/stores/host-store';
import { useSnapshot } from '@kokimoki/app';
import { useEffect } from 'react';
import { useServerTimer } from './useServerTime';
import { useStoreConnections } from './useStoreConnections';

/**
 * The global controller is responsible for managing time-based events and other global states changes.
 *
 * It is applied to all modes (host/player/presented), in order to maintain a single source of truth for global states.
 * If current client with `controllerConnectionId` is not online, a new controller is selected from the list of online connections.
 *
 * @returns A boolean indicating if the current client is the global controller
 *
 * @example
 * useGlobalController();
 *
 */
export function useGlobalController(): boolean {
	const { controllerConnectionId } = useSnapshot(hostStore.proxy);
	const { connectionIds } = useStoreConnections(hostStore);

	const isGlobalController = controllerConnectionId === kmClient.connectionId;
	const serverTime = useServerTimer(1000); // tick every second

	// Maintain connection that is assigned to be the global controller
	useEffect(() => {
		// Check if global controller is online
		if (connectionIds.has(controllerConnectionId)) {
			return;
		}

		// Select new host, sorting by connection id
		kmClient
			.transact([hostStore], ([hostState]) => {
				const connectionIdsArray = Array.from(connectionIds);
				connectionIdsArray.sort();
				hostState.controllerConnectionId = connectionIdsArray[0] || '';
			})
			.then(() => {})
			.catch(() => {});
	}, [connectionIds, controllerConnectionId]);

	// Run global controller-specific logic
	useEffect(() => {
		if (!isGlobalController) {
			return;
		}

		// IMPORTANT: Global controller-specific logic goes here
		// For example, a time-based event that modifies the global state
		// All global controller logic does not need to be time-based

		// Check if game time has ended
		const handleGameEnd = async () => {
			await kmClient.transact(
				[gameSettingsStore, gameStore],
				([gameSettingsState, gameState]) => {
					if (!gameState.started) {
						return;
					}

					const gameDurationMs = gameSettingsState.gameDuration * 60 * 1000;

					if (serverTime - gameState.startTimestamp > gameDurationMs) {
						gameState.started = false;
						gameState.startTimestamp = 0;
					}
				}
			);
		};

		handleGameEnd();
	}, [isGlobalController, serverTime]);

	return isGlobalController;
}
