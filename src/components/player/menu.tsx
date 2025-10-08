import { config } from '@/config';
import { playerActions } from '@/state/actions/player-actions';
import type { PlayerState } from '@/state/stores/player-store';
import { useKmModal } from '@kokimoki/shared';
import { MenuIcon } from 'lucide-react';
import * as React from 'react';

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

	const handleOpen = () => {
		openDrawer({
			title: config.menuTitle,
			content: (
				<div className="h-full w-full p-4">
					<ul className="menu w-full gap-2">
						<li>
							<button onClick={() => handleNavigate('lobby')}>
								{config.menuGameLobby}
							</button>
						</li>
						<li>
							<button onClick={() => handleNavigate('connections')}>
								{config.menuConnections}
							</button>
						</li>
						{/* Add more menu items here */}
					</ul>
				</div>
			)
		});
	};

	return (
		<button className="btn btn-circle" onClick={handleOpen}>
			<MenuIcon className="h-6 w-6" />
			<span className="sr-only">Open menu drawer</span>
		</button>
	);
};
