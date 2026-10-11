/// <reference types="vitest/config" />
import { sveltekit } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { svelteTesting } from "@testing-library/svelte/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter({
				pages: "build",
				assets: "build",
				precompress: false,
				strict: true,
			}),
			paths: { relative: false },
			prerender: {
				entries: [
					"/404/",
					"/archives/category/it/",
					"/archives/category/it/golang/",
					"/archives/category/it/python/",
					"/archives/category/it/javascript/",
					"/archives/category/it/php/",
					"/archives/category/it/operation/",
					"/archives/category/igo/",
					"/archives/category/others/",
					"/archives/category/others/jobs",
					"/archives/category/others/certificates",
					"/archives/category/others/meals",
					"/archives/category/others/travels",
				],
			},
		}),
		svelteTesting(),
	],
	test: {
		watch: false,
		globals: true,
		environment: "jsdom",
		include: ["src/**/*.{test,spec}.{js,ts}"],
		setupFiles: ["src/setup-test.ts"],
	},
});
