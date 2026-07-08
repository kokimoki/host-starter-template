import { cn } from '@kokimoki/react-components/utils';
import * as React from 'react';

interface ToggleProps {
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	label?: string;
	id?: string;
	disabled?: boolean;
}

export function Toggle({
	checked,
	onCheckedChange,
	label,
	id,
	disabled = false
}: ToggleProps) {
	const autoId = React.useId();
	const toggleId = id ?? autoId;

	const thumb = (
		<span
			aria-hidden
			className={cn(
				'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
				checked ? 'translate-x-6' : 'translate-x-1'
			)}
		/>
	);

	return (
		<button
			type="button"
			role="switch"
			id={toggleId}
			aria-checked={checked}
			disabled={disabled}
			onClick={() => onCheckedChange(!checked)}
			className={cn(
				'inline-flex items-center gap-3 transition-colors',
				'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none',
				'not-disabled:cursor-pointer disabled:cursor-not-allowed',
				disabled && 'opacity-50'
			)}
		>
			<span
				className={cn(
					'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors',
					checked ? 'bg-blue-500' : 'bg-slate-300'
				)}
			>
				{thumb}
			</span>

			{label ? <span className="text-sm font-semibold">{label}</span> : null}
		</button>
	);
}
