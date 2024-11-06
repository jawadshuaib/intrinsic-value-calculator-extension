import React from 'react';
import { MedianCell } from './MedianCell';
import { Metric, RateOfReturn } from '../../storage/storage';
import { Table } from 'flowbite-react';
import { Thresholds } from '../types';

interface MedianBodyProps {
	metrics: Metric[];
	thresholds?: Thresholds;
}

export const MedianBody = function ({ metrics, thresholds }: MedianBodyProps) {
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
					/>
				) : (
					'No values available'
				)
			)}
		</Table.Body>
	);
};
