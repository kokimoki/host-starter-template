import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const timeCountdownVariants = tv({
	slots: {
		base: 'inline-flex items-baseline',
		part: 'tabular-nums',
		separator: 'text-slate-400'
	},
	variants: {
		size: {
			sm: { base: 'text-sm' },
			md: { base: 'text-2xl' },
			lg: { base: 'font-sans text-4xl font-extrabold' },
			xl: { base: 'font-sans text-6xl font-extrabold lg:text-8xl' }
		}
	},
	defaultVariants: {
		size: 'md'
	}
});

export interface TimeCountdownProps extends VariantProps<
	typeof timeCountdownVariants
> {
	/** Remaining (or elapsed) duration in milliseconds. Negative values are clamped to 0. */
	ms: number;
	/**
	 * Layout of the rendered parts:
	 * `hms` (default) shows `HH:MM:SS`; `ms` shows `MM:SS`; `s` shows total seconds.
	 */
	display?: 'hms' | 'ms' | 's';
}

function format(ms: number, display: 'hms' | 'ms' | 's') {
	const totalSeconds = Math.max(0, Math.floor(ms / 1000));
	const hours = Math.floor(totalSeconds / 3600);
	const totalMinutes = Math.floor(totalSeconds / 60);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const pad = (n: number) => n.toString().padStart(2, '0');

	if (display === 's') {
		return { parts: [totalSeconds.toString()], separators: [] };
	}
	if (display === 'ms') {
		return {
			parts: [pad(totalMinutes), pad(seconds)],
			separators: [':']
		};
	}
	return {
		parts: [pad(hours), pad(minutes), pad(seconds)],
		separators: [':', ':']
	};
}

/**
 * Renders a formatted countdown/elapsed-time string from a millisecond
 * duration. Negative durations are clamped to 0.
 *
 * @example
 * ```tsx
 * <TimeCountdown ms={remainingMs} display="ms" size="lg" />
 * ```
 */
export function TimeCountdown({
	ms,
	display = 'hms',
	size
}: TimeCountdownProps) {
	const slots = timeCountdownVariants({ size });
	const { parts, separators } = format(ms, display);

	return (
		<span className={slots.base()}>
			{parts.map((part, i) => (
				<React.Fragment key={i}>
					<span className={slots.part()}>{part}</span>
					{i < separators.length && (
						<span className={slots.separator()}>{separators[i]}</span>
					)}
				</React.Fragment>
			))}
		</span>
	);
}
