import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { insForgeApiRequest } from '../shared/transport';

export async function getTables(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];

	// InsForge API endpoint for listing tables
	const response = await insForgeApiRequest.call(this, 'GET', '/api/database/tables', {});

	// Response is an array of table names (strings)
	if (Array.isArray(response)) {
		for (const tableName of response) {
			if (typeof tableName === 'string') {
				returnData.push({
					name: tableName,
					value: tableName,
				});
			}
		}
	}

	return returnData;
}
