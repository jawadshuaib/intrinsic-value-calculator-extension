export default function extractMetricsData(metrics: [string, any][]) {
	return metrics
		.map(([_, metric]) => metric)
		.filter((metric) => metric.values.length > 0);
}
