import type { KmSelectOption } from '@kokimoki/react-components';

/**
 * List of supported languages for the application.
 * Uses KmSelectOption interface for direct use with KmSelect component.
 */
export const SUPPORTED_LANGUAGES: KmSelectOption[] = [
	{ value: 'en', label: 'English' },
	{ value: 'es', label: 'Español' },
	{ value: 'et', label: 'Eesti keel' },
	{ value: 'de', label: 'Deutsch' },
	{ value: 'fr', label: 'Français' },
	{ value: 'it', label: 'Italiano' },
	{ value: 'ja', label: '日本語' },
	{ value: 'ko', label: '한국어' },
	{ value: 'nl', label: 'Nederlands' },
	{ value: 'pt', label: 'Português' },
	{ value: 'ru', label: 'Русский' },
	{ value: 'zh', label: '中文' }
];
