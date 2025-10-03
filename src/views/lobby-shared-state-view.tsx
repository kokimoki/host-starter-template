import { useLobbyContext } from '@/components/lobby/provider';
import { config } from '@/config';
import useServerTimer from '@/hooks/useServerTime';
import { getLobbyActions } from '@/state/actions/lobby-actions';
import { cn } from '@/utils';
import { KmTimeCountdown } from '@kokimoki/shared';
import React from 'react';
import Markdown from 'react-markdown';
import { useSnapshot } from 'valtio';

interface Props {
	className?: string;
}

const LobbySharedStateView: React.FC<React.PropsWithChildren<Props>> = ({
	className
}) => {
	const { lobbyConnected, lobbyStore } = useLobbyContext();
	const { startTimestamp, numberOfButtonPresses } = useSnapshot(
		lobbyStore.proxy
	);
	const serverTime = useServerTimer();
	const lobbyActions = getLobbyActions(lobbyStore);

	if (!lobbyConnected) {
		return (
			<div className="grid h-dvh w-full place-items-center gap-4 text-center">
				<div className="flex flex-col items-center gap-4">
					<span className="loading loading-spinner loading-lg" />
					<span className="text-lg font-semibold">Connecting to lobby...</span>
				</div>
			</div>
		);
	}

	return (
		<div
			className={cn(
				'container mx-auto flex justify-center p-4 lg:p-6',
				className
			)}
		>
			<div className="card bg-base-100 w-full max-w-screen-sm shadow-sm">
				<div className="card-body">
					<div className="card-body prose">
						<Markdown>{config.sharedStateMd}</Markdown>
					</div>
					<div className="mt-4 grid gap-4">
						<div className="stats shadow">
							<div className="stat">
								<div className="stat-title">{config.timeElapsed}</div>
								<div className="stat-value">
									<KmTimeCountdown ms={serverTime - startTimestamp} />
								</div>
							</div>

							<div className="stat">
								<div className="stat-title">{config.buttonPresses}</div>
								<div className="stat-value">{numberOfButtonPresses}</div>
							</div>
						</div>

						<button
							className="btn btn-primary"
							onClick={lobbyActions.incrementNumberOfButtonPresses}
						>
							{config.incrementButton}
						</button>

						<button
							className="btn"
							onClick={lobbyActions.decrementNumberOfButtonPresses}
						>
							{config.decrementButton}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LobbySharedStateView;
