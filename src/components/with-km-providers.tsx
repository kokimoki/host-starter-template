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
					<KmModalProvider>
						<Component {...props} />
					</KmModalProvider>
				</KmConfettiProvider>
			</KmAudioPlayerProvider>
		);
	}

	WithKmProviders.displayName = `withKmProviders(${displayName})`;

	return WithKmProviders;
}
