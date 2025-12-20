import { config } from '@/config';
import { useServerTimer } from '@/hooks/useServerTime';
import { kmClient } from '@/services/km-client';
import { globalActions } from '@/state/actions/global-actions';
import { globalStore } from '@/state/stores/global-store';
import { cn } from '@/utils/cn';
import { useSnapshot } from '@kokimoki/app';
import { KmTimeCountdown } from '@kokimoki/shared';
import React from 'react';
import Markdown from 'react-markdown';

interface Props {
	className?: string;
}

/**
 * View to display the global shared state of the game,  including controls for the 'host' mode
 * This example is **optional** and can be removed if not needed
 */
export const SharedStateView: React.FC<React.PropsWithChildren<Props>> = ({
	className
}) => {
	const { started, startTimestamp } = useSnapshot(globalStore.proxy);
	const serverTime = useServerTimer();
	const isHost = kmClient.clientContext.mode === 'host';

	return (
		<div
			className={cn(
				'w-full rounded-lg border border-gray-200 bg-white shadow-md',
				className
			)}
		>
			<div className="p-6">
				<div className="prose">
					<Markdown>{config.sharedStateMd}</Markdown>
				</div>

				<div className="mt-4 grid gap-4">
					{started && (
						<div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
							<div className="text-sm text-gray-500">{config.timeElapsed}</div>
							<div className="mt-1 text-3xl font-bold">
								<KmTimeCountdown ms={serverTime - startTimestamp} />
							</div>
						</div>
					)}

					{!started && isHost && (
						<button
							className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
							onClick={globalActions.startGame}
						>
							{config.startButton}
						</button>
					)}

					{started && isHost && (
						<button
							className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
							onClick={globalActions.stopGame}
						>
							{config.stopButton}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
