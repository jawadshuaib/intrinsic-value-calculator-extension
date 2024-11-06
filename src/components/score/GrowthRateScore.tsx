import React from 'react';
import { GrowthRates, MetricsObject } from '../../storage/storage';
import calculateMedian from '../../../utils/calculateMedian';
import calculateOverallScore, {
	OverallScoreThresholds,
} from '../../../utils/calculateOverallScore';
import { RateOfReturnThresholds } from '../rateOfReturn/RateOfReturnSection';
import filterMetricsBySection from '../../../utils/filterMetricsBySection';
import extractMetricsData from '../../../utils/extractMetricsData';
import calculateCAGR from '../../../utils/calculateCAGR';
import { getColor } from '../../../utils/getColor';

export const GrowthRateScore = function ({
	metrics,
	setScore,
}: {
	metrics: MetricsObject;
	setScore: React.Dispatch<
		React.SetStateAction<{ growthRate: number; rateOfReturn: number }>
	>;
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

	const avg = total / growthRateData.length;
	const percentage = (avg * 100).toFixed(0);
	setScore((prev) => ({ ...prev, growthRate: Number(percentage) }));

	const color = getColor(avg, OverallScoreThresholds);

	return (
		<div className='text-center text-lg border rounded-md'>
			<div className={color}>{percentage}</div>
			<div>MOAT</div>
		</div>
	);
};
