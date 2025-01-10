import React from 'react';
import { MetricsObject, OptionsObject } from '../../../storage/storage';
import calculateGrowthRate from '../../../../utils/calculateGrowthRate';
import filterMetricsByAbv from '../../../../utils/filterMetricsByAbv';
import SensitivityTable from './SensitivityTable';
import calculateEPSRatios from '../../../../utils/calculateEPSRatios';

export const IntrinsicValue = function ({
	metrics,
	options,
}: {
	metrics: MetricsObject;
	options: OptionsObject;
}) {
	const epsMetrics = filterMetricsByAbv(metrics, 'eps');
	if (epsMetrics.length === 0) return;

	// Required rate of return
	// const ror = 15;
	// const currentEPS = epsMetrics[0][1].values[0];
	// const peRatios = calculatePERatios(metrics, options).sort((a, b) => a - b);

	const epsRatios = calculateEPSRatios(metrics, options);
	const growthRate = calculateGrowthRate(metrics, options);
	const discountRate = 15;
	const terminalGrowthRate = 4;

	const growthRates = [
		growthRate * 0.4,
		growthRate * 0.6,
		growthRate * 0.8,
		growthRate,
	];
	return (
		<section className='my-3'>
			<h2 className='text-xl mb-2'>Intrinsic Valuations</h2>
			{/* <Paragraph className='text-slate-600'>
				Current Growth Rate: {growthRate.toFixed(0)}%
			</Paragraph> */}
			<SensitivityTable
				epsRatios={epsRatios}
				discountRate={discountRate}
				terminalGrowthRate={terminalGrowthRate}
				growthRates={growthRates}
			/>
		</section>
	);
};
