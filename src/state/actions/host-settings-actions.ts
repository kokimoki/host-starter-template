import { kmClient } from '@/services/km-client';
import { hostSettingsStore } from '../stores/host-settings-store';

/**
 * Actions for host controller mutations.
 *
 * Controls host-specific settings that affect all clients (e.g., QR code display).
 */
export const hostSettingsActions = {
	/** Toggle QR code visibility for presenter screen */
	async togglePresenterQr() {
		await kmClient.transact([hostSettingsStore], ([hostSettingsState]) => {
			hostSettingsState.showPresenterQr = !hostSettingsState.showPresenterQr;
		});
	}
};
