import { Label } from '@/components/ui/label';
import { cn } from '@kokimoki/react-components/utils';
import * as React from 'react';
import { inputVariants, type InputVariantProps } from './variants';

interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>, InputVariantProps {
	label?: string;
}

export function Input({ className, label, id, ...props }: InputProps) {
	const input = (
		<input id={id} className={cn(inputVariants(), className)} {...props} />
	);

	if (!label) {
		return input;
	}

	return (
		<div>
			<Label htmlFor={id}>{label}</Label>
			{input}
		</div>
	);
}
