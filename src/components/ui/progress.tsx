import { cn } from '@kokimoki/react-components/utils';
import { tv, type VariantProps } from 'tailwind-variants';

const progressVariants = tv({
	slots: {
		root: 'relative w-full overflow-hidden rounded-full bg-slate-200',
		indicator:
			'h-full w-full flex-1 rounded-r-full bg-slate-700 transition-transform ease-out'
	},
	variants: {
		size: {
			sm: { root: 'h-2' },
			md: { root: 'h-3' },
			lg: { root: 'h-4' }
		},
		variant: {
			primary: { indicator: 'bg-slate-700' },
			secondary: { indicator: 'bg-blue-500' },
			tertiary: { indicator: 'bg-emerald-500' },
			outline: {
				indicator: 'rounded-full border border-slate-300 bg-transparent'
			},
			ghost: { indicator: 'bg-slate-200' },
			danger: { indicator: 'bg-red-500' }
		},
		duration: {
			fast: { indicator: 'duration-150' },
			normal: { indicator: 'duration-500' },
			slow: { indicator: 'duration-1000' }
		}
	},
	defaultVariants: {
		size: 'md',
		variant: 'primary',
		duration: 'normal'
	}
});

export interface ProgressClassNames {
	root?: string;
	indicator?: string;
}

export interface ProgressProps extends VariantProps<typeof progressVariants> {
	currentValue: number;
	maxValue: number;
	classNames?: ProgressClassNames;
}

export function Progress({
	currentValue,
	maxValue,
	size,
	variant,
	duration,
	classNames
}: ProgressProps) {
	const ratio = maxValue > 0 ? Math.min(currentValue / maxValue, 1) : 0;
	const slots = progressVariants({ size, variant, duration });

	return (
		<div
			className={cn(slots.root(), classNames?.root)}
			style={{ transform: 'translateZ(0)' }}
		>
			<div
				className={cn(slots.indicator(), classNames?.indicator)}
				style={{ transform: `translateX(-${(1 - ratio) * 100}%)` }}
			/>
		</div>
	);
}
