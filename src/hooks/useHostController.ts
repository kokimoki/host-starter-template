import { useLobbyContext } from '@/components/lobby/provider';
import { kmClient } from '@/services/km-client';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import useServerTimer from './useServerTime';

export default function useHostController() {
	const { lobbyConnected, lobbyAwareness, lobbyStore } = useLobbyContext();
	const { hostConnectionId } = useSnapshot(lobbyStore.proxy);
	const connections = useSnapshot(lobbyAwareness.proxy);
	const isHost = hostConnectionId === kmClient.connectionId;
	const serverTime = useServerTimer(1000); // tick every second

	// Maintain connection that is assigned to be the host
	useEffect(() => {
		if (!lobbyConnected) {
			return;
		}

		// Check if host is online
		if (connections[hostConnectionId]) {
			return;
		}

		// Select new host, sorting by connection id
		kmClient
			.transact(
				[lobbyStore, lobbyAwareness],
				([lobbyState, awarenessState]) => {
					const connectionIds = Object.keys(awarenessState);
					connectionIds.sort();
					lobbyState.hostConnectionId = connectionIds[0] || '';
				}
			)
			.then(() => {})
			.catch(() => {});
	}, [
		lobbyConnected,
		lobbyStore,
		lobbyAwareness,
		connections,
		hostConnectionId
	]);

	// Run host logic
	useEffect(() => {
		// Select host
		if (!lobbyConnected || !isHost) {
			return;
		}

		// Host-specific logic goes here
		// For example, a timer may run out in a lobby after the lobby state should be modified
		// All host logic does not need to be time-based
	}, [lobbyConnected, isHost, serverTime]);

	return isHost;
}
