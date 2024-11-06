import React from 'react';

export default function AverageScore({ avg }: { avg: number }) {
	return <div className='text-center text-2xl'>Overall Score: {avg}</div>;
}
