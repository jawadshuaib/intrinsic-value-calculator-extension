import { Thresholds } from '../src/components/types';

interface ThresholdCounts {
	great: number;
	good: number;
	ok: number;
	poor: number;
}

export default function getThresholdCounts(
	values: number[],
	thresholds: Thresholds
): ThresholdCounts {
	// Ensure none of the thresholds are undefined
	if (
		!thresholds ||
		typeof thresholds.great !== 'number' ||
		typeof thresholds.good !== 'number' ||
		typeof thresholds.ok !== 'number'
	) {
		return;
	}

	// Initialize counters for each threshold level
	let greatCount = 0;
	let goodCount = 0;
	let okCount = 0;
	let poorCount = 0;

	// Iterate over each value to determine its threshold level
	values.forEach((value) => {
		if (value >= thresholds.great) {
			greatCount++;
		} else if (value >= thresholds.good) {
			goodCount++;
		} else if (value >= thresholds.ok) {
			okCount++;
		} else {
			poorCount++;
		}
	});

	// Return the counts for each threshold level
	return {
		great: greatCount,
		good: goodCount,
		ok: okCount,
		poor: poorCount,
	};
}
