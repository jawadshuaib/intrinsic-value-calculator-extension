import React from 'react';
import calculateMedian from '../../../utils/calculateMedian';
import { getColor } from '../../../utils/getColor';
import { Table } from 'flowbite-react';
import { Thresholds } from '../types';

interface MedianCellProps {
	title: string;
	values: number[];
	thresholds?: Thresholds;
}

export const MedianCell = function ({
	title,
	values,
	thresholds,
}: MedianCellProps) {
	const medians = calculateMedian(values);

	const current = medians.current.median;
	const half = medians.half.median;
	const full = medians.full.median;

	return (
		<Table.Row>
			<Table.Cell>{title}</Table.Cell>
			<Table.Cell className={`${getColor(current, thresholds)}`}>
				{current}%
			</Table.Cell>
			<Table.Cell className={`${getColor(half, thresholds)}`}>
				{half}%
			</Table.Cell>
			<Table.Cell className={`${getColor(full, thresholds)}`}>
				{full}%
			</Table.Cell>
		</Table.Row>
	);
};
