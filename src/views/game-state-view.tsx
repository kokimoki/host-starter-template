import { useGameTimer } from '@/hooks/useGameTimer';
import { kmClient } from '@/services/km-client';
import { KmProgressBar, KmTimeCountdown } from '@kokimoki/react-components';
import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';

/**
 * Example view demonstrating how to display game state with countdown timer.
 * Shows usage of server timer and game configuration for synchronized time display.
 * Modify or replace with your own implementation.
 */
export function GameStateView() {
	const { t } = useTranslation();
	const { remainingMs, elapsedMs, totalMs, isRunning } = useGameTimer();

	const isHost = kmClient.clientContext.mode === 'host';

	return (
		<>
			<article className="prose">
				{isRunning && (
					<div className="mb-8">
						<KmTimeCountdown
							className={`inline-flex font-sans font-extrabold ${isHost ? 'text-6xl' : ''}`}
							ms={remainingMs}
						/>
						<KmProgressBar
							currentValue={elapsedMs}
							maxValue={totalMs}
							containerClassName="mt-2"
						/>
					</div>
				)}

				<Markdown>
					{isHost ? t('ui:sharedStateMd') : t('ui:sharedStatePlayerMd')}
				</Markdown>
			</article>
		</>
	);
}
