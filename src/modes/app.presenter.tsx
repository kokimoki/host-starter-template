import {
	withModeGuard,
	type ModeGuardProps
} from '@/components/with-mode-guard';
import { useGameTimer } from '@/hooks/useGameTimer';
import { useGlobalController } from '@/hooks/useGlobalController';
import { useMeta } from '@/hooks/useMeta';
import { HostPresenterLayout } from '@/layouts';
import { kmClient } from '@/services/km-client';
import { gameConfigStore } from '@/state/stores/game-config-store';
import { ConnectionsView } from '@/views/connections-view';
import { useSnapshot } from '@kokimoki/app';
import {
	KmProgressBar,
	KmQrCode,
	KmTimeCountdown
} from '@kokimoki/react-components';
import { cn } from '@kokimoki/react-components/utils';

function App({ clientContext }: ModeGuardProps<'presenter'>) {
	useMeta();
	useGlobalController();

	const { showPresenterQr } = useSnapshot(gameConfigStore.proxy);
	const { remainingMs, elapsedMs, totalMs, isRunning } = useGameTimer();

	const playerLink = kmClient.generateLink(clientContext.playerCode, {
		mode: 'player'
	});

	return (
		<HostPresenterLayout.Root>
			<HostPresenterLayout.Header />

			<HostPresenterLayout.Main>
				<div className="w-full space-y-8">
					{isRunning && (
						<div className="flex flex-col items-center gap-2">
							<KmTimeCountdown
								ms={remainingMs}
								display="ms"
								className="font-sans text-6xl font-extrabold lg:text-8xl"
								partClassName="tabular-nums"
								separatorClassName="text-slate-400"
							/>
							<KmProgressBar
								currentValue={elapsedMs}
								maxValue={totalMs}
								containerClassName="w-full max-w-md"
							/>
						</div>
					)}

					<ConnectionsView>
						<KmQrCode
							data={playerLink}
							size={200}
							className={cn({ invisible: !showPresenterQr })}
						/>
					</ConnectionsView>
				</div>
			</HostPresenterLayout.Main>
		</HostPresenterLayout.Root>
	);
}

export default withModeGuard(App, 'presenter');
