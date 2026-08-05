import { cn } from '@kokimoki/react-components/utils';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { buttonVariants, type ButtonVariantProps } from './variants';

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
	asChild?: boolean;
}

export function Button({
	className,
	variant = 'primary',
	asChild = false,
	type,
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp
			type={asChild ? undefined : (type ?? 'button')}
			className={cn(buttonVariants({ variant }), className)}
			{...props}
		/>
	);
}
