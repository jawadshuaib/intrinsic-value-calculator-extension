import findMedian from './findMedian';

export default function calculateMedian(
	arr: number[],
	ignoreFirst: boolean = true
): {
	full: { median: number; length: number };
	half: { median: number; length: number };
	current: { median: number; length: number };
} {
	// Use `effectiveArr` based on ignoreFirst
	const effectiveArr = ignoreFirst ? arr.slice(1) : arr;
	const lengthFull = effectiveArr.length;

	// Check if `effectiveArr` is empty after slicing
	if (lengthFull === 0) {
		throw new Error("Array can't be empty after ignoring the first element");
	}

	// Median and length of the full array
	const medianFull = findMedian([...effectiveArr]);

	// Median and length of half the array (first half)
	const halfLength = Math.ceil(lengthFull / 2);
	const halfArray = effectiveArr.slice(0, halfLength);
	const medianHalf = findMedian([...halfArray]);
	const lengthHalf = halfArray.length;

	// Current median (the first value in the original array)
	const currentMedian = parseFloat(arr[0].toFixed(2));

	return {
		full: {
			median: parseFloat(medianFull.toFixed(2)),
			length: lengthFull,
		},
		half: {
			median: parseFloat(medianHalf.toFixed(2)),
			length: lengthHalf,
		},
		current: {
			median: currentMedian,
			length: 1,
		},
	};
}
