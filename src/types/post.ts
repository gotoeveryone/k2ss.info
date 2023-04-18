import type { Category } from './category';

export interface PageResponse {
	total: number;
	items: PostListItem[];
}

export interface EmbedItem {
	rendered: string;
}

export interface PostListItem {
	id: number;
	date: string;
	title: string;
	excerpt: string;
}

export interface PostItem {
	id: number;
	date: string;
	title: string;
	content: string;
	categories: Category[];
}
