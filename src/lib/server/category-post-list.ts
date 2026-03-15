import { Category as CategoryRepo } from "$lib/repositories/category";
import { Post as PostRepo } from "$lib/repositories/post";

type LoadCategoryPostListParams = {
	slug: string;
	childslug?: string;
	page?: number;
};

export class CategoryPostListNotFoundError extends Error {
	constructor() {
		super("Category post list not found");
		this.name = "CategoryPostListNotFoundError";
	}
}

export const loadCategoryPostList = async ({
	slug,
	childslug,
	page = 1,
}: LoadCategoryPostListParams) => {
	const categoryRepo = new CategoryRepo();

	if (childslug) {
		// NOTE: 本来は親子関係を考慮するべきだが、現状重複が無いため一旦考えない
		// 親の存在だけ確認しておく
		const parentCategories = await categoryRepo.getCategories({ slug });
		if (!parentCategories.length) {
			throw new CategoryPostListNotFoundError();
		}
	}

	const categorySlug = childslug ?? slug;
	const categories = await categoryRepo.getCategories({ slug: categorySlug });
	if (!categories.length) {
		throw new CategoryPostListNotFoundError();
	}

	const category = categories[0];
	const categoryIds = childslug
		? [category.id]
		: [category.id].concat(category.childCategories.map((c) => c.id));

	const postRepo = new PostRepo();
	const { total, items: posts } = await postRepo.getPosts({
		page,
		categoryIds,
	});
	if (!posts.length) {
		throw new CategoryPostListNotFoundError();
	}

	const urlPrefix = childslug
		? `/archives/category/${slug}/${childslug}/`
		: `/archives/category/${slug}/`;
	const path =
		page === 1
			? urlPrefix
			: `${urlPrefix}page/${page}/`;

	return {
		path,
		urlPrefix,
		category,
		total,
		totalPage: Math.ceil(total / 20),
		...(page > 1 ? { currentPage: page } : {}),
		posts,
	};
};
