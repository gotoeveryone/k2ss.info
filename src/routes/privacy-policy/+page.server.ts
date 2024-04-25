import { error } from '@sveltejs/kit';
import { Page as PageRepo } from '$lib/repositories/page';

export const load = async () => {
	const repo = new PageRepo();
	const page = await repo.getPage('privacy-policy');

	if (page) {
		return {
			path: `/privacy-policy/`,
			page
		};
	}

	throw error(404, 'Not found');
};
