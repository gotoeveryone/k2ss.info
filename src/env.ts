import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
	PUBLIC_SITE_URL: { public: true, static: true },
	CONTENTFUL_SPACE: { static: true },
	CONTENTFUL_ENVIRONMENT: { static: true },
	CONTENTFUL_ACCESS_TOKEN: { static: true },
	CONTENTFUL_PREVIEW_TOKEN: { static: true },
	PREVIEW_SECRET: { static: true },
});
