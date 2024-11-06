import React from 'react';
import { MetricsObject, ValuationRatios } from '../../storage/storage';
import calculateGrowthRate from '../../../utils/calculateGrowthRate';
import { Table } from 'flowbite-react';
import calculatePERatios from '../../../utils/calculatePERatios';

const SensitivityTable = ({
	peRatios,
	growthRates,
}: {
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
							<Table.Cell key={colIndex}>{(pe * rate).toFixed(2)}</Table.Cell>
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
	const peRatios = calculatePERatios(metrics);
	const growthRate = calculateGrowthRate(metrics);

	const growthRates = [growthRate * 0.6, growthRate * 0.8, growthRate];
	return <SensitivityTable peRatios={peRatios} growthRates={growthRates} />;
};
