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
});
