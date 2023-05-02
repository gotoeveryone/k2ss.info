<script lang="ts">
	import MarkdownAnchor from '$lib/components/anchor.svelte';
	import { getMetaTitle, getOpenGraph, getTwitter } from '$lib/modules/meta';
	import { getSiteUrl } from '$lib/modules/site';
	import Markdown from '@magidoc/plugin-svelte-marked';
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

<div class="leading-8 break-words">
	<Markdown source={data.page.content} renderers={{ link: MarkdownAnchor }} />
</div>
