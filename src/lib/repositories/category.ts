import { client } from '$lib/clients/contentful';
import type { Entry } from 'contentful';
import type { Category as CategoryItem } from 'types/category';

export class Category {
	getCategories({ slug, ids }: { slug?: string; ids?: string[] }): Promise<CategoryItem[]> {
		const params = {} as Record<string, string>;
		if (slug) {
			params['fields.slug'] = slug;
		}
		if (ids && ids.length) {
			params['sys.id[in]'] = ids.join(',');
		}
		return client
			.getEntries({
				content_type: 'categories',
				limit: 20,
				...params
			})
			.then((res) => {
				return res.items.map((item) => ({
					id: item.sys.id,
					slug: item.fields.slug as string,
					name: item.fields.name as string,
					link: this.createLink(item),
					childCategories: ((item.fields.childCategories as Entry[]) || []).map((c) => ({
						id: c.sys.id,
						slug: c.fields.slug as string,
						name: c.fields.name as string,
						link: this.createLink(c),
						childCategories: []
					}))
				}));
			});
	}

	private createLink(e: Entry): string {
		const slug = e.fields.slug as string;
		const parentSlug = (e.fields.parentCategory as Entry)?.fields.slug;
		if (parentSlug) {
			return `/archives/category/${parentSlug}/${slug}/`;
		}
		return `/archives/category/${slug}/`;
	}
}
