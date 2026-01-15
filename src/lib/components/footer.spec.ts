import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";
import Component from "$lib/components/footer.svelte";

describe("Footer", () => {
	test("レンダリングされる", () => {
		const { container } = render(Component);
		expect(container).toBeDefined();
	});
});
