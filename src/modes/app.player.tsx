import PlayerLayout from '@/layouts/player';
import { playerActions } from '@/state/actions/player-actions';
import { globalStore } from '@/state/stores/global-store';
import ConnectionsView from '@/views/connections-view';
import GameLobbyView from '@/views/game-lobby-view';
import { KmModalProvider, useKmModal } from '@kokimoki/shared';
import { MenuIcon } from 'lucide-react';
import * as React from 'react';
import { useSnapshot } from 'valtio';
import { config } from '../config';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { playerStore, type PlayerState } from '../state/stores/player-store';
import CreateProfileView from '../views/create-profile-view';
import SharedStateView from '../views/shared-state-view';

/**
 * Menu component to navigate between different views in the player layout.
 * Is **optional** and can be removed if not needed.
 */
const PlayerMenu: React.FC = () => {
	const { openDrawer, closeModal } = useKmModal();

	const handleNavigate = (view: PlayerState['currentView']) => {
		playerActions.setCurrentView(view);
		closeModal();
	};

	const handleOpen = () => {
		openDrawer({
			title: config.menuTitle,
			content: (
				<div className="h-full w-full p-4">
					<ul className="menu w-full gap-2">
						<li>
							<button onClick={() => handleNavigate('shared-state')}>
								{config.menuSharedState}
							</button>
						</li>
						<li>
							<button onClick={() => handleNavigate('connections')}>
								{config.menuConnections}
							</button>
						</li>
						{/* Add more menu items here */}
					</ul>
				</div>
			)
		});
	};

	return (
		<button className="btn btn-circle" onClick={handleOpen}>
			<MenuIcon className="h-6 w-6" />
			<span className="sr-only">Open menu drawer</span>
		</button>
	);
};

const App: React.FC = () => {
	const { title } = config;
	const { name, currentView } = useSnapshot(playerStore.proxy);
	const { started } = useSnapshot(globalStore.proxy);

	useDocumentTitle(title);

	React.useEffect(() => {
		// While game start, force view to 'shared-state'
		if (started) {
			playerActions.setCurrentView('shared-state');
		} else {
			playerActions.setCurrentView('lobby');
		}
	}, [started]);

	if (!name) {
		return (
			<PlayerLayout.Root>
				<PlayerLayout.Header />
				<PlayerLayout.Main>
					<CreateProfileView />
				</PlayerLayout.Main>
			</PlayerLayout.Root>
		);
	}

	console.log({ currentView });

	return (
		<KmModalProvider>
			<PlayerLayout.Root>
				<PlayerLayout.Header>
					<PlayerMenu />
				</PlayerLayout.Header>

				<PlayerLayout.Main>
					{currentView === 'shared-state' && <SharedStateView />}
					{currentView === 'lobby' && <GameLobbyView />}
					{currentView === 'connections' && <ConnectionsView />}
					{/* Add new views here */}
				</PlayerLayout.Main>

				<PlayerLayout.Footer>
					<div className="flex items-center justify-center gap-2">
						<span>Name:</span>
						<span className="font-semibold">{name}</span>
					</div>
				</PlayerLayout.Footer>
			</PlayerLayout.Root>
		</KmModalProvider>
	);
};

export default App;
