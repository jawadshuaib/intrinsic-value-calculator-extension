import React from 'react';
import calculateMedian from '../../../utils/calculateMedian';
import { Table } from 'flowbite-react';

export const MedianHeading = function ({
	values,
	showScore = true,
}: {
	values: number[];
	showScore: boolean;
}) {
	const medians = calculateMedian(values);
	return (
		<Table.Head>
			<Table.HeadCell>&nbsp;</Table.HeadCell>
			<Table.HeadCell>{medians.current.length} year</Table.HeadCell>
			<Table.HeadCell>{medians.half.length} years</Table.HeadCell>
			<Table.HeadCell>{medians.full.length} years</Table.HeadCell>
			{showScore && <Table.HeadCell>Score</Table.HeadCell>}
		</Table.Head>
	);
};
