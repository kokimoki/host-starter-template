import { config } from '@/config';
import { globalStore } from '@/state/stores/global-store';
import { cn } from '@/utils/cn';
import React from 'react';
import Markdown from 'react-markdown';
import { useSnapshot } from 'valtio';

interface Props {
	className?: string;
}

/**
 * View to display players who have joined the game and their online status.
 * This example is **optional** and can be removed if not needed
 */
export const ConnectionsView: React.FC<React.PropsWithChildren<Props>> = ({
	className
}) => {
	const players = useSnapshot(globalStore.proxy).players;
	const onlinePlayerIds = useSnapshot(globalStore.connections).clientIds;
	const playersList = Object.entries(players).map(([id, player]) => ({
		id,
		name: player.name,
		isOnline: onlinePlayerIds.has(id)
	}));
	const onlinePlayersCount = playersList.filter((p) => p.isOnline).length;

	return (
		<div className={cn('card bg-base-100 w-full shadow-sm', className)}>
			<div className="card-body">
				<div className="prose">
					<Markdown>{config.connectionsMd}</Markdown>
				</div>

				<div className="stats mt-4 shadow">
					<div className="stat">
						<div className="stat-title">{config.players}</div>
						<div className="stat-value">{onlinePlayersCount}</div>
					</div>
				</div>

				{playersList.length > 0 && (
					<div className="mt-4">
						<h3 className="mb-2 text-lg font-semibold">Player List</h3>
						<ul className="menu bg-base-200 rounded-box">
							{playersList.map((player) => (
								<li key={player.id}>
									<div className="flex items-center justify-between">
										<span>{player.name}</span>
										<span
											className={cn(
												'badge badge-sm',
												player.isOnline ? 'badge-success' : 'badge-ghost'
											)}
										>
											{player.isOnline ? 'Online' : 'Offline'}
										</span>
									</div>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};
