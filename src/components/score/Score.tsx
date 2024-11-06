import React, { useState } from 'react';
import { MetricsObject } from '../../storage/storage';
import { RateOfReturnScore } from './RateOfReturnScore';
import { GrowthRateScore } from './GrowthRateScore';
import AverageScore from './AverageScore';
import { CustomFlowbiteTheme, Table } from 'flowbite-react';

export const Score = function ({ metrics }: { metrics: MetricsObject }) {
	const [score, setScore] = useState({ growthRate: 0, rateOfReturn: 0 });
	const avg = ((score.growthRate + score.rateOfReturn) / 2).toFixed(0);

	const customTheme: CustomFlowbiteTheme['table'] = {
		root: {
			shadow: '',
		},
	};

	return (
		<Table className='py-3' theme={customTheme}>
			<Table.Body>
				<Table.Row>
					<Table.Cell colSpan={2}>
						{/* Overall Score  */}
						<AverageScore avg={Number(avg)} />
					</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						{/* Management */}
						<RateOfReturnScore metrics={metrics} setScore={setScore} />
					</Table.Cell>
					<Table.Cell>
						{/* Moat */}
						<GrowthRateScore metrics={metrics} setScore={setScore} />
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	);
};
