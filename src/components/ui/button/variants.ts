import { tv, type VariantProps } from 'tailwind-variants';

export const buttonVariants = tv({
	base: 'inline-flex items-center justify-center gap-3 rounded-xl px-5 py-3 font-medium transition-colors not-disabled:cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:opacity-50',
	variants: {
		variant: {
			primary:
				'not-disabled:bg-blue-500 not-disabled:text-white not-disabled:hover:bg-blue-600',
			secondary:
				'not-disabled:bg-blue-100 not-disabled:text-blue-950 not-disabled:hover:bg-blue-200',
			error:
				'not-disabled:bg-red-500 not-disabled:text-white not-disabled:hover:bg-red-600',
			neutral:
				'not-disabled:bg-slate-600 not-disabled:text-white not-disabled:hover:bg-slate-700'
		}
	},
	defaultVariants: {
		variant: 'primary'
	}
});

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
