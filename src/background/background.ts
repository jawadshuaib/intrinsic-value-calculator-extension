import {
	DEFAULT_METRICS,
	LocalStorage,
	setStoredFields,
} from '../storage/storage';

const fields: LocalStorage = {
	metrics: DEFAULT_METRICS.metrics,
};

// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
	setStoredFields(fields);
});
