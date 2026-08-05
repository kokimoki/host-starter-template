import { cn } from '@kokimoki/react-components/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-3 rounded-xl px-5 py-3 font-medium transition-colors not-disabled:cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:opacity-50',
	{
		variants: {
			variant: {
				primary:
					'not-disabled:bg-blue-500 not-disabled:text-white not-disabled:hover:bg-blue-600',
				secondary:
					'not-disabled:bg-blue-100 not-disabled:text-blue-950 not-disabled:hover:bg-blue-200',
				tertiary:
					'not-disabled:bg-slate-100 not-disabled:text-slate-700 not-disabled:hover:bg-slate-200',
				outline:
					'not-disabled:border not-disabled:border-slate-300 not-disabled:bg-transparent not-disabled:text-slate-700 not-disabled:hover:bg-slate-50',
				ghost:
					'not-disabled:bg-transparent not-disabled:text-slate-700 not-disabled:hover:bg-slate-100',
				danger:
					'not-disabled:bg-red-500 not-disabled:text-white not-disabled:hover:bg-red-600'
			}
		},
		defaultVariants: {
			variant: 'primary'
		}
	}
);

export interface ButtonProps
	extends
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

export function Button({
	className,
	variant,
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
