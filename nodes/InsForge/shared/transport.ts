import type {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';

export async function insForgeApiRequest(
	this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	qs: IDataObject = {},
	body: IDataObject | IDataObject[] | undefined = undefined,
	headers: IDataObject = {},
) {
	const credentials = await this.getCredentials('insForgeApi');
	const baseUrl = credentials.baseUrl as string;

	const options: IHttpRequestOptions = {
		method,
		url: `${baseUrl}${endpoint}`,
		qs,
		body,
		json: true,
		headers: {
			...headers,
		},
	};

	if (body === undefined) {
		delete options.body;
	}

	return this.helpers.httpRequestWithAuthentication.call(this, 'insForgeApi', options);
}
