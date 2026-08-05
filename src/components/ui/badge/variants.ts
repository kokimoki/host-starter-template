import { tv, type VariantProps } from 'tailwind-variants';

export const badgeVariants = tv({
	base: 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
	variants: {
		variant: {
			success: 'bg-green-100 text-green-900',
			neutral: 'text-slate-400 italic',
			info: 'bg-blue-100 text-blue-900',
			warning: 'bg-amber-100 text-amber-900',
			error: 'bg-red-100 text-red-900'
		}
	},
	defaultVariants: {
		variant: 'neutral'
	}
});

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
