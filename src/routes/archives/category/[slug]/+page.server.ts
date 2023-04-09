import { error } from '@sveltejs/kit';
import type { Category } from 'types/category';
import type { PostListItem } from 'types/post';

export const load = async ({ params }) => {
	const endpoint = `https://k2ss.info/wp-json/wp/v2/categories?slug=${params.slug}`;

	const response = await fetch(endpoint);

	if (response.ok) {
		const data = (await response.json()) as Category[];
		if (data.length) {
			const endpoint = `https://k2ss.info/wp-json/wp/v2/posts?context=embed&categories=${data[0].id}`;

			const response = await fetch(endpoint);
			const posts = (await response.json()) as PostListItem[];
			return {
				category: data[0],
				posts
			};
		}
	}

	throw error(404, 'Not found');
};
