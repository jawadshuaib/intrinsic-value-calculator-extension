export interface Metric {
	section: string;
	abv: 'roce' | 'roe' | 'roa' | 'sps' | 'eps' | 'bvps' | 'pe' | 'cr';
	title: string;
	matches: string;
	values?: number[];
	method: 'cagr' | 'median';
}

export interface LocalStorage {
	options?: {
		ignoreFirst: boolean;
	};
	metrics: {
		roce: Metric;
		roe: Metric;
		roa: Metric;
		sps: Metric;
		eps: Metric;
		bvps: Metric;
		pe: Metric;
		cr: Metric;
	};
}

export const RateOfReturn = 'rate_of_return';
export const GrowthRates = 'growth_rates';
export const ValuationRatios = 'valuation_ratios';
export const DebtProfile = 'debt_profile';
export const PE = 'pe';
export const EPS = 'eps';

const CAGR = 'cagr';
const Median = 'median';

export const DEFAULT_METRICS: LocalStorage = {
	options: {
		ignoreFirst: true,
	},
	metrics: {
		roce: {
			section: RateOfReturn,
			abv: 'roce',
			title: 'Return on Capital Employed',
			matches: 'ROCE,Return on Capital Employed',
			method: Median,
		},
		roe: {
			section: RateOfReturn,
			abv: 'roe',
			title: 'Return on Equity',
			matches: 'ROE,Return on Equity',
			method: Median,
		},
		roa: {
			section: RateOfReturn,
			abv: 'roa',
			title: 'Return on Assets',
			matches: 'ROA,Return on Assets',
			method: Median,
		},
		sps: {
			section: GrowthRates,
			abv: 'sps',
			title: 'Sales per Share',
			matches: 'SPS,Sales per Share,Revenue per Share',
			method: CAGR,
		},
		eps: {
			section: GrowthRates,
			abv: 'eps',
			title: 'Earnings per Share',
			matches: 'EPS,Earnings per Share',
			method: CAGR,
		},
		bvps: {
			section: GrowthRates,
			abv: 'bvps',
			title: 'Book Value per Share',
			matches: 'BVPS,Book Value per Share',
			method: CAGR,
		},
		pe: {
			section: ValuationRatios,
			abv: 'pe',
			title: 'Price Earning Ratio',
			matches: 'PE,Price to Earnings Ratio,Price Earning Ratio',
			method: Median,
		},
		cr: {
			section: DebtProfile,
			abv: 'cr',
			title: 'Current Ratio',
			matches: 'Current Ratio',
			method: Median,
		},
	},
};

export type MetricsObject = LocalStorage['metrics'];
export type OptionsObject = LocalStorage['options'];

type LocalStorageKeys = keyof LocalStorage;

export function setStoredFields(fields: LocalStorage | null): Promise<void> {
	if (!fields) {
		// Clear all fields if null is passed
		return new Promise((resolve, reject) => {
			chrome.storage.local.clear(() => {
				resolve();
			});
		});
	}
	return new Promise((resolve) => {
		chrome.storage.local.set(fields, () => {
			resolve();
		});
	});
}

// Updated function
export function getStoredFields(): Promise<MetricsObject> {
	const keys: LocalStorageKeys[] = ['metrics'];
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (result: Partial<LocalStorage>) => {
			// Ensure metrics exist in the result before resolving
			resolve(result.metrics ?? DEFAULT_METRICS.metrics);
		});
	});
}

export function getStoredOptions(): Promise<OptionsObject> {
	const keys: LocalStorageKeys[] = ['options'];
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (result: Partial<LocalStorage>) => {
			resolve(result.options ?? DEFAULT_METRICS.options);
		});
	});
}
