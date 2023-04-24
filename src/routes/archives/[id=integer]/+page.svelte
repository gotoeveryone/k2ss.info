<script lang="ts">
	import Post from '$lib/components/post.svelte';
	import { getMetaTitle, getOpenGraph, getTwitter } from '$lib/modules/meta';
	import { getSiteUrl } from '$lib/modules/site';
	import { MetaTags } from 'svelte-meta-tags';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const metaTitle = getMetaTitle(data.post.title);
</script>

<MetaTags
	title={metaTitle}
	canonical={getSiteUrl(data.path)}
	openGraph={getOpenGraph({ type: 'article', path: data.path, title: metaTitle })}
	twitter={getTwitter({
		title: metaTitle
	})}
/>

<Post post={data.post} />
