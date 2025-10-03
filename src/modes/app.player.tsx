import useGlobalController from '@/hooks/useGlobalController';
import { playerActions } from '@/state/actions/player-actions';
import { globalStore } from '@/state/stores/global-store';
import type { PlayerState } from '@/state/stores/player-store';
import WaitingForGameStartView from '@/views/waiting-for-game-start-view';
import { KmModalProvider, useKmModal } from '@kokimoki/shared';
import { MenuIcon } from 'lucide-react';
import * as React from 'react';
import { useSnapshot } from 'valtio';
import { devtools } from 'valtio/utils';
import { config } from '../config';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { kmEnv } from '../services/km-client';
import { playerStore } from '../state/stores/player-store';
import CreateProfileView from '../views/create-profile-view';
import GlobalSharedStateView from '../views/global-shared-state-view';
import OnlinePlayersView from '../views/online-players-view';
import WelcomeMessageView from '../views/welcome-message-view';

const PlayerRoot: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<main className="bg-base-200 grid min-h-dvh grid-rows-[auto_1fr_auto]">
			{children}
		</main>
	);
};

const PlayerHeader: React.FC = () => {
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
							<button onClick={() => handleNavigate('welcome-message')}>
								{config.menuWelcomeMessage}
							</button>
						</li>
						<li>
							<button onClick={() => handleNavigate('connections')}>
								{config.menuConnections}
							</button>
						</li>
						<li>
							<button onClick={() => handleNavigate('shared-state')}>
								{config.menuSharedState}
							</button>
						</li>
					</ul>
				</div>
			)
		});
	};

	return (
		<header className="navbar bg-base-100 sticky top-0 z-10 shadow-sm">
			<div className="container mx-auto flex flex-wrap items-center justify-between px-4">
				<div className="font-bold">{config.title}</div>
				<button className="btn btn-circle" onClick={handleOpen}>
					<MenuIcon className="h-6 w-6" />
					<span className="sr-only">Open menu drawer</span>
				</button>
			</div>
		</header>
	);
};

const PlayerMain: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <main className="flex items-center">{children}</main>;
};

const PlayerFooter: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<footer className="footer bg-base-100 text-base-content sticky bottom-0 z-10 p-4">
			{children}
		</footer>
	);
};

const App: React.FC = () => {
	const isGlobalController = useGlobalController();
	const { title } = config;
	const { name, currentView } = useSnapshot(playerStore.proxy);
	const { started } = useSnapshot(globalStore.proxy);

	useDocumentTitle(title);

	React.useEffect(() => {
		const unsubscribe = devtools(playerStore.proxy, {
			name: 'player-store',
			enabled: kmEnv.dev
		});

		return () => unsubscribe?.();
	}, []);

	if (!name) {
		return <CreateProfileView />;
	}

	if (!started) {
		return <WaitingForGameStartView />;
	}

	return (
		<KmModalProvider>
			<PlayerRoot>
				<PlayerHeader />
				<PlayerMain>
					{currentView === 'welcome-message' && <WelcomeMessageView />}
					{currentView === 'connections' && <OnlinePlayersView />}
					{currentView === 'shared-state' && <GlobalSharedStateView />}
				</PlayerMain>
				<PlayerFooter>
					{isGlobalController ? 'Global Controller' : 'Not Global Controller'}
				</PlayerFooter>
			</PlayerRoot>
		</KmModalProvider>
	);
};

export default App;
