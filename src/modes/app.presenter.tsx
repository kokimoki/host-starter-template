import { Progress } from '@/components/ui/progress';
import { TimeCountdown } from '@/components/ui/time-countdown';
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
import { KmQrCode } from '@kokimoki/react-components';
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
							<TimeCountdown
								ms={remainingMs}
								display="ms"
								classNames={{
									base: 'font-sans text-6xl font-extrabold lg:text-8xl',
									part: 'tabular-nums',
									separator: 'text-slate-400'
								}}
							/>
							<Progress
								currentValue={elapsedMs}
								maxValue={totalMs}
								classNames={{ root: 'w-full max-w-md' }}
							/>
						</div>
					)}

					<ConnectionsView>
						<KmQrCode
							data={playerLink}
							size={200}
							classNames={{
								base: cn(
									'relative rounded-xl border border-slate-100 bg-white p-4 shadow-lg',
									{ invisible: !showPresenterQr }
								)
							}}
						/>
					</ConnectionsView>
				</div>
			</HostPresenterLayout.Main>
		</HostPresenterLayout.Root>
	);
}

export default withModeGuard(App, 'presenter');
