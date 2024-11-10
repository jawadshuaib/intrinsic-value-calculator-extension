import { MetricsObject } from '../src/storage/storage';

export default function hasValueLengthGreaterThanOne(
	data: MetricsObject
): boolean {
	for (let key in data) {
		if (data[key].values && data[key].values.length > 1) {
			return true;
		}
	}
	return false;
}
