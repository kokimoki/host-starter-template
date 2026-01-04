import { config } from '@/config';
import { globalStore } from '@/state/stores/global-store';
import { useSnapshot } from '@kokimoki/app';
import { SwordsIcon } from 'lucide-react';
import React from 'react';
import Markdown from 'react-markdown';

interface Props {
	className?: string;
}

export const RoundView: React.FC<React.PropsWithChildren<Props>> = ({}) => {
	const { round } = useSnapshot(globalStore.proxy);

	return (
		<div className="w-full">
			<div className="flex flex-wrap justify-center gap-6">
				<article className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl w-full text-center">
					<SwordsIcon className="mb-6 inline size-18" />

					<h1>Round {round}</h1>

					<Markdown>{config.roundMd}</Markdown>
				</article>
			</div>
		</div>
	);
};
