import { sveltekit } from "@sveltejs/kit/vite";
import { svelteTesting } from '@testing-library/svelte/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
	plugins: [sveltekit(), svelteTesting()],
	// Svelte error: lifecycle_function_unavailable への対応
	// https://github.com/sveltejs/svelte/issues/11394
	resolve: {
		conditions: mode === 'test' ? ['browser'] : [],
	},
	test: {
		watch: false,
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
}));
