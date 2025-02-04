// This method employs a DCF using EPS to calculate the intrinsic value of a stock.
import { IntrinsicValueCalculator, ValidationError } from './valuations/eps';

export type StockValuationResult = {
	intrinsicValue: number;
	marginOfSafetyPrice: number;
	error?: string | null;
};

export default function (
	eps: number,
	growthRate: number,
	discountRate: number,
	terminalGrowthRate: number,
	marginOfSafety: number
): StockValuationResult {
	try {
		if (eps <= 0) {
			throw new ValidationError([
				{ code: 'eps', message: 'EPS must be greater than zero' },
			]);
		}

		// Convert percentage values to decimals for calculation
		const calculator = new IntrinsicValueCalculator({
			eps,
			growthRate: growthRate / 100,
			terminalGrowthRate: terminalGrowthRate / 100,
			discountRate: discountRate / 100,
			marginOfSafety: marginOfSafety / 100,
		});

		const result = calculator.calculate();

		return {
			intrinsicValue: result.valuation.intrinsicValue,
			marginOfSafetyPrice: result.valuation.marginOfSafetyPrice,
		};
	} catch (error) {
		// Handle both validation errors and general calculation errors
		const errorMessage =
			error instanceof ValidationError
				? `Validation failed: ${error.errors[0].message}`
				: `Calculation error: ${error}`;

		return {
			intrinsicValue: 0,
			marginOfSafetyPrice: 0,
			error: errorMessage,
		};
	}
}
