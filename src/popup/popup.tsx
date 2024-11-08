import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './popup.css';
import {
	DEFAULT_METRICS,
	getStoredFields,
	getStoredOptions,
	MetricsObject,
	OptionsObject,
} from '../storage/storage';
import { RateOfReturnSection } from '../components/body/rateOfReturn/RateOfReturnSection';
import { GrowthRateSection } from '../components/body/growthRate/GrowthRateSection';
import { ValuationsRatioSection } from '../components/body/valuationRatios/ValuationRatios';
import { Score } from '../components/body/score/Score';
import { IntrinsicValue } from '../components/body/valuation/IntrinsicValue';
import { DebtProfileSection } from '../components/body/debt/DebtProfileSection';
import useDelayedExecution from '../hook/useDelayedExecution';
import { Loader } from '../../ui/Loader';
import PageTitle from '../components/header/PageTitle';

const App = function () {
	const [metrics, setMetrics] = useState<MetricsObject | null>(null);
	const [options, setOptions] = useState<OptionsObject | null>(null);
	const [didScrape, setDidScrape] = useState(false);
	const [forceExecute, setForceExecute] = useState(false);

	// Introduce a small delay to give time for the content script to run
	// This is to ensure that the content script runs after the popup is opened
	// It is a bit hacky but it works.
	useDelayedExecution(() => {
		setForceExecute(true);
	}, 400);

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
				setDidScrape(true);
			});
		});
	}, [forceExecute]);

	// Get stored options on initial render
	useEffect(() => {
		getStoredOptions()
			.then((storedOptions) => {
				setOptions(storedOptions || DEFAULT_METRICS.options);
			})
			.catch(() => {
				console.log('Failed to load stored options.');
			});
	}, []);

	if (!didScrape) {
		return (
			<section className='not-found py-5'>
				<Loader />
			</section>
		);
	}

	if (!metrics && !options) {
		return (
			<section className='not-found py-5 text-lg text-center h-10'>
				Unable to find valuation metrics on this page.
			</section>
		);
	}

	return (
		<section className='popup'>
			<PageTitle />
			<Score metrics={metrics} options={options} />
			<IntrinsicValue metrics={metrics} options={options} />
			<RateOfReturnSection metrics={metrics} options={options} />
			<GrowthRateSection metrics={metrics} options={options} />
			<ValuationsRatioSection metrics={metrics} options={options} />
			<DebtProfileSection metrics={metrics} />
		</section>
	);
};

// Create a root element and render the app
const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
