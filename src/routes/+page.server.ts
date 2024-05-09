import { Post as PostRepo } from "$lib/repositories/post";

export const load = async () => {
	const postRepo = new PostRepo();
	const { items: posts } = await postRepo.getPosts({ page: 1, perPage: 20 });
	return {
		posts,
	};
};
