import { cn } from '@kokimoki/react-components/utils';
import * as React from 'react';
import { badgeVariants, type BadgeVariantProps } from './variants';

interface BadgeProps
	extends React.HTMLAttributes<HTMLSpanElement>, BadgeVariantProps {}

export function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<span className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}
