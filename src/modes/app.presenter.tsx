import { config } from '@/config';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useGlobalController } from '@/hooks/useGlobalController';
import { generateLink } from '@/kit/generate-link';
import { HostPresenterLayout } from '@/layouts/host-presenter';
import { kmClient } from '@/services/km-client';
import { globalStore } from '@/state/stores/global-store';
import { cn } from '@/utils/cn';
import { BattleView } from '@/views/battle-view';
import { ConnectionsView } from '@/views/connections-view';
import { RoundView } from '@/views/round-view';
import { useSnapshot } from '@kokimoki/app';
import { KmQrCode } from '@kokimoki/shared';
import * as React from 'react';

const App: React.FC = () => {
	const { title } = config;
	const { showPresenterQr, started } = useSnapshot(globalStore.proxy);
	const [showRound, setShowRound] = React.useState(false);

	useGlobalController();
	useDocumentTitle(title);

	React.useEffect(() => {
		if (started) {
			// Show round view first
			setShowRound(true);

			// Then switch to battle view after 5 seconds
			const timer = setTimeout(() => {
				setShowRound(false);
			}, 5000);

			return () => clearTimeout(timer);
		} else {
			setShowRound(false);
		}
	}, [started]);

	if (kmClient.clientContext.mode !== 'presenter') {
		throw new Error('App presenter rendered in non-presenter mode');
	}

	const playerLink = generateLink(kmClient.clientContext.playerCode, {
		mode: 'player'
	});

	return (
		<>
			<HostPresenterLayout.Root>
				<HostPresenterLayout.Main>
					{started ? (
						showRound ? (
							<RoundView />
						) : (
							<BattleView>
								<KmQrCode
									data={playerLink}
									size={200}
									className={cn(
										'fixed top-8 right-8',
										!showPresenterQr && 'invisible'
									)}
								/>
							</BattleView>
						)
					) : (
						<ConnectionsView>
							<KmQrCode
								data={playerLink}
								size={200}
								className={cn(!showPresenterQr && 'invisible')}
							/>
						</ConnectionsView>
					)}
				</HostPresenterLayout.Main>
			</HostPresenterLayout.Root>
		</>
	);
};

export default App;
