import { Logo } from '@/components/logo';
import { cn } from '@kokimoki/react-components/utils';
import * as React from 'react';

interface LayoutProps {
	children?: React.ReactNode;
	className?: string;
}

export const HostPresenterRoot = ({ children, className }: LayoutProps) => (
	<div
		className={cn(
			'grid min-h-dvh grid-rows-[auto_1fr_auto] bg-slate-100',
			className
		)}
	>
		{children}
	</div>
);

export const HostPresenterHeader = ({ children, className }: LayoutProps) => (
	<header
		className={cn(
			'sticky top-0 z-10 bg-slate-50/95 shadow-xs backdrop-blur-xs',
			className
		)}
	>
		<div className="container mx-auto flex items-center justify-between p-4">
			<Logo />
			{children}
		</div>
	</header>
);

export const HostPresenterMain = ({ children, className }: LayoutProps) => (
	<main
		className={cn('container mx-auto flex items-center px-4 py-16', className)}
	>
		{children}
	</main>
);

export const HostPresenterFooter = ({ children, className }: LayoutProps) => (
	<footer
		className={cn(
			'sticky bottom-0 z-10 border-t border-slate-200 bg-slate-50/95 backdrop-blur-xs',
			className
		)}
	>
		<div className="container mx-auto flex items-center justify-between p-4">
			{children}
		</div>
	</footer>
);
