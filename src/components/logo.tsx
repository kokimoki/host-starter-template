import { getAssetPath, kmClient } from '@/services/km-client';
import { gameConfigStore } from '@/state/stores/game-config-store';
import { useSnapshot } from '@kokimoki/app';
import { cn } from '@kokimoki/react-components/utils';
import { useTranslation } from 'react-i18next';

interface LogoProps {
	className?: string;
}

/**
 * Displays the app logo. Prefers a custom logo uploaded by the host
 * (stored in the game-config store), falling back to the default asset.
 */
export function Logo({ className }: LogoProps) {
	const { t } = useTranslation();
	const { title } = useSnapshot(kmClient.metaStore.proxy);
	const { logoUrl } = useSnapshot(gameConfigStore.proxy);
	const displayTitle = title || t('meta:title');
	const logoSrc = logoUrl || getAssetPath('logo.svg');

	return (
		<img
			src={logoSrc}
			alt={displayTitle}
			title={displayTitle}
			className={cn('h-9', className)}
		/>
	);
}
