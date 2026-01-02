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
	const { team, enemy, round } = useSnapshot(globalStore.proxy);

	const enemyHealthPercent = (enemy.health / enemy.maxHealth) * 100;

	return (
		<>
			<div className="grid w-full grid-cols-2 justify-items-center gap-12">
				{/* Player Team */}
				<div className="w-full">
					<article className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl text-center">
						<img
							className="mx-auto size-2/3 rounded-full shadow-xs md:size-60"
							src="/avatars/1.webp"
							alt={team.name}
						/>

						<h1>
							<span className="inline-flex items-center gap-2">
								<HeartIcon className="size-8 lg:size-12 xl:size-16" />
								{team.health}
							</span>
							<span className="ml-4 inline-flex items-center gap-2 lg:ml-8 xl:ml-12">
								<ShieldIcon className="size-8 lg:size-12 xl:size-16" />
								{team.armor}
							</span>

							{round}
						</h1>

						<div className="mx-auto h-12 w-2/3 overflow-hidden rounded-full bg-slate-50 shadow-xs lg:h-16">
							<div
								className="h-full transition-all duration-300"
								style={{
									width: team.health + '%',
									backgroundColor: team.color
								}}
							/>
						</div>
					</article>
				</div>

				{/* AI Boss */}
				<div className="w-full">
					<article className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl text-center">
						<img
							className="mx-auto size-2/3 rounded-full shadow-xs md:size-60"
							src="/avatars/2.webp"
							alt={enemy.name}
						/>

						<h1>
							<span className="inline-flex items-center gap-2">
								<HeartIcon className="size-8 lg:size-12 xl:size-16" />
								{enemy.health}
							</span>
							<span className="ml-4 inline-flex items-center gap-2 lg:ml-8 xl:ml-12">
								<ShieldIcon className="size-8 lg:size-12 xl:size-16" />
								{enemy.armor}
							</span>
						</h1>

						<div className="mx-auto h-12 w-2/3 overflow-hidden rounded-full bg-slate-50 shadow-xs lg:h-16">
							<div
								className="h-full transition-all duration-300"
								style={{
									width: enemyHealthPercent + '%',
									backgroundColor: enemy.color
								}}
							/>
						</div>
					</article>
				</div>
			</div>

			{children}
		</>
	);
};
