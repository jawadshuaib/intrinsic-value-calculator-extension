import { GrowthRates, MetricsObject } from '../src/storage/storage';
import calculateCAGR from './calculateCAGR';
import extractMetricsData from './extractMetricsData';
import filterMetricsBySection from './filterMetricsBySection';
import findMedian from './findMedian';

export default function calculateGrowthRate(metrics: MetricsObject): number {
	const growthRateMetrics = filterMetricsBySection(metrics, GrowthRates);
	const growthRateData = extractMetricsData(growthRateMetrics);

	const cagrArr = [];
	growthRateData.forEach((metric) => {
		const cagrs = calculateCAGR(metric.values);
		// Add only if calculated CAGR is not NaN
		if (!isNaN(cagrs.current.cagr)) cagrArr.push(cagrs.current.cagr);
		if (!isNaN(cagrs.half.cagr)) cagrArr.push(cagrs.half.cagr);
		if (!isNaN(cagrs.full.cagr)) cagrArr.push(cagrs.full.cagr);
	});

	return findMedian(cagrArr);
}
