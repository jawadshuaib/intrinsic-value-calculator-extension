import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './popup.css';
import { getStoredFields, Metric, MetricsObject } from '../storage/storage';
import { RateOfReturnSection } from '../components/rateOfReturn/RateOfReturnSection';
import { GrowthRateSection } from '../components/growthRate/GrowthRateSection';
import { ValuationsRatioSection } from '../components/valuationRatios/ValuationRatios';
import { Score } from '../components/score/Score';
import { IntrinsicValue } from '../components/valuation/IntrinsicValue';
import { DebtProfileSection } from '../components/debt/DebtProfileSection';

const App = function () {
	const [metrics, setMetrics] = useState<MetricsObject | null>(null);

	function hasValueLengthGreaterThanOne(data: MetricsObject) {
		for (let key in data) {
			if (data[key].values && data[key].values.length > 1) {
				return true;
			}
		}
		return false;
	}

	useEffect(() => {
		// Send a message to the background script to execute the contentScript
		chrome.runtime.sendMessage({ action: 'runContentScript' }, () => {
			// Fetch the updated fields after contentScript runs
			getStoredFields().then((metrics) => {
				if (!hasValueLengthGreaterThanOne(metrics)) return;
				setMetrics(metrics);
			});
		});
	}, []);

	if (!metrics)
		return (
			<div className='not-found py-5 text-lg text-center h-10'>
				Unable to find valuation metrics on this page.
			</div>
		);

	return (
		<section className='popup'>
			<Score metrics={metrics} />
			<IntrinsicValue metrics={metrics} />
			<RateOfReturnSection metrics={metrics} />
			<GrowthRateSection metrics={metrics} />
			<ValuationsRatioSection metrics={metrics} />
			<DebtProfileSection metrics={metrics} />
		</section>
	);
};

// Create a root element and render the app
const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
