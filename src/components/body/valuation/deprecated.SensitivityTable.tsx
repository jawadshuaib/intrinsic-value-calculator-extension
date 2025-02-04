// import { Table } from 'flowbite-react';
// import React from 'react';
// import SensitivityTableCell from './deprecated.SensitivityTableCell';
// const SensitivityTable = ({
// 	ror,
// 	currentEPS,
// 	peRatios,
// 	growthRates,
// }: {
// 	ror: number;
// 	currentEPS: number;
// 	peRatios: number[];
// 	growthRates: number[];
// }) => {
// 	return (
// 		<Table hoverable={true}>
// 			<Table.Head>
// 				<Table.HeadCell className='text-center'>Future P/E</Table.HeadCell>
// 				{growthRates.map((rate, index) => (
// 					<Table.HeadCell key={index} className='text-center'>
// 						Growth Rate {rate.toFixed(0)}%
// 					</Table.HeadCell>
// 				))}
// 			</Table.Head>
// 			<Table.Body>
// 				{peRatios.map((pe, rowIndex) => (
// 					<Table.Row key={rowIndex}>
// 						<Table.Cell className='font-medium text-center'>{pe}</Table.Cell>
// 						{growthRates.map((rate, colIndex) => (
// 							<SensitivityTableCell
// 								key={colIndex}
// 								currentEPS={currentEPS}
// 								pe={pe}
// 								rate={parseFloat(rate.toFixed(0))}
// 								ror={ror}
// 							/>
// 						))}
// 					</Table.Row>
// 				))}
// 			</Table.Body>
// 		</Table>
// 	);
// };

// export default SensitivityTable;
