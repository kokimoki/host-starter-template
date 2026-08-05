import { tv, type VariantProps } from 'tailwind-variants';

export const toggleVariants = tv({
	slots: {
		root: 'inline-flex items-center gap-3 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none not-disabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
		track:
			'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors',
		thumb:
			'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
		label: 'text-sm font-semibold'
	},
	variants: {
		checked: {
			true: { track: 'bg-blue-500', thumb: 'translate-x-6' },
			false: { track: 'bg-slate-300', thumb: 'translate-x-1' }
		}
	}
});

export type ToggleVariantProps = VariantProps<typeof toggleVariants>;
