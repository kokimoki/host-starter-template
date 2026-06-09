import { HostControls } from '@/components/host/host-controls';
import { withKmProviders } from '@/components/with-km-providers';
import {
	type ModeGuardProps,
	withModeGuard
} from '@/components/with-mode-guard';
import { useGlobalController } from '@/hooks/useGlobalController';
import { useMeta } from '@/hooks/useMeta';
import { HostPresenterLayout } from '@/layouts';
import { kmClient } from '@/services/km-client';
import { gameSessionActions } from '@/state/actions/game-session-actions';
import { gameSessionStore } from '@/state/stores/game-session-store';
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
	const [buttonCooldown, setButtonCooldown] = React.useState(false);
	const cooldownTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
		null
	);

	React.useEffect(() => {
		return () => {
			if (cooldownTimeoutRef.current) {
				clearTimeout(cooldownTimeoutRef.current);
			}
		};
	}, []);

	// Button cooldown to prevent accidentally spamming start/stop
	const startButtonCooldown = () => {
		if (cooldownTimeoutRef.current) {
			clearTimeout(cooldownTimeoutRef.current);
		}

		setButtonCooldown(true);
		cooldownTimeoutRef.current = setTimeout(() => {
			setButtonCooldown(false);
			cooldownTimeoutRef.current = null;
		}, 1000);
	};

	const handleStartGame = () => {
		startButtonCooldown();
		gameSessionActions.startGame();
	};

	const playerLink = kmClient.generateLink(clientContext.playerCode, {
		mode: 'player'
	});

	const presenterLink = kmClient.generateLink(clientContext.presenterCode, {
		mode: 'presenter',
		playerCode: clientContext.playerCode
	});

	const handleStopGame = () => {
		startButtonCooldown();
		openAlertDialog({
			title: t('host:stopGameConfirmTitle'),
			description: t('host:stopGameConfirmDescription'),
			onConfirm: gameSessionActions.stopGame
		});
	};

	return (
		<HostPresenterLayout.Root>
			<HostPresenterLayout.Header />
			<HostPresenterLayout.Main>
				<div className="space-y-4">
					<HostControls />
				</div>
			</HostPresenterLayout.Main>

			<HostPresenterLayout.Footer>
				<div className="inline-flex flex-wrap gap-4">
					{!started && (
						<button
							type="button"
							className="km-btn-primary"
							onClick={handleStartGame}
							disabled={buttonCooldown}
						>
							<CirclePlay className="size-5" />
							{t('common:startButton')}
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
							{t('common:stopButton')}
						</button>
					)}

					<a
						href={playerLink}
						target="_blank"
						rel="noreferrer"
						className="km-btn-secondary"
					>
						{t('host:playerLinkLabel')}
						<SquareArrowOutUpRight className="size-5" />
					</a>

					<a
						href={presenterLink}
						target="_blank"
						rel="noreferrer"
						className="km-btn-secondary"
					>
						{t('host:presenterLinkLabel')}
						<SquareArrowOutUpRight className="size-5" />
					</a>
				</div>
			</HostPresenterLayout.Footer>
		</HostPresenterLayout.Root>
	);
}

export default withKmProviders(withModeGuard(App, 'host'));
