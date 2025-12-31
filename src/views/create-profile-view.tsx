import { config } from '@/config';
import { playerActions } from '@/state/actions/player-actions';
import { globalStore } from '@/state/stores/global-store';
import { useSnapshot } from '@kokimoki/app';
import * as React from 'react';
import Markdown from 'react-markdown';

interface Props {
	className?: string;
}

/**
 * View to create a player profile by entering a name
 *
 * This example is **optional** and can be removed if not needed
 */
export const CreateProfileView: React.FC<Props> = () => {
	const [name, setName] = React.useState('');
	const [selectedTeam, setSelectedTeam] = React.useState<0 | 1>(0);
	const [isLoading, setIsLoading] = React.useState(false);
	const { teams } = useSnapshot(globalStore.proxy);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const trimmedName = name.trim();
		if (!trimmedName) return;

		setIsLoading(true);
		try {
			await playerActions.setPlayerName(trimmedName, selectedTeam);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mx-auto w-full max-w-96 space-y-12">
			<article className="prose text-center">
				<Markdown>{config.createProfileMd}</Markdown>
			</article>
			<form onSubmit={handleSubmit} className="grid gap-4">
				<input
					type="text"
					placeholder={config.playerNamePlaceholder}
					value={name}
					onChange={(e) => setName(e.target.value)}
					disabled={isLoading}
					autoFocus
					maxLength={50}
					className="km-input"
				/>

				<div className="space-y-2">
					<label className="block text-center font-medium text-slate-700">
						{config.selectTeamLabel}
					</label>
					<div className="grid grid-cols-2 gap-3">
						<button
							type="button"
							onClick={() => setSelectedTeam(0)}
							disabled={isLoading}
							className={
								selectedTeam === 0 ? 'km-btn-primary' : 'km-btn-secondary'
							}
						>
							{teams[0].name}
						</button>
						<button
							type="button"
							onClick={() => setSelectedTeam(1)}
							disabled={isLoading}
							className={
								selectedTeam === 1 ? 'km-btn-primary' : 'km-btn-secondary'
							}
						>
							{teams[1].name}
						</button>
					</div>
				</div>

				<button
					type="submit"
					className="km-btn-primary w-full"
					disabled={!name.trim() || isLoading}
				>
					{isLoading ? (
						<>
							<span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-b-2 border-white"></span>
							{config.loading}
						</>
					) : (
						config.playerNameButton
					)}
				</button>
			</form>
		</div>
	);
};
