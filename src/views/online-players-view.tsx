import { config } from '@/config';
import {
	globalAwareness,
	type GlobalAwarenessData
} from '@/state/stores/global-awareness';
import { cn } from '@/utils';
import React from 'react';
import Markdown from 'react-markdown';
import { useSnapshot } from 'valtio';

interface Props {
	className?: string;
}

const OnlinePlayersView: React.FC<React.PropsWithChildren<Props>> = ({
	className
}) => {
	const globalConnections = useSnapshot(globalAwareness.proxy);
	const globalClients = Object.values(globalConnections).reduce<
		Record<
			string,
			{ lastPing: number; clientId: string; data: GlobalAwarenessData }
		>
	>((acc, connection) => {
		// skip players without name as they have not joined yet
		if (!connection.data.name) {
			return acc;
		}

		// filter by mode to get only players
		if (connection.data.mode !== 'player') {
			return acc;
		}

		// group connections by client id to avoid duplicates
		if (!acc[connection.clientId]) {
			acc[connection.clientId] = connection;
		}

		return acc;
	}, {});

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
						<Markdown>{config.globalConnectionsMd}</Markdown>
					</div>
					<div className="stats shadow">
						<div className="stat">
							<div className="stat-title">{config.players}</div>
							<div className="stat-value">
								{Object.entries(globalClients).length}
							</div>
						</div>
					</div>
				</div>
				{/* show client names */}
				<div className="card-body pt-0">
					<ul className="menu w-full gap-2">
						{Object.entries(globalClients).map(([clientId, connection]) => (
							<li key={clientId} className="bg-base-200 rounded-md">
								<span className="font-mono">{connection.data.name}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default OnlinePlayersView;
