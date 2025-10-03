import useGlobalController from '@/hooks/useGlobalController';
import { generateLink } from '@/kit/generate-link';
import { kmClient } from '@/services/km-client';
import OnlinePlayersView from '@/views/online-players-view';
import * as React from 'react';
import { config } from '../config';
import useDocumentTitle from '../hooks/useDocumentTitle';

const App: React.FC = () => {
	const isGlobalController = useGlobalController();
	const { title } = config;
	useDocumentTitle(title);

	if (kmClient.clientContext.mode !== 'presenter') {
		throw new Error('App presenter rendered in non-presenter mode');
	}

	const playerLink = generateLink(kmClient.clientContext.playerCode, {
		mode: 'player'
	});

	return (
		<div>
			<p>
				PRESENTER MODE -{' '}
				{isGlobalController ? 'Global Controller' : 'Not Global Controller'}
			</p>
			<p>
				Player link:{' '}
				<a href={playerLink} target="_blank">
					{playerLink}
				</a>
			</p>

			<OnlinePlayersView />
		</div>
	);
};

export default App;
