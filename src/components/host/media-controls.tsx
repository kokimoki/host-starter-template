import { ImageUploadControl } from '@/components/ui/image-upload';
import { getAssetPath, kmClient, kmEnv } from '@/services/km-client';
import { gameConfigActions } from '@/state/actions/game-config-actions';
import { gameConfigStore } from '@/state/stores/game-config-store';
import { gameSessionStore } from '@/state/stores/game-session-store';
import { useSnapshot } from '@kokimoki/app';
import { useTranslation } from 'react-i18next';

function resolveAsset(path?: string) {
	if (!path) {
		return undefined;
	}
	return getAssetPath(path);
}

/**
 * Host controls for uploading custom branding assets:
 * app logo, favicon, and Open Graph image.
 *
 * Logo is stored in the game-config store; favicon and OG image are
 * stored in the built-in meta store so the server can inject them as
 * HTML meta tags.
 */
export function MediaControls() {
	const { t } = useTranslation();
	const { logoUrl } = useSnapshot(gameConfigStore.proxy);
	const { favicon, ogImage } = useSnapshot(kmClient.metaStore.proxy);
	const { started: isDisabled } = useSnapshot(gameSessionStore.proxy);

	const logoFallback = getAssetPath('logo.svg');
	const faviconFallback =
		resolveAsset(kmEnv.defaultAppMeta?.favicon) ?? getAssetPath('favicon.png');
	const ogImageFallback =
		resolveAsset(kmEnv.defaultAppMeta?.ogImage) ??
		getAssetPath('og-image.webp');

	return (
		<div className="space-y-4">
			<ImageUploadControl
				id="logo-upload"
				label={t('host:logoUploadLabel')}
				recommendedHint="png, svg, webp"
				value={logoUrl}
				fallbackSrc={logoFallback}
				accept="image/png,image/svg+xml,image/webp,image/jpeg"
				onUpload={(file) => gameConfigActions.uploadLogo(file)}
				onReset={() => gameConfigActions.resetLogo()}
				disabled={isDisabled}
				previewClassName="h-20 w-32"
			/>

			<ImageUploadControl
				id="favicon-upload"
				label={t('host:faviconUploadLabel')}
				recommendedHint="256x256, png, svg, webp"
				value={favicon}
				defaultUrl={kmEnv.defaultAppMeta?.favicon}
				fallbackSrc={faviconFallback}
				accept="image/png,image/x-icon,image/svg+xml,image/webp"
				maxSizeBytes={1024 * 1024}
				onUpload={(file) => gameConfigActions.uploadFavicon(file)}
				onReset={() => gameConfigActions.resetFavicon()}
				disabled={isDisabled}
				previewClassName="h-16 w-16"
			/>

			<ImageUploadControl
				id="og-image-upload"
				label={t('host:ogImageUploadLabel')}
				recommendedHint="1200x630px, png, svg, webp"
				value={ogImage}
				defaultUrl={kmEnv.defaultAppMeta?.ogImage}
				fallbackSrc={ogImageFallback}
				accept="image/png,image/jpeg,image/webp"
				onUpload={(file) => gameConfigActions.uploadOgImage(file)}
				onReset={() => gameConfigActions.resetOgImage()}
				disabled={isDisabled}
				previewClassName="aspect-[1.91/1] w-full"
			/>
		</div>
	);
}
