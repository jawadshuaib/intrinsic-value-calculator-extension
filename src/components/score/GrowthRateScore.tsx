import React, { useEffect, useMemo } from 'react';
import {
	GrowthRates,
	MetricsObject,
	OptionsObject,
} from '../../storage/storage';
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
	options,
	onUpdate,
}: {
	metrics: MetricsObject;
	options: OptionsObject;
	onUpdate: (value: number) => void;
}) {
	// Use useMemo to memoize the calculated average to avoid recalculating it on every render.
	const avg = useMemo(() => {
		const growthRateMetrics = filterMetricsBySection(metrics, GrowthRates);
		const growthRateData = extractMetricsData(growthRateMetrics);

		let total = 0;
		growthRateData.forEach((metric) => {
			const cagrs = calculateCAGR(metric.values, options.ignoreFirst);

			const current = cagrs.current.cagr;
			const half = cagrs.half.cagr;
			const full = cagrs.full.cagr;

			const score = calculateOverallScore(
				[current, half, full],
				RateOfReturnThresholds
			);
			total += score;
		});

		return total / growthRateData.length;
	}, [metrics]); // Only recalculate if `metrics` changes.

	// Use useEffect to trigger the update only when `avg` changes.
	useEffect(() => {
		onUpdate(avg);
	}, [avg, onUpdate]);

	const percentage = (avg * 100).toFixed(0);
	const color = getColor(avg, OverallScoreThresholds);

	return (
		<div className='text-center text-lg border rounded-md'>
			<div className={color}>{percentage}</div>
			<div>MOAT</div>
		</div>
	);
};
