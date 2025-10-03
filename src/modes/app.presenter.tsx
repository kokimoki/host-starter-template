import useGlobalController from '@/hooks/useGlobalController';
import OnlinePlayersView from '@/views/online-players-view';
import * as React from 'react';
import { config } from '../config';
import useDocumentTitle from '../hooks/useDocumentTitle';

const App: React.FC = () => {
	const isGlobalController = useGlobalController();
	const { title } = config;
	useDocumentTitle(title);

	return (
		<div>
			<p>
				PRESENTER MODE -{' '}
				{isGlobalController ? 'Global Controller' : 'Not Global Controller'}
			</p>
			<OnlinePlayersView />
		</div>
	);
};

export default App;
