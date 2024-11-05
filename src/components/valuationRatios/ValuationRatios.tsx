import React from 'react';
import { MetricsObject, ValuationRatios } from '../../storage/storage';
import { MedianTable } from '../median/MedianTable';
import { MedianHeading } from '../median/MedianHeading';
import { MedianBody } from '../median/MedianBody';

// Filters and displays all metrics in the valuation_ratios section
export const ValuationsRatioSection = function ({
	metrics,
}: {
	metrics: MetricsObject;
}) {
	const valuationMetrics = Object.entries(metrics).filter(
		([_, metric]) => metric.section === ValuationRatios
	);

	const valuationData = valuationMetrics.map(([_, metric]) => metric);

	return (
		<section className='my-3'>
			<h2 className='text-xl mb-2'>Valuation Ratios</h2>
			{valuationMetrics.length > 0 ? (
				<MedianTable>
					<MedianHeading values={valuationData[0].values} />
					<MedianBody metrics={valuationData} />
				</MedianTable>
			) : (
				<p>No valuation metrics found.</p>
			)}
		</section>
	);
};
