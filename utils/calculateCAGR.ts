export default function calculateCAGR(
	arr: number[],
	ignoreFirst: boolean = true
): {
	full: { cagr: number; length: number };
	half: { cagr: number; length: number };
	current: { cagr: number; length: number };
} {
	// Helper function to calculate CAGR
	function calculateCAGR(
		startValue: number,
		endValue: number,
		periods: number
	): number {
		return Math.pow(endValue / startValue, 1 / periods) - 1;
	}
	// If ignoreFirst is true, use a slice of arr without the first element
	const effectiveArr = ignoreFirst ? arr.slice(1) : arr;
	const lengthFull = effectiveArr.length;
	const lengthHalf = Math.ceil(lengthFull / 2);

	// Calculate CAGR for the full array (using effectiveArr)
	const fullCAGR = calculateCAGR(
		effectiveArr[lengthFull - 1],
		effectiveArr[0],
		lengthFull - 1
	);

	// Calculate CAGR for the first half of the array (using effectiveArr)
	const halfArray = effectiveArr.slice(0, lengthHalf);
	const halfCAGR = calculateCAGR(
		halfArray[halfArray.length - 1],
		halfArray[0],
		halfArray.length - 1
	);

	// Calculate CAGR for the current year (based on the last two values in the original array)
	const currentCAGR =
		arr.length > 1
			? calculateCAGR(effectiveArr[1], effectiveArr[0], 1) // Period is 1 year between the two most recent values
			: 0;

	return {
		full: {
			cagr: parseFloat((fullCAGR * 100).toFixed(2)), // Converted to percentage
			length: lengthFull,
		},
		half: {
			cagr: parseFloat((halfCAGR * 100).toFixed(2)), // Converted to percentage
			length: lengthHalf,
		},
		current: {
			cagr: parseFloat((currentCAGR * 100).toFixed(2)), // Converted to percentage
			length: 2,
		},
	};
}
