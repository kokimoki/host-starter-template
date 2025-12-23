import { PlayerMenu } from '@/components/player/menu';
import { NameLabel } from '@/components/player/name-label';
import { config } from '@/config';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useGlobalController } from '@/hooks/useGlobalController';
import { PlayerLayout } from '@/layouts/player';
import { globalActions } from '@/state/actions/global-actions';
import { playerActions } from '@/state/actions/player-actions';
import { globalStore } from '@/state/stores/global-store';
import { playerStore } from '@/state/stores/player-store';
import { ConnectionsView } from '@/views/connections-view';
import { CreateProfileView } from '@/views/create-profile-view';
import { GameLobbyView } from '@/views/game-lobby-view';
import { SharedStateView } from '@/views/shared-state-view';
import { useSnapshot } from '@kokimoki/app';
import { KmModalProvider, useKmModal } from '@kokimoki/shared';
import * as React from 'react';
import Markdown from 'react-markdown';

const App: React.FC = () => {
	const { title } = config;
	const { name, currentView } = useSnapshot(playerStore.proxy);
	const { started, showHelpForAll } = useSnapshot(globalStore.proxy);
	const { openDrawer } = useKmModal();

	useGlobalController();
	useDocumentTitle(title);

	React.useEffect(() => {
		// While game start, force view to 'shared-state', otherwise to 'lobby'
		if (started) {
			playerActions.setCurrentView('shared-state');
		} else {
			playerActions.setCurrentView('lobby');
		}
	}, [started]);

	React.useEffect(() => {
		// Open help drawer when host enables it for all players
		if (showHelpForAll) {
			openDrawer({
				content: (
					<div className="max-h-full w-full overflow-y-auto">
						<div className="container mx-auto px-4 py-16">
							<article className="prose">
								<Markdown>{config.menuHelpMd}</Markdown>
							</article>
						</div>
					</div>
				),
				onClose: () => {
					// Reset flag when player closes the drawer
					globalActions.hideHelpForAll();
				}
			});
		}
	}, [showHelpForAll, openDrawer]);

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

	if (!started) {
		return (
			<PlayerLayout.Root>
				<PlayerLayout.Header>
					<PlayerMenu />
				</PlayerLayout.Header>

				<PlayerLayout.Main>
					{currentView === 'lobby' && <GameLobbyView />}
					{currentView === 'connections' && <ConnectionsView />}
				</PlayerLayout.Main>

				<PlayerLayout.Footer>
					<NameLabel name={name} />
				</PlayerLayout.Footer>
			</PlayerLayout.Root>
		);
	}

	return (
		<PlayerLayout.Root>
			<PlayerLayout.Header />

			<PlayerLayout.Main>
				{currentView === 'shared-state' && <SharedStateView />}
				{/* Add new views here */}
			</PlayerLayout.Main>

			<PlayerLayout.Footer>
				<NameLabel name={name} />
			</PlayerLayout.Footer>
		</PlayerLayout.Root>
	);
};

const AppWithProvider: React.FC = () => (
	<KmModalProvider>
		<App />
	</KmModalProvider>
);

export default AppWithProvider;
