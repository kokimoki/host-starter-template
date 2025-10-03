import { KmModalProvider } from '@kokimoki/shared';
import * as React from 'react';
import { useSnapshot } from 'valtio';
import { devtools } from 'valtio/utils';
import LobbyInfoCard from '../components/lobby/info-card';
import { LobbyProvider } from '../components/lobby/provider';
import { config } from '../config';
import useDocumentTitle from '../hooks/useDocumentTitle';
import LobbyLayout from '../layouts/lobby';
import { kmEnv } from '../services/km-client';
import { playerStore } from '../state/stores/player-store';
import CreateOrJoinLobbyView from '../views/create-or-join-lobby';
import LobbyConnectionsView from '../views/lobby-connections-view';
import LobbySharedStateView from '../views/lobby-shared-state-view';
import WelcomeMessageView from '../views/welcome-message-view';

const App: React.FC = () => {
	const { title } = config;
	const { lobbyId, currentView } = useSnapshot(playerStore.proxy);

	useDocumentTitle(title);

	React.useEffect(() => {
		const unsubscribe = devtools(playerStore.proxy, {
			name: 'player-store',
			enabled: kmEnv.dev
		});

		return () => unsubscribe?.();
	}, []);

	if (lobbyId === null) {
		return <CreateOrJoinLobbyView />;
	}

	return (
		<KmModalProvider>
			<LobbyProvider lobbyId={lobbyId}>
				<LobbyLayout.Root>
					<LobbyLayout.Header />
					<LobbyLayout.Main>
						{currentView === 'welcome-message' && <WelcomeMessageView />}
						{currentView === 'connections' && <LobbyConnectionsView />}
						{currentView === 'shared-state' && <LobbySharedStateView />}
					</LobbyLayout.Main>
					<LobbyLayout.Footer>
						<LobbyInfoCard lobbyId={lobbyId} />
					</LobbyLayout.Footer>
				</LobbyLayout.Root>
			</LobbyProvider>
		</KmModalProvider>
	);
};

export default App;
