import { Label } from '@/components/ui/label';
import {
	KmSelect,
	type KmSelectClassNames,
	type KmSelectOption
} from '@kokimoki/react-components';
import { cn } from '@kokimoki/react-components/utils';
import * as React from 'react';
import { selectClassNames, selectTriggerVariants } from './variants';

type SelectProps = {
	label?: string;
	options: KmSelectOption[];
} & Omit<React.ComponentProps<typeof KmSelect>, 'options'>;

export function Select({
	label,
	id,
	options,
	classNames,
	...props
}: SelectProps) {
	const mergedClassNames: KmSelectClassNames = {
		...selectClassNames,
		...classNames,
		trigger: cn(selectTriggerVariants(), classNames?.trigger)
	};

	const select = (
		<KmSelect
			id={id}
			options={options}
			classNames={mergedClassNames}
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
