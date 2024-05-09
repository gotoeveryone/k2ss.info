import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";
import Component from "$lib/components/post-item.svelte";

const item = {
	slug: "test-post",
	date: "2006-01-02T15:04:05+09:00",
	title: "test title",
	excerpt: "test excerpt",
};

describe("PostItem", () => {
	test("タイトルが設定されている", () => {
		const { queryByText } = render(Component, {
			props: { item },
		});
		expect(!!queryByText(item.title)).toBe(true);
	});
	test("a タグに記事ページへのリンクが設定されている", () => {
		const { container } = render(Component, {
			props: { item },
		});
		expect(container.querySelector("a")?.getAttribute("href")).toBe(
			`/archives/${item.slug}/`,
		);
	});
});
