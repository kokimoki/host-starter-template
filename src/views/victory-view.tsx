import { config } from '@/config';
import { SwordsIcon } from 'lucide-react';
import React from 'react';
import Markdown from 'react-markdown';

interface Props {
	className?: string;
}

export const VictoryView: React.FC<React.PropsWithChildren<Props>> = ({}) => {
	return (
		<div className="w-full">
			<div className="flex flex-wrap justify-center gap-6">
				<article className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl w-full text-center">
					<SwordsIcon className="mb-6 inline size-18" />

					<Markdown>{config.victoryMd}</Markdown>
				</article>
			</div>
		</div>
	);
};
