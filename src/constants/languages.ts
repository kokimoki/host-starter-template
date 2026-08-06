import type { SelectOption } from '@/components/ui/select';

/**
 * List of supported languages for the application.
 * Uses SelectOption interface for direct use with Select component.
 */
export const SUPPORTED_LANGUAGES: SelectOption[] = [
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
