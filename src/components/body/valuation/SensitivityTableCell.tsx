import React from 'react';
import calculateIntrinsicValue from '../../../../utils/calculateIntrinsicValue';
import { Table } from 'flowbite-react';
const SensitivityTableCell = ({
	currentEPS,
	pe,
	rate,
	ror,
}: {
	currentEPS: number;
	pe: number;
	rate: number;
	ror: number;
}) => {
	const { intrinsicValue, marginOfSafetyPrice } = calculateIntrinsicValue(
		currentEPS,
		pe,
		rate,
		ror
	);
	return (
		<Table.Cell className='text-center'>
			<div
				title={`Intrinsic Value at a future P/E of ${pe}, growth rate of ${rate.toFixed(
					0
				)}% and current EPS of ${currentEPS}`}
				className='cursor-default'
			>
				{intrinsicValue.toFixed(0)}
			</div>
			<div
				title={`Margin of Safety at a future P/E of ${pe}, growth rate of ${rate.toFixed(
					0
				)}% and current EPS of ${currentEPS}`}
				className='rounded border border-slate-300 cursor-default hover:bg-yellow-100'
			>
				MoS: {marginOfSafetyPrice.toFixed(0)}
			</div>
		</Table.Cell>
	);
};

export default SensitivityTableCell;
