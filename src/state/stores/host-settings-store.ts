import { kmClient } from '@/services/km-client';

export interface HostSettingsState {
	showPresenterQr: boolean;
}

const initialState: HostSettingsState = {
	showPresenterQr: true
};

/**
 * Domain: Host Settings
 *
 * Global store for host-level settings and preferences.
 * Synced across all clients.
 *
 * Use this store for:
 * - Presenter display settings (QR visibility, etc.)
 * - Host UI preferences that affect other views
 * - Any host-level configuration that needs to be synced globally
 *
 * @see hostSettingsActions for state mutations
 */
export const hostSettingsStore = kmClient.store<HostSettingsState>(
	'host-settings',
	initialState
);
