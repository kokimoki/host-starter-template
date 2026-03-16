import { getAssetPath, kmClient } from '@/services/km-client';
import { useSnapshot } from '@kokimoki/app';
import { cn } from '@kokimoki/react-components/utils';
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
	const { title } = useSnapshot(kmClient.metaStore.proxy);
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
