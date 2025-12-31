import { config } from '@/config';
import { useServerTimer } from '@/hooks/useServerTime';
import { kmClient } from '@/services/km-client';
import { globalActions } from '@/state/actions/global-actions';
import { globalStore } from '@/state/stores/global-store';
import { useSnapshot } from '@kokimoki/app';
import { KmTimeCountdown } from '@kokimoki/shared';
import React from 'react';
import Markdown from 'react-markdown';

/**
 * View to display the global shared state of the game,  including controls for the 'host' mode
 *
 * This example is **optional** and can be removed if not needed
 */
export const SharedStateView: React.FC<React.PropsWithChildren> = () => {
	const { started, startTimestamp } = useSnapshot(globalStore.proxy);
	const serverTime = useServerTimer();

	const isHost = kmClient.clientContext.mode === 'host';

	return (
		<>
			<article className="prose">
				{started && (
					<>
						<KmTimeCountdown
							className={`mb-8 inline-block font-sans font-extrabold ${isHost ? 'text-6xl' : ''}`}
							ms={serverTime - startTimestamp}
						/>
						<button
							type="button"
							className="km-btn-error"
							onClick={() => globalActions.dealDamage(10)}
						>
							Deal damage
						</button>
					</>
				)}

				<Markdown>
					{isHost ? config.sharedStateMd : config.sharedStatePlayerMd}
				</Markdown>
			</article>
		</>
	);
};
