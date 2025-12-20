import { config } from '@/config';
import { globalStore } from '@/state/stores/global-store';
import { cn } from '@/utils/cn';
import { useSnapshot } from '@kokimoki/app';
import React from 'react';
import Markdown from 'react-markdown';

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
		<div
			className={cn(
				'w-full rounded-lg border border-gray-200 bg-white shadow-md',
				className
			)}
		>
			<div className="p-6">
				<div className="prose">
					<Markdown>{config.connectionsMd}</Markdown>
				</div>

				<div className="mt-4 rounded-lg border border-gray-200 bg-white p-6 shadow">
					<div className="text-sm text-gray-500">{config.players}</div>
					<div className="mt-1 text-3xl font-bold">{onlinePlayersCount}</div>
				</div>

				{playersList.length > 0 && (
					<div className="mt-4">
						<h3 className="mb-2 text-lg font-semibold">Player List</h3>
						<ul className="divide-y divide-gray-200 rounded-lg bg-slate-50">
							{playersList.map((player) => (
								<li key={player.id} className="px-4 py-3">
									<div className="flex items-center justify-between">
										<span>{player.name}</span>
										<span
											className={cn(
												'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
												player.isOnline
													? 'bg-green-100 text-green-800'
													: 'border border-gray-300 text-gray-700'
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
