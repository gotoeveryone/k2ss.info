import contentful from 'contentful';
import {
	CONTENTFUL_SPACE,
	CONTENTFUL_ENVIRONMENT,
	CONTENTFUL_ACCESS_TOKEN
} from '$env/static/private';

export const client = contentful.createClient({
	accessToken: CONTENTFUL_ACCESS_TOKEN,
	space: CONTENTFUL_SPACE,
	environment: CONTENTFUL_ENVIRONMENT
});
