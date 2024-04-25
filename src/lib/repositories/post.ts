import { client, previewClient } from '$lib/clients/contentful';
import type { Entry } from 'contentful';
import { marked } from 'marked';
import type { PostItem, PostLiteResponse } from 'types/post';

export class Post {
	getPosts({
		categoryIds,
		page = 1,
		perPage = 20
	}: {
		categoryIds?: string[];
		page?: number;
		perPage?: number;
	}): Promise<PostLiteResponse> {
		const params = {} as Record<string, string>;
		if (categoryIds?.length) {
			params['fields.categories.sys.id[in]'] = categoryIds.join(',');
		}
		if (page && page > 0) {
			params['skip'] = ((page - 1) * (perPage || 20)).toString();
		}
		if (perPage && perPage > 0) {
			params['limit'] = perPage.toString();
		}
		return client
			.getEntries({ content_type: 'posts', order: ['-fields.published'], ...params })
			.then((res) => ({
				total: res.total,
				items: res.items.map((item) => ({
					slug: item.fields.slug as string,
					title: item.fields.title as string,
					date: item.fields.published as string,
					excerpt: `${(marked(item.fields.content as string, { async: false }) as string)
						.replace(/(<([^>]+)>)/gi, '')
						.slice(0, 110)} …` as string
				}))
			}));
	}

	async getPost(slug: string) {
		const items = (
			await client.getEntries({
				content_type: 'posts',
				'fields.slug': slug
			})
		).items;
		if (!items.length) {
			return null;
		}

		const item = items[0];
		return {
			slug: item.fields.slug as string,
			title: item.fields.title as string,
			date: item.fields.published as string,
			content: item.fields.content as string,
			categories: ((item.fields.categories as Entry[]) || []).map((item) => ({
				id: item.sys.id as string,
				slug: item.fields.slug as string,
				name: item.fields.name as string
			}))
		} as PostItem;
	}

	async getPreviewPost(slug: string) {
		const items = (
			await previewClient.getEntries({
				content_type: 'posts',
				'fields.slug': slug
			})
		).items;
		if (!items.length) {
			return null;
		}

		const item = items[0];
		return {
			slug: item.fields.slug as string,
			title: item.fields.title as string,
			date: item.fields.published as string,
			content: item.fields.content as string,
			categories: ((item.fields.categories as Entry[]) || []).map((item) => ({
				id: item.sys.id as string,
				slug: item.fields.slug as string,
				name: item.fields.name as string
			}))
		} as PostItem;
	}
}
