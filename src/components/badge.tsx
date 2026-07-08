import { cn } from '@kokimoki/react-components/utils';
import * as React from 'react';

type BadgeVariant = 'success' | 'neutral' | 'info' | 'warning' | 'error';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant;
}

const variantClass: Record<BadgeVariant, string> = {
	success: 'bg-green-100 text-green-900',
	neutral: 'text-slate-400 italic',
	info: 'bg-blue-100 text-blue-900',
	warning: 'bg-amber-100 text-amber-900',
	error: 'bg-red-100 text-red-900'
};

export function Badge({
	className,
	variant = 'neutral',
	...props
}: BadgeProps) {
	return (
		<span
			className={cn(
				'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
				variantClass[variant],
				className
			)}
			{...props}
		/>
	);
}
