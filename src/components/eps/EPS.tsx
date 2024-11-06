import React from 'react';
import { MetricsObject } from '../../storage/storage';
export const EPS = function ({ metrics }: { metrics: MetricsObject }) {
	const epsMetrics = Object.entries(metrics).filter(
		([_, metric]) => metric.abv === 'eps'
	);

	if (epsMetrics.length === 0) {
		return <span className='my-3'>No EPS data available</span>;
	}

	// Grab the first value from the epsMetrics array
	// and destructure the values array from the object
	// and assign it to the epsValues variable
	const epsMetric = epsMetrics[0];
	const epsValues = epsMetric[1].values;
	// Assuming epsValues is an array, make sure it has elements
	if (epsValues.length === 0) {
		return <span className='my-3'>No EPS values available</span>;
	}

	const eps = epsValues[0];
	return (
		<section className='my-4'>
			<span className='p-3 bg-slate-100 text-slate-800 border rounded-md text-lg'>
				Earnings per Share: <span className='font-bold'>{eps}</span>
			</span>
		</section>
	);
};
