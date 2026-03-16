import { PlayerMenu } from '@/components/menu';
import { NameLabel } from '@/components/name-label';
import { withKmProviders } from '@kokimoki/react-components';
import { withModeGuard } from '@/components/with-mode-guard';
import { useGlobalController } from '@/hooks/useGlobalController';
import { useMeta } from '@/hooks/useMeta';
import { usePlayerViewRouter } from '@/hooks/usePlayerViewRouter';
import { PlayerLayout } from '@/layouts';
import { gameSessionStore } from '@/state/stores/game-session-store';
import { localPlayerStore } from '@/state/stores/local-player-store';
import { CreateProfileView } from '@/views/create-profile-view';
import { GameLobbyView } from '@/views/game-lobby-view';
import { GameStateView } from '@/views/game-state-view';
import { useSnapshot } from '@kokimoki/app';
import * as React from 'react';

const App: React.FC = () => {
	useMeta();
	useGlobalController();
	usePlayerViewRouter();

	const { name, currentView } = useSnapshot(localPlayerStore.proxy);
	const { started } = useSnapshot(gameSessionStore.proxy);

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
