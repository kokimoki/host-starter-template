import { Progress } from '@/components/ui/progress';
import { TimeCountdown } from '@/components/ui/time-countdown';
import { useGameTimer } from '@/hooks/useGameTimer';
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
						<TimeCountdown ms={remainingMs} display="ms" size="lg" />
						<div className="mt-2">
							<Progress currentValue={elapsedMs} maxValue={totalMs} />
						</div>
					</div>
				)}

				<Markdown>{t('player:sharedStatePlayerMd')}</Markdown>
			</article>
		</>
	);
}
