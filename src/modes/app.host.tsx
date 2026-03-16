import { HostControls } from '@/components/host/host-controls';
import {
	type ModeGuardProps,
	withModeGuard
} from '@/components/with-mode-guard';
import { withKmProviders } from '@kokimoki/react-components';
import { useGlobalController } from '@/hooks/useGlobalController';
import { useMeta } from '@/hooks/useMeta';
import { HostPresenterLayout } from '@/layouts';
import { kmClient } from '@/services/km-client';
import { gameSessionActions } from '@/state/actions/game-session-actions';
import { gameSessionStore } from '@/state/stores/game-session-store';
import { GameStateView } from '@/views/game-state-view';
import { useSnapshot } from '@kokimoki/app';
import { useKmModal } from '@kokimoki/react-components';
import { CirclePlay, CircleStop, SquareArrowOutUpRight } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

function App({ clientContext }: ModeGuardProps<'host'>) {
	const { t } = useTranslation();
	useMeta();
	useGlobalController();

	const { started } = useSnapshot(gameSessionStore.proxy);
	const { openAlertDialog } = useKmModal();
	const [buttonCooldown, setButtonCooldown] = React.useState(true);

	// Button cooldown to prevent accidentally spamming start/stop
	React.useEffect(() => {
		setButtonCooldown(true);
		const timeout = setTimeout(() => {
			setButtonCooldown(false);
		}, 1000);

		return () => clearTimeout(timeout);
	}, [started]);

	const playerLink = kmClient.generateLink(clientContext.playerCode, {
		mode: 'player'
	});

	const presenterLink = kmClient.generateLink(clientContext.presenterCode, {
		mode: 'presenter',
		playerCode: clientContext.playerCode
	});

	const handleStopGame = () => {
		openAlertDialog({
			title: t('ui:stopGameConfirmTitle'),
			description: t('ui:stopGameConfirmDescription'),
			onConfirm: gameSessionActions.stopGame
		});
	};

	return (
		<HostPresenterLayout.Root>
			<HostPresenterLayout.Header />
			<HostPresenterLayout.Main>
				<div className="space-y-4">
					<GameStateView />

					<HostControls />
				</div>
			</HostPresenterLayout.Main>

			<HostPresenterLayout.Footer>
				<div className="inline-flex flex-wrap gap-4">
					{!started && (
						<button
							type="button"
							className="km-btn-primary"
							onClick={gameSessionActions.startGame}
							disabled={buttonCooldown}
						>
							<CirclePlay className="size-5" />
							{t('ui:startButton')}
						</button>
					)}
					{started && (
						<button
							type="button"
							className="km-btn-error"
							onClick={handleStopGame}
							disabled={buttonCooldown}
						>
							<CircleStop className="size-5" />
							{t('ui:stopButton')}
						</button>
					)}

					<a
						href={playerLink}
						target="_blank"
						rel="noreferrer"
						className="km-btn-secondary"
					>
						{t('ui:playerLinkLabel')}
						<SquareArrowOutUpRight className="size-5" />
					</a>

					<a
						href={presenterLink}
						target="_blank"
						rel="noreferrer"
						className="km-btn-secondary"
					>
						{t('ui:presenterLinkLabel')}
						<SquareArrowOutUpRight className="size-5" />
					</a>
				</div>
			</HostPresenterLayout.Footer>
		</HostPresenterLayout.Root>
	);
}

export default withKmProviders(withModeGuard(App, 'host'));
