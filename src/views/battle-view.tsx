import { useHealthAnimation } from '@/hooks/useHealthAnimation';
import { globalStore } from '@/state/stores/global-store';
import { cn } from '@/utils/cn';
import { useSnapshot } from '@kokimoki/app';
import {
	BicepsFlexedIcon,
	BrickWallShieldIcon,
	HeartIcon,
	ShieldIcon,
	SwordIcon
} from 'lucide-react';
import React from 'react';

interface HealHeart {
	id: number;
	left: number;
	delay: number;
	duration: number;
	opacity: number;
}

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
	const { isDamaged: isEnemyArmorDamaged, isHealing: isEnemyArmorHealing } =
		useHealthAnimation(enemy.armor);
	const { isDamaged: isTeamArmorDamaged, isHealing: isTeamArmorHealing } =
		useHealthAnimation(team.armor);

	// Heart animation state
	const [healHearts, setHealHearts] = React.useState<HealHeart[]>([]);
	const heartIdRef = React.useRef(0);
	const healingStartedBelowMaxRef = React.useRef(false);

	// Generate hearts when healing
	React.useEffect(() => {
		// Track if healing started while below max health
		if (isTeamHealing || isEnemyHealing) {
			if (!healingStartedBelowMaxRef.current) {
				healingStartedBelowMaxRef.current =
					team.health < team.maxHealth || enemy.health < enemy.maxHealth;
			}
		} else {
			healingStartedBelowMaxRef.current = false;
		}

		const shouldShowHearts =
			(isTeamHealing || isEnemyHealing) && healingStartedBelowMaxRef.current;

		if (!shouldShowHearts) return;

		const interval = setInterval(() => {
			const newHeart: HealHeart = {
				id: heartIdRef.current++,
				left: Math.random() * 100,
				delay: Math.random() * 0.5,
				duration: 1.5 + Math.random() * 1,
				opacity: 0.3 + Math.random() * 0.6 // Random opacity between 0.3 (30%) and 0.9 (90%)
			};
			setHealHearts((prev) => [...prev, newHeart]);

			// Remove heart after animation completes
			setTimeout(
				() => {
					setHealHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
				},
				(newHeart.duration + newHeart.delay) * 1000
			);
		}, 80);

		return () => clearInterval(interval);
	}, [
		isTeamHealing,
		isEnemyHealing,
		team.health,
		team.maxHealth,
		enemy.health,
		enemy.maxHealth
	]);

	const enemyHealthPercent = (enemy.health / enemy.maxHealth) * 100;
	const backdropIndex = ((round - 1) % BACKDROP_COUNT) + 1;

	const videoSrc =
		team.health <= 0
			? 'https://static.kokimoki.com/indrek/sparks.mp4'
			: 'https://static.kokimoki.com/indrek/smoke.mp4';

	return (
		<>
			{/* Heal animation hearts */}
			{healHearts.length > 0 && (
				<div className="pointer-events-none fixed -top-20 right-1/2 -bottom-20 left-0 z-30">
					{healHearts.map((heart) => (
						<HeartIcon
							key={heart.id}
							className="heart-rise-animation absolute bottom-0 size-8 fill-green-500 stroke-green-500 md:size-12 lg:size-16"
							style={{
								left: `${heart.left}%`,
								animationDelay: `${heart.delay}s`,
								animationDuration: `${heart.duration}s`,
								opacity: heart.opacity
							}}
						/>
					))}
				</div>
			)}

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
								'brightness-pulse-animation mx-auto size-2/3 rounded-full shadow-md md:size-60 xl:size-110',
								team.health <= 0 && 'grayscale'
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
							<span
								className={cn(
									'ml-8 inline-flex items-center gap-2 lg:ml-12 xl:ml-16',
									isTeamArmorDamaged && 'health-damage-animation',
									isTeamArmorHealing && 'health-heal-animation'
								)}
							>
								<ShieldIcon className="size-8 drop-shadow-md lg:size-12 xl:size-16" />
								<span className="min-w-[3ch]">{team.armor}</span>
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

						<h2 className="opacity-85">
							<span className="inline-flex items-center gap-2">
								<BicepsFlexedIcon className="size-6 drop-shadow-md lg:size-12!" />
								<span className="min-w-[2ch]">{team.strength}</span>
							</span>

							<span className="ml-8 inline-flex items-center gap-2 lg:ml-12 xl:ml-16">
								<BrickWallShieldIcon className="size-6 drop-shadow-md lg:size-12!" />
								<span className="min-w-[2ch]">{team.dexterity}</span>
							</span>
						</h2>
					</article>
				</div>

				{/* AI Boss */}
				<div className={cn('w-full', enemy.health <= 0 && 'opacity-50')}>
					<article className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl text-center text-shadow-md *:text-white!">
						<div className="relative">
							<img
								className={cn(
									'brightness-pulse-animation mx-auto mt-0! size-2/3 rounded-full shadow-md md:size-60 xl:size-110',
									enemy.health <= 0 && 'grayscale'
								)}
								src="/avatars/2.webp"
								alt={enemy.name}
							/>
							<h1 className="float-animation absolute inset-x-0 -top-25 inline-flex justify-center gap-2 text-red-400!">
								{enemy.damage}
								<SwordIcon className="inline size-8 drop-shadow-md lg:size-12 xl:size-16" />
							</h1>
						</div>

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
							<span
								className={cn(
									'ml-8 inline-flex items-center gap-2 lg:ml-12 xl:ml-16',
									isEnemyArmorDamaged && 'health-damage-animation',
									isEnemyArmorHealing && 'health-heal-animation'
								)}
							>
								<ShieldIcon className="size-8 drop-shadow-md lg:size-12 xl:size-16" />
								<span className="min-w-[3ch]">{enemy.armor}</span>
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

						<h2 className="opacity-85">
							<span className="inline-flex items-center gap-2">
								<BicepsFlexedIcon className="size-6 drop-shadow-md lg:size-12!" />
								<span className="min-w-[2ch]">{enemy.strength}</span>
							</span>

							<span className="ml-8 inline-flex items-center gap-2 lg:ml-12 xl:ml-16">
								<BrickWallShieldIcon className="size-6 drop-shadow-md lg:size-12!" />
								<span className="min-w-[2ch]">{enemy.dexterity}</span>
							</span>
						</h2>
					</article>
				</div>
			</div>

			{children}
		</>
	);
};
