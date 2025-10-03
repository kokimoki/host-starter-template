import { config } from '@/config';
import useHostController from '@/hooks/useHostController';
import { KmCopyButton } from '@kokimoki/shared';
import * as React from 'react';

interface Props {
	lobbyId: string;
}

const LobbyInfoCard: React.FC<Props> = ({ lobbyId }) => {
	const isHost = useHostController();

	return (
		<div className="flex w-full items-center justify-between gap-1">
			<div className="inline-flex items-center gap-1">
				<span className="font-semibold">{config.share}</span>
				<div className="badge badge-primary">{lobbyId}</div>

				<KmCopyButton
					copiedText={config.copied}
					copyText={config.copy}
					data={lobbyId}
				/>
			</div>

			{isHost && <div className="badge !badge-neutral">{config.host}</div>}
		</div>
	);
};

export default LobbyInfoCard;
