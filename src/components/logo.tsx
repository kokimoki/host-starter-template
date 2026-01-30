import { getAssetPath } from '@/services/km-client';
import { gameConfigStore } from '@/state/stores/game-config-store';
import { cn } from '@/utils/cn';
import { useSnapshot } from '@kokimoki/app';
import { useTranslation } from 'react-i18next';

interface LogoProps {
	className?: string;
}

/**
 * Example component demonstrating how to display the app logo.
 * Modify or replace with your own implementation.
 */
export function Logo({ className }: LogoProps) {
	const { t } = useTranslation();
	const { title } = useSnapshot(gameConfigStore.proxy);
	const displayTitle = title || t('meta:title');
	const logoSrc = getAssetPath('logo.svg');

	return (
		<img
			src={logoSrc}
			alt={displayTitle}
			title={displayTitle}
			className={cn('h-9', className)}
		/>
	);
}
