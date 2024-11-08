import React from 'react';
import { Label, TextInput } from 'flowbite-react';
import { MetricsObject } from '../src/storage/storage';

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
				id={field}
				type='text'
				name={field}
				value={value}
				onChange={(e) => {
					onChange(field, e.target.value);
				}}
				className='mt-1'
			/>
		</div>
	);
};

export default FormField;
