<script lang="ts">
	import Markdown from '$lib/components/markdown.svelte';
	import { getMetaTitle, getOpenGraph, getTwitter } from '$lib/modules/meta';
	import { getSiteUrl } from '$lib/modules/site';
	import { MetaTags } from 'svelte-meta-tags';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const metaTitle = getMetaTitle(data.page.title);
</script>

<MetaTags
	title={metaTitle}
	canonical={getSiteUrl(data.path)}
	openGraph={getOpenGraph({ title: metaTitle, path: data.path })}
	twitter={getTwitter({
		title: metaTitle
	})}
/>

<h1>{data.page.title}</h1>

<div class="leading-8 break-words privacy-policy">
	<Markdown content={data.page.content} />
</div>

<style>
	.privacy-policy :global(ol) {
		@apply font-bold;
	}

	.privacy-policy :global(p) {
		margin-left: 0.6rem;
	}
</style>
