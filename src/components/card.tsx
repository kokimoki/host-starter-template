import { cn } from '@/utils/cn';
import * as React from 'react';

export interface CardProps {
	type: 'attack' | 'block' | 'special';
	name: string;

	// For attack/block cards
	value?: number; // damage or block amount

	// For special cards
	specialEffect?: {
		type: 'heal' | 'empower' | 'rally' | 'focus';
		value: number; // heal amount, damage boost, etc.
	};

	className?: string;
}

export const Card: React.FC<CardProps> = ({
	type,
	name,
	value,
	specialEffect,
	className
}) => {
	const typeColors: Record<CardProps['type'], string> = {
		attack: 'bg-red-50 border-red-300',
		block: 'bg-blue-50 border-blue-300',
		special: 'bg-purple-50 border-purple-300'
	};

	const typeLabels: Record<CardProps['type'], string> = {
		attack: 'Attack',
		block: 'Block',
		special: 'Special'
	};

	return (
		<button
			className={cn(
				'inline-flex aspect-[1/1.4] w-full max-w-70 flex-col justify-between rounded-4xl border p-4 shadow-xs',
				typeColors[type],
				className
			)}
		>
			<div>
				<span className="mb-2 inline-block rounded-lg bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-700">
					{typeLabels[type]}
				</span>
				<h2 className="text-2xl font-bold text-slate-900">{name}</h2>
			</div>

			<div className="text-right">
				{(type === 'attack' || type === 'block') && value !== undefined && (
					<p className="text-3xl font-bold text-slate-900">{value}</p>
				)}

				{type === 'special' && specialEffect && (
					<div className="space-y-1">
						<p className="text-sm font-semibold text-slate-700">
							{specialEffect.type.charAt(0).toUpperCase() +
								specialEffect.type.slice(1)}
						</p>
						<p className="text-2xl font-bold text-slate-900">
							{specialEffect.value}
						</p>
					</div>
				)}
			</div>
		</button>
	);
};
