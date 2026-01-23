import { PlayerMenu } from '@/components/menu';
import { NameLabel } from '@/components/name-label';
import { withKmProviders } from '@/components/with-km-providers';
import { withModeGuard } from '@/components/with-mode-guard';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useGlobalController } from '@/hooks/useGlobalController';
import { PlayerLayout } from '@/layouts/player';
import { localPlayerActions } from '@/state/actions/local-player-actions';
import { gameConfigStore } from '@/state/stores/game-config-store';
import { gameSessionStore } from '@/state/stores/game-session-store';
import { localPlayerStore } from '@/state/stores/local-player-store';
import { CreateProfileView } from '@/views/create-profile-view';
import { GameLobbyView } from '@/views/game-lobby-view';
import { GameStateView } from '@/views/game-state-view';
import { useSnapshot } from '@kokimoki/app';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
	const { t } = useTranslation();
	const { title } = useSnapshot(gameConfigStore.proxy);
	useDocumentTitle(title || t('defaultTitle'));
	useGlobalController();

	const { name, currentView } = useSnapshot(localPlayerStore.proxy);
	const { started } = useSnapshot(gameSessionStore.proxy);

	React.useEffect(() => {
		// While game start, force view to 'shared-state', otherwise to 'lobby'
		if (started) {
			localPlayerActions.setCurrentView('game-state');
		} else {
			localPlayerActions.setCurrentView('lobby');
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

	if (!started) {
		return (
			<PlayerLayout.Root>
				<PlayerLayout.Header>
					<PlayerMenu />
				</PlayerLayout.Header>

				<PlayerLayout.Main>
					<GameLobbyView />
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
				{currentView === 'game-state' && <GameStateView />}
				{/* Add new views here */}
			</PlayerLayout.Main>

			<PlayerLayout.Footer>
				<NameLabel name={name} />
			</PlayerLayout.Footer>
		</PlayerLayout.Root>
	);
};

export default withKmProviders(withModeGuard(App, 'player'));
