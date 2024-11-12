import {
	LocalStorage,
	MetricsObject,
	getStoredFields,
	setStoredFields,
} from '../storage/storage';

// Fetch metrics from storage and execute the extractValues function
getStoredFields().then((metrics: MetricsObject) => {
	// Convert each metric's matches (comma-separated keywords) into an array for easier lookup
	const metricsKeywords = Object.entries(metrics).map(([key, metric]) => ({
		key,
		keywords: metric.matches.split(',').map((kw) => kw.trim()), // Trimmed keywords to avoid leading/trailing spaces
	}));

	// Function to extract values from the web page's table rows
	const extractValues = () => {
		// Select all rows within the main table's body where the data is stored
		const tableRows = document.querySelectorAll('table.ui.table tbody tr');

		if (!tableRows.length) {
			setStoredFields(null); // Clear metrics if no rows found
			console.warn(
				'No table rows found in the provided table. Extraction skipped.'
			);
			return; // Return original metrics if no rows found
		}

		// Initialize result object, setting each metric's values as an empty array for storage
		const result: MetricsObject = Object.keys(metrics).reduce((acc, key) => {
			acc[key] = { ...metrics[key], values: [] };
			return acc;
		}, {} as MetricsObject);

		// Loop through each metric's keywords and look for matching rows in the table
		metricsKeywords.forEach(({ key, keywords }) => {
			try {
				// Loop through each row in the table to find and extract relevant data
				tableRows.forEach((row) => {
					// Removed td.title-cell to make it more generic
					const titleCell = row.querySelector('td'); // Locate the title cell

					if (!titleCell) {
						return; // Skip this row if title cell is not found
					}

					// Check if the title cell contains any of the metric keywords
					const matches = keywords.some((keyword) => {
						const regex = new RegExp(`\\b${keyword}\\b`, 'i'); // Case-insensitive word boundary match
						return regex.test(titleCell.textContent?.trim() || '');
					});

					// If a match is found, extract numerical values from the corresponding row
					if (matches) {
						const values: number[] = []; // Array to store numeric values for this row
						// 'td.val' is the class for the value cells
						const valueCells = row.querySelectorAll('td'); // Select value cells in the row
						if (!valueCells.length) {
							console.warn('Value cells not found. Skipping row extraction.');
							return; // Skip this row if value cells or headers are missing
						}

						// Loop through each value cell and parse values
						valueCells.forEach((cell, index) => {
							const value = parseFloat(cell.getAttribute('data-value') || '');
							if (!isNaN(value)) {
								values.push(value); // Add parsed number if valid
							}
						});

						// Store all parsed values in the result for the current metric key
						if (values.length > 0) {
							result[key].values?.push(...values);
						}
					}
				});
			} catch (error) {
				console.error(`Error processing metric key "${key}":`, error);
			}
		});

		// Return the complete metrics object with updated values from the table
		return result;
	};

	try {
		// Execute extractValues to get updated metrics with values from the table
		const updatedMetrics = extractValues();
		if (!updatedMetrics) return; // Skip saving if no updated metrics found

		// Format the updated metrics in LocalStorage structure for saving
		const storageObject: LocalStorage = { metrics: updatedMetrics };

		// Save the updated metrics back to Chrome local storage
		setStoredFields(storageObject);
	} catch (error) {
		// .error('Failed to extract and save metrics:', error);
	}
});
