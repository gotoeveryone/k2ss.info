import contentful from 'contentful';
import {
	CONTENTFUL_SPACE,
	CONTENTFUL_ENVIRONMENT,
	CONTENTFUL_ACCESS_TOKEN,
	CONTENTFUL_PREVIEW_TOKEN
} from '$env/static/private';

export const client = contentful.createClient({
	accessToken: CONTENTFUL_ACCESS_TOKEN,
	space: CONTENTFUL_SPACE,
	environment: CONTENTFUL_ENVIRONMENT
});

export const previewClient = contentful.createClient({
	accessToken: CONTENTFUL_PREVIEW_TOKEN,
	space: CONTENTFUL_SPACE,
	environment: CONTENTFUL_ENVIRONMENT,
	host: 'preview.contentful.com'
});
