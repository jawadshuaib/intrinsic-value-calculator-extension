export default function extractMetricsData(metrics: [string, any][]) {
	if (!metrics) return [];

	return metrics
		.map(([_, metric]) => metric)
		.filter((metric) =>
			metrics.values && metric.values.length > 0 ? true : false
		);
}
