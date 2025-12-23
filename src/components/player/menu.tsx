import { config } from '@/config';
import { playerActions } from '@/state/actions/player-actions';
import type { PlayerState } from '@/state/stores/player-store';
import { useKmModal } from '@kokimoki/shared';
import { HelpCircle, MenuIcon } from 'lucide-react';
import * as React from 'react';
import Markdown from 'react-markdown';

/**
 * Menu component to navigate between different views in the player layout
 * This example is **optional** and can be removed if not needed
 */
export const PlayerMenu: React.FC = () => {
	const { openDrawer, closeModal } = useKmModal();

	const handleNavigate = (view: PlayerState['currentView']) => {
		playerActions.setCurrentView(view);
		closeModal();
	};

	const handleOpenMenu = () => {
		openDrawer({
			title: config.menuTitle,
			content: (
				<div className="max-h-full w-full overflow-y-auto">
					<div className="container mx-auto px-4 py-16">
						<ul className="flex w-full flex-col gap-4">
							<li>
								<button
									type="button"
									onClick={() => handleNavigate('lobby')}
									className="km-btn-secondary w-full"
								>
									{config.menuGameLobby}
								</button>
							</li>
							<li>
								<button
									type="button"
									onClick={() => handleNavigate('connections')}
									className="km-btn-secondary w-full"
								>
									{config.menuConnections}
								</button>
							</li>
							{/* Add more menu items here */}
						</ul>
					</div>
				</div>
			)
		});
	};

	const handleOpenHelp = () => {
		openDrawer({
			title: config.menuHelpTitle,
			content: (
				<div className="max-h-full w-full overflow-y-auto">
					<div className="container mx-auto px-4 py-16">
						<article className="prose">
							<Markdown>{config.menuHelpMd}</Markdown>
						</article>
					</div>
				</div>
			)
		});
	};

	return (
		<div className="flex items-center gap-2">
			<button
				type="button"
				onClick={handleOpenHelp}
				className="flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-slate-900 hover:text-slate-50"
			>
				<HelpCircle className="size-5" />
				<span className="sr-only">{config.menuHelpAriaLabel}</span>
			</button>
			<button
				type="button"
				onClick={handleOpenMenu}
				className="flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-slate-900 hover:text-slate-50"
			>
				<MenuIcon className="size-5" />
				<span className="sr-only">{config.menuAriaLabel}</span>
			</button>
		</div>
	);
};
