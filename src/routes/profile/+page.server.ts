import { error } from '@sveltejs/kit';
import { Page as PageRepo } from '$lib/repositories/page';

export const load = async () => {
	const repo = new PageRepo();
	const page = await repo.getPage('profile');

	if (page) {
		return {
			path: `/profile/`,
			page
		};
	}

	throw error(404, 'Not found');
};
