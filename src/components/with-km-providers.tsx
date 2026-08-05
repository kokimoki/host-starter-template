import {
	KmAudioPlayerProvider,
	KmConfettiProvider,
	KmModalProvider
} from '@kokimoki/react-components';
import type { ComponentType } from 'react';
/**
 * HOC that wraps a component with all Kokimoki shared providers.
 * Includes: KmAudioPlayerProvider, KmConfettiProvider, KmModalProvider.
 *
 * @param Component - The component to wrap with providers.
 * @returns A new component wrapped with all Kokimoki providers.
 *
 * @example
 * ```tsx
 * export default withKmProviders(App);
 * ```
 */
export function withKmProviders<P extends object>(Component: ComponentType<P>) {
	const displayName = Component.displayName || Component.name || 'Component';

	function WithKmProviders(props: P) {
		return (
			<KmAudioPlayerProvider>
				<KmConfettiProvider>
					<KmModalProvider
						dialogClassNames={{
							overlay:
								'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-40 grid place-items-center overflow-y-hidden bg-slate-100/95 xl:py-2.5',
							content:
								'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative z-50 grid w-full max-w-lg gap-4 rounded-lg bg-white p-6 shadow-lg duration-200 md:w-full xl:max-w-prose xl:rounded-xl',
							header: 'flex flex-col space-y-2 text-center sm:text-left',
							title: 'text-3xl font-bold',
							description: 'text-base text-slate-600',
							closeButton:
								'absolute right-0 top-0 z-50 m-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 hover:bg-slate-100',
							closeIcon: 'size-6'
						}}
						drawerClassNames={{
							overlay: 'fixed inset-0 z-30 bg-slate-100/95',
							content:
								'fixed inset-x-0 bottom-0 z-40 mx-[-1px] flex h-full max-h-[90%] w-full flex-col rounded-t-xl bg-white',
							handle: 'my-4 h-1.5 w-12 rounded-full bg-slate-400 py-1',
							header: 'grid gap-2 p-4 text-center sm:text-left',
							footer: 'mt-auto flex flex-col gap-2 bg-slate-100 p-4',
							title: 'text-lg font-semibold leading-none',
							description: 'text-sm text-slate-500',
							closeButton:
								'absolute right-1 top-1 z-50 flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100',
							closeIcon: 'size-5'
						}}
						alertDialogClassNames={{
							overlay:
								'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-40 grid place-items-center overflow-y-hidden bg-slate-100/95 xl:py-2.5',
							content:
								'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative z-50 grid w-full max-w-lg gap-4 rounded-lg bg-white p-6 shadow-lg duration-200 md:w-full xl:max-w-prose xl:rounded-xl',
							header: 'flex flex-col space-y-2 text-center sm:text-left',
							footer:
								'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
							title: 'text-3xl font-bold',
							description: 'text-base text-slate-600',
							action:
								'inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700',
							cancel:
								'mt-2 inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-transparent px-4 py-2 text-sm font-medium hover:bg-slate-100 sm:mt-0'
						}}
					>
						<Component {...props} />
					</KmModalProvider>
				</KmConfettiProvider>
			</KmAudioPlayerProvider>
		);
	}

	WithKmProviders.displayName = `withKmProviders(${displayName})`;

	return WithKmProviders;
}
