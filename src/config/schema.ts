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
	waitingForGameStartMd: z
		.string()
		.default(
			'# Waiting for game to start...\nThe game will start once the host presses the start button.'
		),
	globalConnectionsMd: z
		.string()
		.default('# Connections\nGlobal connections example.'),
	players: z.string().default('Players'),

	sharedStateMd: z.string().default('# Shared State\nShared state example.'),
	timeElapsed: z.string().default('Time elapsed'),
	buttonPresses: z.string().default('Button presses'),
	startButton: z.string().default('Start Game'),
	stopButton: z.string().default('Stop Game'),
	incrementButton: z.string().default('Increment'),
	decrementButton: z.string().default('Decrement'),

	loading: z.string().default('Loading...'),
	or: z.string().default('OR'),
	share: z.string().default('Share:'),
	copy: z.string().default('Copy'),
	copied: z.string().default('Copied!'),

	menuTitle: z.string().default('Menu'),
	menuWelcomeMessage: z.string().default('Welcome Message'),
	menuConnections: z.string().default('Connections'),
	menuSharedState: z.string().default('Shared State'),

	playerNameTitle: z.string().default('Enter Your Name'),
	playerNamePlaceholder: z.string().default('Your name...'),
	playerNameButton: z.string().default('Continue')
});

export type Config = z.infer<typeof schema>;
