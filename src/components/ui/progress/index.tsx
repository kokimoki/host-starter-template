import { cn } from '@kokimoki/react-components/utils';
import {
	progressVariants,
	type ProgressClassNames,
	type ProgressVariantProps
} from './variants';

export interface ProgressProps extends ProgressVariantProps {
	currentValue: number;
	maxValue: number;
	classNames?: ProgressClassNames;
}

export function Progress({
	currentValue,
	maxValue,
	size,
	variant,
	duration,
	classNames
}: ProgressProps) {
	const ratio = maxValue > 0 ? Math.min(currentValue / maxValue, 1) : 0;
	const slots = progressVariants({ size, variant, duration });

	return (
		<div
			className={cn(slots.root(), classNames?.root)}
			style={{ transform: 'translateZ(0)' }}
		>
			<div
				className={cn(slots.indicator(), classNames?.indicator)}
				style={{ transform: `translateX(-${(1 - ratio) * 100}%)` }}
			/>
		</div>
	);
}
