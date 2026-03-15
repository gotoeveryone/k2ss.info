import { error } from "@sveltejs/kit";
import {
	CategoryPostListNotFoundError,
	loadCategoryPostList,
} from "$lib/server/category-post-list";

export const load = async ({ params }) => {
	try {
		return await loadCategoryPostList({
			slug: params.slug,
		});
	} catch (e) {
		if (e instanceof CategoryPostListNotFoundError) {
			throw error(404, "Not found");
		}
		throw e;
	}
};
