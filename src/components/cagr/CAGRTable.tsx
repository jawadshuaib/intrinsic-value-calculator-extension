import { Table } from 'flowbite-react';
import React from 'react';

export const CAGRTable = function ({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Table>{children}</Table>;
};
