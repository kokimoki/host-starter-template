import { cn } from '@kokimoki/react-components/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
	'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
	{
		variants: {
			variant: {
				primary: 'border-transparent bg-green-100 text-green-900',
				secondary: 'border-transparent bg-blue-100 text-blue-900',
				tertiary: 'border-transparent bg-amber-100 text-amber-900',
				outline: 'border-slate-300 bg-transparent text-slate-700',
				ghost: 'border-transparent bg-transparent text-slate-400 italic',
				danger: 'border-transparent bg-red-100 text-red-900'
			}
		},
		defaultVariants: {
			variant: 'secondary'
		}
	}
);

export interface BadgeProps
	extends
		React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<span className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}
