export interface Category {
	id: string;
	slug: string;
	name: string;
	link: string;
	childCategories: Category[];
}
