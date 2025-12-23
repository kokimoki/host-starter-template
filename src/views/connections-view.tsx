import { config } from '@/config';
import { kmClient } from '@/services/km-client';
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
export const ConnectionsView: React.FC<React.PropsWithChildren<Props>> = () => {
	const players = useSnapshot(globalStore.proxy).players;
	const onlinePlayerIds = useSnapshot(globalStore.connections).clientIds;
	const playersList = Object.entries(players).map(([id, player]) => ({
		id,
		name: player.name,
		isOnline: onlinePlayerIds.has(id)
	}));
	const onlinePlayersCount = playersList.filter((p) => p.isOnline).length;
	const isPresenter = kmClient.clientContext.mode === 'presenter';

	return (
		<div className="w-full space-y-8">
			<article
				className={cn(
					'prose',
					isPresenter && 'lg:prose-lg xl:prose-xl 2xl:prose-2xl'
				)}
			>
				<h1>
					{onlinePlayersCount} {config.players}
				</h1>

				<Markdown>{config.connectionsMd}</Markdown>
			</article>

			{playersList.length > 0 && (
				<ul className="w-full divide-y divide-slate-300 lg:text-lg xl:text-xl 2xl:text-2xl">
					{playersList.map((player) => (
						<li key={player.id} className="py-6">
							<div className="flex items-center justify-between">
								<span className="font-semibold">{player.name}</span>
								<span
									className={cn(
										'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
										player.isOnline
											? 'bg-green-100 text-green-900'
											: 'text-slate-400 italic'
									)}
								>
									{player.isOnline ? config.online : config.offline}
								</span>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
