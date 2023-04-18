import { error } from '@sveltejs/kit';
import { SOURCE_URL } from '$env/static/private';
import { Category as CategoryRepo } from '$lib/repositories/category';
import { Post as PostRepo } from '$lib/repositories/post';
import type { PostItem } from 'types/post';

export const load = async ({ params }) => {
	const postRepo = new PostRepo();
	const post = await postRepo.getPost(parseInt(params.id, 10));

	if (post) {
		const categoryRepo = new CategoryRepo();
		const categories = await categoryRepo.getCategories({ ids: post.categories.map((c) => c.id) });
		return {
			path: `/archives/${params.id}/`,
			post: {
				...post,
				content: post.content
					.replace(new RegExp(`i0.wp.com/`, 'g'), '')
					.replace(new RegExp(`${SOURCE_URL}/`, 'g'), '/')
					.replace(new RegExp('/wp-content/uploads/', 'g'), '/images/'),
				categories
			} as PostItem
		};
	}

	throw error(404, 'Not found');
};
