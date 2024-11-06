import React from 'react';
import { MetricsObject } from '../../storage/storage';
import calculateGrowthRate from '../../../utils/calculateGrowthRate';

export const IntrinsicValue = function ({
	metrics,
}: {
	metrics: MetricsObject;
}) {
	const growthRate = calculateGrowthRate(metrics);
	return (
		<span className='p-3 bg-slate-100 text-slate-800 border rounded-md text-lg'>
			Growth Rate: {growthRate.toFixed(2)}%
		</span>
	);
};
