import { cn } from '@kokimoki/react-components/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
	'inline-flex items-center rounded-full border text-xs font-medium',
	{
		variants: {
			variant: {
				primary: 'border-transparent bg-green-100 text-green-900',
				secondary: 'border-transparent bg-blue-100 text-blue-900',
				tertiary: 'border-transparent bg-amber-100 text-amber-900',
				outline: 'border-slate-300 bg-transparent text-slate-700',
				ghost: 'border-transparent bg-transparent text-slate-400 italic',
				danger: 'border-transparent bg-red-100 text-red-900'
			},
			size: {
				sm: 'px-2 py-0.5 text-[10px]',
				md: 'px-3 py-1',
				lg: 'px-4 py-1.5 text-sm'
			}
		},
		defaultVariants: {
			variant: 'secondary',
			size: 'md'
		}
	}
);

export interface BadgeProps
	extends
		React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof badgeVariants> {}

/**
 * Small status/tag chip rendered as a styled `<span>`, driven by an inline
 * `cva` variant recipe.
 *
 * Variants follow the shared semantic vocabulary:
 * `primary` | `secondary` (default) | `tertiary` | `outline` | `ghost` | `danger`,
 * with sizes `sm` | `md` (default) | `lg`.
 *
 * @example
 * ```tsx
 * <Badge variant="danger" size="sm">Offline</Badge>
 * ```
 */
export function Badge({ className, variant, size, ...props }: BadgeProps) {
	return (
		<span
			className={cn(badgeVariants({ variant, size }), className)}
			{...props}
		/>
	);
}
