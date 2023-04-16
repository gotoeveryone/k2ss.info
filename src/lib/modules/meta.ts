import { PUBLIC_SITE_URL } from '$env/static/public';
import { SITE_NAME, TWITTER_ACCOUNT } from '$lib/constants';
import { getSiteUrl } from '$lib/modules/site';
import type { OpenGraph, Twitter } from 'svelte-meta-tags';

export const getMetaImagePath = (path?: string) => {
	if (!path) {
		return `${PUBLIC_SITE_URL}/images/2017/08/icon.png`;
	}
	return path;
};

export const getMetaTitle = (title?: string) => {
	const baseTitle = SITE_NAME;
	if (!title) {
		return baseTitle;
	}
	return `${title} | ${baseTitle}`;
};

export const getMetaDescription = (description?: string) => {
	if (!description) {
		return '';
	}
	return description;
};

export const getOpenGraph = (
	{
		type = 'website',
		path = '',
		title = ''
	}: {
		type?: string;
		path?: string;
		title?: string;
	} = {
		type: 'website',
		path: '',
		title: ''
	}
): OpenGraph => ({
	type,
	url: getSiteUrl(path),
	site_name: SITE_NAME,
	title: title || getMetaTitle(),
	description: getMetaDescription(),
	images: [
		{
			url: getMetaImagePath(),
			width: 512,
			height: 512,
			alt: getMetaTitle()
		}
	]
});

export const getTwitter = (): Twitter => ({
	site: `@${TWITTER_ACCOUNT}`,
	title: getMetaTitle(),
	description: getMetaDescription(),
	image: getMetaImagePath()
});
