import React from 'react';
import { EPS, MetricsObject, PE } from '../../storage/storage';
import filterMetricsByAbv from '../../../utils/filterMetricsByAbv';
import extractMetricsData from '../../../utils/extractMetricsData';
import calculateCAGR from '../../../utils/calculateCAGR';

export const PEG = function ({ metrics }: { metrics: MetricsObject }) {
	const epsMetrics = filterMetricsByAbv(metrics, EPS);
	const peMetrics = filterMetricsByAbv(metrics, PE);

	if (peMetrics.length === 0 || epsMetrics.length === 0) return;

	const epsData = extractMetricsData(epsMetrics);
	const peData = extractMetricsData(peMetrics);

	const peValues = peData[0].values;
	// Assuming it is an array, make sure it has elements
	if (peValues.length === 0) return;

	const epsGrowthRate = calculateCAGR(epsData[0].values);
	const pe = peValues[0];

	if (!epsGrowthRate.full.cagr || epsGrowthRate.full.cagr === 0) return;

	const peg = pe / epsGrowthRate.full.cagr;
	let color = '';
	// Create enum for colors
	if (peg < 0.25) {
		color = 'bg-green-800 text-slate-100';
	} else if (peg < 0.5) {
		color = 'bg-green-600 text-slate-100';
	} else if (peg < 0.75) {
		color = 'bg-green-300 text-slate-800';
	} else if (peg < 1) {
		color = 'bg-yellow-600 text-slate-600';
	} else if (peg < 1.5) {
		color = 'bg-red-600 text-slate-100';
	} else {
		color = 'bg-red-800 text-slate-100';
	}

	return (
		<div className={`my-3 p-3  border rounded-md text-lg ${color}`}>
			Price to Earnings Growth Ratio:{' '}
			<span
				className='font-bold'
				title='PEG is especially useful for growth oriented companies.'
			>
				{peg.toFixed(2)}
			</span>
		</div>
	);
};
