export default function findMedian(array: number[]): number {
	// Ensure array is sorted
	array.sort((a, b) => a - b);
	const len = array.length;
	if (len % 2 === 0) {
		// Even number of elements, take the average of two middle elements
		return (array[len / 2 - 1] + array[len / 2]) / 2;
	} else {
		// Odd number of elements, return the middle element
		return array[Math.floor(len / 2)];
	}
}
