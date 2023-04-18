import { client } from '$lib/clients/contentful';
import type { PostItem } from 'types/post';

export class Post {
	getPosts({
		categoryIds,
		page = 1,
		perPage = 20
	}: {
		categoryIds?: string[];
		page?: number;
		perPage?: number;
	}) {
		const params = {} as Record<string, string>;
		if (categoryIds?.length) {
			params['fields.categories.sys.id[in]'] = categoryIds.join(',');
		}
		if (page && page > 0) {
			params['skip'] = (page * (perPage || 20)).toString();
		}
		if (perPage && perPage > 0) {
			params['limit'] = perPage.toString();
		}
		return client
			.getEntries({ content_type: 'posts', order: '-fields.published', ...params })
			.then((res) => ({
				total: res.total,
				items: res.items.map((item) => ({
					id: item.fields.id,
					title: item.fields.title,
					date: item.fields.published as string,
					excerpt: `${(item.fields.content as any).content[0].content[0].value.slice(0, 100)} ...`
				}))
			}));
	}

	async getPost(id: number) {
		const items = (
			await client.getEntries({
				content_type: 'posts',
				'fields.id': id
			})
		).items;
		if (!items.length) {
			return null;
		}

		const item = items[0];
		return {
			id: item.fields.id as number,
			title: item.fields.title as string,
			date: item.fields.published as string,
			content: (item.fields.content as any).content[0].content[0].value as string,
			categories: (item.fields.categories as any[]).map((item) => ({
				id: item.sys.id as string,
				slug: item.fields.slug as string,
				name: item.fields.name as string
			}))
		} as PostItem;
	}
}
