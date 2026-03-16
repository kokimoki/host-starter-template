import { SUPPORTED_LANGUAGES } from '@/constants/languages';
import { kmClient } from '@/services/km-client';
import { gameConfigActions } from '@/state/actions/game-config-actions';
import { useSnapshot } from '@kokimoki/app';
import { useCallback, useEffect, useState } from 'react';

type TranslationStatus = 'processing' | 'available' | 'failed';

/**
 * Hook that manages language selection and translation requests.
 * Handles requesting translations from the Kokimoki i18n service
 * and polling for translation status until complete.
 *
 * @returns Language state, translation status, and save/reset handlers.
 *
 * @example
 * ```tsx
 * const { localLanguage, setLocalLanguage, translationStatus, save, reset } = useLanguage();
 *
 * <select value={localLanguage} onChange={(e) => setLocalLanguage(e.target.value)}>
 *   {availableLanguages.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
 * </select>
 * {translationStatus === 'processing' && <Spinner />}
 * ```
 */
export function useLanguage() {
	const { lang } = useSnapshot(kmClient.metaStore.proxy);

	const [localLanguage, setLocalLanguage] = useState(lang);
	const [requestedLang, setRequestedLang] = useState(lang);
	const [translationStatus, setTranslationStatus] =
		useState<TranslationStatus>('available');

	// Request translation when language selection changes
	useEffect(() => {
		if (!localLanguage || requestedLang === localLanguage) {
			return;
		}

		setRequestedLang(localLanguage);
		setTranslationStatus('processing');

		kmClient.i18n.requestTranslation(localLanguage).then((status) => {
			setTranslationStatus(status);
		});
	}, [requestedLang, localLanguage]);

	// Poll translation status every 2s while processing
	useEffect(() => {
		if (!requestedLang || translationStatus !== 'processing') {
			return;
		}

		const checkInterval = setInterval(async () => {
			const status = await kmClient.i18n.getTranslationStatus(requestedLang);
			setTranslationStatus(status);

			if (status !== 'processing') {
				clearInterval(checkInterval);
			}
		}, 2000);

		return () => clearInterval(checkInterval);
	}, [requestedLang, translationStatus]);

	// Sync local state when store changes (e.g., from another client)
	useEffect(() => {
		setLocalLanguage(lang);
	}, [lang]);

	const hasChanges = localLanguage !== lang;

	const save = useCallback(async () => {
		if (hasChanges && localLanguage) {
			await gameConfigActions.setLanguage(localLanguage);
		}
	}, [hasChanges, localLanguage]);

	const reset = useCallback(() => {
		setLocalLanguage(kmClient.metaStore.proxy.lang);
	}, []);

	return {
		currentLang: lang,
		localLanguage,
		setLocalLanguage,
		translationStatus,
		hasChanges,
		save,
		reset,
		availableLanguages: SUPPORTED_LANGUAGES
	};
}
