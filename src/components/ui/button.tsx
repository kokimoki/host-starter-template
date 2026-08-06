import { cn } from '@kokimoki/react-components/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-3 rounded-xl font-medium transition-colors not-disabled:cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:opacity-50',
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
			},
			size: {
				sm: 'px-3 py-2 text-sm',
				md: 'px-5 py-3',
				lg: 'px-7 py-4 text-lg'
			},
			fullWidth: {
				true: 'w-full',
				false: ''
			}
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
			fullWidth: false
		}
	}
);

export interface ButtonProps
	extends
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	/**
	 * When true, merges the button styles onto the immediate child element
	 * (via Radix `Slot`) instead of rendering a `<button>`. Useful for
	 * rendering a Button-styled anchor or custom element.
	 */
	asChild?: boolean;
}

/**
 * Primary interactive surface of the template. A styled `<button>` (or, with
 * `asChild`, a slot onto another element) driven by an inline `cva` variant
 * recipe.
 *
 * Variants follow the shared semantic vocabulary:
 * `primary` (default) | `secondary` | `tertiary` | `outline` | `ghost` | `danger`,
 * with sizes `sm` | `md` (default) | `lg` and an optional `fullWidth`.
 *
 * @example
 * ```tsx
 * <Button variant="danger" onClick={onDelete}>Delete</Button>
 * <Button size="sm" fullWidth>Submit</Button>
 * // As a link
 * <Button asChild><a href="/home">Home</a></Button>
 * ```
 */
export function Button({
	className,
	variant,
	size = 'md',
	fullWidth = false,
	asChild = false,
	type,
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp
			type={asChild ? undefined : (type ?? 'button')}
			className={cn(buttonVariants({ variant, size, fullWidth }), className)}
			{...props}
		/>
	);
}
