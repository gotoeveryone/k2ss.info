import { SOURCE_URL } from '$env/static/private';

export class Category {
	getCategories({ slug, ids }: { slug?: string; ids?: number[] }) {
		const params = new URLSearchParams({
			context: 'embed'
		});
		if (slug) {
			params.append('slug', slug);
		}
		if (ids && ids.length) {
			params.append('include', ids.join('+'));
		}
		return fetch(`${SOURCE_URL}/wp-json/wp/v2/categories?${params.toString()}`);
	}
}
