export interface EmbedItem {
	rendered: string;
}

export interface PostListItem {
	id: number;
	date: string;
	title: EmbedItem;
	excerpt: EmbedItem;
}

export interface PostItem {
	id: number;
	date: string;
	title: EmbedItem;
	excerpt: EmbedItem;
	content: EmbedItem;
}
