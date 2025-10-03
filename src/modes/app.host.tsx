import * as React from 'react';
import { config } from '../config';
import useDocumentTitle from '../hooks/useDocumentTitle';

const App: React.FC = () => {
	const { title } = config;
	// const { lobbyId, currentView } = useSnapshot(playerStore.proxy);

	useDocumentTitle(title);

	// React.useEffect(() => {
	// 	const unsubscribe = devtools(playerStore.proxy, {
	// 		name: 'player-store',
	// 		enabled: kmEnv.dev
	// 	});

	// 	return () => unsubscribe?.();
	// }, []);

	return <div>this the host mode</div>;
};

export default App;
