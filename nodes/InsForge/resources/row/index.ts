import type { INodeProperties } from 'n8n-workflow';
import { tableNameProperty } from '../../shared/descriptions';
import { rowGetAllDescription } from './getAll';
import { rowGetDescription } from './get';
import { rowCreateDescription } from './create';
import { rowUpdateDescription } from './update';
import { rowDeleteDescription } from './delete';

const showOnlyForRow = {
	resource: ['row'],
};

export const rowDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForRow,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a row',
				description: 'Insert a new row into a table',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a row',
				description: 'Delete a row from a table',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a row',
				description: 'Retrieve a single row by ID',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many rows',
				description: 'Retrieve multiple rows with optional filters',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a row',
				description: 'Update an existing row',
			},
		],
		default: 'getAll',
	},
	{
		...tableNameProperty,
		displayOptions: {
			show: {
				resource: ['row'],
				operation: ['create', 'delete', 'get', 'getAll', 'update'],
			},
		},
	},
	...rowGetAllDescription,
	...rowGetDescription,
	...rowCreateDescription,
	...rowUpdateDescription,
	...rowDeleteDescription,
];
