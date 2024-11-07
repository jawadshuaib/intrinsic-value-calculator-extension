import React from 'react';

export default function Heading({
	children,
	size = 'xl',
	className = '',
}: {
	children: React.ReactNode;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	className?: string;
}) {
	if (size === 'xl')
		return <h1 className={`text-3xl ${className}`}>{children}</h1>;
	if (size === 'lg')
		return <h2 className={`text-2xl ${className}`}>{children}</h2>;
	if (size === 'md')
		return <h3 className={`text-xl ${className}`}>{children}</h3>;
	if (size === 'sm')
		return <h4 className={`text-lg ${className}`}>{children}</h4>;
}
