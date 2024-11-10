type StockValuationResult = {
	intrinsicValue: number;
	marginOfSafetyPrice: number;
};

export default function calculateIntrinsicValue(
	currentEPS: number,
	futurePE: number,
	futureGrowthRate: number,
	requiredRateOfReturn: number
): StockValuationResult {
	// Number of years to project (usually 10 years)
	const projectionYears = 10;

	// Convert rates from percentage format to decimal format
	const growthRateDecimal = futureGrowthRate / 100;
	const requiredRateDecimal = requiredRateOfReturn / 100;

	// Step 1: Calculate future EPS after 10 years using the compound growth formula
	const futureEPS =
		currentEPS * Math.pow(1 + growthRateDecimal, projectionYears);

	// Step 2: Calculate the future stock price using the future EPS and future PE ratio
	const futureStockPrice = futureEPS * futurePE;

	// Step 3: Calculate the intrinsic value by discounting the future stock price to the present value
	const intrinsicValue =
		futureStockPrice / Math.pow(1 + requiredRateDecimal, projectionYears);

	// Step 4: Calculate the margin of safety price (50% of intrinsic value)
	const marginOfSafetyPrice = intrinsicValue / 2;

	return {
		intrinsicValue: parseFloat(intrinsicValue.toFixed(2)),
		marginOfSafetyPrice: parseFloat(marginOfSafetyPrice.toFixed(2)),
	};
}
