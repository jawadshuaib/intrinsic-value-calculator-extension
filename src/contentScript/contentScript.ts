import {
	LocalStorage,
	MetricsObject,
	getStoredFields,
	setStoredFields,
} from '../storage/storage';

// Fetch metrics from storage and execute the extractValues function
getStoredFields().then((metrics: MetricsObject) => {
	// Convert each metric's matches (comma-separated keywords) into an array for easier lookup
	// This array maps metric keys to their keywords for quick access in the table
	const metricsKeywords = Object.entries(metrics).map(([key, metric]) => ({
		key,
		keywords: metric.matches.split(','),
	}));

	// Function to extract values from the web page's table rows
	const extractValues = () => {
		// Select all rows within the main table's body where the data is stored
		const tableRows = document.querySelectorAll('table.ui.table tbody tr');

		// Initialize result object, setting each metric's values as an empty array for storage
		const result: MetricsObject = Object.keys(metrics).reduce((acc, key) => {
			acc[key] = { ...metrics[key], values: [] };
			return acc;
		}, {} as MetricsObject);

		// Loop through each metric's keywords and look for matching rows in the table
		metricsKeywords.forEach(({ key, keywords }) => {
			// Initialize each metric entry in the result with an empty values array
			result[key] = { ...metrics[key], values: [] };

			// Loop through each row in the table to find and extract relevant data
			tableRows.forEach((row) => {
				const titleCell = row.querySelector('td.title-cell'); // Locate the title cell
				// If title cell exists, check if it contains any of the metric keywords
				if (titleCell) {
					const matches = keywords.some((keyword) => {
						const regex = new RegExp(`\\b${keyword.trim()}\\b`, 'i'); // Case-insensitive word boundary match
						return regex.test(titleCell.textContent?.trim());
					});

					// If a match is found, extract numerical values from the corresponding row
					if (matches) {
						console.log(matches);
						const values: number[] = []; // Array to store numeric values for this row
						const valueCells = row.querySelectorAll('td.val'); // Select value cells in the row
						const headerCells = document.querySelectorAll(
							'table.ui.table thead th'
						); // Select header cells for reference

						// Loop through each value cell and parse values
						valueCells.forEach((cell, index) => {
							const headerCell = headerCells[index + 1]; // Get the relevant header (skip first)

							// Parse value from cell and add if it's a valid number
							if (headerCell) {
								const value = parseFloat(cell.getAttribute('data-value') || '');
								if (!isNaN(value)) {
									values.push(value); // Add parsed number if valid
								}
							}
						});

						// Store all parsed values in the result for the current metric key
						result[key].values?.push(...values);
					}
				}
			});
		});

		// Return the complete metrics object with updated values from the table
		return result;
	};

	// Execute extractValues to get updated metrics with values from the table
	const updatedMetrics = extractValues();

	// Format the updated metrics in LocalStorage structure for saving
	const storageObject: LocalStorage = { metrics: updatedMetrics };

	// Save the updated metrics back to Chrome local storage
	setStoredFields(storageObject);
});
