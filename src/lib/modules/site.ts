import { PUBLIC_SITE_URL } from "$env/static/public";

export const getSiteUrl = (path?: string) => {
	if (!path) {
		return PUBLIC_SITE_URL;
	}
	return [PUBLIC_SITE_URL.replace(/\/$/, ""), path.replace(/^\//, "")].join(
		"/",
	);
};
