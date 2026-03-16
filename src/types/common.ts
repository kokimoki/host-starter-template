import type { SUPPORTED_LANGUAGES } from '@/constants/languages';

export type AppMode = 'host' | 'presenter' | 'player';

/**
 * Type representing the supported language codes.
 */
export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];
