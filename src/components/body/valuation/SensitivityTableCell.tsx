import React from 'react';
import { Table } from 'flowbite-react';
import calculateIntrinsicValueUsingEPS from '../../../../utils/calculateIntrinsicValueUsingEPS';

const SensitivityTableCell = ({
	eps,
	growthRate,
	discountRate,
	terminalGrowthRate,
	marginOfSafety,
}: {
	eps: number;
	growthRate: number;
	discountRate: number;
	terminalGrowthRate: number;
	marginOfSafety: number;
}) => {
	const { intrinsicValue, marginOfSafetyPrice } =
		calculateIntrinsicValueUsingEPS(
			eps,
			growthRate,
			discountRate,
			terminalGrowthRate,
			marginOfSafety
		);
	return (
		<Table.Cell className='text-center'>
			<div
				title={`Intrinsic value at a discount rate of ${discountRate}%, terminal growth of ${terminalGrowthRate}%, growth rate of ${growthRate}%`}
				className='cursor-default'
			>
				{intrinsicValue.toFixed(0)}
			</div>
			<div
				title={`Margin of Safety to the intrinsic value.`}
				className='rounded border border-slate-300 cursor-default hover:bg-yellow-100'
			>
				MoS: {marginOfSafetyPrice.toFixed(0)}
			</div>
		</Table.Cell>
	);
};

export default SensitivityTableCell;
