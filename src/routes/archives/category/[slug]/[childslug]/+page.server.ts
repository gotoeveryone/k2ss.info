import { error } from '@sveltejs/kit';
import { Category as CategoryRepo } from '$lib/repositories/category';
import { Post as PostRepo } from '$lib/repositories/post';

export const load = async ({ params }) => {
	// NOTE: 本来は親子関係を考慮するべきだが、現状重複が無いため一旦考えない
	// 親の存在だけ確認しておく
	const categoryRepo = new CategoryRepo();
	const parentCategories = await categoryRepo.getCategories({ slug: params.slug });
	if (!parentCategories.length) {
		throw error(404, 'Not found');
	}

	const categories = await categoryRepo.getCategories({ slug: params.childslug });
	if (categories.length) {
		const postRepo = new PostRepo();
		const { total, items: posts } = await postRepo.getPosts({
			categoryIds: [categories[0].id]
		});
		if (posts.length) {
			return {
				path: `/archives/category/${params.slug}/${params.childslug}/`,
				urlPrefix: `/archives/category/${params.slug}/${params.childslug}/`,
				category: categories[0],
				total,
				totalPage: Math.ceil(total / 20),
				posts
			};
		}
	}

	throw error(404, 'Not found');
};
