import { globalStore } from '@/state/stores/global-store';
import { useSnapshot } from '@kokimoki/app';
import React from 'react';

interface Props {
	className?: string;
}

export const GameOverView: React.FC<React.PropsWithChildren<Props>> = ({}) => {
	const { round } = useSnapshot(globalStore.proxy);

	return (
		<div className="w-full">
			<div className="flex flex-wrap justify-center gap-6">
				<article className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl text-center">
					<h1>round {round} Game over!</h1>
				</article>
			</div>
		</div>
	);
};
