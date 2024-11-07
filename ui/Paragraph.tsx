import React from 'react';

export default function Paragraph({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <p className={`text-base ${className}`}>{children}</p>;
}
