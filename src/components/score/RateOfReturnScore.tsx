import React from 'react';
import { MetricsObject, RateOfReturn } from '../../storage/storage';
import calculateMedian from '../../../utils/calculateMedian';
import calculateOverallScore, {
	OverallScoreThresholds,
} from '../../../utils/calculateOverallScore';
import { RateOfReturnThresholds } from '../rateOfReturn/RateOfReturnSection';
import filterMetricsBySection from '../../../utils/filterMetricsBySection';
import extractMetricsData from '../../../utils/extractMetricsData';
import { getColor } from '../../../utils/getColor';

export const RateOfReturnScore = function ({
	metrics,
	setScore,
}: {
	metrics: MetricsObject;
	setScore: React.Dispatch<
		React.SetStateAction<{ growthRate: number; rateOfReturn: number }>
	>;
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

	const avg = total / rateOfReturnData.length;
	const percentage = (avg * 100).toFixed(0);
	setScore((prev) => ({ ...prev, rateOfReturn: Number(percentage) }));

	const color = getColor(avg, OverallScoreThresholds);

	return (
		<div className='text-center text-lg border rounded-md'>
			<div className={color}>{percentage}</div>
			<div>Management</div>
		</div>
	);
};
