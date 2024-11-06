import React from 'react';
import { MetricsObject, RateOfReturn } from '../../storage/storage';
import { MedianTable } from '../median/MedianTable';
import { MedianHeading } from '../median/MedianHeading';
import { MedianBody } from '../median/MedianBody';
import filterMetricsBySection from '../../../utils/filterMetricsBySection';
import extractMetricsData from '../../../utils/extractMetricsData';

export const RateOfReturnThresholds = {
	great: 20,
	good: 15,
	ok: 10,
};
// RateOfReturn filters and displays all metrics in the rate_of_return section
export const RateOfReturnSection = function ({
	metrics,
}: {
	metrics: MetricsObject;
}) {
	const thresholds = RateOfReturnThresholds;

	const rateOfReturnMetrics = filterMetricsBySection(metrics, RateOfReturn);
	const rateOfReturnData = extractMetricsData(rateOfReturnMetrics);

	return (
		<section className='my-3'>
			<h2 className='text-xl mb-2'>Median Rate of Return</h2>
			{rateOfReturnMetrics.length > 0 ? (
				<MedianTable>
					<MedianHeading values={rateOfReturnData[0].values} showScore={true} />
					<MedianBody metrics={rateOfReturnData} thresholds={thresholds} />
				</MedianTable>
			) : (
				<p>No rate of return metrics found.</p>
			)}
		</section>
	);
};
