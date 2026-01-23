import type { KokimokiKitConfig } from '@kokimoki/kit';
import {
	gameConfigStoreSchema,
	gameSessionStoreSchema,
	localPlayerStoreSchema,
	playersStoreSchema
} from './src/state/schemas';

/**
 * Kokimoki Kit Configuration
 *
 * This file defines the core configuration for the Kokimoki application.
 * See @kokimoki/kit docs for all available options.
 */
export const kokimokiConfig: KokimokiKitConfig = {
	// Connection settings (use staging for development, remove for production)
	host: 'y-wss.staging.kokimoki.com',
	endpoint: 'https://api.staging.kokimoki.com',

	// Unique identifier for this game concept (assigned by Kokimoki)
	conceptId: '695ba8d39cb9bef7ebd65991',

	/**
	 * Deploy Codes - Define different entry points/modes for the application
	 *
	 * Each deploy code generates a unique link with its clientContext.
	 * The `mode` in clientContext determines which src/modes/app.{mode}.tsx is loaded.
	 * Use `$name` syntax to auto-generate linked codes (e.g., $player creates a player code).
	 */
	deployCodes: [
		{
			name: 'host',
			description: 'Link for hosts',
			clientContext: {
				mode: 'host',
				playerCode: '$player', // Auto-generates linked player code
				presenterCode: '$presenter' // Auto-generates linked presenter code
			}
		},
		{
			name: 'presenter',
			description: 'Link for presenters',
			clientContext: {
				mode: 'presenter',
				playerCode: '$player'
			}
		},
		{
			name: 'player',
			description: 'Link for players',
			clientContext: {
				mode: 'player'
			}
		}
	],

	/**
	 * Dev View - Layout for development multi-client preview
	 *
	 * Each array represents a row of frames in the dev view.
	 * Useful for testing multiple clients simultaneously during development.
	 */
	devView: [
		[
			{
				label: 'host',
				clientContext: {
					mode: 'host',
					playerCode: 'player',
					presenterCode: 'presenter'
				}
			},
			{
				label: 'presenter',
				clientContext: { mode: 'presenter', playerCode: 'player' }
			}
		],
		[
			{ label: 'player1', clientContext: { mode: 'player' } },
			{ label: 'player2', clientContext: { mode: 'player' } },
			{ label: 'player3', clientContext: { mode: 'player' } }
		]
	],

	/**
	 * Store Schemas - Zod schemas for validating store state
	 *
	 * Each store must have a matching schema for type safety and validation.
	 * Pattern should match the store name used in kmClient.store() or kmClient.localStore().
	 * Set `local: true` for stores that are device-only (not synced).
	 */
	stores: [
		{ pattern: 'game-config', schema: gameConfigStoreSchema },
		{ pattern: 'game-session', schema: gameSessionStoreSchema },
		{ pattern: 'players-registry', schema: playersStoreSchema },
		{ pattern: 'local-player', schema: localPlayerStoreSchema, local: true }
	],

	// Path to i18n translation files (see src/i18n/ for structure)
	i18nPath: './src/i18n',

	// Default project styles imported in admin panel preview
	defaultProjectStylePath: './kokimoki.style.css'
};
