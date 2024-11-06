import React from 'react';
import { Table } from 'flowbite-react';
import calculateCAGR from '../../../utils/calculateCAGR';

export const CAGRHeading = function ({ values }: { values: number[] }) {
	const cagrs = calculateCAGR(values);
	return (
		<Table.Head>
			<Table.HeadCell>&nbsp;</Table.HeadCell>
			<Table.HeadCell>{cagrs.current.length} year</Table.HeadCell>
			<Table.HeadCell>{cagrs.half.length} years</Table.HeadCell>
			<Table.HeadCell>{cagrs.full.length} years</Table.HeadCell>
		</Table.Head>
	);
};
