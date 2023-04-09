import { error } from '@sveltejs/kit';
import type { PostItem } from 'types/post';

export const load = async ({ params }) => {
	const endpoint = `https://k2ss.info/wp-json/wp/v2/posts/${params.id}`;

	const response = await fetch(endpoint);

	if (response.ok) {
		const data = (await response.json()) as PostItem;
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
				}
			}
		};
	}

	throw error(404, 'Not found');
};
