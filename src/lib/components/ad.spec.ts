import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";
import Component from "$lib/components/ad.svelte";

describe("Ad", () => {
	test("レンダリングされる", () => {
		const { container } = render(Component);
		expect(container).toBeDefined();
	});
});
