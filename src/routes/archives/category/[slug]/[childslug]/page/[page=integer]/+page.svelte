<script lang="ts">
	import type { PageServerData } from './$types';
	import Pager from '$lib/components/pager.svelte';
	import PostItem from '$lib/components/post-item.svelte';
	import { getMetaTitle, getOpenGraph, getTwitter } from '$lib/modules/meta';
	import { getSiteUrl } from '$lib/modules/site';
	import { MetaTags } from 'svelte-meta-tags';

	export let data: PageServerData;

	const metaTitle = getMetaTitle(data.category.name);
</script>

<MetaTags
	title={metaTitle}
	canonical={getSiteUrl(data.path)}
	openGraph={getOpenGraph({
		title: metaTitle,
		path: data.path
	})}
	twitter={getTwitter({
		title: metaTitle
	})}
/>

<h1>{data.category.name} の記事一覧<span class="ml-2 text-xl">({data.total}件)</span></h1>
{#each data.posts as post}
	<PostItem item={post} />
{/each}

<Pager prefix={data.urlPrefix} currentPage={data.currentPage} totalPage={data.totalPage} />
