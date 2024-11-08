import React from 'react';
import calculateMedian from '../../../utils/calculateMedian';
import { Table } from 'flowbite-react';

export const MedianHeading = function ({
	values,
	showScore = true,
	ignoreFirst = false,
}: {
	values: number[];
	showScore: boolean;
	ignoreFirst?: boolean;
}) {
	const medians = calculateMedian(values, ignoreFirst);
	return (
		<Table.Head className='text-center'>
			<Table.HeadCell>&nbsp;</Table.HeadCell>
			<Table.HeadCell>{medians.current.length} year</Table.HeadCell>
			<Table.HeadCell>{medians.half.length} years</Table.HeadCell>
			<Table.HeadCell>{medians.full.length} years</Table.HeadCell>
			{showScore && <Table.HeadCell>Score</Table.HeadCell>}
		</Table.Head>
	);
};
