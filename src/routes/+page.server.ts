import type { PostListItem } from 'types/post';

export const load = async () => {
	const endpoint = `https://k2ss.info/wp-json/wp/v2/posts?page=1&per_page=10&context=embed`;

	const response = await fetch(endpoint);
	const total = response.headers.get('x-wp-total');
	const totalPage = response.headers.get('x-wp-totalpages');
	const posts = (await response.json()) as PostListItem[];
	return {
		total: total && total.length ? parseInt(total, 10) : 0,
		totalPage: totalPage && totalPage.length ? parseInt(totalPage, 10) : 0,
		posts
	};
};
