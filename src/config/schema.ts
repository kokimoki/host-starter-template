import { z } from 'zod/v4';
import { themeSchema } from './theme';

export const schema = z.object({
	// theme
	theme: themeSchema.describe(
		'Theme colors, variables and sizes. Variables are based on DaisyUI.'
	),

	// translations
	title: z.string().default('My Game'),

	welcomeMessageMd: z.string().default('# Welcome!\nThis is my awesome game.'),
	lobbyConnectionsMd: z
		.string()
		.default('# Connections\nLobby connections example.'),
	players: z.string().default('Players'),

	sharedStateMd: z
		.string()
		.default('# Shared State\nLobby shared state example.'),
	timeElapsed: z.string().default('Time elapsed'),
	buttonPresses: z.string().default('Button presses'),
	incrementButton: z.string().default('Increment'),
	decrementButton: z.string().default('Decrement'),

	loading: z.string().default('Loading...'),
	or: z.string().default('OR'),
	share: z.string().default('Share:'),
	copy: z.string().default('Copy'),
	copied: z.string().default('Copied!'),

	hostGameTitle: z.string().default('Host new game'),
	hostButton: z.string().default('Host'),
	host: z.string().default("You're the host"),

	joinGameTitle: z.string().default('Join existing game'),
	joinInputPlaceholder: z.string().default('Enter code...'),
	joinButton: z.string().default('Join'),

	connecting: z.string().default('Connecting to lobby...'),

	menuTitle: z.string().default('Menu'),
	menuWelcomeMessage: z.string().default('Welcome Message'),
	menuConnections: z.string().default('Connections'),
	menuSharedState: z.string().default('Shared State'),
	menuExitLobby: z.string().default('Exit Lobby')
});

export type Config = z.infer<typeof schema>;
