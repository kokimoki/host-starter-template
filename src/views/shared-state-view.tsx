import { config } from '@/config';
import useServerTimer from '@/hooks/useServerTime';
import { kmClient } from '@/services/km-client';
import { globalActions } from '@/state/actions/global-actions';
import { globalStore } from '@/state/stores/global-store';
import { cn } from '@/utils/cn';
import { KmTimeCountdown } from '@kokimoki/shared';
import React from 'react';
import Markdown from 'react-markdown';
import { useSnapshot } from 'valtio';

interface Props {
	className?: string;
}

/**
 * View to display the global shared state of the game,  including controls for the 'host' mode
 */
const SharedStateView: React.FC<React.PropsWithChildren<Props>> = ({
	className
}) => {
	const { started, startTimestamp } = useSnapshot(globalStore.proxy);
	const serverTime = useServerTimer();
	const isHost = kmClient.clientContext.mode === 'host';

	return (
		<div className={cn('card bg-base-100 w-full shadow-sm', className)}>
			<div className="card-body">
				<div className="prose">
					<Markdown>{config.sharedStateMd}</Markdown>
				</div>

				<div className="mt-4 grid gap-4">
					{started && (
						<div className="stats shadow">
							<div className="stat">
								<div className="stat-title">{config.timeElapsed}</div>
								<div className="stat-value">
									<KmTimeCountdown ms={serverTime - startTimestamp} />
								</div>
							</div>
						</div>
					)}

					{!started && isHost && (
						<button
							className="btn btn-primary"
							onClick={globalActions.startGame}
						>
							{config.startButton}
						</button>
					)}

					{started && isHost && (
						<button className="btn btn-error" onClick={globalActions.stopGame}>
							{config.stopButton}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default SharedStateView;
