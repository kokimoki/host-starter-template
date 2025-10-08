import { config } from '@/config';
import { cn } from '@/utils/cn';
import React from 'react';
import Markdown from 'react-markdown';

interface Props {
	className?: string;
}

const GameLobbyView: React.FC<React.PropsWithChildren<Props>> = ({
	className
}) => {
	return (
		<div
			className={cn(
				'card bg-base-100 w-full max-w-screen-sm shadow-sm',
				className
			)}
		>
			<div className="card-body prose">
				<Markdown>{config.gameLobbyMd}</Markdown>
			</div>
		</div>
	);
};

export default GameLobbyView;
