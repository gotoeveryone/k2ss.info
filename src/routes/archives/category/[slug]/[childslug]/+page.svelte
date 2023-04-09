<script lang="ts">
	import type { PageServerData } from './$types';
	import Pager from '$lib/components/pager.svelte';
	import PostItem from '$lib/components/post-item.svelte';

	export let data: PageServerData;
</script>

<h1>{data.category.name} の記事一覧</h1>
{#each data.posts as post}
	<PostItem item={post} />
{/each}

<Pager prefix={data.urlPrefix} currentPage={1} totalPage={data.totalPage} />
