import { Post as PostRepo } from '$lib/repositories/post';
import type { PostListItem } from 'types/post';

export const load = async () => {
	const postRepo = new PostRepo();
	const response = await postRepo.getPosts({ page: 1, perPage: 20 });
	const total = response.headers.get('x-wp-total');
	const totalPage = response.headers.get('x-wp-totalpages');
	const posts = (await response.json()) as PostListItem[];
	return {
		total: total && total.length ? parseInt(total, 10) : 0,
		totalPage: totalPage && totalPage.length ? parseInt(totalPage, 10) : 0,
		posts
	};
};
