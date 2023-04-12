import { error } from '@sveltejs/kit';
import { Category as CategoryRepo } from '$lib/repositories/category';
import { Post as PostRepo } from '$lib/repositories/post';
import type { Category } from 'types/category';
import type { PostListItem } from 'types/post';

export const load = async ({ params }) => {
	const categoryRepo = new CategoryRepo();
	const response = await categoryRepo.getCategories({ slug: params.slug });

	if (response.ok) {
		const data = (await response.json()) as Category[];
		if (data.length) {
			const postRepo = new PostRepo();
			const response = await postRepo.getPosts({ categoryId: data[0].id });
			const total = response.headers.get('x-wp-total');
			const totalPage = response.headers.get('x-wp-totalpages');
			const posts = (await response.json()) as PostListItem[];
			return {
				urlPrefix: `/archives/category/${params.slug}/`,
				category: data[0],
				total: total && total.length ? parseInt(total, 10) : 0,
				totalPage: totalPage && totalPage.length ? parseInt(totalPage, 10) : 0,
				posts
			};
		}
	}

	throw error(404, 'Not found');
};
