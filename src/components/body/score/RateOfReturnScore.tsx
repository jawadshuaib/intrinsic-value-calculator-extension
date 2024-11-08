import React, { useEffect, useMemo } from 'react';
import {
	MetricsObject,
	OptionsObject,
	RateOfReturn,
} from '../../../storage/storage';
import calculateMedian from '../../../../utils/calculateMedian';
import calculateOverallScore, {
	OverallScoreThresholds,
} from '../../../../utils/calculateOverallScore';
import { RateOfReturnThresholds } from '../rateOfReturn/RateOfReturnSection';
import filterMetricsBySection from '../../../../utils/filterMetricsBySection';
import extractMetricsData from '../../../../utils/extractMetricsData';
import { getColor } from '../../../../utils/getColor';

export const RateOfReturnScore = function ({
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
		const rateOfReturnMetrics = filterMetricsBySection(metrics, RateOfReturn);
		const rateOfReturnData = extractMetricsData(rateOfReturnMetrics);

		let total = 0;
		rateOfReturnData.forEach((metric) => {
			const medians = calculateMedian(metric.values, options.ignoreFirst);

			const current = medians.current.median;
			const half = medians.half.median;
			const full = medians.full.median;

			const score = calculateOverallScore(
				[current, half, full],
				RateOfReturnThresholds
			);
			total += score;
		});

		return total / rateOfReturnData.length;
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
			<div>Management</div>
		</div>
	);
};
