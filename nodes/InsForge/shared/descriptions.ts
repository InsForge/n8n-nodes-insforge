import type { INodeProperties } from 'n8n-workflow';

export const tableNameProperty: INodeProperties = {
	displayName: 'Table Name',
	name: 'tableId',
	type: 'options',
	typeOptions: {
		loadOptionsMethod: 'getTables',
	},
	required: true,
	default: '',
};

export const selectColumnsProperty: INodeProperties = {
	displayName: 'Select Columns',
	name: 'select',
	type: 'string',
	default: '*',
	description: 'Columns to return (comma-separated). Use * for all columns.',
	placeholder: 'e.g. id,name,email',
};

export const returnDataProperty: INodeProperties = {
	displayName: 'Return Data',
	name: 'returnData',
	type: 'boolean',
	default: true,
	description: 'Whether to return the affected row(s) in the response',
};

export const filterOperators = [
	{ name: 'Equals', value: 'eq' },
	{ name: 'Not Equals', value: 'neq' },
	{ name: 'Greater Than', value: 'gt' },
	{ name: 'Greater Than or Equal', value: 'gte' },
	{ name: 'Less Than', value: 'lt' },
	{ name: 'Less Than or Equal', value: 'lte' },
	{ name: 'Like (Case Sensitive)', value: 'like' },
	{ name: 'ILike (Case Insensitive)', value: 'ilike' },
	{ name: 'Is', value: 'is' },
	{ name: 'In', value: 'in' },
];
