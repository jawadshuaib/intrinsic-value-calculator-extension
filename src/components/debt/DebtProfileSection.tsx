import React from 'react';
import { MetricsObject } from '../../storage/storage';
import { CurrentRatio } from './CurrentRatio';

export const DebtProfileSection = function ({
	metrics,
}: {
	metrics: MetricsObject;
}) {
	return (
		<section className='my-3'>
			<h2 className='text-xl mb-2'>Debt Profile</h2>
			<CurrentRatio metrics={metrics} />
		</section>
	);
};
