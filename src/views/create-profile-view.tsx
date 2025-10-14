import { config } from '@/config';
import { playerActions } from '@/state/actions/player-actions';
import { cn } from '@/utils/cn';
import * as React from 'react';

interface Props {
	className?: string;
}

/**
 * View to create a player profile by entering a name
 */
export const CreateProfileView: React.FC<Props> = ({ className }) => {
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
		<div
			className={cn('card bg-base-100 w-full max-w-96 shadow-sm', className)}
		>
			<div className="card-body">
				<h2 className="card-title">{config.playerNameTitle}</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<label className="input">
						<input
							type="text"
							placeholder={config.playerNamePlaceholder}
							value={name}
							onChange={(e) => setName(e.target.value)}
							disabled={isLoading}
							autoFocus
							maxLength={50}
						/>
					</label>
					<button
						type="submit"
						className="btn btn-primary btn-block"
						disabled={!name.trim() || isLoading}
					>
						{isLoading ? (
							<>
								<span className="loading loading-spinner loading-sm"></span>
								{config.loading}
							</>
						) : (
							config.playerNameButton
						)}
					</button>
				</form>
			</div>
		</div>
	);
};
