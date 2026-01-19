import { config } from '@/config';
import { gameConfigActions } from '@/state/actions/game-settings-actions';
import { hostSettingsActions } from '@/state/actions/host-actions';
import { gameConfigStore } from '@/state/stores/game-config-store';
import { gameSessionStore } from '@/state/stores/game-session-store';
import { hostSettingsStore } from '@/state/stores/host-settings-store';
import { useSnapshot } from '@kokimoki/app';

/**
 * Example component demonstrating how to create host-specific controls.
 * Shows usage of game settings store and host actions.
 * Modify or replace with your own implementation.
 */
export function HostControls() {
	const { started } = useSnapshot(gameSessionStore.proxy);
	const { gameDuration } = useSnapshot(gameConfigStore.proxy);
	const { showPresenterQr } = useSnapshot(hostSettingsStore.proxy);

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
						gameConfigActions.changeGameDuration(Number(e.target.value))
					}
					disabled={started}
					className="km-input"
				/>
			</div>

			<button
				type="button"
				className={showPresenterQr ? 'km-btn-neutral' : 'km-btn-secondary'}
				onClick={hostSettingsActions.togglePresenterQr}
			>
				{config.togglePresenterQrButton}
			</button>
		</>
	);
}
