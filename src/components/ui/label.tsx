import { cn } from '@kokimoki/react-components/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const labelVariants = cva('mb-2 inline-flex font-semibold', {
	variants: {
		size: {
			sm: 'text-xs',
			md: 'text-sm',
			lg: 'text-base'
		}
	},
	defaultVariants: {
		size: 'md'
	}
});

export interface LabelProps
	extends
		React.LabelHTMLAttributes<HTMLLabelElement>,
		VariantProps<typeof labelVariants> {}

/**
 * Form field caption rendered as a styled `<label>`. Pair with `htmlFor`
 * matching the associated input's `id` for accessibility.
 *
 * @example
 * ```tsx
 * <Label htmlFor="name">Player name</Label>
 * ```
 */
export function Label({ className, htmlFor, size, ...props }: LabelProps) {
	return (
		<label
			htmlFor={htmlFor}
			className={cn(labelVariants({ size }), className)}
			{...props}
		/>
	);
}
