import { PUBLIC_SITE_URL } from "$env/static/public";
import { SITE_NAME, TWITTER_ACCOUNT } from "$lib/constants";
import { getSiteUrl } from "$lib/modules/site";
import type { OpenGraph, Twitter } from "svelte-meta-tags";

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
	if (title.endsWith(baseTitle)) {
		return title;
	}
	return `${title} | ${baseTitle}`;
};

export const getOpenGraph = (
	{
		type = "website",
		path = "",
		title = "",
		description = "",
	}: {
		type?: string;
		path?: string;
		title?: string;
		description?: string;
	} = {
		type: "website",
		path: "",
		title: "",
		description: "",
	},
): OpenGraph => ({
	type,
	url: getSiteUrl(path),
	siteName: SITE_NAME,
	title: getMetaTitle(title),
	description,
	images: [
		{
			url: getMetaImagePath(),
			width: 512,
			height: 512,
			alt: getMetaTitle(title),
		},
	],
});

export const getTwitter = (
	{
		title = "",
		description = "",
	}: {
		title?: string;
		description?: string;
	} = {
		title: "",
		description: "",
	},
): Twitter => ({
	site: `@${TWITTER_ACCOUNT}`,
	title: getMetaTitle(title),
	description,
	image: getMetaImagePath(),
});
