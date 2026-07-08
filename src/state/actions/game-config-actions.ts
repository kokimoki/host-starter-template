import { kmClient } from '@/services/km-client';
import { gameConfigStore } from '../stores/game-config-store';

/**
 * Actions for game config mutations.
 *
 * Typically used by host to configure game parameters and presenter display preferences.
 */
export const gameConfigActions = {
	/** Set game language */
	async setLanguage(lang: string) {
		await kmClient.transact([kmClient.metaStore], ([metaState]) => {
			metaState.lang = lang;
		});
	},

	/** Set game title */
	async setTitle(title: string) {
		await kmClient.transact([kmClient.metaStore], ([metaState]) => {
			metaState.title = title;
			metaState.ogTitle = title;
		});
	},

	/** Change game duration in minutes */
	async changeGameDuration(duration: number) {
		await kmClient.transact([gameConfigStore], ([gameConfigState]) => {
			gameConfigState.gameDuration = duration;
		});
	},

	/** Toggle QR code visibility for presenter screen */
	async togglePresenterQr() {
		await kmClient.transact([gameConfigStore], ([gameConfigState]) => {
			gameConfigState.showPresenterQr = !gameConfigState.showPresenterQr;
		});
	},

	/** Upload a custom logo and store its CDN url */
	async uploadLogo(file: File) {
		const upload = await kmClient.storage.upload(file.name, file, ['logo']);
		await kmClient.transact([gameConfigStore], ([gameConfigState]) => {
			gameConfigState.logoUrl = upload.url;
		});
	},

	/** Reset the logo back to the default asset */
	async resetLogo() {
		await kmClient.transact([gameConfigStore], ([gameConfigState]) => {
			gameConfigState.logoUrl = null;
		});
	},

	/** Upload a custom favicon and store its CDN url in the meta store */
	async uploadFavicon(file: File) {
		const upload = await kmClient.storage.upload(file.name, file, ['favicon']);
		await kmClient.transact([kmClient.metaStore], ([metaState]) => {
			metaState.favicon = upload.url;
		});
	},

	/** Reset the favicon back to the default */
	async resetFavicon() {
		await kmClient.transact([kmClient.metaStore], ([metaState]) => {
			metaState.favicon = undefined;
		});
	},

	/** Upload a custom Open Graph image and store its CDN url in the meta store */
	async uploadOgImage(file: File) {
		const upload = await kmClient.storage.upload(file.name, file, ['og-image']);
		await kmClient.transact([kmClient.metaStore], ([metaState]) => {
			metaState.ogImage = upload.url;
		});
	},

	/** Reset the Open Graph image back to the default */
	async resetOgImage() {
		await kmClient.transact([kmClient.metaStore], ([metaState]) => {
			metaState.ogImage = undefined;
		});
	}
};
