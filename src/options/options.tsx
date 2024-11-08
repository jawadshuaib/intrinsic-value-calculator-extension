import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Button, Checkbox, Label } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './options.css';
import {
	getStoredFields,
	setStoredFields,
	DEFAULT_METRICS,
	MetricsObject,
	OptionsObject,
	getStoredOptions,
} from '../storage/storage';
import Heading from '../../ui/Heading';
import Paragraph from '../../ui/Paragraph';
import FormField from '../../ui/FormField';

const App = function () {
	const [matchCriterias, setMatchCriterias] = useState<MetricsObject>(
		DEFAULT_METRICS.metrics
	);
	const [options, setOptions] = useState<OptionsObject>(
		DEFAULT_METRICS.options
	);

	const [loading, setLoading] = useState(true);

	// Fetch match criterias from storage on initial render
	useEffect(() => {
		getStoredFields()
			.then((storedFields) => {
				setMatchCriterias(storedFields || DEFAULT_METRICS.metrics);
			})
			.catch(() => {
				toast.error('Failed to load stored fields.');
			})
			.finally(() => setLoading(false));
	}, []);

	// Fetch options from storage on initial render
	useEffect(() => {
		getStoredOptions()
			.then((storedOptions) => {
				setOptions(storedOptions || DEFAULT_METRICS.options);
			})
			.catch(() => {
				toast.error('Failed to load stored options.');
			})
			.finally(() => setLoading(false));
	}, []);

	// Handler to update matching criteries in state
	const handleMatchCriteriaChange = (
		match: keyof MetricsObject,
		value: string
	) => {
		setMatchCriterias((prevMatchCriterias) => ({
			...prevMatchCriterias,
			[match]: {
				...prevMatchCriterias[match],
				matches: value, // Update only the 'matches' field of the targeted metric
			},
		}));
	};

	const handleOptionsChange = (option: keyof OptionsObject, value: boolean) => {
		setOptions((prevOptions) => ({
			...prevOptions,
			[option]: value !== undefined ? value : prevOptions[option], // Ensure the value isn't undefined
		}));
	};

	// Handler to save fields to storage
	const handleSave = async () => {
		try {
			await setStoredFields({ metrics: matchCriterias, options });
			toast.success('Fields saved successfully!');
		} catch (error) {
			toast.error('Failed to save match criterias.');
		}
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div className='p-4'>
			<Heading size='xl' className='mb-4'>
				Options
			</Heading>

			{/* Form */}
			<form className='flex max-w-lg flex-col gap-4 mb-6'>
				<section className='border rounded-md p-3'>
					{/* General Section */}
					<section>
						<Heading size='lg'>General</Heading>
						<div className='flex items-center gap-2'>
							<Checkbox
								id='ignoreFirst'
								checked={options.ignoreFirst}
								onChange={(e) =>
									handleOptionsChange('ignoreFirst', e.target.checked)
								}
							/>
							<Label htmlFor='agree' className='flex'>
								Ignore the first values of the data set (i.e. TTM)
							</Label>
						</div>
					</section>
					{/* Matching Criteria for Fields */}
					<section className='mt-3'>
						<Heading size='lg'>Fields to Match</Heading>
						<Paragraph className='text-slate-500'>
							Select the fields that you would like to match.
						</Paragraph>

						<div className='my-3'>
							<Heading size='md' className='mb-2'>
								Rate of Return
							</Heading>
							<FormField
								title={matchCriterias.roce.title}
								field={matchCriterias.roce.abv}
								value={matchCriterias.roce.matches}
								onChange={handleMatchCriteriaChange}
							/>
							<FormField
								title={matchCriterias.roe.title}
								field={matchCriterias.roe.abv}
								value={matchCriterias.roe.matches}
								onChange={handleMatchCriteriaChange}
							/>
						</div>

						<div className='mb-6'>
							<Heading size='md' className='mb-2'>
								Growth Rates
							</Heading>
							<FormField
								title={matchCriterias.sps.title}
								field={matchCriterias.sps.abv}
								value={matchCriterias.sps.matches}
								onChange={handleMatchCriteriaChange}
							/>
							<FormField
								title={matchCriterias.eps.title}
								field={matchCriterias.eps.abv}
								value={matchCriterias.eps.matches}
								onChange={handleMatchCriteriaChange}
							/>
							<FormField
								title={matchCriterias.bvps.title}
								field={matchCriterias.bvps.abv}
								value={matchCriterias.bvps.matches}
								onChange={handleMatchCriteriaChange}
							/>
						</div>

						<div className='mb-6'>
							<Heading size='md' className='mb-2'>
								Valuation Ratios
							</Heading>
							<FormField
								title={matchCriterias.pe.title}
								field={matchCriterias.pe.abv}
								value={matchCriterias.pe.matches}
								onChange={handleMatchCriteriaChange}
							/>
						</div>

						<div className='mb-6'>
							<Heading size='md' className='mb-2'>
								Debt Profile
							</Heading>
							<FormField
								title={matchCriterias.cr.title}
								field={matchCriterias.cr.abv}
								value={matchCriterias.cr.matches}
								onChange={handleMatchCriteriaChange}
							/>
						</div>
					</section>
				</section>
				<Button type='button' onClick={handleSave}>
					Save
				</Button>
			</form>
			<ToastContainer />
		</div>
	);
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

// Updated for React 18+ using createRoot
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
