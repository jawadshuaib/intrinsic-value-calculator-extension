import {
	DEFAULT_METRICS,
	LocalStorage,
	setStoredFields,
} from '../storage/storage';

const fields: LocalStorage = {
	metrics: DEFAULT_METRICS.metrics,
};

// Set initial metrics in storage when extension is installed
chrome.runtime.onInstalled.addListener(() => {
	setStoredFields(fields);
});

// Listen for messages from the popup to execute contentScript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'runContentScript') {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs[0]?.id) {
				chrome.scripting.executeScript(
					{
						target: { tabId: tabs[0].id },
						files: ['contentScript.js'],
					},
					() => {
						sendResponse();
					}
				);
			}
		});
		return true; // Required to use sendResponse asynchronously
	}
});
