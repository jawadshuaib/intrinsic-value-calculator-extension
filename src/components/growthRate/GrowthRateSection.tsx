import React, { useEffect, useState } from 'react';
import {
	GrowthRates,
	MetricsObject,
	OptionsObject,
} from '../../storage/storage';
import { CAGRTable } from '../cagr/CAGRTable';
import { CAGRHeading } from '../cagr/CAGRHeading';
import { CAGRBody } from '../cagr/CAGRBody';
import filterMetricsBySection from '../../../utils/filterMetricsBySection';
import extractMetricsData from '../../../utils/extractMetricsData';

// GrowthRateSection filters and displays all metrics in the growth_rate section
export const GrowthRateSection = function ({
	metrics,
	options,
}: {
	metrics: MetricsObject;
	options: OptionsObject;
}) {
	const thresholds = {
		great: 15,
		good: 10,
		ok: 5,
	};

	const growthRateMetrics = filterMetricsBySection(metrics, GrowthRates);
	const growthRateData = extractMetricsData(growthRateMetrics);
	return (
		<section className='my-3'>
			<h2 className='text-xl mb-2'>Compounded Annual Growth Rates</h2>
			{growthRateMetrics.length > 0 ? (
				<CAGRTable>
					<CAGRHeading
						values={growthRateData[0].values}
						ignoreFirst={options.ignoreFirst}
					/>
					<CAGRBody
						metrics={growthRateData}
						thresholds={thresholds}
						ignoreFirst={options.ignoreFirst}
					/>
				</CAGRTable>
			) : (
				<p>No growth rate metrics found.</p>
			)}
		</section>
	);
};
