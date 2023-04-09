import { error } from '@sveltejs/kit';
import { SITE_URL } from '$lib/constants';
import type { Category } from 'types/category';
import type { PostItem } from 'types/post';

const getCatgories = async (categoryIds: number[]): Promise<Category[]> => {
	if (!categoryIds.length) {
		return [];
	}
	const response = await fetch(
		`https://k2ss.info/wp-json/wp/v2/categories?include=${categoryIds.join('+')}`
	);
	if (!response.ok) {
		return [];
	}
	return ((await response.json()) as Category[]).map((c) => ({
		...c,
		// NOTE: SSG 生成対象にしたいので、リンクからドメインを削除しておく
		link: c.link.replace(SITE_URL, '')
	}));
};

export const load = async ({ params }) => {
	const endpoint = `https://k2ss.info/wp-json/wp/v2/posts/${params.id}`;

	const response = await fetch(endpoint);

	if (response.ok) {
		const data = await response.json();
		const categories = await getCatgories(data.categories);
		return {
			post: {
				...data,
				content: {
					...data.content,
					// NOTE: Wordpress 上の画像はドメインを強制的に付与して、prerender しないようにしておく
					rendered: data.content.rendered.replaceAll(
						/"\/wp-content\/(.*?)"/g,
						'"https://k2ss.info/wp-content/$1"'
					)
				},
				categories
			} as PostItem
		};
	}

	throw error(404, 'Not found');
};
