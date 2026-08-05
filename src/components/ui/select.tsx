import { Label } from '@/components/ui/label';
import {
	KmSelect,
	type KmSelectClassNames,
	type KmSelectOption
} from '@kokimoki/react-components';
import { cn } from '@kokimoki/react-components/utils';
import * as React from 'react';

const defaultClassNames: KmSelectClassNames = {
	base: 'flex flex-col gap-1',
	triggerInner: 'flex items-center gap-2 truncate',
	triggerIcon: 'size-4 shrink-0',
	loaderIcon: 'size-4 shrink-0 animate-spin',
	errorIcon: 'size-4 shrink-0',
	selectedIcon: 'flex shrink-0 items-center',
	content:
		'relative z-50 max-h-72 min-w-32 overflow-hidden rounded-md border border-slate-200 bg-white text-slate-700 shadow-md',
	viewport: 'p-1',
	scrollUp: 'flex cursor-default items-center justify-center py-1',
	scrollUpIcon: 'size-4',
	scrollDown: 'flex cursor-default items-center justify-center py-1',
	scrollDownIcon: 'size-4',
	item: 'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
	itemIndicator: 'absolute right-2 flex items-center',
	itemIndicatorIcon: 'size-4',
	itemText: 'flex items-center gap-2',
	itemIcon: 'shrink-0',
	error: 'text-xs font-medium text-red-500'
};

type SelectProps = {
	label?: string;
	options: KmSelectOption[];
} & Omit<React.ComponentProps<typeof KmSelect>, 'options'>;

export function Select({
	label,
	id,
	options,
	classNames,
	error,
	...props
}: SelectProps) {
	const baseTrigger =
		'w-full max-w-96 rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 h-auto shadow-none focus:ring-offset-0';
	const mergedClassNames: KmSelectClassNames = {
		...defaultClassNames,
		...classNames,
		trigger: cn(
			baseTrigger,
			error && 'border-red-500 focus:ring-red-500',
			classNames?.trigger
		)
	};

	const select = (
		<KmSelect
			id={id}
			options={options}
			error={error}
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
