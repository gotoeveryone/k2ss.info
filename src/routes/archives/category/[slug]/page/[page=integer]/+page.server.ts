import { error } from '@sveltejs/kit';
import { Category as CategoryRepo } from '$lib/repositories/category';
import { Post as PostRepo } from '$lib/repositories/post';

export const load = async ({ params }) => {
	const categoryRepo = new CategoryRepo();
	const categories = await categoryRepo.getCategories({ slug: params.slug });

	if (categories.length) {
		const page = parseInt(params.page, 10);
		const postRepo = new PostRepo();
		const { total, items: posts } = await postRepo.getPosts({
			page,
			categoryIds: [categories[0].id].concat(categories[0].childCategories.map((c) => c.id))
		});
		if (posts.length) {
			return {
				path: `/archives/category/${params.slug}/page/${page}`,
				urlPrefix: `/archives/category/${params.slug}/`,
				category: categories[0],
				total,
				totalPage: Math.ceil(total / 20),
				currentPage: page,
				posts
			};
		}
	}

	throw error(404, 'Not found');
};
