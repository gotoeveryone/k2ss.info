import { Post as PostRepo } from '$lib/repositories/post';
import type { PostListItem } from 'types/post';

export const load = async () => {
	const postRepo = new PostRepo();
	const response = await postRepo.getPosts({ page: 1, perPage: 20 });
	const posts = (await response.json()) as PostListItem[];
	return {
		posts
	};
};
