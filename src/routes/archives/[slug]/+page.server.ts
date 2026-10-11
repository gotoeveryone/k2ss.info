import { error } from "@sveltejs/kit";
import { dev } from "$app/env";
import { PREVIEW_SECRET } from "$app/env/private";
import { Category as CategoryRepo } from "#lib/repositories/category.ts";
import { Post as PostRepo } from "#lib/repositories/post.ts";
import type { PostItem } from "#types/post.ts";

export const load = async ({ params, request }) => {
	const postRepo = new PostRepo();
	const query = new URL(request.url).searchParams;
	const { slug } = params;
	// NOTE: プレビューは開発時のみ有効化
	const isPreview =
		dev &&
		query.get("preview") === "1" &&
		PREVIEW_SECRET !== "" &&
		query.get("secret") === PREVIEW_SECRET;
	const post = isPreview
		? await postRepo.getPreviewPost(slug)
		: await postRepo.getPost(slug);

	if (post) {
		const categoryRepo = new CategoryRepo();
		const categoryIds = post.categories.map((c) => c.id);
		const categories = categoryIds.length
			? await categoryRepo.getCategories({ ids: categoryIds })
			: [];
		return {
			path: `/archives/${slug}/`,
			post: {
				...post,
				categories,
			} as PostItem,
		};
	}

	throw error(404, "Not found");
};
