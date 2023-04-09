import { error } from '@sveltejs/kit';
import type { Category } from 'types/category';
import type { PostListItem } from 'types/post';

export const load = async ({ params }) => {
	const endpoint = `https://k2ss.info/wp-json/wp/v2/categories?slug=${params.slug}`;

	const response = await fetch(endpoint);

	if (response.ok) {
		const data = (await response.json()) as Category[];
		if (data.length) {
			const endpoint = `https://k2ss.info/wp-json/wp/v2/posts?page=${params.page}&per_page=10&context=embed&categories=${data[0].id}`;

			const response = await fetch(endpoint);
			if (response.ok) {
				const total = response.headers.get('x-wp-total');
				const totalPage = response.headers.get('x-wp-totalpages');
				const posts = (await response.json()) as PostListItem[];
				return {
					urlPrefix: `/archives/category/${params.slug}/`,
					total: total && total.length ? parseInt(total, 10) : 0,
					totalPage: totalPage && totalPage.length ? parseInt(totalPage, 10) : 0,
					currentPage: parseInt(params.page, 10),
					posts
				};
			}
		}
	}

	throw error(404, 'Not found');
};
