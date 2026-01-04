import { config } from '@/config';
import { SkullIcon } from 'lucide-react';
import React from 'react';
import Markdown from 'react-markdown';

interface Props {
	className?: string;
}

export const GameOverView: React.FC<React.PropsWithChildren<Props>> = ({}) => {
	return (
		<div className="w-full">
			<div className="flex flex-wrap justify-center gap-6">
				<article className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl w-full text-center">
					<SkullIcon className="mb-6 inline size-18 stroke-red-500" />

					<Markdown>{config.gameOverMd}</Markdown>
				</article>
			</div>
		</div>
	);
};
