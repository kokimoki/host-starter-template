import { Label } from '@/components/ui/label';
import { cn } from '@kokimoki/react-components/utils';
import * as SelectPrimitive from '@radix-ui/react-select';
import {
	AlertCircle,
	Check,
	ChevronDown,
	ChevronUp,
	Loader2
} from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { tv, type VariantProps } from 'tailwind-variants';

const selectVariants = tv({
	slots: {
		root: 'flex flex-col gap-1',
		trigger:
			'flex w-full max-w-96 items-center justify-between gap-2 rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50',
		content:
			'relative z-50 max-h-72 min-w-32 overflow-hidden rounded-md border border-slate-200 bg-white text-slate-700 shadow-md',
		item: 'relative flex w-full cursor-pointer items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none focus:bg-slate-100 data-disabled:pointer-events-none data-disabled:opacity-50'
	},
	variants: {
		size: {
			sm: { trigger: 'px-4 py-2 text-sm' },
			md: { trigger: 'px-5 py-3' },
			lg: { trigger: 'px-6 py-4 text-lg' }
		}
	},
	defaultVariants: {
		size: 'md'
	}
});

const triggerIconClass = 'size-4 shrink-0';

/** A single option in the select dropdown. */
export interface SelectOption {
	/** Unique value for the option */
	value: string;
	/** Display label */
	label: string;
	/** Optional icon rendered to the left of the label */
	icon?: React.ReactNode;
	/** Whether the option is disabled */
	disabled?: boolean;
}

export interface SelectProps extends VariantProps<typeof selectVariants> {
	/** Optional text label rendered above the select (paired via `htmlFor`). */
	label?: string;
	/** Selectable options. */
	options: SelectOption[];
	/** Controlled selected value */
	value?: string;
	/** Default value for uncontrolled usage */
	defaultValue?: string;
	/** Callback when the selected value changes */
	onValueChange?: (value: string) => void;
	/** Placeholder text shown when no value is selected */
	placeholder?: string;
	/** Form field name for native form submission */
	name?: string;
	/** HTML id attribute for the trigger button */
	id?: string;
	/** Whether the select is disabled */
	disabled?: boolean;
	/** Whether the select is required */
	required?: boolean;
	/** Show a loading spinner overlay on the trigger */
	loading?: boolean;
	/** Error message — shown below the select; turns the trigger red */
	error?: string;
}

/**
 * Styled native-behavior select built on Radix UI Select primitives.
 * Supports an optional leading icon per option, a loading spinner, and an
 * error state. Pass `label` to render a `Label` above the control.
 * Customize the look via the `size` variant (`sm` | `md` | `lg`).
 *
 * @example
 * ```tsx
 * <Select
 *   id="team"
 *   label="Team"
 *   options={[{ value: 'a', label: 'Alpha' }]}
 *   onValueChange={setTeam}
 * />
 * ```
 */
export function Select({
	label,
	id,
	options,
	value,
	defaultValue,
	onValueChange,
	placeholder,
	name,
	disabled = false,
	required = false,
	loading = false,
	error,
	size
}: SelectProps) {
	const { t } = useTranslation();
	const [internalValue, setInternalValue] = React.useState(defaultValue);
	const currentValue = value ?? internalValue;
	const selectedOption = options.find((opt) => opt.value === currentValue);
	const hasError = !!error;

	const handleValueChange = (newValue: string) => {
		setInternalValue(newValue);
		onValueChange?.(newValue);
	};

	const slots = selectVariants({ size });
	const resolvedPlaceholder = placeholder ?? t('common:selectPlaceholder');

	const select = (
		<div className={slots.root()}>
			<SelectPrimitive.Root
				value={value}
				defaultValue={defaultValue}
				onValueChange={handleValueChange}
				disabled={disabled || loading}
				required={required}
				name={name}
			>
				<SelectPrimitive.Trigger
					id={id}
					className={cn(
						slots.trigger(),
						hasError && 'border-red-500 focus:ring-red-500'
					)}
				>
					<span className="flex items-center gap-2 truncate">
						{loading && (
							<Loader2 className={cn(triggerIconClass, 'animate-spin')} />
						)}
						{hasError && !loading && (
							<AlertCircle className={cn(triggerIconClass, 'text-red-500')} />
						)}
						{selectedOption?.icon && (
							<span className="flex shrink-0 items-center">
								{selectedOption.icon}
							</span>
						)}
						<SelectPrimitive.Value placeholder={resolvedPlaceholder} />
					</span>
					<SelectPrimitive.Icon asChild>
						<ChevronDown className={triggerIconClass} />
					</SelectPrimitive.Icon>
				</SelectPrimitive.Trigger>

				<SelectPrimitive.Portal>
					<SelectPrimitive.Content
						className={slots.content()}
						position="popper"
					>
						<SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
							<ChevronUp className="size-4" />
						</SelectPrimitive.ScrollUpButton>
						<SelectPrimitive.Viewport className="p-1">
							{options.map((option) => (
								<SelectPrimitive.Item
									key={option.value}
									value={option.value}
									disabled={option.disabled}
									className={slots.item()}
								>
									<span className="absolute right-2 flex items-center">
										<SelectPrimitive.ItemIndicator>
											<Check className="size-4" />
										</SelectPrimitive.ItemIndicator>
									</span>
									<span className="flex items-center gap-2">
										{option.icon && (
											<span className="shrink-0">{option.icon}</span>
										)}
										<SelectPrimitive.ItemText>
											{option.label}
										</SelectPrimitive.ItemText>
									</span>
								</SelectPrimitive.Item>
							))}
						</SelectPrimitive.Viewport>
						<SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
							<ChevronDown className="size-4" />
						</SelectPrimitive.ScrollDownButton>
					</SelectPrimitive.Content>
				</SelectPrimitive.Portal>
			</SelectPrimitive.Root>

			{hasError && (
				<p className="text-xs font-medium text-red-500" role="alert">
					{error}
				</p>
			)}
		</div>
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
