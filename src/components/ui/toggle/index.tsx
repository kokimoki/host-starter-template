import * as React from 'react';
import { toggleVariants, type ToggleVariantProps } from './variants';

interface ToggleProps extends ToggleVariantProps {
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
