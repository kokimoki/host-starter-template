import { tv, type VariantProps } from 'tailwind-variants';

export const inputVariants = tv({
	base: 'w-full max-w-96 rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50'
});

export type InputVariantProps = VariantProps<typeof inputVariants>;

export const inputClassName = inputVariants();
