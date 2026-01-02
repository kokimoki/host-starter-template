import { PlayerMenu } from '@/components/menu';
import { NameLabel } from '@/components/name-label';
import { withKmProviders } from '@/components/with-km-providers';
import { config } from '@/config';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useGlobalController } from '@/hooks/useGlobalController';
import { useServerTimer } from '@/hooks/useServerTime';
import { PlayerLayout } from '@/layouts/player';
import { playerActions } from '@/state/actions/player-actions';
import { globalStore } from '@/state/stores/global-store';
import { playerStore } from '@/state/stores/player-store';
import { ConnectionsView } from '@/views/connections-view';
import { CreateProfileView } from '@/views/create-profile-view';
import { GameLobbyView } from '@/views/game-lobby-view';
import { GameOverView } from '@/views/game-over-view';
import { RewardView } from '@/views/reward-view';
import { RoundView } from '@/views/round-view';
import { SharedStateView } from '@/views/shared-state-view';
import { VictoryView } from '@/views/victory-view';
import { useSnapshot } from '@kokimoki/app';
import * as React from 'react';

const App: React.FC = () => {
	const { title } = config;
	const { name, currentView } = useSnapshot(playerStore.proxy);
	const { started, roundStartTimestamp, enemy, team } = useSnapshot(
		globalStore.proxy
	);
	const serverTime = useServerTimer();

	useGlobalController();
	useDocumentTitle(title);

	React.useEffect(() => {
		if (team.health <= 0) {
			playerActions.setCurrentView('game-over');
			return;
		}

		if (enemy.health <= 0) {
			playerActions.setCurrentView('victory');
			return;
		}

		const view = !started
			? 'lobby'
			: roundStartTimestamp && serverTime - roundStartTimestamp < 5000
				? 'round'
				: 'shared-state';
		playerActions.setCurrentView(view);
	}, [started, roundStartTimestamp, serverTime, enemy.health, team.health]);

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
				{currentView === 'round' && <RoundView />}
				{currentView === 'shared-state' && <SharedStateView />}
				{currentView === 'victory' && <VictoryView />}
				{currentView === 'reward' && <RewardView />}
				{currentView === 'game-over' && <GameOverView />}

				{/* Add new views here */}
			</PlayerLayout.Main>

			<PlayerLayout.Footer>
				<NameLabel name={name} />
			</PlayerLayout.Footer>
		</PlayerLayout.Root>
	);
};

export default withKmProviders(App);
