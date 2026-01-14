import { config } from '@/config';
import { gameSettingsActions } from '@/state/actions/game-settings-actions';
import { hostActions } from '@/state/actions/host-actions';
import { gameSettingsStore } from '@/state/stores/game-settings-store';
import { gameStore } from '@/state/stores/game-store';
import { hostStore } from '@/state/stores/host-store';
import { useSnapshot } from '@kokimoki/app';

/**
 * Example component demonstrating how to create host-specific controls.
 * Shows usage of game settings store and host actions.
 * Modify or replace with your own implementation.
 */
export function HostControls() {
	const { started } = useSnapshot(gameStore.proxy);
	const { gameDuration } = useSnapshot(gameSettingsStore.proxy);
	const { showPresenterQr } = useSnapshot(hostStore.proxy);

	return (
		<>
			<div className="flex items-center gap-4">
				<label htmlFor="duration" className="text-sm font-medium">
					{config.gameDurationLabel}:
				</label>
				<input
					type="number"
					min={1}
					max={60}
					value={gameDuration}
					onChange={(e) =>
						gameSettingsActions.changeGameDuration(Number(e.target.value))
					}
					disabled={started}
					className="km-input"
				/>
			</div>

			<button
				type="button"
				className={showPresenterQr ? 'km-btn-neutral' : 'km-btn-secondary'}
				onClick={hostActions.togglePresenterQr}
			>
				{config.togglePresenterQrButton}
			</button>
		</>
	);
}
