import { PREVIEW_SECRET } from '$env/static/private';
import { Category as CategoryRepo } from '$lib/repositories/category';
import { Post as PostRepo } from '$lib/repositories/post';
import type { PostItem } from 'types/post';

export const load = async ({ request }) => {
	const postRepo = new PostRepo();

	const query = new URL(request.url).searchParams;
	const isPreview =
		query.get('post') !== null &&
		query.get('post') !== '' &&
		query.get('preview') === '1' &&
		PREVIEW_SECRET !== '' &&
		query.get('secret') === PREVIEW_SECRET;
	if (isPreview) {
		const id = parseInt(query.get('post') as string, 10);
		const post = await postRepo.getPreviewPost(id);

		if (post) {
			const categoryRepo = new CategoryRepo();
			const categoryIds = post.categories.map((c) => c.id);
			const categories = categoryIds.length
				? await categoryRepo.getCategories({ ids: categoryIds })
				: [];
			return {
				isPreview,
				post: {
					...post,
					categories
				} as PostItem
			};
		}
	}

	const { items: posts } = await postRepo.getPosts({ page: 1, perPage: 20 });
	if (posts.length) {
		return {
			isPreview: false,
			post: null,
			posts
		};
	}

	return {
		isPreview: false,
		post: null,
		posts: []
	};
};
