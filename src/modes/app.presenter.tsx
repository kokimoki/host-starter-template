import {
	withModeGuard,
	type ModeGuardProps
} from '@/components/with-mode-guard';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useGlobalController } from '@/hooks/useGlobalController';
import { HostPresenterLayout } from '@/layouts/host-presenter';
import { kmClient } from '@/services/km-client';
import { gameConfigStore } from '@/state/stores/game-config-store';
import { cn } from '@/utils/cn';
import { ConnectionsView } from '@/views/connections-view';
import { useSnapshot } from '@kokimoki/app';
import { KmQrCode } from '@kokimoki/shared';
import { useTranslation } from 'react-i18next';

function App({ clientContext }: ModeGuardProps<'presenter'>) {
	const { t } = useTranslation();
	const { title } = useSnapshot(gameConfigStore.proxy);
	useGlobalController();
	useDocumentTitle(title || t('defaultTitle'));

	const { showPresenterQr } = useSnapshot(gameConfigStore.proxy);

	const playerLink = kmClient.generateLink(clientContext.playerCode, {
		mode: 'player'
	});

	return (
		<>
			<HostPresenterLayout.Root>
				<HostPresenterLayout.Header />

				<HostPresenterLayout.Main>
					<ConnectionsView>
						<KmQrCode
							data={playerLink}
							size={200}
							className={cn({ invisible: !showPresenterQr })}
						/>
					</ConnectionsView>
				</HostPresenterLayout.Main>
			</HostPresenterLayout.Root>
		</>
	);
}

export default withModeGuard(App, 'presenter');
