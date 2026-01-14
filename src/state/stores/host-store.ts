import { kmClient } from '@/services/km-client';

export interface HostState {
	/** Connection ID of the current global controller */
	controllerConnectionId: string;
	showPresenterQr: boolean;
}

/**
 * Store version - increment when schema changes to reset state.
 * This avoids conflicts with old data structure.
 */
const VERSION = 1;
const STORE_KEY = `host/${VERSION}`;

const initialState: HostState = {
	controllerConnectionId: '',
	showPresenterQr: true
};

/**
 * Domain: Host Controller
 *
 * Shared store for host-specific controller state.
 * Synced across all clients.
 *
 * Use this store for:
 * - Host controls that affect the overall game session
 * - Presenter display settings (QR visibility, etc.)
 * - Host UI preferences that affect other views
 * - Any host-level data that needs to be shared
 *
 * @see hostActions for state mutations
 */
export const hostStore = kmClient.store<HostState>(STORE_KEY, initialState);
