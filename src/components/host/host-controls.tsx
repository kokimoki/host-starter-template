import { useLanguage } from '@/hooks/useLanguage';
import { kmClient } from '@/services/km-client';
import { gameConfigActions } from '@/state/actions/game-config-actions';
import { gameConfigStore } from '@/state/stores/game-config-store';
import { gameSessionStore } from '@/state/stores/game-session-store';
import { useSnapshot } from '@kokimoki/app';
import { KmSelect } from '@kokimoki/react-components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Example component demonstrating how to create host-specific controls.
 * Shows usage of game config store, host actions, and KmSelect component.
 * Modify or replace with your own implementation.
 */
export function HostControls() {
	const { t } = useTranslation();
	const { title } = useSnapshot(kmClient.metaStore.proxy);
	const { gameDuration, showPresenterQr } = useSnapshot(gameConfigStore.proxy);
	const { started: isDisabled } = useSnapshot(gameSessionStore.proxy);
	const { currentLang, translationStatus, changeLanguage, availableLanguages } =
		useLanguage();

	const [localTitle, setLocalTitle] = useState(title || '');
	const [localDuration, setLocalDuration] = useState(gameDuration);

	// Sync local state when store changes (e.g., from another client)
	useEffect(() => setLocalTitle(title || ''), [title]);
	useEffect(() => setLocalDuration(gameDuration), [gameDuration]);

	return (
		<>
			<div className="flex items-center gap-4">
				<label className="text-sm font-medium" htmlFor="language">
					{t('common:languageLabel')}:
				</label>
				<KmSelect
					id="language"
					options={availableLanguages}
					value={currentLang}
					onValueChange={changeLanguage}
					disabled={isDisabled}
					loading={translationStatus === 'processing'}
					error={
						translationStatus === 'failed'
							? t('host:translationFailed')
							: undefined
					}
					placeholder={t('common:languageLabel')}
					triggerClassName="!h-auto !rounded-xl !px-5 !py-3 km-input"
				/>
			</div>
			<div className="flex items-center gap-4">
				<label htmlFor="title" className="text-sm font-medium">
					{t('host:gameTitleLabel')}:
				</label>
				<input
					id="title"
					type="text"
					value={localTitle}
					placeholder={t('meta:title')}
					onChange={(e) => setLocalTitle(e.target.value)}
					onBlur={() => {
						if (localTitle !== title) {
							gameConfigActions.setTitle(localTitle);
						}
					}}
					disabled={isDisabled}
					className="km-input"
				/>
			</div>

			<div className="flex items-center gap-4">
				<label htmlFor="duration" className="text-sm font-medium">
					{t('host:gameDurationLabel')}:
				</label>
				<input
					id="duration"
					type="number"
					min={1}
					max={60}
					value={localDuration}
					onChange={(e) => setLocalDuration(Number(e.target.value))}
					onBlur={() => {
						if (localDuration !== gameDuration) {
							gameConfigActions.changeGameDuration(localDuration);
						}
					}}
					disabled={isDisabled}
					className="km-input"
				/>
			</div>

			<button
				type="button"
				className={showPresenterQr ? 'km-btn-neutral' : 'km-btn-secondary'}
				onClick={gameConfigActions.togglePresenterQr}
			>
				{t('host:togglePresenterQrButton')}
			</button>
		</>
	);
}
