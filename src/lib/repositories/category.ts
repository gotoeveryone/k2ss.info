import { client } from '$lib/clients/contentful';

export class Category {
	getCategories({ slug, ids }: { slug?: string; ids?: string[] }) {
		const params = {} as Record<string, string>;
		if (slug) {
			params['fields.slug'] = slug;
		}
		if (ids && ids.length) {
			params['sys.id[in]'] = ids.join(',');
		}
		return client.getEntries({ content_type: 'categories', limit: 20, ...params }).then((res) =>
			res.items.map((item) => ({
				id: item.sys.id,
				slug: item.fields.slug as string,
				name: item.fields.name as string
			}))
		);
	}
}
