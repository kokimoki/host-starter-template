import { z } from '@kokimoki/app';

/**
 * Schema for player entry
 */
export const playerEntrySchema = z.object({
	name: z.string()
});

/**
 * Schema for players registry store
 */
export const playersStoreSchema = z.object({
	players: z.record(z.string(), playerEntrySchema)
});

export type PlayerEntry = z.infer<typeof playerEntrySchema>;
export type PlayersState = z.infer<typeof playersStoreSchema>;
