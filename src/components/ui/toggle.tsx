import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const toggleVariants = tv({
	slots: {
		root: 'inline-flex items-center gap-3 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none not-disabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
		track:
			'relative inline-flex shrink-0 items-center rounded-full transition-colors',
		thumb:
			'inline-block transform rounded-full bg-white shadow transition-transform',
		label: 'font-semibold'
	},
	variants: {
		size: {
			sm: {
				track: 'h-5 w-9',
				thumb: 'h-3.5 w-3.5',
				label: 'text-xs'
			},
			md: {
				track: 'h-7 w-12',
				thumb: 'h-5 w-5',
				label: 'text-sm'
			},
			lg: {
				track: 'h-8 w-14',
				thumb: 'h-6 w-6',
				label: 'text-base'
			}
		},
		checked: {
			true: { track: 'bg-blue-500' },
			false: { track: 'bg-slate-300', thumb: 'translate-x-1' }
		}
	},
	compoundVariants: [
		{ size: 'sm', checked: true, class: { thumb: 'translate-x-4' } },
		{ size: 'md', checked: true, class: { thumb: 'translate-x-6' } },
		{ size: 'lg', checked: true, class: { thumb: 'translate-x-7' } }
	],
	defaultVariants: {
		size: 'md'
	}
});

interface ToggleProps extends VariantProps<typeof toggleVariants> {
	id?: string;
	disabled?: boolean;
	/** Called with the next checked state whenever the toggle is activated. */
	onCheckedChange: (checked: boolean) => void;
	/** Optional accessible label shown next to the switch. */
	label?: string;
}

/**
 * Accessible two-state switch rendered as a `<button role="switch">`,
 * driven by an inline `tv` multi-slot recipe (`root` | `track` | `thumb` |
 * `label`). The `checked` variant controls track color and thumb position;
 * the `size` variant scales the control.
 *
 * @example
 * ```tsx
 * <Toggle checked={muted} onCheckedChange={setMuted} label="Mute" />
 * ```
 */
export function Toggle({
	id,
	checked = false,
	disabled = false,
	onCheckedChange,
	label,
	size
}: ToggleProps) {
	const autoId = React.useId();
	const toggleId = id ?? autoId;
	const slots = toggleVariants({ checked, size });

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
