import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const toggleVariants = tv({
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

interface ToggleProps extends VariantProps<typeof toggleVariants> {
	id?: string;
	disabled?: boolean;
	onCheckedChange: (checked: boolean) => void;
	label?: string;
}

export function Toggle({
	id,
	checked = false,
	disabled = false,
	onCheckedChange,
	label
}: ToggleProps) {
	const autoId = React.useId();
	const toggleId = id ?? autoId;
	const slots = toggleVariants({ checked });

	return (
		<button
			type="button"
			role="switch"
			id={toggleId}
			aria-checked={checked}
			disabled={disabled}
			onClick={() => onCheckedChange(!checked)}
			className={slots.root()}
		>
			<span className={slots.track()}>
				<span aria-hidden className={slots.thumb()} />
			</span>
			{label ? <span className={slots.label()}>{label}</span> : null}
		</button>
	);
}
