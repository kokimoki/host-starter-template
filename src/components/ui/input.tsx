import { Label } from '@/components/ui/label';
import { cn } from '@kokimoki/react-components/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const inputVariants = cva(
	'w-full max-w-96 rounded-xl border bg-slate-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50',
	{
		variants: {
			variant: {
				primary: 'border-slate-300',
				danger: 'border-red-500 focus:ring-red-500'
			},
			size: {
				sm: 'px-3 py-2 text-sm',
				md: 'px-5 py-3',
				lg: 'px-6 py-4 text-lg'
			}
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md'
		}
	}
);

export interface InputProps
	extends
		Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof inputVariants> {
	/**
	 * Optional text label rendered above the input (paired via `htmlFor`).
	 * When omitted, the bare input element is returned.
	 */
	label?: string;
}

/**
 * Styled text input with an optional label. Renders a `<input>` wrapped by
 * a `Label` when `label` is provided; otherwise renders the input alone.
 *
 * @example
 * ```tsx
 * <Input id="name" label="Player name" placeholder="Alice" />
 * ```
 */
export function Input({
	className,
	label,
	id,
	variant,
	size,
	...props
}: InputProps) {
	const generatedId = React.useId();
	const inputId = label ? (id ?? generatedId) : id;

	const input = (
		<input
			id={inputId}
			className={cn(inputVariants({ variant, size }), className)}
			{...props}
		/>
	);

	if (!label) {
		return input;
	}

	return (
		<div>
			<Label htmlFor={inputId}>{label}</Label>
			{input}
		</div>
	);
}
