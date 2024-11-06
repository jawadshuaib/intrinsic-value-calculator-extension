import React from 'react';
import { GrowthRates, MetricsObject } from '../../storage/storage';
import calculateMedian from '../../../utils/calculateMedian';
import calculateOverallScore from '../../../utils/calculateOverallScore';
import { RateOfReturnThresholds } from '../rateOfReturn/RateOfReturnSection';
import filterMetricsBySection from '../../../utils/filterMetricsBySection';
import extractMetricsData from '../../../utils/extractMetricsData';
import calculateCAGR from '../../../utils/calculateCAGR';

export const GrowthRateScore = function ({
	metrics,
}: {
	metrics: MetricsObject;
}) {
	const growthRateMetrics = filterMetricsBySection(metrics, GrowthRates);
	const growthRateData = extractMetricsData(growthRateMetrics);

	let total = 0;
	growthRateData.forEach((metric) => {
		const cagrs = calculateCAGR(metric.values);

		const current = cagrs.current.cagr;
		const half = cagrs.half.cagr;
		const full = cagrs.full.cagr;

		const score = calculateOverallScore(
			[current, half, full],
			RateOfReturnThresholds
		);
		total += score;
	});

	const avg = ((total / growthRateData.length) * 100).toFixed(0);

	return <span className='my-3'>MOAT: {avg}</span>;
};
