import { useLobbyContext } from '@/components/lobby/provider';
import { config } from '@/config';
import { cn } from '@/utils';
import React from 'react';
import Markdown from 'react-markdown';
import { useSnapshot } from 'valtio';

interface Props {
	className?: string;
}

const LobbyConnectionsView: React.FC<React.PropsWithChildren<Props>> = ({
	className
}) => {
	const { lobbyAwareness } = useLobbyContext();
	const lobbyConnections = useSnapshot(lobbyAwareness.proxy);

	// group connections by client id
	const lobbyClients = Object.values(lobbyConnections).reduce<
		Record<string, { lastPing: number; clientId: string }>
	>((acc, connection) => {
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
						<Markdown>{config.lobbyConnectionsMd}</Markdown>
					</div>
					<div className="stats shadow">
						<div className="stat">
							<div className="stat-title">{config.players}</div>
							<div className="stat-value">
								{Object.entries(lobbyClients).length}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LobbyConnectionsView;
