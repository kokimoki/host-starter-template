import { Input } from '@/components/input';
import { Select } from '@/components/select';
import { Toggle } from '@/components/toggle';
import { useLanguage } from '@/hooks/useLanguage';
import { kmClient } from '@/services/km-client';
import { gameConfigActions } from '@/state/actions/game-config-actions';
import { gameConfigStore } from '@/state/stores/game-config-store';
import { gameSessionStore } from '@/state/stores/game-session-store';
import { useSnapshot } from '@kokimoki/app';
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
		<Input
			id="title"
			label={t('host:gameTitleLabel')}
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
		/>
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
		<Input
			id="duration"
			label={t('host:gameDurationLabel')}
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
		/>
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
			<Select
				id="language"
				label={t('common:languageLabel')}
				placeholder={t('common:languageLabel')}
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
			/>

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

			<Toggle
				checked={showPresenterQr}
				onCheckedChange={() => gameConfigActions.togglePresenterQr()}
				label={t('host:togglePresenterQrButton')}
				disabled={isDisabled}
			/>
		</>
	);
}
