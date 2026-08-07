import { z } from '@kokimoki/app';

/**
 * Schema for game configuration store
 */
export const gameConfigStoreSchema = z.object({
	/** Duration of the game in minutes */
	gameDuration: z.number(),
	/** Whether to display QR code on presenter screen */
	showPresenterQr: z.boolean(),
	/** Custom logo URL uploaded by host (null falls back to default) */
	logoUrl: z.string().nullable()
});

export type GameConfigState = z.infer<typeof gameConfigStoreSchema>;
