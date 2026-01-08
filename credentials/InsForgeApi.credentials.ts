import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class InsForgeApi implements ICredentialType {
	name = 'insForgeApi';

	displayName = 'InsForge API';

	documentationUrl = 'https://docs.insforge.dev/introduction';

	icon = { light: 'file:insforge.svg', dark: 'file:insforge.dark.svg' } as const;

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://your-app.region.insforge.app',
			description: 'Your InsForge backend URL',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Your InsForge API key',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				apikey: '={{$credentials.apiKey}}',
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/database/tables',
			method: 'GET',
		},
	};
}
