import { globalStore } from '@/state/stores/global-store';
import { useSnapshot } from '@kokimoki/app';
import { HeartIcon, ShieldIcon } from 'lucide-react';
import React from 'react';

interface Props {
	className?: string;
}

export const BattleView: React.FC<React.PropsWithChildren<Props>> = ({
	children
}) => {
	const { teams } = useSnapshot(globalStore.proxy);

	return (
		<>
			<div className="grid w-full grid-cols-2 justify-items-center gap-12">
				{teams.map((team, index) => {
					const barColor = index === 0 ? 'bg-red-500' : 'bg-blue-500';
					const healthColor = index === 0 ? 'text-red-600' : 'text-blue-600';

					return (
						<div key={index} className="w-full">
							<article className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl">
								<h1>{team.name}</h1>

								<h2>
									<span
										className={`inline-flex items-center gap-2 ${healthColor}`}
									>
										<HeartIcon className="size-8 lg:size-12 xl:size-16" />
										{team.health}
									</span>
									<span
										className={`ml-4 inline-flex items-center gap-2 lg:ml-8 xl:ml-12`}
									>
										<ShieldIcon className="size-8 lg:size-12 xl:size-16" />
										{team.armor}
									</span>
								</h2>

								<div className="h-12 w-full overflow-hidden rounded-full bg-slate-50 shadow-xs lg:h-20">
									<div
										className={`h-full transition-all duration-300 ${barColor}`}
										style={{ width: `${team.health}%` }}
									/>
								</div>
							</article>
						</div>
					);
				})}
			</div>

			{children}
		</>
	);
};
