import { config } from '@/config';
import { kmClient } from '@/services/km-client';
import { cn } from '@/utils/cn';
import React from 'react';
import Markdown from 'react-markdown';

interface Props {
	className?: string;
}

async function chat() {
	const res = await kmClient.ai.chat({
		userPrompt: 'Hello, how are you?'
	});

	console.log('Chat response:', res);
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
				'w-full max-w-screen-sm rounded-lg border border-gray-200 bg-white shadow-md',
				className
			)}
		>
			<button className="bg-amber-300" onClick={chat}>
				Test Chat
			</button>
			<div className="prose p-6">
				<Markdown>{config.gameLobbyMd}</Markdown>
			</div>
		</div>
	);
};
