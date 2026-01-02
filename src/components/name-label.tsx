import { config } from '@/config';
import * as React from 'react';

interface NameLabelProps {
	name: string;
}

export const NameLabel: React.FC<NameLabelProps> = ({ name }) => {
	return (
		<div className="flex items-center gap-4">
			<div className="flex items-center gap-2">
				<span className="text-slate-500">{config.playerNameLabel}</span>
				<span className="font-semibold">{name}</span>
			</div>
		</div>
	);
};
