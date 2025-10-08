import { config } from '@/config';
import { cn } from '@/utils/cn';
import React from 'react';
import Markdown from 'react-markdown';

interface Props {
	className?: string;
}

/**
 * View to display the game lobby information before the game starts
 * This example is **optional** and can be removed if not needed
 */
export const GameLobbyView: React.FC<React.PropsWithChildren<Props>> = ({
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
