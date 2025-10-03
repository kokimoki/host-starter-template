import useGlobalController from '@/hooks/useGlobalController';
import { generateLink } from '@/kit/generate-link';
import { kmClient } from '@/services/km-client';
import GlobalSharedStateView from '@/views/global-shared-state-view';
import * as React from 'react';
import { config } from '../config';
import useDocumentTitle from '../hooks/useDocumentTitle';

const App: React.FC = () => {
	const isGlobalController = useGlobalController();
	const { title } = config;
	useDocumentTitle(title);

	if (kmClient.clientContext.mode !== 'host') {
		throw new Error('App host rendered in non-host mode');
	}

	const playerLink = generateLink(kmClient.clientContext.playerCode, {
		mode: 'player'
	});

	const presenterLink = generateLink(kmClient.clientContext.presenterCode, {
		mode: 'presenter',
		playerCode: kmClient.clientContext.playerCode
	});

	return (
		<div>
			<p>
				HOST MODE -{' '}
				{isGlobalController ? 'Global Controller' : 'Not Global Controller'}
			</p>
			<p>
				Player link:{' '}
				<a href={playerLink} target="_blank">
					{playerLink}
				</a>
			</p>
			<p>
				Presenter link:{' '}
				<a href={presenterLink} target="_blank">
					{presenterLink}
				</a>
			</p>

			<GlobalSharedStateView />
		</div>
	);
};

export default App;
