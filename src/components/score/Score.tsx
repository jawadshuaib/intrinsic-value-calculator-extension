import React, { useState } from 'react';
import { MetricsObject } from '../../storage/storage';
import { RateOfReturnScore } from './RateOfReturnScore';
import { GrowthRateScore } from './GrowthRateScore';
import AverageScore from './AverageScore';

export const Score = function ({ metrics }: { metrics: MetricsObject }) {
	const [score, setScore] = useState({ growthRate: 0, rateOfReturn: 0 });
	const avg = ((score.growthRate + score.rateOfReturn) / 2).toFixed(0);

	return (
		<section className='my-3'>
			<AverageScore avg={Number(avg)} />
			<GrowthRateScore metrics={metrics} setScore={setScore} />
			<RateOfReturnScore metrics={metrics} setScore={setScore} />
		</section>
	);
};
