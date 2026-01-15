import { sveltekit } from "@sveltejs/kit/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [sveltekit(), svelteTesting()],
	test: {
		watch: false,
		globals: true,
		environment: "jsdom",
		include: ["src/**/*.{test,spec}.{js,ts}"],
	},
});
