import React from 'react';
import { GrowthRates, MetricsObject } from '../../storage/storage';
import { MedianTable } from '../median/MedianTable';
import { MedianHeading } from '../median/MedianHeading';
import { MedianBody } from '../median/MedianBody';
import { CAGRTable } from '../cagr/CAGRTable';
import { CAGRHeading } from '../cagr/CAGRHeading';
import { CAGRBody } from '../cagr/CAGRBody';

// GrowthRateSection filters and displays all metrics in the growth_rate section
export const GrowthRateSection = function ({
	metrics,
}: {
	metrics: MetricsObject;
}) {
	const thresholds = {
		great: 15,
		good: 10,
		ok: 5,
	};

	const growthRateMetrics = Object.entries(metrics).filter(
		([_, metric]) => metric.section === GrowthRates
	);

	const growthRateData = growthRateMetrics.map(([_, metric]) => metric);
	return (
		<section className='my-3'>
			<h2 className='text-xl mb-2'>Compounded Annual Growth Rates</h2>
			{growthRateMetrics.length > 0 ? (
				<CAGRTable>
					<CAGRHeading values={growthRateData[0].values} />
					<CAGRBody metrics={growthRateData} thresholds={thresholds} />
				</CAGRTable>
			) : (
				<p>No growth rate metrics found.</p>
			)}
		</section>
	);
};
