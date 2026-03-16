import { localPlayerActions } from '@/state/actions/local-player-actions';
import { gameSessionStore } from '@/state/stores/game-session-store';
import { useSnapshot } from '@kokimoki/app';
import { useEffect } from 'react';

/**
 * Hook that automatically routes the player to the correct view based on game state.
 * Switches to `game-state` when the game starts, and `lobby` when it stops.
 *
 * Should be called once in the player mode entry point. It subscribes to
 * `gameSessionStore.started` and updates the local player view accordingly.
 *
 * @example
 * ```tsx
 * function App() {
 *   usePlayerViewRouter();
 *   const { currentView } = useSnapshot(localPlayerStore.proxy);
 *
 *   return currentView === 'lobby' ? <LobbyView /> : <GameStateView />;
 * }
 * ```
 */
export function usePlayerViewRouter() {
	const { started } = useSnapshot(gameSessionStore.proxy);

	useEffect(() => {
		if (started) {
			localPlayerActions.setCurrentView('game-state');
		} else {
			localPlayerActions.setCurrentView('lobby');
		}
	}, [started]);
}
