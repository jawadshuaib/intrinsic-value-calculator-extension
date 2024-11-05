import React from 'react';
import { getColor } from '../../../utils/getColor';
import { Table } from 'flowbite-react';
import calculateCAGR from '../../../utils/calculateCAGR';
import { Thresholds } from '../types';

interface CAGRCellProps {
	title: string;
	values: number[];
	thresholds?: Thresholds;
}

export const CAGRCell = function ({
	title,
	values,
	thresholds,
}: CAGRCellProps) {
	const cagrs = calculateCAGR(values);

	const current = cagrs.current.cagr;
	const half = cagrs.half.cagr;
	const full = cagrs.full.cagr;

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
