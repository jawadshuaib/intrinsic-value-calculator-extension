import React from 'react';
import { getColor } from '../../../utils/getColor';
import { Table } from 'flowbite-react';
import calculateCAGR from '../../../utils/calculateCAGR';
import { Thresholds } from '../types';
import calculateOverallScore, {
	OverallScoreThresholds,
} from '../../../utils/calculateOverallScore';

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

	const score = calculateOverallScore([current, half, full], thresholds);
	const scoreColor = score ? getColor(score, OverallScoreThresholds) : '';
	const scorePercentage = score ? `${(score * 100).toFixed(0)}%` : '';

	return (
		<Table.Row>
			<Table.Cell>{title}</Table.Cell>
			{cagrs.current.length < cagrs.half.length && (
				<Table.Cell className={`${getColor(current, thresholds)}`}>
					{current}%
				</Table.Cell>
			)}
			<Table.Cell className={`${getColor(half, thresholds)}`}>
				{half}%
			</Table.Cell>
			<Table.Cell className={`${getColor(full, thresholds)}`}>
				{full}%
			</Table.Cell>
			<Table.Cell className={`border-l ${scoreColor}`}>
				{scorePercentage}
			</Table.Cell>
		</Table.Row>
	);
};
