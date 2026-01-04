import { useHealthAnimation } from '@/hooks/useHealthAnimation';
import { globalStore } from '@/state/stores/global-store';
import { cn } from '@/utils/cn';
import { useSnapshot } from '@kokimoki/app';
import { HeartIcon, ShieldIcon } from 'lucide-react';
import React from 'react';

// Total number of backdrop images in /public/backdrops/
const BACKDROP_COUNT = 5;

interface Props {
	className?: string;
}

export const BattleView: React.FC<React.PropsWithChildren<Props>> = ({
	children
}) => {
	const { team, enemy, round } = useSnapshot(globalStore.proxy);
	const { isDamaged: isEnemyDamaged, isHealing: isEnemyHealing } =
		useHealthAnimation(enemy.health);
	const { isDamaged: isTeamDamaged, isHealing: isTeamHealing } =
		useHealthAnimation(team.health);

	const enemyHealthPercent = (enemy.health / enemy.maxHealth) * 100;
	const backdropIndex = ((round - 1) % BACKDROP_COUNT) + 1;

	const videoSrc =
		team.health <= 0
			? 'https://static.kokimoki.com/indrek/sparks.mp4'
			: 'https://static.kokimoki.com/indrek/smoke.mp4';

	return (
		<>
			<video
				className="pointer-events-none fixed inset-0 z-10 h-full w-full object-cover opacity-50 transition-opacity duration-500"
				autoPlay
				playsInline
				loop
				src={videoSrc}
				muted
			></video>

			<div className="fixed inset-0 bg-slate-900"></div>
			{/* Backdrop layers - all preloaded */}
			{Array.from({ length: BACKDROP_COUNT }, (_, i) => i + 1).map((index) => (
				<div
					key={index}
					className={cn(
						'fixed inset-0 bg-cover bg-center transition-opacity duration-1000',
						backdropIndex === index ? 'opacity-100' : 'opacity-0'
					)}
					style={{
						backgroundImage: `url('/backdrops/${index}.webp')`,
						zIndex: backdropIndex === index ? 0 : -1
					}}
				/>
			))}
			<div className="fixed inset-0 bg-black/10"></div>

			<div className="z-10 grid w-full grid-cols-2 justify-items-center gap-12">
				{/* Player Team */}
				<div className={cn('w-full', team.health <= 0 && 'opacity-50')}>
					<article className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl text-center text-shadow-md *:text-white!">
						<img
							className={cn(
								'mx-auto size-2/3 rounded-full shadow-md md:size-60 xl:size-110',
								team.health <= 0 && 'grayscale',
								isTeamDamaged && 'health-damage-animation',
								isTeamHealing && 'health-heal-animation'
							)}
							src="/avatars/1.webp"
							alt={team.name}
						/>

						<h1>
							<span
								className={cn(
									'inline-flex items-center gap-2',
									isTeamDamaged && 'health-damage-animation',
									isTeamHealing && 'health-heal-animation'
								)}
							>
								<HeartIcon className="size-8 drop-shadow-md lg:size-12 xl:size-16" />
								<span className="min-w-[3ch]">{team.health}</span>
							</span>
							<span className="ml-4 inline-flex items-center gap-2 lg:ml-8 xl:ml-12">
								<ShieldIcon className="size-8 drop-shadow-md lg:size-12 xl:size-16" />
								{team.armor}
							</span>
						</h1>

						<div
							className={cn(
								'mx-auto h-12 w-2/3 overflow-hidden rounded-full bg-slate-50/25 shadow-md lg:h-16',
								isTeamDamaged && 'health-damage-animation',
								isTeamHealing && 'health-heal-animation'
							)}
						>
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
				<div className={cn('w-full', enemy.health <= 0 && 'opacity-50')}>
					<article className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl text-center text-shadow-md *:text-white!">
						<img
							className={cn(
								'mx-auto size-2/3 rounded-full shadow-md md:size-60 xl:size-110',
								enemy.health <= 0 && 'grayscale',
								isEnemyDamaged && 'health-damage-animation',
								isEnemyHealing && 'health-heal-animation'
							)}
							src="/avatars/2.webp"
							alt={enemy.name}
						/>

						<h1>
							<span
								className={cn(
									'inline-flex items-center gap-2',
									isEnemyDamaged && 'health-damage-animation',
									isEnemyHealing && 'health-heal-animation'
								)}
							>
								<HeartIcon className="size-8 drop-shadow-md lg:size-12 xl:size-16" />
								{enemy.health}
							</span>
							<span className="ml-4 inline-flex items-center gap-2 lg:ml-8 xl:ml-12">
								<ShieldIcon className="size-8 drop-shadow-md lg:size-12 xl:size-16" />
								{enemy.armor}
							</span>
						</h1>

						<div
							className={cn(
								'mx-auto h-12 w-2/3 overflow-hidden rounded-full bg-slate-50/25 shadow-md lg:h-16',
								isEnemyDamaged && 'health-damage-animation',
								isEnemyHealing && 'health-heal-animation'
							)}
						>
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
