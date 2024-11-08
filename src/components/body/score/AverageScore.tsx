import React from 'react';

export default function AverageScore({ avg }: { avg: number }) {
	const formatted = (avg * 100).toFixed(0);
	return <div className='text-center text-2xl'>Overall Score: {formatted}</div>;
}
