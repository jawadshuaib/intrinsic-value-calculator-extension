import { useEffect } from 'react';

function useDelayedExecution(callback: () => void, delay: number): void {
	useEffect(() => {
		const timer = setTimeout(() => {
			callback();
		}, delay);

		// Clean up the timer when the component unmounts
		return () => clearTimeout(timer);
	}, [callback, delay]);
}

export default useDelayedExecution;
