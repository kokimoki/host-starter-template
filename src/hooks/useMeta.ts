import { getAssetPath, kmClient, kmEnv } from '@/services/km-client';
import { useSnapshot } from '@kokimoki/app';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook to sync document metadata (lang, title, favicon, og:image) with the
 * Kokimoki meta store.
 *
 * Sets document language attribute, title, favicon link, and Open Graph image
 * meta tag based on meta store values. Falls back to defaults from
 * kokimoki.config.ts (kmEnv.defaultAppMeta) and i18n. Updates dynamically when
 * the meta store changes (e.g. when the host uploads new branding assets).
 *
 * @example
 * useMeta();
 */
export function useMeta(): void {
	const { t, i18n } = useTranslation();
	const { lang, title, favicon, ogImage } = useSnapshot(
		kmClient.metaStore.proxy
	);

	React.useEffect(() => {
		const newLang = lang || kmEnv.defaultAppMeta?.lang || 'en';
		document.documentElement.lang = newLang;
		i18n.changeLanguage(newLang);
	}, [i18n, lang]);

	React.useEffect(() => {
		document.title = title || t('meta:title');
	}, [t, title]);

	React.useEffect(() => {
		const src =
			favicon || getAssetPath(kmEnv.defaultAppMeta?.favicon ?? 'favicon.png');
		// Remove any existing icon links — browsers won't re-fetch
		// if we just change href on an existing element.
		document
			.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")
			.forEach((el) => el.remove());
		const link = document.createElement('link');
		link.rel = 'icon';
		link.href = src;
		document.head.appendChild(link);
	}, [favicon]);

	React.useEffect(() => {
		const content =
			ogImage || getAssetPath(kmEnv.defaultAppMeta?.ogImage ?? 'og-image.webp');
		let meta = document.querySelector<HTMLMetaElement>(
			"meta[property='og:image']"
		);
		if (!meta) {
			meta = document.createElement('meta');
			meta.setAttribute('property', 'og:image');
			document.head.appendChild(meta);
		}
		meta.setAttribute('content', content);
	}, [ogImage]);
}
