import { Thresholds } from '../src/components/types';
import getThresholdCounts from './getThresholdCounts';

export const OverallScoreThresholds = {
	great: 0.89,
	good: 0.79,
	ok: 0.49,
};

// Function to calculate the overall score based on threshold counts
export default function calculateOverallScore(
	values: number[],
	thresholds: Thresholds
): number {
	const thresholdCounts = getThresholdCounts(values, thresholds);
	if (thresholdCounts === undefined) return;
	// Calculate score based on the given weights
	const score =
		thresholdCounts.great * 1 +
		thresholdCounts.good * 0.8 +
		thresholdCounts.ok * 0.5 +
		thresholdCounts.poor * 0;

	// Calculate the average score by dividing by the total number of values
	const averageScore = values.length > 0 ? score / values.length : 0;

	return averageScore;
}
