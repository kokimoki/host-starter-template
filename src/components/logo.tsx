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
	const displayTitle = title || t('defaultTitle');

	return (
		<img
			src="https://static.kokimoki.com/gfc/v2/logo.svg"
			alt={displayTitle}
			title={displayTitle}
			className={cn('h-9', className)}
		/>
	);
}
