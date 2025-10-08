import { config } from '@/config';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useGlobalController } from '@/hooks/useGlobalController';
import { generateLink } from '@/kit/generate-link';
import { HostPresenterLayout } from '@/layouts/host-presenter';
import { kmClient } from '@/services/km-client';
import { SharedStateView } from '@/views/shared-state-view';
import { KmQrCode } from '@kokimoki/shared';
import * as React from 'react';

const App: React.FC = () => {
	useGlobalController();
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
		<HostPresenterLayout.Root>
			<HostPresenterLayout.Header>
				<div className="text-sm opacity-70">Host</div>
			</HostPresenterLayout.Header>

			<HostPresenterLayout.Main>
				<div className="card bg-base-100 shadow-sm">
					<div className="card-body">
						<h2 className="card-title">Game Links</h2>
						<KmQrCode data={playerLink} size={200} interactive={false} />
						<div className="flex gap-2">
							<a
								href={playerLink}
								target="_blank"
								rel="noreferrer"
								className="link link-primary break-all"
							>
								Player Link
							</a>
							|
							<a
								href={presenterLink}
								target="_blank"
								rel="noreferrer"
								className="link link-primary break-all"
							>
								Presenter Link
							</a>
						</div>
					</div>
				</div>

				<SharedStateView />
			</HostPresenterLayout.Main>
		</HostPresenterLayout.Root>
	);
};

export default App;
