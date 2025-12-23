import { config } from '@/config';
import { cn } from '@/utils/cn';
import * as React from 'react';

// Simple logo using an image file. Place your logo in public/logo.svg or update the src as needed.
export const Logo: React.FC<{ className?: string }> = ({ className }) => (
	<img
		src="/logo.svg"
		alt={config.title}
		title={config.title}
		className={cn('h-9', className)}
	/>
);
