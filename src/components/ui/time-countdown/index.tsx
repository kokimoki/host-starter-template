import { cn } from '@kokimoki/react-components/utils';
import * as React from 'react';
import {
	timeCountdownVariants,
	type TimeCountdownClassNames
} from './variants';

export interface TimeCountdownProps {
	ms: number;
	display?: 'hms' | 'ms' | 's';
	classNames?: TimeCountdownClassNames;
}

function format(ms: number, display: 'hms' | 'ms' | 's') {
	const totalSeconds = Math.max(0, Math.floor(ms / 1000));
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const pad = (n: number) => n.toString().padStart(2, '0');

	if (display === 's') {
		return { parts: [totalSeconds.toString()], separators: [] };
	}
	if (display === 'ms') {
		return {
			parts: [pad(minutes), pad(seconds)],
			separators: [':']
		};
	}
	return {
		parts: [pad(hours), pad(minutes), pad(seconds)],
		separators: [':', ':']
	};
}

export function TimeCountdown({
	ms,
	display = 'hms',
	classNames
}: TimeCountdownProps) {
	const slots = timeCountdownVariants();
	const { parts, separators } = format(ms, display);

	return (
		<span className={cn(slots.base(), classNames?.base)}>
			{parts.map((part, i) => (
				<React.Fragment key={i}>
					<span className={cn(slots.part(), classNames?.part)}>{part}</span>
					{i < separators.length && (
						<span className={cn(slots.separator(), classNames?.separator)}>
							{separators[i]}
						</span>
					)}
				</React.Fragment>
			))}
		</span>
	);
}
