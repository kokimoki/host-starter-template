import { globalStore } from '@/state/stores/global-store';
import { useSnapshot } from '@kokimoki/app';
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
			<div className="grid w-full flex-none grid-cols-2 justify-items-center">
				{teams.map((team, index) => {
					const barColor = index === 0 ? 'bg-red-500' : 'bg-blue-500';
					const healthColor = index === 0 ? 'text-red-600' : 'text-blue-600';

					return (
						<div key={index}>
							<span className="text-lg font-bold text-slate-900">
								{team.name}
							</span>
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<span className="text-xs text-slate-600">HP:</span>
									<span className={`text-sm font-bold ${healthColor}`}>
										{team.health}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-xs text-slate-600">Armor:</span>
									<span className="text-sm font-bold text-slate-900">
										{team.armor}
									</span>
								</div>
							</div>
							<div className="h-3 w-48 overflow-hidden rounded-full bg-slate-200">
								<div
									className={`h-full transition-all duration-300 ${barColor}`}
									style={{ width: `${team.health}%` }}
								/>
							</div>
						</div>
					);
				})}
			</div>

			{children}
		</>
	);
};
