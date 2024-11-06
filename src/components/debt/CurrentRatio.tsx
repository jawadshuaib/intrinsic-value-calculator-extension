import React from 'react';
import { MetricsObject } from '../../storage/storage';
import { Thresholds } from '../types';
import { getColor } from '../../../utils/getColor';
export const CurrentRatio = function ({ metrics }: { metrics: MetricsObject }) {
	const crMetrics = Object.entries(metrics).filter(
		([_, metric]) => metric.abv === 'cr'
	);

	if (crMetrics.length === 0) return;

	// Grab the first value from the epsMetrics array
	// and destructure the values array from the object
	// and assign it to the epsValues variable
	const crMetric = crMetrics[0];
	const crValues = crMetric[1].values;
	// Assuming epsValues is an array, make sure it has elements
	if (crValues.length === 0) return;

	const currentRatio = crValues[0];
	const thresholds: Thresholds = {
		great: 2,
		good: 1.5,
		ok: 1,
	};
	const color = getColor(currentRatio, thresholds);
	return (
		<span className={`p-3 border rounded-md text-lg ${color}`}>
			Current Ratio:{' '}
			<span className='font-bold'>{currentRatio.toFixed(2)}</span>
		</span>
	);
};
