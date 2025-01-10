// Objective: Calculate median EPS ratio from metrics data
// The function should take in a metrics object and return an array of EPS ratios
import { MetricsObject, OptionsObject, EPS } from '../src/storage/storage';
import calculateMedian from './calculateMedian';
import extractMetricsData from './extractMetricsData';
import filterMetricsByAbv from './filterMetricsByAbv';

export default function calculateEPSRatios(
	metrics: MetricsObject,
	options: OptionsObject
) {
	const epsMetrics = filterMetricsByAbv(metrics, EPS);
	const epsData = extractMetricsData(epsMetrics);
	const epsRatios = [];
	epsData.forEach((metric) => {
		const epss = calculateMedian(metric.values, options.ignoreFirst);
		// Add only if calculated number is not NaN
		if (!isNaN(epss.current.median)) epsRatios.push(epss.current.median);
		if (!isNaN(epss.half.median)) epsRatios.push(epss.half.median);
		if (!isNaN(epss.full.median)) epsRatios.push(epss.full.median);
	});
	return epsRatios;
}
