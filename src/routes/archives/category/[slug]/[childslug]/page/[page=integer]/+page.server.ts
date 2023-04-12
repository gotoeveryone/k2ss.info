import { error } from '@sveltejs/kit';
import { Category as CategoryRepo } from '$lib/repositories/category';
import { Post as PostRepo } from '$lib/repositories/post';
import type { Category } from 'types/category';
import type { PostListItem } from 'types/post';

export const load = async ({ params }) => {
	// NOTE: 本来は親子関係を考慮するべきだが、現状重複が無いため一旦考えない
	// 親の存在だけ確認しておく
	const categoryRepo = new CategoryRepo();
	const _response = await categoryRepo.getCategories({ slug: params.slug });

	if (!_response.ok) {
		throw error(404, 'Not found');
	}

	const response = await categoryRepo.getCategories({ slug: params.childslug });

	if (response.ok) {
		const data = (await response.json()) as Category[];
		if (data.length) {
			const page = parseInt(params.page, 10);
			const postRepo = new PostRepo();
			const response = await postRepo.getPosts({
				page,
				categoryId: data[0].id
			});
			if (response.ok) {
				const total = response.headers.get('x-wp-total');
				const totalPage = response.headers.get('x-wp-totalpages');
				const posts = (await response.json()) as PostListItem[];
				return {
					urlPrefix: `/archives/category/${params.slug}/${params.childslug}/`,
					category: data[0],
					total: total && total.length ? parseInt(total, 10) : 0,
					totalPage: totalPage && totalPage.length ? parseInt(totalPage, 10) : 0,
					currentPage: page,
					posts
				};
			}
		}
	}

	throw error(404, 'Not found');
};
