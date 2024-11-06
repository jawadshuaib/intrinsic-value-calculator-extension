import React from 'react';
import { MetricsObject, RateOfReturn } from '../../storage/storage';
import calculateMedian from '../../../utils/calculateMedian';
import calculateOverallScore from '../../../utils/calculateOverallScore';
import { RateOfReturnThresholds } from '../rateOfReturn/RateOfReturnSection';
import filterMetricsBySection from '../../../utils/filterMetricsBySection';
import extractMetricsData from '../../../utils/extractMetricsData';

export const RateOfReturnScore = function ({
	metrics,
}: {
	metrics: MetricsObject;
}) {
	const rateOfReturnMetrics = filterMetricsBySection(metrics, RateOfReturn);
	const rateOfReturnData = extractMetricsData(rateOfReturnMetrics);

	let total = 0;
	rateOfReturnData.forEach((metric) => {
		const medians = calculateMedian(metric.values);

		const current = medians.current.median;
		const half = medians.half.median;
		const full = medians.full.median;

		const score = calculateOverallScore(
			[current, half, full],
			RateOfReturnThresholds
		);
		total += score;
	});

	const avg = ((total / rateOfReturnData.length) * 100).toFixed(0);

	return <span className='my-3'>Management: {avg}</span>;
};
