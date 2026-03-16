import { useLanguage } from '@/hooks/useLanguage';
import { kmClient } from '@/services/km-client';
import { gameConfigActions } from '@/state/actions/game-config-actions';
import { gameConfigStore } from '@/state/stores/game-config-store';
import { gameSessionStore } from '@/state/stores/game-session-store';
import { useSnapshot } from '@kokimoki/app';
import { useCallback, useEffect, useState } from 'react';

/**
 * Hook that manages host control panel form state including game title,
 * round duration, language, and presenter QR toggle.
 *
 * Composes `useLanguage` internally for translation management.
 * Syncs local state when the store changes from another client.
 * All fields are disabled while a game session is active.
 *
 * @returns Form state, language state, change detection, save/reset handlers, and presenter QR toggle.
 *
 * @example
 * ```tsx
 * const { localTitle, setLocalTitle, language, hasChanges, save, reset, isDisabled } = useHostControls();
 *
 * <input value={localTitle} onChange={(e) => setLocalTitle(e.target.value)} disabled={isDisabled} />
 * {hasChanges && <button onClick={save}>Save</button>}
 * ```
 */
export function useHostControls() {
	const { title } = useSnapshot(kmClient.metaStore.proxy);
	const { gameDuration, showPresenterQr } = useSnapshot(gameConfigStore.proxy);
	const { started } = useSnapshot(gameSessionStore.proxy);
	const language = useLanguage();

	const [localTitle, setLocalTitle] = useState(title || '');
	const [localDuration, setLocalDuration] = useState(gameDuration);

	// Sync local state when store changes (e.g., from another client)
	useEffect(() => {
		setLocalTitle(title || '');
	}, [title]);

	useEffect(() => {
		setLocalDuration(gameDuration);
	}, [gameDuration]);

	const hasChanges =
		localTitle !== title ||
		localDuration !== gameDuration ||
		language.hasChanges;

	const save = useCallback(async () => {
		await language.save();

		if (localTitle !== kmClient.metaStore.proxy.title) {
			await gameConfigActions.setTitle(localTitle);
		}

		if (localDuration !== gameConfigStore.proxy.gameDuration) {
			await gameConfigActions.changeGameDuration(localDuration);
		}
	}, [localTitle, localDuration, language]);

	const reset = useCallback(() => {
		language.reset();
		setLocalTitle(kmClient.metaStore.proxy.title || '');
		setLocalDuration(gameConfigStore.proxy.gameDuration);
	}, [language]);

	return {
		localTitle,
		setLocalTitle,
		localDuration,
		setLocalDuration,
		language,
		showPresenterQr,
		hasChanges,
		save,
		reset,
		togglePresenterQr: gameConfigActions.togglePresenterQr,
		isDisabled: started
	};
}
