import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRowUpdate = {
	resource: ['row'],
	operation: ['update'],
};

export const rowUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Row ID',
		name: 'id',
		type: 'string',
		displayOptions: {
			show: showOnlyForRowUpdate,
		},
		default: '',
		required: true,
		description: 'The ID of the row to update',
		placeholder: 'e.g. 123',
	},
	{
		displayName: 'Data to Send',
		name: 'dataToSend',
		type: 'options',
		displayOptions: {
			show: showOnlyForRowUpdate,
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
				...showOnlyForRowUpdate,
				dataToSend: ['autoMap'],
			},
		},
		default: 'id',
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
				...showOnlyForRowUpdate,
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
						description: 'The column name to update',
						placeholder: 'e.g. name',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'The new value for this column',
						placeholder: 'e.g. John Doe',
					},
				],
			},
		],
	},
];
