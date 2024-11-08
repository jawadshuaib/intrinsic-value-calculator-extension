import React from 'react';
import {
	MetricsObject,
	OptionsObject,
	ValuationRatios,
} from '../../../storage/storage';
import { MedianTable } from '../../median/MedianTable';
import { MedianHeading } from '../../median/MedianHeading';
import { MedianBody } from '../../median/MedianBody';
import filterMetricsBySection from '../../../../utils/filterMetricsBySection';
import extractMetricsData from '../../../../utils/extractMetricsData';

// Filters and displays all metrics in the valuation_ratios section
export const ValuationsRatioSection = function ({
	metrics,
	options,
}: {
	metrics: MetricsObject;
	options: OptionsObject;
}) {
	const valuationMetrics = filterMetricsBySection(metrics, ValuationRatios);
	const valuationData = extractMetricsData(valuationMetrics);

	return (
		<section className='my-3'>
			<h2 className='text-xl mb-2'>Median Valuation Ratios</h2>
			{valuationMetrics.length > 0 ? (
				<MedianTable>
					<MedianHeading
						values={valuationData[0].values}
						showScore={false}
						ignoreFirst={options.ignoreFirst}
					/>
					<MedianBody
						metrics={valuationData}
						ignoreFirst={options.ignoreFirst}
					/>
				</MedianTable>
			) : (
				<p>No valuation metrics found.</p>
			)}
		</section>
	);
};
