import React, { useEffect, useState } from 'react';
import Heading from '../../../ui/Heading';

export default function PageTitle() {
	const [title, setTitle] = useState('');
	const MAX_CHARS = 10;

	useEffect(() => {
		// Use the Chrome Extension API to get the active tab's title
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs.length > 0) {
				let pageTitle = tabs[0].title || '';
				// Check if there is a "|" in the title and take the part before it
				if (pageTitle.includes('|')) {
					pageTitle = pageTitle.split('|')[0].trim();
				}
				// Extract only the first 10 characters
				setTitle(pageTitle.substring(0, MAX_CHARS));
			}
		});
	}, []);

	return (
		<header className='text-center'>
			<Heading size='lg'>Valuation for {title}</Heading>
		</header>
	);
}
