import { error } from '@sveltejs/kit';
import { PREVIEW_SECRET } from '$env/static/private';
import { Category as CategoryRepo } from '$lib/repositories/category';
import { Post as PostRepo } from '$lib/repositories/post';
import type { PostItem } from 'types/post';

export const load = async ({ params, request }) => {
	const postRepo = new PostRepo();
	const query = new URL(request.url).searchParams;
	const id = parseInt(params.id, 10);
	const post =
		query.get('preview') === '1' && PREVIEW_SECRET !== '' && query.get('secret') === PREVIEW_SECRET
			? await postRepo.getPreviewPost(id)
			: await postRepo.getPost(id);

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
