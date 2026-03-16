import {
	HostPresenterFooter,
	HostPresenterHeader,
	HostPresenterMain,
	HostPresenterRoot
} from './host-presenter';
import {
	PlayerFooter,
	PlayerHeader,
	PlayerMain,
	PlayerRoot
} from './player';

/**
 * Layout components for the `host` and `presenter` modes
 *
 * These compound components can be used to structure the host/presenter view
 * and provide a consistent layout across different screens.
 */
export const HostPresenterLayout = {
	Root: HostPresenterRoot,
	Header: HostPresenterHeader,
	Main: HostPresenterMain,
	Footer: HostPresenterFooter
};

/**
 * Layout components for the `player` mode
 *
 * These compound components can be used to structure the player view
 * and provide a consistent layout across different screens.
 */
export const PlayerLayout = {
	Root: PlayerRoot,
	Header: PlayerHeader,
	Main: PlayerMain,
	Footer: PlayerFooter
};
