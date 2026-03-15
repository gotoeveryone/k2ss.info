import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";
import Component from "$lib/components/category-post-list-page.svelte";

const data = {
	path: "/archives/category/it/",
	urlPrefix: "/archives/category/it/",
	category: {
		id: "category-id",
		slug: "it",
		name: "IT",
		link: "/archives/category/it/",
		childCategories: [],
	},
	total: 21,
	totalPage: 2,
	posts: [
		{
			slug: "test-post",
			date: "2006-01-02T15:04:05+09:00",
			title: "test title",
			excerpt: "test excerpt",
		},
	],
};

describe("CategoryPostListPage", () => {
	test("見出しと記事一覧が表示される", () => {
		const { container, queryByText } = render(Component, {
			props: { data },
		});

		expect(queryByText("test title")).toBeTruthy();
		expect(container.querySelector("h1")?.textContent).toContain(
			`${data.category.name} の記事一覧`,
		);
		expect(container.querySelector("a")?.getAttribute("href")).toBe(
			`/archives/${data.posts[0].slug}/`,
		);
	});

	test("currentPage 未指定時は 1 ページ目として Pager に渡される", () => {
		const { queryByText } = render(Component, {
			props: { data },
		});

		expect(queryByText("1")?.tagName).toBe("SPAN");
		expect(queryByText("2")?.getAttribute("href")).toBe(
			`${data.urlPrefix}page/2/`,
		);
	});
});
