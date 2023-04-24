<script lang="ts">
	import Post from '$lib/components/post.svelte';
	import PostItem from '$lib/components/post-item.svelte';
	import { getMetaTitle, getOpenGraph, getTwitter } from '$lib/modules/meta';
	import { getSiteUrl } from '$lib/modules/site';
	import dayjs from 'dayjs';
	import { MetaTags } from 'svelte-meta-tags';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const description = '主に囲碁・プログラミングについて書いています';
</script>

{#if data.isPreview && data.post}
	<MetaTags title={getMetaTitle(data.post.title)} />

	<Post post={data.post} />
{:else}
	<MetaTags
		title={getMetaTitle()}
		canonical={getSiteUrl()}
		{description}
		openGraph={getOpenGraph()}
		twitter={getTwitter({
			description
		})}
	/>

	<h1>最近の記事</h1>
	{#each data.posts as post}
		<PostItem item={post} />
	{/each}
{/if}
