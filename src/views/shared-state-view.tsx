import { config } from '@/config';
import { useServerTimer } from '@/hooks/useServerTime';
import { kmClient } from '@/services/km-client';
import { globalActions } from '@/state/actions/global-actions';
import { globalStore } from '@/state/stores/global-store';
import { useSnapshot } from '@kokimoki/app';
import {
	BicepsFlexedIcon,
	BrickWallShieldIcon,
	HeartIcon,
	ShieldIcon,
	SwordIcon
} from 'lucide-react';
import React from 'react';
import Markdown from 'react-markdown';

/**
 * View to display the global shared state of the game,  including controls for the 'host' mode
 *
 * This example is **optional** and can be removed if not needed
 */
export const SharedStateView: React.FC<React.PropsWithChildren> = () => {
	const { started, startTimestamp, team } = useSnapshot(globalStore.proxy);
	const serverTime = useServerTimer();

	const isHost = kmClient.clientContext.mode === 'host';

	return (
		<>
			{isHost ? (
				<article className="prose">
					<Markdown>
						{isHost ? config.sharedStateMd : config.sharedStatePlayerMd}
					</Markdown>
				</article>
			) : (
				<div className="w-full">
					<div className="flex flex-wrap justify-center gap-6">
						<article className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl w-full text-center">
							<SwordIcon className="mb-6 inline size-18" />

							<Markdown>{config.turnMd}</Markdown>

							<ul className="list-none p-0!">
								<li>
									<button
										onClick={() => globalActions.dealDamage()}
										className="km-btn-secondary w-full justify-start!"
									>
										<SwordIcon className="size-5" />
										Attack ({team.damage})
									</button>
								</li>
								<li>
									<button
										onClick={() => globalActions.healPlayer(10)}
										className="km-btn-secondary w-full justify-start!"
									>
										<HeartIcon className="size-5" />
										Heal (10)
									</button>
								</li>
								<li>
									<button
										onClick={() => globalActions.increaseBlock()}
										className="km-btn-secondary w-full justify-start!"
									>
										<ShieldIcon className="size-5" />
										Block (+{team.baseArmor + team.dexterity})
									</button>
								</li>
								<li>
									<button
										onClick={() => globalActions.increaseStrength()}
										className="km-btn-secondary w-full justify-start!"
									>
										<BicepsFlexedIcon className="size-5" />
										Strength (+5)
									</button>
								</li>
								<li>
									<button
										onClick={() => globalActions.increaseFortitude()}
										className="km-btn-secondary w-full justify-start!"
									>
										<BrickWallShieldIcon className="size-5" />
										Fortitude (+5)
									</button>
								</li>
							</ul>
						</article>
					</div>
				</div>
			)}
		</>
	);
};
