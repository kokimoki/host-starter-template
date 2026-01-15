import { kmClient } from '@/services/km-client';
import { gameSettingsStore } from '@/state/stores/game-settings-store';
import { gameStore } from '@/state/stores/game-store';
import { hostStore } from '@/state/stores/host-store';
import { useSnapshot } from '@kokimoki/app';
import { useEffect } from 'react';
import { useServerTimer } from './useServerTime';
import { useStoreConnections } from './useStoreConnections';

/**
 * Hook that maintains a single global controller connection across all clients.
 *
 * Use this hook for logic that should only run on ONE device at a time to avoid
 * duplicate operations and race conditions. Examples:
 * - Time-based events (round timers, game end detection)
 * - Assigning player roles
 * - Running physics simulations
 * - Any operation that modifies global state based on conditions
 *
 * How it works:
 * - One client is elected as the "global controller" and stored in `hostStore.controllerConnectionId`
 * - If the current controller goes offline, another client is automatically elected
 * - All clients run this hook, but only the controller executes the guarded logic
 *
 * @returns A boolean indicating if the current client is the global controller
 *
 * @example
 * // In App.tsx - hook must be called in all modes
 * function App() {
 *   useGlobalController();
 *   // ...rest of app code
 * }
 *
 * @example
 * // Adding new controller logic inside this hook
 * useEffect(() => {
 *   if (!isGlobalController) return;
 *
 *   // Your logic here - only runs on one device
 *   handleNextRound();
 * }, [isGlobalController, serverTime]);
 *
 * @see hostStore for `controllerConnectionId` storage entry
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
		const handleGameEnd = async () => {
			await kmClient.transact(
				[gameSettingsStore, gameStore],
				([gameSettingsState, gameState]) => {
					if (!gameState.started) {
						return;
					}

					const gameDurationMs = gameSettingsState.gameDuration * 60 * 1000;

					// End the game if duration has elapsed
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
