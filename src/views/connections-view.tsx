import { Badge } from '@/components/ui/badge';
import { usePlayersWithOnlineStatus } from '@/hooks/usePlayersWithOnlineStatus';
import { kmClient } from '@/services/km-client';
import { cn } from '@kokimoki/react-components/utils';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';

interface ConnectionViewProps {
	children?: ReactNode;
}

/**
 * Example view demonstrating how to display players and their online status.
 * Shows usage of `usePlayersWithOnlineStatus` hook for player list with presence.
 * Modify or replace with your own implementation.
 */
export function ConnectionsView({ children }: ConnectionViewProps) {
	const { t } = useTranslation();
	const { players, onlinePlayersCount } = usePlayersWithOnlineStatus();

	const isPresenter = kmClient.clientContext.mode === 'presenter';

	return (
		<div className="w-full space-y-8">
			<div className="flex items-center justify-between gap-8">
				<article
					className={cn(
						'prose',
						isPresenter && 'lg:prose-lg xl:prose-xl 2xl:prose-2xl'
					)}
				>
					<h1>
						{onlinePlayersCount} {t('presenter:players')}
					</h1>

					<Markdown>{t('presenter:connectionsMd')}</Markdown>
				</article>

				{children}
			</div>

			{players.length > 0 && (
				<ul className="w-full divide-y divide-slate-300 lg:text-lg xl:text-xl 2xl:text-2xl">
					{players.map((player) => (
						<li key={player.id} className="py-6">
							<div className="flex items-center justify-between">
								<span className="font-semibold">{player.name}</span>
								<Badge variant={player.isOnline ? 'primary' : 'ghost'}>
									{player.isOnline ? t('common:online') : t('common:offline')}
								</Badge>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
