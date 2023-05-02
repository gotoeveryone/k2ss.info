import { client } from '$lib/clients/contentful';
import type { PageItem } from 'types/page';

export class Page {
	async getPage(slug: string) {
		const items = (
			await client.getEntries({
				content_type: 'pages',
				'fields.slug': slug
			})
		).items;
		if (!items.length) {
			return null;
		}

		const item = items[0];
		return {
			title: item.fields.title as string,
			content: item.fields.content as string
		} as PageItem;
	}
}
