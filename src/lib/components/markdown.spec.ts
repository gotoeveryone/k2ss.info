import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";
import Component from "$lib/components/markdown.svelte";

describe("Markdown", () => {
	test("レンダリングされる", () => {
		const { container } = render(Component, {
			props: { content: "test content" },
		});
		expect(container).toBeDefined();
	});

	test("外部リンクに rel 属性が設定される", () => {
		const { container } = render(Component, {
			props: { content: '[test](https://example.com "example")' },
		});

		const link = container.querySelector("a");
		expect(link?.getAttribute("target")).toBe("_blank");
		expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
	});
});
