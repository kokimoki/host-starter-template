import { useServerTimer } from '@/hooks/useServerTime';
import { gameConfigStore } from '@/state/stores/game-config-store';
import { gameSessionStore } from '@/state/stores/game-session-store';
import { useSnapshot } from '@kokimoki/app';

/**
 * Hook that calculates game timer state from synced stores and server time.
 * Uses the server-synced timer to ensure consistent time across all clients.
 *
 * @returns Timer values (remainingMs, elapsedMs, totalMs) and running state.
 *
 * @example
 * ```tsx
 * const { remainingMs, elapsedMs, totalMs, isRunning } = useGameTimer();
 *
 * <KmProgressBar currentValue={elapsedMs} maxValue={totalMs} />
 * <span>{Math.ceil(remainingMs / 1000)}s left</span>
 * ```
 */
export function useGameTimer() {
	const { started, startTimestamp } = useSnapshot(gameSessionStore.proxy);
	const { gameDuration } = useSnapshot(gameConfigStore.proxy);
	const serverTime = useServerTimer();

	const totalMs = gameDuration * 60 * 1000;
	const elapsedMs = serverTime - startTimestamp;
	const remainingMs = Math.max(0, totalMs - elapsedMs);

	return {
		remainingMs,
		elapsedMs,
		totalMs,
		isRunning: started,
	};
}
