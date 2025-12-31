import { Card } from '@/components/card';
import { config } from '@/config';
import React from 'react';
import Markdown from 'react-markdown';

/**
 * View to display the game lobby information before the game starts
 *
 * This example is **optional** and can be removed if not needed
 */
export const GameLobbyView: React.FC<React.PropsWithChildren> = () => {
	return (
		<div className="w-full">
			<div className="flex flex-wrap justify-center gap-6">
				<Card type="attack" name="Strike" value={6} />
				<Card type="block" name="Defend" value={6} />
				<Card
					type="special"
					name="Special Move"
					specialEffect={{ type: 'heal', value: 5 }}
				/>
			</div>

			<article className="prose">
				<Markdown>{config.gameLobbyMd}</Markdown>
			</article>
		</div>
	);
};
