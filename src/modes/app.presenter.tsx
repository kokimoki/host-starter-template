import { config } from '@/config';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useGlobalController } from '@/hooks/useGlobalController';
import { generateLink } from '@/kit/generate-link';
import { HostPresenterLayout } from '@/layouts/host-presenter';
import { kmClient } from '@/services/km-client';
import { ConnectionsView } from '@/views/connections-view';
import { KmQrCode } from '@kokimoki/shared';
import * as React from 'react';

const App: React.FC = () => {
	const { title } = config;

	useGlobalController();
	useDocumentTitle(title);

	if (kmClient.clientContext.mode !== 'presenter') {
		throw new Error('App presenter rendered in non-presenter mode');
	}

	const playerLink = generateLink(kmClient.clientContext.playerCode, {
		mode: 'player'
	});

	return (
		<HostPresenterLayout.Root>
			<HostPresenterLayout.Header>
				<div className="text-sm opacity-70">Presenter</div>
			</HostPresenterLayout.Header>

			<HostPresenterLayout.Main>
				<div className="card bg-base-100 shadow-sm">
					<div className="card-body">
						<h2 className="card-title">Player Link</h2>
						<KmQrCode data={playerLink} size={200} interactive={false} />

						<a
							href={playerLink}
							target="_blank"
							rel="noreferrer"
							className="link link-primary break-all"
						>
							Player Link
						</a>
					</div>
				</div>

				<ConnectionsView />
			</HostPresenterLayout.Main>
		</HostPresenterLayout.Root>
	);
};

export default App;
