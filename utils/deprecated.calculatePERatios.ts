// // Objective: Calculate PE ratios from metrics data
// // The function should take in a metrics object and return an array of PE ratios
// import { MetricsObject, OptionsObject, PE } from '../src/storage/storage';
// import calculateMedian from './calculateMedian';
// import extractMetricsData from './extractMetricsData';
// import filterMetricsByAbv from './filterMetricsByAbv';

// export default function calculatePERatios(
// 	metrics: MetricsObject,
// 	options: OptionsObject
// ) {
// 	const peMetrics = filterMetricsByAbv(metrics, PE);
// 	const peData = extractMetricsData(peMetrics);
// 	const peRatios = [];
// 	peData.forEach((metric) => {
// 		const pes = calculateMedian(metric.values, options.ignoreFirst);
// 		// Add only if calculated number is not NaN
// 		if (!isNaN(pes.current.median)) peRatios.push(pes.current.median);
// 		if (!isNaN(pes.half.median)) peRatios.push(pes.half.median);
// 		if (!isNaN(pes.full.median)) peRatios.push(pes.full.median);
// 	});
// 	return peRatios;
// }
