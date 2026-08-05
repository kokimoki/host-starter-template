import { tv } from 'tailwind-variants';

export const timeCountdownVariants = tv({
	slots: {
		base: 'inline-flex items-baseline',
		part: '',
		separator: ''
	}
});

export type TimeCountdownClassNames = {
	base?: string;
	part?: string;
	separator?: string;
};
