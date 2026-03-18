import { useGameTimer } from '@/hooks/useGameTimer';
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

	return (
		<>
			<article className="prose">
				{isRunning && (
					<div className="mb-8">
						<KmTimeCountdown
							ms={remainingMs}
							display="ms"
							className="font-sans text-4xl font-extrabold"
							partClassName="tabular-nums"
							separatorClassName="text-slate-400"
						/>
						<KmProgressBar
							currentValue={elapsedMs}
							maxValue={totalMs}
							containerClassName="mt-2"
						/>
					</div>
				)}

				<Markdown>{t('player:sharedStatePlayerMd')}</Markdown>
			</article>
		</>
	);
}
