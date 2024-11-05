import { Table } from 'flowbite-react';
import React from 'react';

export const MedianTable = function ({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Table>{children}</Table>;
};
