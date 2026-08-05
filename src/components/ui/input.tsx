import { Label } from '@/components/ui/label';
import { cn } from '@kokimoki/react-components/utils';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export function Input({ className, label, id, ...props }: InputProps) {
	const input = (
		<input
			id={id}
			className={cn(
				'w-full max-w-96 rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50',
				className
			)}
			{...props}
		/>
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
