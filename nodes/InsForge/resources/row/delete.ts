import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRowDelete = {
	resource: ['row'],
	operation: ['delete'],
};

export const rowDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Row ID',
		name: 'id',
		type: 'string',
		displayOptions: {
			show: showOnlyForRowDelete,
		},
		default: '',
		required: true,
		description: 'The ID of the row to delete',
		placeholder: 'e.g. 123',
	},
];
