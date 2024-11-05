export interface Metric {
	section: string;
	abv: 'roce' | 'roe' | 'roa' | 'sps' | 'eps' | 'bvps' | 'pe';
	title: string;
	matches: string;
	values?: number[];
	method: 'cagr' | 'median';
}

export interface LocalStorage {
	metrics: {
		roce: Metric;
		roe: Metric;
		roa: Metric;
		sps: Metric;
		eps: Metric;
		bvps: Metric;
		pe: Metric;
	};
}

export const RateOfReturn = 'rate_of_return';
export const GrowthRates = 'growth_rates';
export const ValuationRatios = 'valuation_ratios';
const CAGR = 'cagr';
const Median = 'median';

export const DEFAULT_METRICS: LocalStorage = {
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
	},
};

export type MetricsObject = LocalStorage['metrics'];

type LocalStorageKeys = keyof LocalStorage;

export function setStoredFields(fields: LocalStorage): Promise<void> {
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
