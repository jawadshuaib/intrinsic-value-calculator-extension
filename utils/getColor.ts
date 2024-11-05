import { Thresholds } from '../src/components/types';
import { COLORS } from './colors';

// Set the color of the cell based on the thresholds
export const getColor = (value: number, thresholds: Thresholds) => {
	if (!thresholds) return COLORS.transparent;

	if (value >= thresholds.great) {
		return COLORS.great;
	} else if (value >= thresholds.good) {
		return COLORS.good;
	} else if (value >= thresholds.ok) {
		return COLORS.ok;
	} else {
		return COLORS.poor;
	}
};
