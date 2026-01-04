import { config } from '@/config';
import {
	ArrowBigRightDashIcon,
	GiftIcon,
	HeartIcon,
	ShieldIcon
} from 'lucide-react';
import React from 'react';
import Markdown from 'react-markdown';

interface Props {
	className?: string;
}

export const RewardView: React.FC<React.PropsWithChildren<Props>> = ({}) => {
	return (
		<div className="w-full">
			<div className="flex flex-wrap justify-center gap-6">
				<article className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl w-full text-center">
					<GiftIcon className="mb-6 inline size-18 stroke-blue-500" />

					<Markdown>{config.rewardMd}</Markdown>

					<ul className="list-none p-0!">
						<li>
							<button className="km-btn-secondary w-full justify-start!">
								<HeartIcon className="size-5" />
								Heal 10
							</button>
						</li>
						<li>
							<button className="km-btn-secondary w-full justify-start!">
								<ShieldIcon className="size-5" />
								Start next round with 10 armor
							</button>
						</li>
						<li>
							<button className="km-btn-secondary w-full justify-start!">
								<ArrowBigRightDashIcon className="size-5" />
								Skip
							</button>
						</li>
					</ul>
				</article>
			</div>
		</div>
	);
};
