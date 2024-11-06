import React from 'react';
import { MetricsObject } from '../../storage/storage';
export const CurrentRatio = function ({ metrics }: { metrics: MetricsObject }) {
	const crMetrics = Object.entries(metrics).filter(
		([_, metric]) => metric.abv === 'cr'
	);

	if (crMetrics.length === 0) {
		return;
	}

	// Grab the first value from the epsMetrics array
	// and destructure the values array from the object
	// and assign it to the epsValues variable
	const crMetric = crMetrics[0];
	const crValues = crMetric[1].values;
	// Assuming epsValues is an array, make sure it has elements
	if (crValues.length === 0) {
		return;
	}

	const currentRatio = crValues[0];
	console.log('Current Ratio', currentRatio);
	return (
		<section className='my-4'>
			<span className='p-3 bg-slate-800 text-slate-100 border rounded-md text-lg'>
				Current Ratio:{' '}
				<span className='font-bold'>{currentRatio.toFixed(2)}</span>
			</span>
		</section>
	);
};
