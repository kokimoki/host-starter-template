import { inputClassName } from '@/components/input';
import { Label } from '@/components/label';
import { KmSelect, type KmSelectOption } from '@kokimoki/react-components';
import { cn } from '@kokimoki/react-components/utils';
import * as React from 'react';

type SelectProps = {
	label?: string;
	options: KmSelectOption[];
} & Omit<React.ComponentProps<typeof KmSelect>, 'options'>;

export function Select({
	label,
	id,
	options,
	triggerClassName,
	...props
}: SelectProps) {
	const select = (
		<KmSelect
			id={id}
			options={options}
			triggerClassName={cn(
				'h-auto shadow-none focus:ring-offset-0',
				inputClassName,
				triggerClassName
			)}
			{...props}
		/>
	);

	if (!label) {
		return select;
	}

	return (
		<div>
			<Label htmlFor={id}>{label}</Label>
			{select}
		</div>
	);
}
