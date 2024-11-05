import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Button, Label, TextInput } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './options.css';
import {
	getStoredFields,
	setStoredFields,
	LocalStorage,
	DEFAULT_METRICS,
} from '../storage/storage';

const App = function () {
	const [fields, setFields] = useState<LocalStorage['metrics']>(
		DEFAULT_METRICS.metrics
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch the stored fields on component mount
		getStoredFields()
			.then((storedFields) => {
				setFields(storedFields || DEFAULT_METRICS.metrics);
			})
			.catch(() => {
				toast.error('Failed to load stored fields.');
			})
			.finally(() => setLoading(false));
	}, []);

	// Handler to update fields in state
	const handleFieldChange = (
		field: keyof LocalStorage['metrics'],
		value: string
	) => {
		setFields((prevFields) => ({
			...prevFields,
			[field]: value,
		}));
	};

	// Handler to save fields to storage
	const handleSave = async () => {
		try {
			await setStoredFields({ metrics: fields });
			toast.success('Fields saved successfully!');
		} catch (error) {
			toast.error('Failed to save fields.');
		}
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div className='p-4'>
			<h1 className='text-3xl mb-4'>Options</h1>

			{/* Form Section */}
			<form className='flex max-w-lg flex-col gap-4 mb-6'>
				<section className='border rounded-md p-3'>
					<h2 className='text-2xl'>Fields to Match</h2>
					<p className='text-sm text-gray-600 mb-4'>
						Select the fields that you would like to match.
					</p>

					<div className='mb-6'>
						<h3 className='text-xl mb-2'>Rate of Return</h3>
						<FormField
							title='Return on Capital Employed'
							field='roce'
							value={fields.roce}
							onChange={handleFieldChange}
						/>
						<FormField
							title='Return on Equity'
							field='roe'
							value={fields.roe}
							onChange={handleFieldChange}
						/>
						<FormField
							title='Return on Assets'
							field='roa'
							value={fields.roa}
							onChange={handleFieldChange}
						/>
					</div>

					<div className='mb-6'>
						<h3 className='text-xl mb-2'>Growth Rates</h3>
						<FormField
							title='Sales per Share'
							field='sps'
							value={fields.sps}
							onChange={handleFieldChange}
						/>
						<FormField
							title='Earnings per Share'
							field='eps'
							value={fields.eps}
							onChange={handleFieldChange}
						/>
						<FormField
							title='Book Value per Share'
							field='bvps'
							value={fields.bvps}
							onChange={handleFieldChange}
						/>
					</div>

					<div className='mb-6'>
						<h3 className='text-xl mb-2'>Valuation Ratios</h3>
						<FormField
							title='Price to Earnings Ratio'
							field='pe'
							value={fields.pe}
							onChange={handleFieldChange}
						/>
					</div>
				</section>
				<Button type='button' onClick={handleSave}>
					Save
				</Button>
			</form>
			<ToastContainer />
		</div>
	);
};

// Updated FormField Component
interface FormFieldProps {
	title: string;
	field: keyof LocalStorage['metrics'];
	value: string;
	onChange: (field: keyof LocalStorage['metrics'], value: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({
	title,
	field,
	value,
	onChange,
}) => {
	return (
		<div className='mb-2'>
			<Label htmlFor={field} value={title} />
			<TextInput
				type='text'
				name={field}
				value={value}
				onChange={(e) => onChange(field, e.target.value)}
				className='mt-1'
			/>
		</div>
	);
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

// Updated for React 18+ using createRoot
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
