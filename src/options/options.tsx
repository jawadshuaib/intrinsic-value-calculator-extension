import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Button, Label, TextInput } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './options.css';
import {
	getStoredFields,
	setStoredFields,
	DEFAULT_METRICS,
	MetricsObject,
} from '../storage/storage';
import Heading from '../../ui/Heading';
import Paragraph from '../../ui/Paragraph';

const App = function () {
	const [fields, setFields] = useState<MetricsObject>(DEFAULT_METRICS.metrics);
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
	const handleFieldChange = (field: keyof MetricsObject, value: string) => {
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
			console.log(fields);
		} catch (error) {
			toast.error('Failed to save fields.');
		}
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div className='p-4'>
			<Heading size='xl' className='mb-4'>
				Options
			</Heading>

			{/* Form Section */}
			<form className='flex max-w-lg flex-col gap-4 mb-6'>
				<section className='border rounded-md p-3'>
					<Heading size='lg'>General</Heading>
					<div>[-] Ignore First Value (e.g. TTM)</div>
					<Heading size='lg'>Fields to Match</Heading>
					<Paragraph className='text-slate-500'>
						Select the fields that you would like to match.
					</Paragraph>

					<div className='my-3'>
						<Heading size='md' className='mb-2'>
							Rate of Return
						</Heading>
						<FormField
							title={fields.roce.title}
							field={fields.roce.abv}
							value={fields.roce.matches}
							onChange={handleFieldChange}
						/>
						<FormField
							title={fields.roe.title}
							field={fields.roe.abv}
							value={fields.roe.matches}
							onChange={handleFieldChange}
						/>
					</div>

					<div className='mb-6'>
						<Heading size='md' className='mb-2'>
							Growth Rates
						</Heading>
						<FormField
							title={fields.sps.title}
							field={fields.sps.abv}
							value={fields.sps.matches}
							onChange={handleFieldChange}
						/>
						<FormField
							title={fields.eps.title}
							field={fields.eps.abv}
							value={fields.eps.matches}
							onChange={handleFieldChange}
						/>
						<FormField
							title={fields.bvps.title}
							field={fields.bvps.abv}
							value={fields.bvps.matches}
							onChange={handleFieldChange}
						/>
					</div>

					<div className='mb-6'>
						<Heading size='md' className='mb-2'>
							Valuation Ratios
						</Heading>
						<FormField
							title={fields.pe.title}
							field={fields.pe.abv}
							value={fields.pe.matches}
							onChange={handleFieldChange}
						/>
					</div>

					<div className='mb-6'>
						<Heading size='md' className='mb-2'>
							Debt Profile
						</Heading>
						<FormField
							title={fields.cr.title}
							field={fields.cr.abv}
							value={fields.cr.matches}
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
	field: keyof MetricsObject;
	value: string;
	onChange: (field: keyof MetricsObject, value: string) => void;
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
