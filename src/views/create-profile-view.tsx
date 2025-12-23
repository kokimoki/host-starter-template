import { config } from '@/config';
import { playerActions } from '@/state/actions/player-actions';
import * as React from 'react';
import Markdown from 'react-markdown';

interface Props {
	className?: string;
}

/**
 * View to create a player profile by entering a name
 */
export const CreateProfileView: React.FC<Props> = () => {
	const [name, setName] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const trimmedName = name.trim();
		if (!trimmedName) return;

		setIsLoading(true);
		try {
			await playerActions.setPlayerName(trimmedName);
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
