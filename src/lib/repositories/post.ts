import { SOURCE_URL } from '$env/static/private';

export class Post {
	getPosts({
		categoryId,
		page = 1,
		perPage = 20
	}: {
		categoryId?: number;
		page?: number;
		perPage?: number;
	}) {
		const params = new URLSearchParams({
			context: 'embed'
		});
		if (categoryId) {
			params.append('categories', categoryId.toString());
		}
		if (page && page > 0) {
			params.append('page', page.toString());
		}
		if (perPage && perPage > 0) {
			params.append('per_page', perPage.toString());
		}
		return fetch(`${SOURCE_URL}/wp-json/wp/v2/posts?${params.toString()}`);
	}

	getPost(id: number) {
		return fetch(`${SOURCE_URL}/wp-json/wp/v2/posts/${id}`);
	}
}
