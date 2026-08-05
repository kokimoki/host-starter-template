import { cn } from '@kokimoki/react-components/utils';
import * as React from 'react';
import { labelVariants } from './variants';

export function Label({
	className,
	htmlFor,
	...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
	return (
		<label
			htmlFor={htmlFor}
			className={cn(labelVariants(), className)}
			{...props}
		/>
	);
}
