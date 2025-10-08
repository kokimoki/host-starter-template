import { config } from '@/config';
import { globalAwareness } from '@/state/stores/global-awareness';
import { cn } from '@/utils/cn';
import React from 'react';
import Markdown from 'react-markdown';
import { useSnapshot } from 'valtio';

interface Props {
	className?: string;
}

/**
 * View to display the number of online players. (connections in 'player' mode)
 */
export const ConnectionsView: React.FC<React.PropsWithChildren<Props>> = ({
	className
}) => {
	const globalConnections = useSnapshot(globalAwareness.proxy);

	// Group by clientId to count unique players
	const uniquePlayers = Object.values(globalConnections).reduce<
		Record<string, boolean>
	>((acc, connection) => {
		if (connection.data.mode === 'player' && connection.data.name) {
			acc[connection.clientId] = true;
		}
		return acc;
	}, {});

	const playerCount = Object.keys(uniquePlayers).length;

	return (
		<div className={cn('card bg-base-100 w-full shadow-sm', className)}>
			<div className="card-body">
				<div className="prose">
					<Markdown>{config.connectionsMd}</Markdown>
				</div>

				<div className="stats mt-4 shadow">
					<div className="stat">
						<div className="stat-title">{config.players}</div>
						<div className="stat-value">{playerCount}</div>
					</div>
				</div>
			</div>
		</div>
	);
};
