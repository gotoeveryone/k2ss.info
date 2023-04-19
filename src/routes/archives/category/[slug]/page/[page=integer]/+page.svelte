<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import Pager from '$lib/components/pager.svelte';
	import PostItem from '$lib/components/post-item.svelte';
	import { getMetaTitle } from '$lib/modules/meta';
	import { getSiteUrl } from '$lib/modules/site';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<MetaTags title={getMetaTitle(data.category.name)} canonical={getSiteUrl(data.path)} />

<h1>{data.category.name} の記事一覧 ({data.total}件)</h1>
{#each data.posts as post}
	<PostItem item={post} />
{/each}

<Pager prefix={data.urlPrefix} currentPage={data.currentPage} totalPage={data.totalPage} />
