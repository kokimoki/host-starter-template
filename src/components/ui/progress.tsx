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

export interface ProgressProps extends VariantProps<typeof progressVariants> {
	/** Current value. Clamped to `[0, maxValue]` for the fill ratio. */
	currentValue: number;
	/** Value representing 100% width. When `<= 0`, the bar is empty. */
	maxValue: number;
}

/**
 * Deterministic progress bar: an absolutely-positioned fill (`indicator`)
 * translated within a fixed track (`root`) based on `currentValue / maxValue`.
 * Variants are driven by an inline `tv` multi-slot recipe (`size`,
 * `variant`, `duration`).
 *
 * Variants follow the shared semantic vocabulary:
 * `primary` (default) | `secondary` | `tertiary` | `outline` | `ghost` | `danger`;
 * sizes `sm` | `md` (default) | `lg`; durations `fast` | `normal` (default) | `slow`.
 *
 * @example
 * ```tsx
 * <Progress currentValue={3} maxValue={10} variant="secondary" size="lg" />
 * ```
 */
export function Progress({
	currentValue,
	maxValue,
	size,
	variant,
	duration
}: ProgressProps) {
	const ratio =
		maxValue > 0 ? Math.min(Math.max(currentValue, 0) / maxValue, 1) : 0;
	const slots = progressVariants({ size, variant, duration });

	return (
		<div className={slots.root()} style={{ transform: 'translateZ(0)' }}>
			<div
				className={slots.indicator()}
				style={{ transform: `translateX(-${(1 - ratio) * 100}%)` }}
			/>
		</div>
	);
}
