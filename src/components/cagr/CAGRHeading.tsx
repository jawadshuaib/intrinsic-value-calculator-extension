import React from 'react';
import { Table } from 'flowbite-react';
import calculateCAGR from '../../../utils/calculateCAGR';

export const CAGRHeading = function ({
	values,
	ignoreFirst,
}: {
	values: number[];
	ignoreFirst: boolean;
}) {
	const cagrs = calculateCAGR(values, ignoreFirst);
	return (
		<Table.Head className='text-center'>
			<Table.HeadCell>&nbsp;</Table.HeadCell>
			{cagrs.current.length < cagrs.half.length && (
				<Table.HeadCell>1 year</Table.HeadCell>
			)}
			<Table.HeadCell>{cagrs.half.length} years</Table.HeadCell>
			<Table.HeadCell>{cagrs.full.length - 1} years</Table.HeadCell>
			<Table.HeadCell>Score</Table.HeadCell>
		</Table.Head>
	);
};
