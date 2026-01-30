import { kmClient } from '@/services/km-client';
import { gameConfigActions } from '@/state/actions/game-config-actions';
import { gameConfigStore } from '@/state/stores/game-config-store';
import { gameSessionStore } from '@/state/stores/game-session-store';
import { useSnapshot } from '@kokimoki/app';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Example component demonstrating how to create host-specific controls.
 * Shows usage of game config store and host actions.
 * Modify or replace with your own implementation.
 */
export function HostControls() {
	const { t } = useTranslation();
	const { title } = useSnapshot(kmClient.metaStore.proxy);
	const { started } = useSnapshot(gameSessionStore.proxy);
	const { gameDuration, showPresenterQr } = useSnapshot(gameConfigStore.proxy);

	// Local state for form inputs
	const [localTitle, setLocalTitle] = React.useState(title || '');
	const [localDuration, setLocalDuration] = React.useState(gameDuration);

	// Sync local state when store changes (e.g., from another client)
	React.useEffect(() => {
		setLocalTitle(title || '');
	}, [title]);

	React.useEffect(() => {
		setLocalDuration(gameDuration);
	}, [gameDuration]);

	const hasChanges = localTitle !== title || localDuration !== gameDuration;

	const handleSave = async () => {
		if (localTitle !== title) {
			await gameConfigActions.setTitle(localTitle);
		}
		if (localDuration !== gameDuration) {
			await gameConfigActions.changeGameDuration(localDuration);
		}
	};

	const handleReset = () => {
		setLocalTitle(title || '');
		setLocalDuration(gameDuration);
	};

	return (
		<>
			<div className="flex items-center gap-4">
				<label htmlFor="title" className="text-sm font-medium">
					{t('ui:gameTitleLabel')}:
				</label>
				<input
					id="title"
					type="text"
					value={localTitle}
					placeholder={t('meta:title')}
					onChange={(e) => setLocalTitle(e.target.value)}
					disabled={started}
					className="km-input"
				/>
			</div>

			<div className="flex items-center gap-4">
				<label htmlFor="duration" className="text-sm font-medium">
					{t('ui:gameDurationLabel')}:
				</label>
				<input
					id="duration"
					type="number"
					min={1}
					max={60}
					value={localDuration}
					onChange={(e) => setLocalDuration(Number(e.target.value))}
					disabled={started}
					className="km-input"
				/>
			</div>

			<div className="flex items-center gap-4">
				<button
					type="button"
					className="km-btn-primary"
					onClick={handleSave}
					disabled={started || !hasChanges}
				>
					{t('ui:saveButton')}
				</button>
				<button
					type="button"
					className="km-btn-secondary"
					onClick={handleReset}
					disabled={started || !hasChanges}
				>
					{t('ui:resetButton')}
				</button>
			</div>

			<button
				type="button"
				className={showPresenterQr ? 'km-btn-neutral' : 'km-btn-secondary'}
				onClick={gameConfigActions.togglePresenterQr}
			>
				{t('ui:togglePresenterQrButton')}
			</button>
		</>
	);
}
