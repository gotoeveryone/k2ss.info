import type { Document } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { client, previewClient } from '$lib/clients/contentful';
import type { Entry } from 'contentful';
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
					id: item.fields.id as number,
					title: item.fields.title as string,
					date: item.fields.published as string,
					excerpt: `${this.getContent(item.fields.content as Document)
						.replace(/(<([^>]+)>)/gi, '')
						.slice(0, 110)} …` as string
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
			content: this.getContent(item.fields.content as Document),
			categories: ((item.fields.categories as Entry[]) || []).map((item) => ({
				id: item.sys.id as string,
				slug: item.fields.slug as string,
				name: item.fields.name as string
			}))
		} as PostItem;
	}

	async getPreviewPost(id: number) {
		const items = (
			await previewClient.getEntries({
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
			content: this.getContent(item.fields.content as Document),
			categories: ((item.fields.categories as Entry[]) || []).map((item) => ({
				id: item.sys.id as string,
				slug: item.fields.slug as string,
				name: item.fields.name as string
			}))
		} as PostItem;
	}

	getContent(content: Document) {
		return (
			documentToHtmlString(content)
				// エスケープされた文字を元に戻す
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')
				.replace(/&quot;/g, '"')
				// 文末の改行をbrに変換
				.replace(/(。|！|？)\n/g, '$1<br/>')
		);
	}
}
