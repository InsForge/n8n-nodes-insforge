import type { INodeProperties } from 'n8n-workflow';
import { filterOperators } from '../../shared/descriptions';

const showOnlyForRowGetAll = {
	resource: ['row'],
	operation: ['getAll'],
};

export const rowGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: showOnlyForRowGetAll,
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
			{
				displayName: 'Order By',
				name: 'order',
				type: 'string',
				default: '',
				description: 'Column to order by. Append .desc for descending order.',
				placeholder: 'e.g. created_at.desc',
			},
		],
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: showOnlyForRowGetAll,
		},
		default: {},
		placeholder: 'Add Filter',
		options: [
			{
				displayName: 'Conditions',
				name: 'conditions',
				values: [
					{
						displayName: 'Column',
						name: 'column',
						type: 'string',
						default: '',
						description: 'The column to filter on',
						placeholder: 'e.g. status',
					},
					{
						displayName: 'Operator',
						name: 'operator',
						type: 'options',
						options: filterOperators,
						default: 'eq',
						description: 'The comparison operator',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'The value to compare against. For "in" operator, use comma-separated values.',
						placeholder: 'e.g. active',
					},
				],
			},
		],
	},
];
