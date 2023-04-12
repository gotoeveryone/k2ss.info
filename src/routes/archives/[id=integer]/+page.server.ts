import { error } from '@sveltejs/kit';
import { SOURCE_URL } from '$env/static/private';
import { Category as CategoryRepo } from '$lib/repositories/category';
import { Post as PostRepo } from '$lib/repositories/post';
import type { Category } from 'types/category';
import type { PostItem } from 'types/post';

export const load = async ({ params }) => {
	const postRepo = new PostRepo();
	const response = await postRepo.getPost(parseInt(params.id, 10));

	if (response.ok) {
		const data = await response.json();
		const categoryRepo = new CategoryRepo();
		const categoryResponse = await categoryRepo.getCategories({ ids: data.categories });
		const categories = (categoryResponse.ok ? await categoryResponse.json() : []) as Category[];
		return {
			post: {
				...data,
				content: {
					...data.content,
					rendered: data.content.rendered.replace(new RegExp(`${SOURCE_URL}/`, 'g'), '/')
				},
				categories: categories.map((c) => ({
					...c,
					// NOTE: SSG 生成対象にしたいので、リンクからドメインを削除しておく
					link: c.link.replace(SOURCE_URL, '')
				}))
			} as PostItem
		};
	}

	throw error(404, 'Not found');
};
