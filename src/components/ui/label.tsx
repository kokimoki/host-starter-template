import { cn } from '@kokimoki/react-components/utils';
import * as React from 'react';

export function Label({
	className,
	htmlFor,
	...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
	return (
		<label
			htmlFor={htmlFor}
			className={cn('mb-2 inline-flex text-sm font-semibold', className)}
			{...props}
		/>
	);
}
