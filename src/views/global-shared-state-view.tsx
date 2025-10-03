import { config } from '@/config';
import useServerTimer from '@/hooks/useServerTime';
import { kmClient } from '@/services/km-client';
import { globalActions } from '@/state/actions/global-actions';
import { globalStore } from '@/state/stores/global-store';
import { cn } from '@/utils';
import { KmTimeCountdown } from '@kokimoki/shared';
import React from 'react';
import Markdown from 'react-markdown';
import { useSnapshot } from 'valtio';

interface Props {
	className?: string;
}

const GlobalSharedStateView: React.FC<React.PropsWithChildren<Props>> = ({
	className
}) => {
	const { started, startTimestamp, numberOfButtonPresses } = useSnapshot(
		globalStore.proxy
	);
	const serverTime = useServerTimer();
	const isHost = kmClient.clientContext.mode === 'host';

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
							{started && (
								<div className="stat">
									<div className="stat-title">{config.timeElapsed}</div>
									<div className="stat-value">
										<KmTimeCountdown ms={serverTime - startTimestamp} />
									</div>
								</div>
							)}

							<div className="stat">
								<div className="stat-title">{config.buttonPresses}</div>
								<div className="stat-value">{numberOfButtonPresses}</div>
							</div>
						</div>

						{!started && isHost && (
							<button
								className="btn btn-primary"
								onClick={globalActions.startGame}
							>
								{config.startButton}
							</button>
						)}

						{started && (
							<>
								<button
									className="btn btn-primary"
									onClick={globalActions.incrementNumberOfButtonPresses}
								>
									{config.incrementButton}
								</button>

								<button
									className="btn"
									onClick={globalActions.decrementNumberOfButtonPresses}
								>
									{config.decrementButton}
								</button>

								{isHost && (
									<button
										className="btn btn-error"
										onClick={globalActions.stopGame}
									>
										{config.stopButton}
									</button>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default GlobalSharedStateView;
