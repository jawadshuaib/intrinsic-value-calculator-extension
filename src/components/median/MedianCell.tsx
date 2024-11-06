import React from 'react';
import calculateMedian from '../../../utils/calculateMedian';
import { getColor } from '../../../utils/getColor';
import { Table } from 'flowbite-react';
import { Thresholds } from '../types';
import calculateOverallScore, {
	OverallScoreThresholds,
} from '../../../utils/calculateOverallScore';

interface MedianCellProps {
	title: string;
	values: number[];
	thresholds?: Thresholds;
	showPercentage: boolean;
	showScore: boolean;
}

export const MedianCell = function ({
	title,
	values,
	thresholds,
	showPercentage,
	showScore = true,
}: MedianCellProps) {
	if (values.length === 0) return;

	const medians = calculateMedian(values);

	const current = medians.current.median;
	const half = medians.half.median;
	const full = medians.full.median;

	const percentage = showPercentage ? '%' : '';

	const score = calculateOverallScore([current, half, full], thresholds);
	const scoreColor = score ? getColor(score, OverallScoreThresholds) : '';
	const scorePercentage = score ? `${(score * 100).toFixed(0)}%` : '';

	return (
		<Table.Row>
			<Table.Cell>{title}</Table.Cell>
			<Table.Cell className={`${getColor(current, thresholds)}`}>
				{current}
				{percentage}
			</Table.Cell>
			<Table.Cell className={`${getColor(half, thresholds)}`}>
				{half}
				{percentage}
			</Table.Cell>
			<Table.Cell className={`${getColor(full, thresholds)}`}>
				{full}
				{percentage}
			</Table.Cell>
			{showScore && (
				<Table.Cell className={`border-l ${scoreColor}`}>
					{scorePercentage}
				</Table.Cell>
			)}
		</Table.Row>
	);
};
