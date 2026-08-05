import { tv, type VariantProps } from 'tailwind-variants';

export const imageUploadVariants = tv({
	slots: {
		root: 'flex max-w-96 flex-col gap-3 rounded-xl border border-slate-300 bg-slate-50 p-3',
		labelRow: 'flex flex-col gap-0.5',
		hint: 'mb-2 text-xs text-slate-500',
		preview:
			'relative flex items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white',
		previewImage: 'h-full w-full object-contain',
		fallbackBadge:
			'pointer-events-none absolute right-1 bottom-1 rounded bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-medium text-slate-500',
		actions: 'flex flex-wrap items-center gap-2',
		fileInput: 'sr-only',
		error: 'text-xs font-medium text-red-500'
	},
	variants: {
		busy: {
			true: { root: 'opacity-60' },
			false: {}
		}
	}
});

export type ImageUploadVariantProps = VariantProps<typeof imageUploadVariants>;
