import { kmClient } from '@/services/km-client';
import { hostStore } from '../stores/host-store';

/**
 * Actions for host controller mutations.
 *
 * Controls host-specific settings that affect all clients (e.g., QR code display).
 */
export const hostActions = {
	/** Toggle QR code visibility for presenter screen */
	async togglePresenterQr() {
		await kmClient.transact([hostStore], ([hostState]) => {
			hostState.showPresenterQr = !hostState.showPresenterQr;
		});
	}
};
