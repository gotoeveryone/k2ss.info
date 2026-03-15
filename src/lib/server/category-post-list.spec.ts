import { beforeEach, describe, expect, test, vi } from "vitest";
import {
	CategoryPostListNotFoundError,
	loadCategoryPostList,
} from "$lib/server/category-post-list";

const getCategories = vi.fn();
const getPosts = vi.fn();

vi.mock("$lib/repositories/category", () => ({
	Category: vi.fn(() => ({
		getCategories,
	})),
}));

vi.mock("$lib/repositories/post", () => ({
	Post: vi.fn(() => ({
		getPosts,
	})),
}));

describe("loadCategoryPostList", () => {
	beforeEach(() => {
		getCategories.mockReset();
		getPosts.mockReset();
	});

	test("親カテゴリ一覧ページ用のデータを返す", async () => {
		getCategories.mockResolvedValue([
			{
				id: "parent-id",
				slug: "it",
				name: "IT",
				link: "/archives/category/it/",
				childCategories: [
					{
						id: "child-id",
						slug: "python",
						name: "Python",
						link: "/archives/category/it/python/",
						childCategories: [],
					},
				],
			},
		]);
		getPosts.mockResolvedValue({
			total: 21,
			items: [{ slug: "test-post" }],
		});

		const result = await loadCategoryPostList({ slug: "it" });

		expect(getCategories).toHaveBeenCalledWith({ slug: "it" });
		expect(getPosts).toHaveBeenCalledWith({
			page: 1,
			categoryIds: ["parent-id", "child-id"],
		});
		expect(result).toMatchObject({
			path: "/archives/category/it/",
			urlPrefix: "/archives/category/it/",
			total: 21,
			totalPage: 2,
			posts: [{ slug: "test-post" }],
		});
		expect(result).not.toHaveProperty("currentPage");
	});

	test("親カテゴリのページネーション用データは末尾スラッシュ付きの path を返す", async () => {
		getCategories.mockResolvedValue([
			{
				id: "parent-id",
				slug: "it",
				name: "IT",
				link: "/archives/category/it/",
				childCategories: [],
			},
		]);
		getPosts.mockResolvedValue({
			total: 41,
			items: [{ slug: "test-post" }],
		});

		const result = await loadCategoryPostList({
			slug: "it",
			page: 2,
		});

		expect(result).toMatchObject({
			path: "/archives/category/it/page/2/",
			urlPrefix: "/archives/category/it/",
			currentPage: 2,
		});
	});

	test("子カテゴリのページネーション用データを返す", async () => {
		getCategories
			.mockResolvedValueOnce([
				{
					id: "parent-id",
					slug: "it",
					name: "IT",
					link: "/archives/category/it/",
					childCategories: [],
				},
			])
			.mockResolvedValueOnce([
				{
					id: "child-id",
					slug: "python",
					name: "Python",
					link: "/archives/category/it/python/",
					childCategories: [],
				},
			]);
		getPosts.mockResolvedValue({
			total: 41,
			items: [{ slug: "test-post" }],
		});

		const result = await loadCategoryPostList({
			slug: "it",
			childslug: "python",
			page: 2,
		});

		expect(getCategories).toHaveBeenNthCalledWith(1, { slug: "it" });
		expect(getCategories).toHaveBeenNthCalledWith(2, { slug: "python" });
		expect(getPosts).toHaveBeenCalledWith({
			page: 2,
			categoryIds: ["child-id"],
		});
		expect(result).toMatchObject({
			path: "/archives/category/it/python/page/2/",
			urlPrefix: "/archives/category/it/python/",
			total: 41,
			totalPage: 3,
			currentPage: 2,
			posts: [{ slug: "test-post" }],
		});
	});

	test("子カテゴリ指定時に親カテゴリが無ければ独自例外を投げる", async () => {
		getCategories.mockResolvedValueOnce([]);

		await expect(
			loadCategoryPostList({
				slug: "it",
				childslug: "python",
			}),
		).rejects.toThrow(CategoryPostListNotFoundError);
	});

	test("投稿が無ければ独自例外を投げる", async () => {
		getCategories.mockResolvedValue([
			{
				id: "parent-id",
				slug: "it",
				name: "IT",
				link: "/archives/category/it/",
				childCategories: [],
			},
		]);
		getPosts.mockResolvedValue({
			total: 0,
			items: [],
		});

		await expect(loadCategoryPostList({ slug: "it" })).rejects.toThrow(
			CategoryPostListNotFoundError,
		);
	});
});
