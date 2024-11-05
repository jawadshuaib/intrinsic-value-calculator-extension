export interface LocalStorage {
	metrics: {
		roce: string;
		roe: string;
		roa: string;
		sps: string;
		eps: string;
		bvps: string;
		pe: string;
	};
}

export const DEFAULT_METRICS: LocalStorage = {
	metrics: {
		roce: 'ROCE,Return on Capital Employed',
		roe: 'ROE,Return on Equity',
		roa: 'ROA,Return on Assets',
		sps: 'SPS,Sales per Share,Revenue per Share',
		eps: 'EPS,Earnings per Share',
		bvps: 'BVPS,Book Value per Share',
		pe: 'PE,Price to Earnings Ratio,Price Earning Ratio',
	},
};

type LocalStorageKeys = keyof LocalStorage;

export function setStoredFields(fields: LocalStorage): Promise<void> {
	return new Promise((resolve) => {
		chrome.storage.local.set(fields, () => {
			resolve();
		});
	});
}

// Updated function
export function getStoredFields(): Promise<LocalStorage['metrics']> {
	const keys: LocalStorageKeys[] = ['metrics'];
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (result: Partial<LocalStorage>) => {
			// Ensure metrics exist in the result before resolving
			resolve(result.metrics || DEFAULT_METRICS.metrics);
		});
	});
}
