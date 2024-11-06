import React from 'react';
import { MetricsObject } from '../../storage/storage';
import { RateOfReturnScore } from './RateOfReturnScore';
import { GrowthRateScore } from './GrowthRateScore';

export const Score = function ({ metrics }: { metrics: MetricsObject }) {
	return (
		<section className='my-3'>
			<GrowthRateScore metrics={metrics} />
			<RateOfReturnScore metrics={metrics} />
		</section>
	);
};
