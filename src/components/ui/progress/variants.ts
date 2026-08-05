import { tv, type VariantProps } from 'tailwind-variants';

export const progressVariants = tv({
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
			neutral: { indicator: 'bg-slate-700' },
			primary: { indicator: 'bg-blue-500' },
			success: { indicator: 'bg-emerald-500' },
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
		variant: 'neutral',
		duration: 'normal'
	}
});

export type ProgressVariantProps = VariantProps<typeof progressVariants>;

export type ProgressClassNames = {
	root?: string;
	indicator?: string;
};
