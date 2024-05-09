import type { Category } from "./category";

export interface PostLiteResponse {
	total: number;
	items: PostListItem[];
}

export interface EmbedItem {
	rendered: string;
}

export interface PostListItem {
	slug: string;
	date: string;
	title: string;
	excerpt: string;
}

export interface PostItem {
	slug: string;
	date: string;
	title: string;
	content: string;
	categories: Category[];
}
