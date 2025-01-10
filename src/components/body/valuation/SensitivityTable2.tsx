import { Table } from 'flowbite-react';
import React from 'react';
import SensitivityTableCell2 from './SensitivityTableCell2';

const SensitivityTable2 = ({
	epsRatios,
	discountRate,
	terminalGrowthRate,
	growthRates,
}: {
	epsRatios: number[];
	discountRate: number;
	terminalGrowthRate: number;
	growthRates: number[];
}) => {
	const currentEPS = epsRatios[0];
	// Get last value of array
	const medianEPS = epsRatios[epsRatios.length - 1];

	return (
		<Table hoverable={true}>
			<Table.Head>
				<Table.HeadCell className='text-center'>EPS</Table.HeadCell>
				{growthRates.map((rate, index) => (
					<Table.HeadCell key={index} className='text-center'>
						Growth Rate {rate.toFixed(0)}%
					</Table.HeadCell>
				))}
			</Table.Head>
			<Table.Body>
				<Table.Row>
					<Table.Cell className='font-medium text-center'>
						Current ({currentEPS}):
					</Table.Cell>
					{growthRates.map((growthRate, colIndex) => (
						<SensitivityTableCell2
							key={colIndex}
							eps={currentEPS}
							growthRate={parseFloat(growthRate.toFixed(0))}
							discountRate={discountRate}
							terminalGrowthRate={terminalGrowthRate}
						/>
					))}
				</Table.Row>
				<Table.Row>
					<Table.Cell className='font-medium text-center'>
						Median ({medianEPS}):
					</Table.Cell>
					{growthRates.map((growthRate, colIndex) => (
						<SensitivityTableCell2
							key={colIndex}
							eps={medianEPS}
							growthRate={parseFloat(growthRate.toFixed(0))}
							discountRate={discountRate}
							terminalGrowthRate={terminalGrowthRate}
						/>
					))}
				</Table.Row>
			</Table.Body>
		</Table>
	);
};

export default SensitivityTable2;
