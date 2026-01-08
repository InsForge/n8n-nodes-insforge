import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';
import { rowDescription } from './resources/row';
import { insForgeApiRequest } from './shared/transport';
import { getTables } from './listSearch/getTables';

export class InsForge implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'InsForge',
		name: 'insForge',
		icon: { light: 'file:insforge.svg', dark: 'file:insforge.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with InsForge Database',
		defaults: {
			name: 'InsForge',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'insForgeApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Row',
						value: 'row',
					},
				],
				default: 'row',
			},
			...rowDescription,
		],
	};

	methods = {
		loadOptions: {
			getTables,
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				if (resource === 'row') {
					const table = this.getNodeParameter('tableId', i) as string;
					const endpoint = `/api/database/records/${table}`;

					if (operation === 'getAll') {
						const options = this.getNodeParameter('options', i) as IDataObject;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						const qs: IDataObject = {};

						// Handle select columns
						if (options.select) {
							qs.select = options.select;
						}

						// Handle ordering
						if (options.order) {
							qs.order = options.order;
						}

						// Handle filters
						if (filters.conditions) {
							const conditions = filters.conditions as IDataObject[];
							for (const condition of conditions) {
								const column = condition.column as string;
								const operator = condition.operator as string;
								let value = condition.value as string;

								// Handle "in" operator - wrap in parentheses
								if (operator === 'in') {
									value = `(${value})`;
								}

								qs[column] = `${operator}.${value}`;
							}
						}

						responseData = (await insForgeApiRequest.call(
							this,
							'GET',
							endpoint,
							qs,
							undefined,
							{},
						)) as IDataObject[];
					}

					if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const options = this.getNodeParameter('options', i) as IDataObject;

						const qs: IDataObject = {
							id: `eq.${id}`,
						};

						if (options.select) {
							qs.select = options.select;
						}

						const result = (await insForgeApiRequest.call(
							this,
							'GET',
							endpoint,
							qs,
							undefined,
							{},
						)) as IDataObject[];

						responseData = result[0] || {};
					}

					if (operation === 'create') {
						const dataToSend = this.getNodeParameter('dataToSend', i) as string;

						let body: IDataObject = {};

						if (dataToSend === 'autoMap') {
							// Use input data as body
							const inputData = items[i].json;
							const inputsToIgnore = (this.getNodeParameter('inputsToIgnore', i) as string)
								.split(',')
								.map((s) => s.trim())
								.filter(Boolean);

							body = { ...inputData };
							for (const key of inputsToIgnore) {
								delete body[key];
							}
						} else {
							// Define below - use fieldsToSend
							const fieldsToSend = this.getNodeParameter('fieldsToSend', i) as IDataObject;
							const fields = (fieldsToSend.field as IDataObject[]) || [];

							for (const field of fields) {
								const column = field.column as string;
								const value = field.value;
								if (column) {
									body[column] = value;
								}
							}
						}

						// InsForge requires body to be an array
						const result = await insForgeApiRequest.call(this, 'POST', endpoint, {}, [body], {});

						responseData = Array.isArray(result) ? result[0] : result;
					}

					if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const dataToSend = this.getNodeParameter('dataToSend', i) as string;

						const qs: IDataObject = {
							id: `eq.${id}`,
						};

						let body: IDataObject = {};

						if (dataToSend === 'autoMap') {
							const inputData = items[i].json;
							const inputsToIgnore = (this.getNodeParameter('inputsToIgnore', i) as string)
								.split(',')
								.map((s) => s.trim())
								.filter(Boolean);

							body = { ...inputData };
							for (const key of inputsToIgnore) {
								delete body[key];
							}
						} else {
							const fieldsToSend = this.getNodeParameter('fieldsToSend', i) as IDataObject;
							const fields = (fieldsToSend.field as IDataObject[]) || [];

							for (const field of fields) {
								const column = field.column as string;
								const value = field.value;
								if (column) {
									body[column] = value;
								}
							}
						}

						const result = await insForgeApiRequest.call(
							this,
							'PATCH',
							endpoint,
							qs,
							body,
							{},
						);

						responseData = Array.isArray(result) ? result[0] : result;
					}

					if (operation === 'delete') {
						const id = this.getNodeParameter('id', i) as string;

						const qs: IDataObject = {
							id: `eq.${id}`,
						};

						const result = await insForgeApiRequest.call(
							this,
							'DELETE',
							endpoint,
							qs,
							undefined,
							{},
						);

						responseData = Array.isArray(result) ? result[0] || { success: true } : result;
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
