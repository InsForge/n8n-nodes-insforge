import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRowCreate = {
	resource: ['row'],
	operation: ['create'],
};

export const rowCreateDescription: INodeProperties[] = [
	{
		displayName: 'Data to Send',
		name: 'dataToSend',
		type: 'options',
		displayOptions: {
			show: showOnlyForRowCreate,
		},
		options: [
			{
				name: 'Auto-Map Input Data to Columns',
				value: 'autoMap',
				description: 'Use input data keys as column names',
			},
			{
				name: 'Define Below for Each Column',
				value: 'defineBelow',
				description: 'Manually define each column value',
			},
		],
		default: 'defineBelow',
	},
	{
		displayName: 'Inputs to Ignore',
		name: 'inputsToIgnore',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForRowCreate,
				dataToSend: ['autoMap'],
			},
		},
		default: '',
		description: 'Comma-separated list of input fields to ignore when auto-mapping',
		placeholder: 'e.g. id,created_at',
	},
	{
		displayName: 'Fields to Send',
		name: 'fieldsToSend',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				...showOnlyForRowCreate,
				dataToSend: ['defineBelow'],
			},
		},
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Field',
				name: 'field',
				values: [
					{
						displayName: 'Column Name',
						name: 'column',
						type: 'string',
						default: '',
						description: 'The column name to set',
						placeholder: 'e.g. name',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'The value to set for this column',
						placeholder: 'e.g. John Doe',
					},
				],
			},
		],
	},
];
