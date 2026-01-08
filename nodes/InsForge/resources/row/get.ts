import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRowGet = {
	resource: ['row'],
	operation: ['get'],
};

export const rowGetDescription: INodeProperties[] = [
	{
		displayName: 'Row ID',
		name: 'id',
		type: 'string',
		displayOptions: {
			show: showOnlyForRowGet,
		},
		default: '',
		required: true,
		description: 'The ID of the row to retrieve',
		placeholder: 'e.g. 123',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: showOnlyForRowGet,
		},
		default: {},
		options: [
			{
				displayName: 'Select Columns',
				name: 'select',
				type: 'string',
				default: '*',
				description: 'Columns to return (comma-separated). Use * for all columns.',
				placeholder: 'e.g. id,name,email',
			},
		],
	},
];
