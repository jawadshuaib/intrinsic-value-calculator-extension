import { MetricsObject } from '../src/storage/storage';

export default function filterMetricsByAbv(
	metrics: MetricsObject,
	abv: string
) {
	return Object.entries(metrics).filter(([_, metric]) => metric.abv === abv);
}
