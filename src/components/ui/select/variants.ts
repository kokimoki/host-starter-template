import { inputClassName } from '@/components/ui/input/variants';
import { cn } from '@kokimoki/react-components/utils';
import { tv } from 'tailwind-variants';

export const selectTriggerVariants = tv({
	base: cn('h-auto shadow-none focus:ring-offset-0', inputClassName)
});

export const selectClassNames = {
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
	itemIcon: 'shrink-0'
};
