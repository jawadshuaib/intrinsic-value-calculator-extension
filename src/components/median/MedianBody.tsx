import React from 'react';
import { MedianCell } from './MedianCell';
import { Metric, RateOfReturn } from '../../storage/storage';
import { Table } from 'flowbite-react';
import { Thresholds } from '../types';

interface MedianBodyProps {
	metrics: Metric[];
	thresholds?: Thresholds;
	ignoreFirst?: boolean;
}

export const MedianBody = function ({
	metrics,
	thresholds,
	ignoreFirst,
}: MedianBodyProps) {
	if (metrics.length === 0)
		return <Table.Body>No metrics available</Table.Body>;

	return (
		<Table.Body>
			{metrics.map((metric) =>
				metric.values ? (
					<MedianCell
						key={metric.title}
						title={metric.title}
						values={metric.values}
						thresholds={thresholds}
						showPercentage={metric.section === RateOfReturn ? true : false}
						showScore={metric.section === RateOfReturn ? true : false}
						ignoreFirst={ignoreFirst}
					/>
				) : (
					'No values available'
				)
			)}
		</Table.Body>
	);
};
