import { kmClient } from '@/services/km-client';
import {
	getInitialLobbyState,
	type LobbyState
} from '@/state/stores/lobby-store';
import type { KokimokiAwareness, KokimokiStore } from '@kokimoki/app';
import * as React from 'react';

export const LobbyContext = React.createContext<
	| {
			lobbyStore: KokimokiStore<LobbyState>;
			lobbyAwareness: KokimokiAwareness<{}>;
			lobbyConnected: boolean;
	  }
	| undefined
>(undefined);

interface LobbyProviderProps extends React.PropsWithChildren {
	lobbyId: string | null;
}

// ensure there is only one instance of each lobby store and awareness
const lobbyStoresByCode = new Map<string, KokimokiStore<LobbyState>>();
const lobbyAwarenessByCode = new Map<string, KokimokiAwareness<{}>>();

function getLobbyStoreByCode(code: string) {
	if (lobbyStoresByCode.has(code)) {
		return lobbyStoresByCode.get(code)!;
	}

	const newStore = kmClient.store(code, getInitialLobbyState(), false);

	lobbyStoresByCode.set(code, newStore);
	return newStore;
}

function getLobbyAwarenessByCode(code: string) {
	if (lobbyAwarenessByCode.has(code)) {
		return lobbyAwarenessByCode.get(code)!;
	}

	const newAwareness = kmClient.awareness(code, {}, false);
	lobbyAwarenessByCode.set(code, newAwareness);
	return newAwareness;
}

export const LobbyProvider: React.FC<LobbyProviderProps> = ({
	lobbyId,
	children
}) => {
	const lobbyStoreRef = React.useRef<KokimokiStore<LobbyState>>(
		kmClient.store('dummy', getInitialLobbyState(), false)
	);

	const lobbyAwarenessRef = React.useRef<KokimokiAwareness<{}>>(
		kmClient.awareness('dummy', {}, false)
	);

	const [lobbyConnected, setLobbyConnected] = React.useState(false);

	// maintain connection to lobby
	React.useEffect(() => {
		setLobbyConnected(false);

		if (!lobbyId) {
			return;
		}

		const store = getLobbyStoreByCode(lobbyId);
		const awareness = getLobbyAwarenessByCode(lobbyId);

		Promise.all([
			kmClient.join(store).catch(() => {}),
			kmClient.join(awareness).catch(() => {})
		]).then(() => {
			setLobbyConnected(true);

			lobbyStoreRef.current = store;
			lobbyAwarenessRef.current = awareness;
		});

		return () => {
			Promise.all([
				kmClient.leave(store).catch(() => {}),
				kmClient.leave(awareness).catch(() => {})
			]);
		};
	}, [lobbyId]);

	return (
		<LobbyContext.Provider
			value={{
				lobbyStore: lobbyStoreRef.current,
				lobbyAwareness: lobbyAwarenessRef.current,
				lobbyConnected
			}}
		>
			{children}
		</LobbyContext.Provider>
	);
};

export const useLobbyContext = () => {
	const ctx = React.useContext(LobbyContext);
	if (!ctx)
		throw new Error('useLobbyContext must be used within a LobbyProvider');
	return ctx;
};
