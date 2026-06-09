import { useLanguage } from '@/hooks/useLanguage';
import { kmClient } from '@/services/km-client';
import { gameConfigActions } from '@/state/actions/game-config-actions';
import { gameConfigStore } from '@/state/stores/game-config-store';
import { gameSessionStore } from '@/state/stores/game-session-store';
import { useSnapshot } from '@kokimoki/app';
import { KmSelect } from '@kokimoki/react-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function TitleControl({
	currentTitle,
	disabled
}: {
	currentTitle: string;
	disabled: boolean;
}) {
	const { t } = useTranslation();
	const [localTitle, setLocalTitle] = useState(currentTitle);

	return (
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
					if (localTitle !== currentTitle) {
						gameConfigActions.setTitle(localTitle);
					}
				}}
				disabled={disabled}
				className="km-input"
			/>
		</div>
	);
}

function DurationControl({
	gameDuration,
	disabled
}: {
	gameDuration: number;
	disabled: boolean;
}) {
	const { t } = useTranslation();
	const [localDuration, setLocalDuration] = useState(gameDuration);

	return (
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
				disabled={disabled}
				className="km-input"
			/>
		</div>
	);
}

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

	const currentTitle = title || '';

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

			<TitleControl
				key={currentTitle}
				currentTitle={currentTitle}
				disabled={isDisabled}
			/>

			<DurationControl
				key={gameDuration}
				gameDuration={gameDuration}
				disabled={isDisabled}
			/>

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
