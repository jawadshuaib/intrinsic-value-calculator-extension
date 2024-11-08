import React from 'react';
import { Metric } from '../../storage/storage';
import { Table } from 'flowbite-react';
import { CAGRCell } from './CAGRCell';
import { Thresholds } from '../types';

interface CAGRBodyProps {
	metrics: Metric[];
	ignoreFirst: boolean;
	thresholds?: Thresholds;
}

export const CAGRBody = function ({
	metrics,
	ignoreFirst,
	thresholds,
}: CAGRBodyProps) {
	return (
		<Table.Body>
			{metrics.map((metric) =>
				metric.values ? (
					<CAGRCell
						key={metric.title}
						title={metric.title}
						values={metric.values}
						thresholds={thresholds}
						ignoreFirst={ignoreFirst}
					/>
				) : (
					'No values available'
				)
			)}
		</Table.Body>
	);
};
