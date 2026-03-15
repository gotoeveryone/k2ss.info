import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";
import Component from "$lib/components/pager.svelte";

describe("Pager", () => {
	test("レンダリングされる", () => {
		const { container } = render(Component, {
			props: {
				currentPage: 1,
				totalPage: 1,
			},
		});
		expect(container).toBeDefined();
	});

	test("2ページ目では 1 ページ目へのリンクが prefix を向く", () => {
		const prefix = "/archives/category/it/";
		const { queryByText } = render(Component, {
			props: {
				currentPage: 2,
				totalPage: 5,
				prefix,
			},
		});

		expect(queryByText("1")?.getAttribute("href")).toBe(prefix);
	});
});
