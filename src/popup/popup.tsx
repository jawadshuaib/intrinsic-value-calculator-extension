import React from 'react';
import ReactDOM from 'react-dom/client';
import './popup.css';

const App = function () {
	return (
		<div className=''>
			<img src='icon.png' alt='Extension Icon' />
			<h1 className='text-lg font-bold text-blue-800'>Hello World!!</h1>
		</div>
	);
};

// Create a root element and render the app
const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
