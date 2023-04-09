import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: [
				'/archives/category/it/',
				'/archives/category/it/golang/',
				'/archives/category/it/python/',
				'/archives/category/it/javascript/',
				'/archives/category/it/php/',
				'/archives/category/it/operation/',
				'/archives/category/igo/',
				'/archives/category/others/',
				'/archives/category/others/jobs',
				'/archives/category/others/certificates',
				'/archives/category/others/books',
				'/archives/category/others/travels'
			]
		}
	}
};

export default config;
