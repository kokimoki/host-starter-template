import { z } from '@kokimoki/app';

/**
 * Schema for local player store
 */
export const localPlayerStoreSchema = z.object({
	/** Player's display name (also registered in playersStore) */
	name: z.string(),
	currentView: z.enum(['lobby', 'game-state'])
});

export type LocalPlayerState = z.infer<typeof localPlayerStoreSchema>;
export type PlayerView = LocalPlayerState['currentView'];
