import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { kmClient } from './services/km-client';

async function main() {
	// Connect to Kokimoki server
	await kmClient.connect();

	// Wait for i18n before importing app modules
	await kmClient.i18n.init('en');

	// Load the appropriate app module based on mode
	let App: React.ComponentType;

	switch (kmClient.clientContext.mode) {
		case 'host':
			App = (await import('./modes/app.host')).default;
			break;
		case 'presenter':
			App = (await import('./modes/app.presenter')).default;
			break;
		case 'player':
			App = (await import('./modes/app.player')).default;
			break;
	}

	// Wait for stores to sync
	await kmClient.waitForReady();

	// Remove connecting overlay
	document.getElementById('connecting')?.remove();

	// Render the app
	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
}

main();
