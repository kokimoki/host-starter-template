import useGlobalController from '@/hooks/useGlobalController';
import GlobalSharedStateView from '@/views/global-shared-state-view';
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
				HOST MODE -{' '}
				{isGlobalController ? 'Global Controller' : 'Not Global Controller'}
			</p>
			<GlobalSharedStateView />
		</div>
	);
};

export default App;
