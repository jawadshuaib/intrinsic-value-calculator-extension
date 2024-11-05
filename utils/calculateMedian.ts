export default function calculateMedian(
	arr: number[],
	ignoreFirst: boolean = true
): {
	full: { median: number; length: number };
	half: { median: number; length: number };
	current: { median: number; length: number };
} {
	// Helper function to find the median of an array
	function findMedian(array: number[]): number {
		const len = array.length;
		if (len % 2 === 0) {
			// Even number of elements, take the average of two middle elements
			return (array[len / 2 - 1] + array[len / 2]) / 2;
		} else {
			// Odd number of elements, return the middle element
			return array[Math.floor(len / 2)];
		}
	}

	// Use `effectiveArr` based on ignoreFirst
	const effectiveArr = ignoreFirst ? arr.slice(1) : arr;
	const lengthFull = effectiveArr.length;

	// Median and length of the full array
	const medianFull = findMedian(effectiveArr);

	// Median and length of half the array (first half)
	const halfLength = Math.ceil(lengthFull / 2);
	const halfArray = effectiveArr.slice(0, halfLength);
	const medianHalf = findMedian(halfArray);
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

// // Example usage
// const years = [
// 	15.638373706903813, 2.9776279220581516, 1.7564518624212377, 6.199458367157659,
// 	2.4074853786631185, -6.903429035176025, 1.9676393341147285, 1.5517260705657399,
// ];
// const medians = calculateMedian(years);

// console.log("Full array median and length:", medians.full);
// console.log("Half array median and length:", medians.half);
// console.log("Current median and length:", medians.current);
