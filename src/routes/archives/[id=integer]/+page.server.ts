import { error } from '@sveltejs/kit';
import { Category as CategoryRepo } from '$lib/repositories/category';
import { Post as PostRepo } from '$lib/repositories/post';
import type { PostItem } from 'types/post';

export const load = async ({ params }) => {
	const postRepo = new PostRepo();
	const id = parseInt(params.id, 10);
	const post = await postRepo.getPost(id);

	if (post) {
		const categoryRepo = new CategoryRepo();
		const categoryIds = post.categories.map((c) => c.id);
		const categories = categoryIds.length
			? await categoryRepo.getCategories({ ids: categoryIds })
			: [];
		return {
			path: `/archives/${params.id}/`,
			post: {
				...post,
				categories
			} as PostItem
		};
	}

	throw error(404, 'Not found');
};
