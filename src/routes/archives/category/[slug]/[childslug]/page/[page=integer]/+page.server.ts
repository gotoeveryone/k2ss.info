import { error } from '@sveltejs/kit';
import type { Category } from 'types/category';
import type { PostListItem } from 'types/post';

export const load = async ({ params }) => {
	// NOTE: 本来は親子関係を考慮するべきだが、現状重複が無いため一旦考えない
	// 親の存在だけ確認しておく
	const _response = await fetch(`https://k2ss.info/wp-json/wp/v2/categories?slug=${params.slug}`);

	if (!_response.ok) {
		throw error(404, 'Not found');
	}

	const endpoint = `https://k2ss.info/wp-json/wp/v2/categories?slug=${params.childslug}`;

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
					urlPrefix: `/archives/category/${params.slug}/${params.childslug}/`,
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
