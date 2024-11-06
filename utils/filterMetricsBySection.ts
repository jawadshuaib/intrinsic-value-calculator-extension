import { MetricsObject } from '../src/storage/storage';

export default function filterMetricsBySection(
	metrics: MetricsObject,
	section: string
) {
	return Object.entries(metrics).filter(
		([_, metric]) => metric.section === section
	);
}
