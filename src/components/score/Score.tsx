import React, { useState } from 'react';
import { MetricsObject } from '../../storage/storage';
import { RateOfReturnScore } from './RateOfReturnScore';
import { GrowthRateScore } from './GrowthRateScore';
import AverageScore from './AverageScore';
import { CustomFlowbiteTheme, Table } from 'flowbite-react';
import { OverallScoreThresholds } from '../../../utils/calculateOverallScore';
import { getColor } from '../../../utils/getColor';

export const Score = function ({ metrics }: { metrics: MetricsObject }) {
	const [rateOfReturn, setRateOfReturn] = useState(0);
	const [growthRate, setGrowthRate] = useState(0);
	const avg = (rateOfReturn + growthRate) / 2;

	const avgColor = getColor(avg, OverallScoreThresholds);

	const customTheme: CustomFlowbiteTheme['table'] = {
		root: {
			shadow: '',
		},
	};

	const updateRateOfReturn = (value: number) => {
		setRateOfReturn(value);
	};

	const updateGrowthRate = (value: number) => {
		setGrowthRate(value);
	};

	return (
		<Table className='py-3' theme={customTheme}>
			<Table.Body>
				<Table.Row>
					<Table.Cell colSpan={2} className={avgColor}>
						{/* Overall Score  */}
						<AverageScore avg={avg} />
					</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						{/* Management */}
						<RateOfReturnScore
							metrics={metrics}
							onUpdate={updateRateOfReturn}
						/>
					</Table.Cell>
					<Table.Cell>
						{/* Moat */}
						<GrowthRateScore metrics={metrics} onUpdate={updateGrowthRate} />
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	);
};
