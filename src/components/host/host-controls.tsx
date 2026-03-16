import { useHostControls } from '@/hooks/useHostControls';
import { useTranslation } from 'react-i18next';

/**
 * Example component demonstrating how to create host-specific controls.
 * Shows usage of game config store and host actions.
 * Modify or replace with your own implementation.
 */
export function HostControls() {
	const { t } = useTranslation();
	const controls = useHostControls();

	return (
		<>
			<div className="flex items-center gap-4">
				<label htmlFor="language" className="text-sm font-medium">
					{t('common:languageLabel')}:
				</label>
				<select
					id="language"
					value={controls.language.localLanguage}
					disabled={controls.isDisabled}
					onChange={(e) => controls.language.setLocalLanguage(e.target.value)}
					className="km-input"
				>
					{controls.language.availableLanguages.map((lang) => (
						<option key={lang.code} value={lang.code}>
							{lang.label}
						</option>
					))}
				</select>
				{controls.language.translationStatus === 'processing' && (
					<span className="text-sm text-yellow-500">Loading...</span>
				)}
				{controls.language.translationStatus === 'failed' && (
					<span className="text-sm text-red-500">Failed</span>
				)}
			</div>
			<div className="flex items-center gap-4">
				<label htmlFor="title" className="text-sm font-medium">
					{t('host:gameTitleLabel')}:
				</label>
				<input
					id="title"
					type="text"
					value={controls.localTitle}
					placeholder={t('meta:title')}
					onChange={(e) => controls.setLocalTitle(e.target.value)}
					disabled={controls.isDisabled}
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
					value={controls.localDuration}
					onChange={(e) => controls.setLocalDuration(Number(e.target.value))}
					disabled={controls.isDisabled}
					className="km-input"
				/>
			</div>

			<div className="flex items-center gap-4">
				<button
					type="button"
					className="km-btn-primary"
					onClick={controls.save}
					disabled={
						controls.isDisabled ||
						!controls.hasChanges ||
						controls.language.translationStatus === 'processing'
					}
				>
					{t('common:saveButton')}
				</button>
				<button
					type="button"
					className="km-btn-secondary"
					onClick={controls.reset}
					disabled={controls.isDisabled || !controls.hasChanges}
				>
					{t('common:resetButton')}
				</button>
			</div>

			<button
				type="button"
				className={
					controls.showPresenterQr ? 'km-btn-neutral' : 'km-btn-secondary'
				}
				onClick={controls.togglePresenterQr}
			>
				{t('host:togglePresenterQrButton')}
			</button>
		</>
	);
}
