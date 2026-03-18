import { SUPPORTED_LANGUAGES } from '@/constants/languages';
import { kmClient } from '@/services/km-client';
import { gameConfigActions } from '@/state/actions/game-config-actions';
import { useSnapshot } from '@kokimoki/app';
import { useEffect, useState } from 'react';

type TranslationStatus = 'processing' | 'available' | 'failed';

/**
 * Hook that manages language selection and translation requests.
 * Handles requesting translations from the Kokimoki i18n service
 * and polling for translation status until complete.
 *
 * @returns Current language, translation status, change handler, and available languages.
 *
 * @example
 * ```tsx
 * const { currentLang, translationStatus, changeLanguage, availableLanguages } = useLanguage();
 *
 * <KmSelect
 *   options={availableLanguages}
 *   value={currentLang}
 *   onValueChange={changeLanguage}
 *   loading={translationStatus === 'processing'}
 * />
 * ```
 */
export function useLanguage() {
	const { lang } = useSnapshot(kmClient.metaStore.proxy);

	const [translationStatus, setTranslationStatus] =
		useState<TranslationStatus>('available');
	const [pendingLang, setPendingLang] = useState<string | null>(null);

	// Poll translation status while processing
	useEffect(() => {
		if (!pendingLang || translationStatus !== 'processing') {
			return;
		}

		const checkInterval = setInterval(async () => {
			const status = await kmClient.i18n.getTranslationStatus(pendingLang);
			setTranslationStatus(status);

			if (status === 'available') {
				await gameConfigActions.setLanguage(pendingLang);
				setPendingLang(null);
				clearInterval(checkInterval);
			} else if (status === 'failed') {
				setPendingLang(null);
				clearInterval(checkInterval);
			}
		}, 2000);

		return () => clearInterval(checkInterval);
	}, [pendingLang, translationStatus]);

	const changeLanguage = async (newLang: string) => {
		if (newLang === kmClient.metaStore.proxy.lang) return;

		setTranslationStatus('processing');
		setPendingLang(newLang);

		const status = await kmClient.i18n.requestTranslation(newLang);
		setTranslationStatus(status);

		if (status === 'available') {
			await gameConfigActions.setLanguage(newLang);
			setPendingLang(null);
		} else if (status === 'failed') {
			setPendingLang(null);
		}
	};

	return {
		currentLang: pendingLang || lang,
		translationStatus,
		changeLanguage,
		availableLanguages: SUPPORTED_LANGUAGES
	};
}
