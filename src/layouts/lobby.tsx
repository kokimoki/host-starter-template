import { useLobbyContext } from '@/components/lobby/provider';
import { config } from '@/config';
import { playerActions } from '@/state/actions/player-actions';
import type { PlayerState } from '@/state/stores/player-store';
import { useKmModal } from '@kokimoki/shared';
import { MenuIcon } from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';

const LobbyLayoutRoot: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { lobbyConnected } = useLobbyContext();

	useEffect(() => {
		document.title = config.title;
	}, []);

	if (!lobbyConnected) {
		return (
			<div className="flex h-dvh flex-col items-center justify-center">
				<span className="loading loading-spinner loading-lg text-primary mb-4" />
				<span className="text-lg font-semibold">{config.connecting}</span>
			</div>
		);
	}

	return (
		<main className="bg-base-200 grid min-h-dvh grid-rows-[auto_1fr_auto]">
			{children}
		</main>
	);
};

const LobbyHeader: React.FC = () => {
	const { openDrawer, closeModal } = useKmModal();

	const handleNavigate = (view: PlayerState['currentView']) => {
		playerActions.setCurrentView(view);
		closeModal();
	};

	const handleExitClick = () => {
		playerActions.leaveLobby();
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
						<div className="divider my-0" />
						<li>
							<button className="text-error" onClick={handleExitClick}>
								{config.menuExitLobby}
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

const LobbyMain: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <main className="flex items-center">{children}</main>;
};

const LobbyFooter: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<footer className="footer bg-base-100 text-base-content sticky bottom-0 z-10 p-4">
			{children}
		</footer>
	);
};

const LobbyLayout = {
	Root: LobbyLayoutRoot,
	Header: LobbyHeader,
	Main: LobbyMain,
	Footer: LobbyFooter
};

export default LobbyLayout;
