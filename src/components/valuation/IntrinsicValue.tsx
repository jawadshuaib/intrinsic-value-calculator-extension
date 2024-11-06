import React from 'react';
import { MetricsObject } from '../../storage/storage';
import calculateGrowthRate from '../../../utils/calculateGrowthRate';
import { Table } from 'flowbite-react';
import calculatePERatios from '../../../utils/calculatePERatios';
import calculateIntrinsicValue from '../../../utils/calculateIntrinsicValue';
import filterMetricsByAbv from '../../../utils/filterMetricsByAbv';

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
			<div title='Intrinsic Value'>{intrinsicValue.toFixed(2)}</div>
			<div
				title='Margin of Safety'
				className='rounded border border-slate-300 cursor-default hover:bg-yellow-100'
			>
				MoS: {marginOfSafetyPrice.toFixed(2)}
			</div>
		</Table.Cell>
	);
};
const SensitivityTable = ({
	ror,
	currentEPS,
	peRatios,
	growthRates,
}: {
	ror: number;
	currentEPS: number;
	peRatios: number[];
	growthRates: number[];
}) => {
	return (
		<Table hoverable={true}>
			<Table.Head>
				<Table.HeadCell>Future P/E</Table.HeadCell>
				{growthRates.map((rate, index) => (
					<Table.HeadCell key={index}>Growth Rate {rate}%</Table.HeadCell>
				))}
			</Table.Head>
			<Table.Body>
				{peRatios.map((pe, rowIndex) => (
					<Table.Row key={rowIndex}>
						<Table.Cell className='font-medium'>{pe}</Table.Cell>
						{growthRates.map((rate, colIndex) => (
							<SensitivityTableCell
								key={colIndex}
								currentEPS={currentEPS}
								pe={pe}
								rate={rate}
								ror={ror}
							/>
						))}
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
};

export default SensitivityTable;

export const IntrinsicValue = function ({
	metrics,
}: {
	metrics: MetricsObject;
}) {
	const epsMetrics = filterMetricsByAbv(metrics, 'eps');
	if (epsMetrics.length === 0) return;

	// Required rate of return
	const ror = 15;
	const currentEPS = epsMetrics[0][1].values[0];
	const peRatios = calculatePERatios(metrics);
	const growthRate = calculateGrowthRate(metrics);

	const growthRates = [growthRate * 0.6, growthRate * 0.8, growthRate];
	return (
		<SensitivityTable
			ror={ror}
			currentEPS={currentEPS}
			peRatios={peRatios}
			growthRates={growthRates}
		/>
	);
};
