import { SITE_URL } from '$lib/constants';

export const getSiteUrl = (path?: string) => {
	if (!path) {
		return SITE_URL;
	}
	return [SITE_URL.replace(/\/$/, ''), path.replace(/^\//, '')].join('/');
};
